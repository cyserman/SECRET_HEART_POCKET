import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { initializeFirebase } from './firebase';

let authReady = false;
let authReadyPromise: Promise<User | null>;
let authReadyResolve: (user: User | null) => void;

// Create promise that resolves when auth is ready
authReadyPromise = new Promise((resolve) => {
  authReadyResolve = resolve;
});

/**
 * Initialize anonymous authentication
 * Called once at app startup
 */
export const initAuth = async (): Promise<void> => {
  try {
    const { auth } = initializeFirebase();
    
    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('🔐 User authenticated:', user.uid);
        authReady = true;
        authReadyResolve(user);
      } else {
        console.log('🔓 No user, signing in anonymously...');
        try {
          const result = await signInAnonymously(auth);
          console.log('✅ Anonymous sign-in successful:', result.user.uid);
          authReady = true;
          authReadyResolve(result.user);
        } catch (error: any) {
          console.error('❌ Anonymous sign-in failed:', error);
          console.error('Error code:', error?.code);
          console.error('Error message:', error?.message);
          
          // Show user-friendly message for common errors
          if (error?.code === 'auth/configuration-not-found') {
            console.error('👉 SOLUTION: Enable Anonymous Authentication in Firebase Console');
            console.error('   1. Go to https://console.firebase.google.com');
            console.error('   2. Select your project');
            console.error('   3. Authentication → Sign-in method');
            console.error('   4. Enable "Anonymous" provider');
          }
          
          authReady = true;
          authReadyResolve(null);
        }
      }
    });
  } catch (error) {
    console.error('❌ Auth initialization failed:', error);
    authReady = true;
    authReadyResolve(null);
  }
};

/**
 * Wait for auth to be ready
 * Returns current user or null
 */
export const waitForAuth = (): Promise<User | null> => {
  return authReadyPromise;
};

/**
 * Check if auth is ready (synchronous)
 */
export const isAuthReady = (): boolean => {
  return authReady;
};

