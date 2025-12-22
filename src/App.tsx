import { useState } from 'react';
import { doc, updateDoc, addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, getAppId } from './lib/firebase';
import { useAuth } from './hooks/useAuth';
import { useUserData } from './hooks/useUserData';
import { useStory } from './hooks/useStory';
import { Navigation } from './components/Navigation';
import { LibraryView } from './components/LibraryView';
import { MarketView } from './components/MarketView';
import { EditorView } from './components/EditorView';
import { ReaderView } from './components/ReaderView';
import { ProfileView } from './components/ProfileView';
import { CirclesView } from './components/CirclesView';
import { LegacyModal } from './components/LegacyModal';
import { CreateStoryModal } from './components/CreateStoryModal';
import { Story } from './types';

type View = 'library' | 'market' | 'circles' | 'profile' | 'edit' | 'read';

export default function App() {
  const { user, loading: authLoading, error: authError } = useAuth();
  const { userData, loading: userLoading } = useUserData(user);
  const { stories, marketStories, loading: storiesLoading } = useStory(user, userData);
  
  const [view, setView] = useState<View>('library');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [showLegacyModal, setShowLegacyModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loading = authLoading || userLoading || storiesLoading;

  const handleLegacyActivate = async () => {
    if (!user || !db) {
      alert('Please wait a moment for sign-in to finish, then try again.');
      return;
    }

    const appId = getAppId();
    const userRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
    await setDoc(userRef, { 
      isGoldMember: true, 
      legacyVerified: true 
    }, { merge: true });
    setShowLegacyModal(false);
    alert('Legacy Mode unlocked for this session.');
  };

  const handleCreateStory = (data: { 
    title: string; 
    tagline: string; 
    storyType: number; 
    aiAssist: boolean;
    category: string;
    price: number;
    visibility: 'circle' | 'marketplace';
  }) => {
    setCurrentStory({
      title: data.title,
      author: user?.displayName || user?.email || 'Explorer',
      tagline: data.tagline,
      category: data.category as any,
      price: data.price,
      isPublished: data.visibility === 'marketplace',
      settings: { mps: data.storyType, transition: 'fade', filter: 'none' },
      pages: [{ text: '', images: [] }]
    });
    setShowCreateModal(false);
    setView('edit');
  };

  const handleSave = async (data: Story) => {
    if (!user || !db) {
      alert('Still connecting... please wait a moment and try saving again.');
      console.error('Save blocked: missing user or db', { user, db });
      return;
    }
    
    try {
      const appId = getAppId();
      
      // Separate story metadata (no pages in main doc)
      const { pages, ...storyMeta } = data;
      const storyPayload = { 
        ...storyMeta, 
        updatedAt: serverTimestamp(), 
        userId: user.uid 
      };
      
      let storyId = data.id;
      
      // Save/update story document
      if (storyId) {
        await updateDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'stories', storyId), 
          storyPayload
        );
      } else {
        const newPayload: any = { ...storyPayload, createdAt: serverTimestamp() };
        const storyRef = await addDoc(
          collection(db, 'artifacts', appId, 'public', 'data', 'stories'), 
          newPayload
        );
        storyId = storyRef.id;
      }
      
      // Save pages to pagesPublic and pagesPrivate subcollections
      if (pages && pages.length > 0 && storyId) {
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const pageId = `page-${i}`;
          
          // Public data (text + publicImageRefs)
          const publicData = {
            index: i,
            text: page.text || '',
            publicImageRefs: (page.images || []).map(img => ({
              publicUrl: img.url,
              publicPath: img.path || '',
            })),
          };
          
          // Private data (originalImageRefs)
          const privateData = {
            index: i,
            originalImageRefs: (page.images || []).map(img => ({
              storagePath: img.path || img.url,
            })),
          };
          
          // Write to pagesPublic
          await setDoc(
            doc(db, 'artifacts', appId, 'public', 'data', 'stories', storyId, 'pagesPublic', pageId),
            publicData
          );
          
          // Write to pagesPrivate
          await setDoc(
            doc(db, 'artifacts', appId, 'public', 'data', 'stories', storyId, 'pagesPrivate', pageId),
            privateData
          );
        }
      }
      
      setView('library');
    } catch (e) {
      alert("Error saving. Please try again.");
      console.error('Save error:', e);
    }
  };

  const handlePurchase = (_story: Story) => {
    // TODO: Implement marketplace purchase logic
    alert("Simulated Purchase - Marketplace economy coming soon!");
  };

  if (authError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-serif text-orange-400 mb-4">Authentication Error</h1>
          <p className="text-slate-300 mb-6">{authError}</p>
          <div className="bg-slate-800 border border-orange-400/20 rounded-lg p-4 text-left text-sm">
            <p className="text-orange-400 font-semibold mb-2">To fix this:</p>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>Go to <a href="https://console.firebase.google.com" target="_blank" className="text-orange-400 underline">Firebase Console</a></li>
              <li>Select your project</li>
              <li>Navigate to Authentication → Sign-in method</li>
              <li>Enable "Anonymous" authentication</li>
              <li>Refresh this page</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-orange-400 text-slate-900 rounded-lg hover:bg-orange-300 transition-colors font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-orange-400 font-serif text-xl animate-pulse">
        Unfolding the Map...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-2xl font-serif text-orange-400 mb-4">Waiting for Authentication...</h1>
          <p className="text-slate-300 mb-6">Please enable Anonymous Authentication in Firebase Console</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-orange-400 text-slate-900 rounded-lg hover:bg-orange-300 transition-colors font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">
      <Navigation 
        view={view}
        userData={userData} 
        onViewChange={(v) => setView(v)}
        onCreateStory={() => setShowCreateModal(true)}
      />

      <main className="max-w-6xl mx-auto p-6">
        {view === 'library' && (
          <LibraryView
            stories={stories}
            userData={userData}
            onCreateStory={() => setShowCreateModal(true)}
            onReadStory={(story) => {
              setCurrentStory(story);
              setView('read');
            }}
            onEditStory={(story) => {
              setCurrentStory(story);
              setView('edit');
            }}
            onShowLegacyModal={() => setShowLegacyModal(true)}
            onBrowseMarket={() => setView('market')}
          />
        )}

        {view === 'market' && (
          <MarketView
            marketStories={marketStories}
            onPurchase={handlePurchase}
            onBackToLibrary={() => setView('library')}
          />
        )}

        {view === 'circles' && (
          <CirclesView
            onCreateCircle={() => alert('Create Circle feature coming soon!')}
            onJoinCircle={() => {
              const code = prompt('Enter circle invite code:');
              if (code) {
                alert(`Joining circle with code: ${code} (feature coming soon!)`);
              }
            }}
          />
        )}

        {view === 'profile' && (
          <ProfileView
            userData={userData}
            storiesCreated={stories.length}
            onShowLegacyModal={() => setShowLegacyModal(true)}
          />
        )}

        {view === 'edit' && (
          <EditorView
            initialData={currentStory}
            onSave={handleSave}
            onCancel={() => setView('library')}
            isGold={userData.isGoldMember}
          />
        )}
      </main>

      {view === 'read' && currentStory && (
        <ReaderView
          story={currentStory}
          onBack={() => setView('library')}
        />
      )}

      {showLegacyModal && (
        <LegacyModal
          onActivate={handleLegacyActivate}
          onClose={() => setShowLegacyModal(false)}
        />
      )}

      {showCreateModal && (
        <CreateStoryModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateStory}
        />
      )}
    </div>
  );
}
