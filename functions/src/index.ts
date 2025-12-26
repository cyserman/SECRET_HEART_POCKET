import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sharp from 'sharp';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

// App ID constant - should match client-side getAppId()
const APP_ID = process.env.APP_ID || 'secret-heart-pocket';

/**
 * generatePublicVariant
 * 
 * Generates a blurred public variant of a private image
 * 
 * Input: { storyId: string, originalPath: string }
 * Output: { publicUrl: string, publicPath: string }
 * 
 * Process:
 * 1. Read original image from private storage
 * 2. Apply blur using sharp (sigma 20)
 * 3. Upload to public_obfuscated/ path
 * 4. Return public URL and path
 */
export const generatePublicVariant = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { storyId, originalPath } = data;
  const userId = context.auth.uid;

  if (!storyId || !originalPath) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'storyId and originalPath are required'
    );
  }

  // SECURITY: Verify the path belongs to the authenticated user
  // Path format: private/stories/{storyId}/{userId}/{timestamp}-{randomId}.jpg
  const expectedPathPrefix = `private/stories/${storyId}/${userId}/`;
  if (!originalPath.startsWith(expectedPathPrefix)) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Original path does not belong to authenticated user'
    );
  }

  // SECURITY: Verify the story belongs to the authenticated user
  // This prevents path traversal attacks even if userId matches
  try {
    const storyRef = db.collection('artifacts').doc(APP_ID)
      .collection('public').doc('data')
      .collection('stories').doc(storyId);
    const storyDoc = await storyRef.get();

    if (!storyDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Story not found'
      );
    }

    const storyData = storyDoc.data();
    if (storyData?.userId !== userId) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Story does not belong to authenticated user'
      );
    }
  } catch (error) {
    // If it's already an HttpsError, re-throw it
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    // Otherwise, wrap it
    throw new functions.https.HttpsError(
      'internal',
      `Failed to verify story ownership: ${error instanceof Error ? error.message : String(error)}`
    );
  }

  try {
    const bucket = storage.bucket();

    // Download original image
    const originalFile = bucket.file(originalPath);
    const [originalBuffer] = await originalFile.download();

    // Apply blur using sharp
    const blurredBuffer = await sharp(originalBuffer)
      .blur(20) // Sigma 20 for "dreamy" effect
      .jpeg({ quality: 80 })
      .toBuffer();

    // Generate public path
    const publicPath = `public_obfuscated/${storyId}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.jpg`;
    const publicFile = bucket.file(publicPath);

    // Upload blurred image
    await publicFile.save(blurredBuffer, {
      contentType: 'image/jpeg',
      metadata: {
        cacheControl: 'public,max-age=31536000', // 1 year cache
        metadata: {
          storyId,
          originalPath,
          processed: new Date().toISOString(),
        },
      },
    });

    // Make file publicly readable
    await publicFile.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${publicPath}`;

    return {
      publicUrl,
      publicPath,
    };
  } catch (error) {
    console.error('Error generating public variant:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to generate public variant: ${errorMessage}`
    );
  }
});

/**
 * purchaseStory
 * 
 * Handles story purchase with 50/50 revenue split
 * 
 * Input: { 
 *   storyId: string, 
 *   buyerId: string,
 *   paymentIntentId: string (from Stripe/payment processor),
 *   amount: number (in cents)
 * }
 * 
 * Output: { success: boolean, transactionId: string }
 * 
 * Process:
 * 1. Check idempotency (prevent double purchases)
 * 2. Get story details and creator info
 * 3. Calculate 50/50 split
 * 4. Record transaction in Firestore
 * 5. Update buyer's purchased list
 * 6. Update platform earnings
 */
export const purchaseStory = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { storyId, buyerId, paymentIntentId, amount } = data;

  if (!storyId || !buyerId || !paymentIntentId || !amount) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'storyId, buyerId, paymentIntentId, and amount are required'
    );
  }

  // Verify buyer matches authenticated user
  if (context.auth.uid !== buyerId) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Buyer ID does not match authenticated user'
    );
  }

  // Idempotency key
  const idempotencyKey = `purchase-${paymentIntentId}`;

  try {
    // Check idempotency
    const idempotencyRef = db.collection('idempotency').doc(idempotencyKey);
    const idempotencyDoc = await idempotencyRef.get();

    if (idempotencyDoc.exists) {
      console.log('Purchase already processed:', idempotencyKey);
      return idempotencyDoc.data();
    }

    // Get story details
    const storyRef = db.collection('stories').doc(storyId);
    const storyDoc = await storyRef.get();

    if (!storyDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Story not found'
      );
    }

    const story = storyDoc.data();
    const creatorId = story?.userId;

    if (!creatorId) {
      throw new functions.https.HttpsError(
        'internal',
        'Story missing creator information'
      );
    }

    // Calculate 50/50 split
    const creatorEarnings = Math.floor(amount / 2);
    const platformEarnings = amount - creatorEarnings;

    // Create transaction record
    const transactionRef = db.collection('transactions').doc();
    const transactionData = {
      id: transactionRef.id,
      storyId,
      buyerId,
      creatorId,
      paymentIntentId,
      amount,
      creatorEarnings,
      platformEarnings,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'completed',
    };

    // Batch write for atomicity
    const batch = db.batch();

    // Write transaction
    batch.set(transactionRef, transactionData);

    // Update buyer's purchased list
    const buyerRef = db.collection('users').doc(buyerId);
    batch.set(buyerRef, {
      purchased: admin.firestore.FieldValue.arrayUnion(storyId),
    }, { merge: true });

    // Update creator earnings
    const creatorRef = db.collection('users').doc(creatorId);
    batch.set(creatorRef, {
      totalEarnings: admin.firestore.FieldValue.increment(creatorEarnings),
    }, { merge: true });

    // Update platform earnings
    const platformRef = db.collection('platform').doc('earnings');
    batch.set(platformRef, {
      totalEarnings: admin.firestore.FieldValue.increment(platformEarnings),
    }, { merge: true });

    // Write idempotency record
    const result = {
      success: true,
      transactionId: transactionRef.id,
    };
    batch.set(idempotencyRef, result);

    // Commit batch
    await batch.commit();

    console.log('Purchase completed:', transactionRef.id);
    return result;
  } catch (error) {
    console.error('Error processing purchase:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to process purchase: ${errorMessage}`
    );
  }
});

