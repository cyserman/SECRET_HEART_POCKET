import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, initializeFirebase } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      initializeFirebase();
    } catch (error: any) {
      console.error('Firebase initialization failed:', error);
      setError(error.message || 'Failed to initialize Firebase');
      setLoading(false);
      return; // Exit early if Firebase fails
    }
    
    if (!auth) {
      console.error('Auth not available after Firebase init');
      setError('Authentication service not available');
      setLoading(false);
      return;
    }
    
    // Just listen for auth state changes
    // The actual sign-in is handled by authBootstrap.ts in main.jsx
    const unsubscribe = onAuthStateChanged(auth!, (u) => {
      setUser(u);
      setLoading(false);
      if (!u) {
        // If still no user after auth state change, something went wrong
        console.warn('No user authenticated after auth state change');
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};

