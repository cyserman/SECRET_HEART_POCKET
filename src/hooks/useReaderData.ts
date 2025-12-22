import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, getAppId } from '../lib/firebase';
import { DEFAULT_IMAGES } from '../lib/constants';

export interface PublicPage {
  index: number;
  text: string;
  publicImageRefs: Array<{
    publicUrl: string;
    publicPath: string;
  }>;
}

export interface ReaderPage {
  text: string;
  images: Array<{ url: string }>;
}

/**
 * useReaderData - Loads public pages for a story from pagesPublic subcollection
 * This hook is specifically for reader views and only accesses public data
 */
export const useReaderData = (storyId: string | undefined) => {
  const [pages, setPages] = useState<ReaderPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storyId || !db) {
      setLoading(false);
      return;
    }

    const appId = getAppId();
    const pagesRef = collection(
      db, 
      'artifacts', appId, 'public', 'data', 'stories', storyId, 'pagesPublic'
    );
    const q = query(pagesRef, orderBy('index', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // No pages in subcollection, use empty state with default
          setPages([{
            text: '',
            images: [{ url: DEFAULT_IMAGES[0] }]
          }]);
          setLoading(false);
          return;
        }

        const loadedPages = snapshot.docs.map((doc) => {
          const data = doc.data() as PublicPage;
          
          // Map publicImageRefs to reader format
          const images = data.publicImageRefs && data.publicImageRefs.length > 0
            ? data.publicImageRefs.map(ref => ({ url: ref.publicUrl }))
            : [{ url: DEFAULT_IMAGES[0] }];

          return {
            text: data.text || '',
            images
          };
        });

        setPages(loadedPages);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error loading pages:', err);
        setError(err.message);
        // Fallback to default
        setPages([{
          text: '',
          images: [{ url: DEFAULT_IMAGES[0] }]
        }]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [storyId]);

  return { pages, loading, error };
};

/**
 * Helper to normalize story settings with safe defaults
 */
export const normalizeStorySettings = (settings?: any) => {
  return {
    mps: settings?.mps ?? 10,
    mpsDefault: settings?.mpsDefault ?? settings?.mps ?? 10, // Add mpsDefault fallback
    transition: settings?.transition || 'fade',
    filter: settings?.filter || 'none'
  };
};

