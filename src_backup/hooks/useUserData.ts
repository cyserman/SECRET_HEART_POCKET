import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, getAppId } from '../lib/firebase';
import { UserData } from '../types';

export const useUserData = (user: User | null) => {
  const [userData, setUserData] = useState<UserData>({ 
    balance: 0, 
    purchased: [], 
    isGoldMember: false 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) {
      setLoading(false);
      return;
    }

    const appId = getAppId();
    const userRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');

    const initializeUserData = async () => {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { 
          balance: 500, 
          purchased: [], 
          isGoldMember: false 
        });
      }
    };

    initializeUserData();

    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setUserData(doc.data() as UserData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { userData, loading };
};

