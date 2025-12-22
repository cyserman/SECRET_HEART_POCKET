"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseStory = exports.generatePublicVariant = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();
// generatePublicVariant: owner-only; creates blurred public derivative
exports.generatePublicVariant = functions.https.onCall(async (data, context) => {
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
    if ((story === null || story === void 0 ? void 0 : story.ownerUid) !== uid) {
        throw new functions.https.HttpsError("permission-denied", "Not the story owner");
    }
    const tempInput = path.join(os.tmpdir(), (0, uuid_1.v4)());
    const tempOutput = path.join(os.tmpdir(), (0, uuid_1.v4)() + ".jpg");
    await bucket.file(originalPath).download({ destination: tempInput });
    await (0, sharp_1.default)(tempInput)
        .resize({ width: 720, withoutEnlargement: true })
        .blur(22)
        .jpeg({ quality: 70, chromaSubsampling: "4:2:0" })
        .toFile(tempOutput);
    const publicFileName = (0, uuid_1.v4)() + ".jpg";
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
exports.purchaseStory = functions.https.onCall(async (data, context) => {
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
        var _a;
        const idemSnap = await tx.get(idemRef);
        if (idemSnap.exists) {
            return (_a = idemSnap.data()) === null || _a === void 0 ? void 0 : _a.result;
        }
        const storySnap = await tx.get(storyRef);
        if (!storySnap.exists) {
            throw new functions.https.HttpsError("not-found", "Story not found");
        }
        const story = storySnap.data();
        const creatorUid = story === null || story === void 0 ? void 0 : story.ownerUid;
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
//# sourceMappingURL=index.js.map