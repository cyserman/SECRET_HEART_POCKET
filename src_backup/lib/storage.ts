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

