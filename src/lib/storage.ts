import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Compress an image file using canvas
 * Returns a Blob with reduced file size
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export interface UploadResult {
  url: string;
  path: string;
}

export interface PrivateUploadResult {
  originalPath: string;
  publicUrl?: string;
  publicPath?: string;
}

export interface UploadProgressCallback {
  percent: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

/**
 * Upload an image to Firebase Storage with automatic path generation
 * @param file - The file to upload
 * @param userId - User ID for organizing files
 * @param storyId - Optional story ID (uses 'drafts' if not provided)
 * @param onProgress - Callback for upload progress updates
 * @returns Promise with the download URL and storage path
 */
export const uploadImage = async (
  file: File,
  userId: string,
  storyId?: string,
  onProgress?: (progress: UploadProgressCallback) => void
): Promise<UploadResult> => {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }

  try {
    // Compress image first
    const compressedBlob = await compressImage(file);
    
    // Generate storage path
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const storyPath = storyId || 'drafts';
    const path = `users/${userId}/stories/${storyPath}/${timestamp}-${randomId}.jpg`;
    
    // Create storage reference
    const storageRef = ref(storage, path);
    
    // Start upload with resumable upload
    const uploadTask = uploadBytesResumable(storageRef, compressedBlob, {
      contentType: 'image/jpeg',
      cacheControl: 'public,max-age=31536000', // 1 year cache
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.({
            percent,
            status: 'uploading',
          });
        },
        (error) => {
          // Error handling
          console.error('Upload error:', error);
          onProgress?.({
            percent: 0,
            status: 'error',
            error: error.message,
          });
          reject(error);
        },
        async () => {
          // Success - get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onProgress?.({
            percent: 100,
            status: 'complete',
          });
          resolve({ url: downloadURL, path });
        }
      );
    });
  } catch (error) {
    console.error('Image compression error:', error);
    throw error;
  }
};

/**
 * Upload original image to private storage and generate public variant
 * This implements the secure upload pipeline:
 * 1. Upload original to private/stories/{storyId}/{uid}/{uuid}.jpg
 * 2. Call Cloud Function to generate blurred public variant
 * 3. Return both private path and public URL
 * 
 * @param file - The file to upload
 * @param userId - User ID for auth/path
 * @param storyId - Story ID for organizing files
 * @param onProgress - Callback for upload progress updates
 * @returns Promise with originalPath and publicUrl/publicPath
 */
export const uploadOriginalImage = async (
  file: File,
  userId: string,
  storyId: string,
  onProgress?: (progress: UploadProgressCallback) => void
): Promise<PrivateUploadResult> => {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }

  try {
    // Compress image first
    const compressedBlob = await compressImage(file);
    
    // Generate private storage path
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const originalPath = `private/stories/${storyId}/${userId}/${timestamp}-${randomId}.jpg`;
    
    // Create storage reference
    const storageRef = ref(storage, originalPath);
    
    // Start upload with resumable upload
    const uploadTask = uploadBytesResumable(storageRef, compressedBlob, {
      contentType: 'image/jpeg',
      cacheControl: 'private,max-age=31536000', // Private, 1 year cache
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.({
            percent,
            status: 'uploading',
          });
        },
        (error) => {
          // Error handling
          console.error('Upload error:', error);
          onProgress?.({
            percent: 0,
            status: 'error',
            error: error.message,
          });
          reject(error);
        },
        async () => {
          // Success - call Cloud Function to generate public variant
          onProgress?.({
            percent: 100,
            status: 'complete',
          });
          
          try {
            // Call Cloud Function to generate blurred public variant
            const publicVariant = await generatePublicVariant(storyId, originalPath);
            
            resolve({
              originalPath,
              publicUrl: publicVariant.publicUrl,
              publicPath: publicVariant.publicPath,
            });
          } catch (error) {
            console.error('Error generating public variant:', error);
            // Return without public URL if Cloud Function fails
            // This allows MVP to work even if function isn't deployed yet
            resolve({
              originalPath,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error('Image compression error:', error);
    throw error;
  }
};

/**
 * Call Cloud Function to generate public blurred variant
 * @param storyId - Story ID
 * @param originalPath - Path to original image in private storage
 * @returns Public URL and path for the blurred image
 */
export const generatePublicVariant = async (
  storyId: string,
  originalPath: string
): Promise<{ publicUrl: string; publicPath: string }> => {
  // In MVP, we'll use a placeholder approach
  // In production, this would call the actual Cloud Function
  // For now, return the original path as public (Cloud Function will be implemented in STEP I)
  
  // TODO: Replace with actual Cloud Function call once deployed
  // const functions = getFunctions();
  // const generateVariant = httpsCallable(functions, 'generatePublicVariant');
  // const result = await generateVariant({ storyId, originalPath });
  // return result.data;
  
  console.warn('Cloud Function not yet deployed - using original image as public variant', { storyId });
  
  // For MVP: use original path (will be replaced by Cloud Function)
  return {
    publicUrl: originalPath, // Placeholder
    publicPath: originalPath.replace('private/', 'public_obfuscated/'),
  };
};

/**
 * Delete an image from Firebase Storage
 * @param url - The download URL or storage path
 */
export const deleteImage = async (url: string): Promise<void> => {
  if (!storage) {
    console.warn('Firebase Storage not initialized, skipping deletion');
    return;
  }

  try {
    // Extract path from URL if it's a full URL
    let path = url;
    if (url.includes('firebase')) {
      const urlObj = new URL(url);
      const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);
      if (pathMatch) {
        path = decodeURIComponent(pathMatch[1]);
      }
    }
    
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - image might already be deleted
  }
};

