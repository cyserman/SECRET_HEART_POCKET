import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { auth, initializeFirebase, getInitialAuthToken } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      initializeFirebase();
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      setLoading(false);
      return; // Exit early if Firebase fails
    }
    
    if (!auth) {
      console.error('Auth not available after Firebase init');
      setLoading(false);
      return;
    }
    
    const initAuth = async () => {
      try {
        const token = getInitialAuthToken();
        if (token) {
          try {
            await signInWithCustomToken(auth!, token);
          } catch (error) {
            console.error('Custom token auth failed, falling back to anonymous:', error);
            await signInAnonymously(auth!);
          }
        } else {
          await signInAnonymously(auth!);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setLoading(false);
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth!, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

