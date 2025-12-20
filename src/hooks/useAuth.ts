import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { auth, initializeFirebase, getInitialAuthToken } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeFirebase();
    
    const initAuth = async () => {
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

