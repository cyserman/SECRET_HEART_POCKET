import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

admin.initializeApp();

const db = admin.firestore();
const bucket = admin.storage().bucket();

// generatePublicVariant: owner-only; creates blurred public derivative
export const generatePublicVariant = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }

  const { storyId, originalPath } = data;
  const uid = context.auth.uid;

  if (!storyId || !originalPath) {
    throw new functions.https.HttpsError("invalid-argument", "storyId and originalPath required");
  }

  const storySnap = await db.collection("stories").doc(storyId).get();
  if (!storySnap.exists) {
    throw new functions.https.HttpsError("not-found", "Story not found");
  }
  const story = storySnap.data();
  if (story?.ownerUid !== uid) {
    throw new functions.https.HttpsError("permission-denied", "Not the story owner");
  }

  const tempInput = path.join(os.tmpdir(), uuidv4());
  const tempOutput = path.join(os.tmpdir(), uuidv4() + ".jpg");

  await bucket.file(originalPath).download({ destination: tempInput });

  await sharp(tempInput)
    .resize({ width: 720, withoutEnlargement: true })
    .blur(22)
    .jpeg({ quality: 70, chromaSubsampling: "4:2:0" })
    .toFile(tempOutput);

  const publicFileName = uuidv4() + ".jpg";
  const publicPath = `public/stories/${storyId}/${publicFileName}`;

  await bucket.upload(tempOutput, {
    destination: publicPath,
    metadata: {
      contentType: "image/jpeg",
      cacheControl: "public, max-age=31536000",
    },
  });

  fs.unlinkSync(tempInput);
  fs.unlinkSync(tempOutput);

  const publicFile = bucket.file(publicPath);
  const [publicUrl] = await publicFile.getSignedUrl({
    action: "read",
    expires: "01-01-2100",
  });

  return { publicPath, publicUrl };
});

// purchaseStory: 50/50 split + idempotency + append-only ledger
export const purchaseStory = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }

  const uid = context.auth.uid;
  const { storyId, coins, idempotencyKey } = data;

  if (!storyId || !coins || coins <= 0 || !idempotencyKey) {
    throw new functions.https.HttpsError("invalid-argument", "storyId, coins, idempotencyKey required");
  }

  const idemRef = db.collection("idempotency").doc(idempotencyKey);
  const storyRef = db.collection("stories").doc(storyId);

  return await db.runTransaction(async (tx) => {
    const idemSnap = await tx.get(idemRef);
    if (idemSnap.exists) {
      return idemSnap.data()?.result;
    }

    const storySnap = await tx.get(storyRef);
    if (!storySnap.exists) {
      throw new functions.https.HttpsError("not-found", "Story not found");
    }

    const story = storySnap.data();
    const creatorUid = story?.ownerUid;
    if (!creatorUid) {
      throw new functions.https.HttpsError("failed-precondition", "Missing creator");
    }

    const creatorCoins = Math.floor(coins * 0.5);
    const platformCoins = coins - creatorCoins;
    const now = admin.firestore.FieldValue.serverTimestamp();

    const purchaseTxRef = db.collection("transactions").doc();
    const creatorTxRef = db.collection("transactions").doc();
    const platformTxRef = db.collection("transactions").doc();

    tx.set(purchaseTxRef, {
      type: "story_purchase",
      storyId,
      fromUid: uid,
      toUid: null,
      coins,
      createdAt: now,
      idempotencyKey,
    });

    tx.set(creatorTxRef, {
      type: "creator_payout",
      storyId,
      fromUid: null,
      toUid: creatorUid,
      coins: creatorCoins,
      createdAt: now,
      idempotencyKey,
    });

    tx.set(platformTxRef, {
      type: "platform_share",
      storyId,
      fromUid: null,
      toUid: "platform",
      coins: platformCoins,
      createdAt: now,
      idempotencyKey,
    });

    const creatorRef = db.collection("users").doc(creatorUid);
    const platformRef = db.collection("platform").doc("balances");

    tx.set(creatorRef, { coinsBalance: 0 }, { merge: true });
    tx.set(platformRef, { coinsBalance: 0 }, { merge: true });

    tx.update(creatorRef, { coinsBalance: admin.firestore.FieldValue.increment(creatorCoins) });
    tx.update(platformRef, { coinsBalance: admin.firestore.FieldValue.increment(platformCoins) });

    // Optional platform analytics increments
    tx.set(platformRef, {
      purchasesCount: admin.firestore.FieldValue.increment(1),
      creatorCoinsPaid: admin.firestore.FieldValue.increment(creatorCoins),
      platformCoinsEarned: admin.firestore.FieldValue.increment(platformCoins),
      updatedAt: now,
    }, { merge: true });

    const result = { storyId, coins, creatorCoins, platformCoins, purchaseTxId: purchaseTxRef.id };

    tx.set(idemRef, { uid, storyId, createdAt: now, result });

    return result;
  });
});
