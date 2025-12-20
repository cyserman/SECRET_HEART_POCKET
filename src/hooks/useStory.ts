import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db, getAppId } from '../lib/firebase';
import { Story, UserData } from '../types';
import { DEFAULT_IMAGES } from '../lib/constants';

// MPS Logic: Memories Per Story (1-10)
// This hook manages story data with MPS constraints
export const useStory = (user: User | null, userData: UserData) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [marketStories, setMarketStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) {
      setLoading(false);
      return;
    }

    const appId = getAppId();
    const storiesRef = collection(db, 'artifacts', appId, 'public', 'data', 'stories');
    const q = query(storiesRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const all = snapshot.docs.map(d => ({ 
        id: d.id, 
        ...d.data() 
      })) as Story[];

      // Filter stories based on ownership and purchases
      const myStories = all.filter(s => 
        s.userId === user.uid || 
        userData.purchased?.includes(s.id || '') || 
        s.isPackaged
      );

      const market = all.filter(s => 
        s.isPublished && 
        s.userId !== user.uid && 
        !userData.purchased?.includes(s.id || '')
      );

      // Normalize stories (apply MPS logic, ensure images exist)
      const normalize = (s: Story): Story => ({
        ...s,
        pages: (s.pages || []).map(p => ({ 
          ...p, 
          images: p.images && p.images.length > 0 
            ? p.images 
            : [{ url: DEFAULT_IMAGES[0] }] 
        })),
        settings: { 
          mps: Math.min(Math.max(s.settings?.mps || 10, 1), 10), // Clamp 1-10
          transition: s.settings?.transition || 'fade', 
          filter: s.settings?.filter || 'none' 
        }
      });

      setStories(
        myStories.map(normalize).sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
      );
      
      setMarketStories(
        market.map(normalize).sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, userData.purchased]);

  return { stories, marketStories, loading };
};

