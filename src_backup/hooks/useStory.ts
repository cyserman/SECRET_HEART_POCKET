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

    const defaultStory: Story = {
      id: 'demo-story',
      title: 'A Daddy Never Stops Loving',
      author: 'Dad',
      userId: 'demo',
      isPublished: true,
      isPackaged: true,
      price: 'Gift',
      createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
      updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
      settings: { mps: 6, transition: 'fade', filter: 'dreamy' },
      pages: [
        {
          text: 'This pocket is a present for the boys—a soft place to keep the moments where we laughed the hardest and learned the most.',
          images: [{ url: DEFAULT_IMAGES[0] }]
        },
        {
          text: 'Every story we add here grows a little brighter. The new bank accounts are our treasure chests; the profits from this app sail there to fund your adventures.',
          images: [{ url: DEFAULT_IMAGES[0] }]
        },
        {
          text: 'No matter where you go, this pocket follows. A daddy never stops loving. This is your map, your memory vault, and your launchpad.',
          images: [{ url: DEFAULT_IMAGES[0] }]
        }
      ]
    };

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
        (myStories.length > 0 ? myStories : [defaultStory])
          .map(normalize)
          .sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
      );
      
      setMarketStories(
        (market.length > 0 ? market : [defaultStory])
          .map(normalize)
          .sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, userData.purchased]);

  return { stories, marketStories, loading };
};
