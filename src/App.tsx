import { useState } from 'react';
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, getAppId } from './lib/firebase';
import { useAuth } from './hooks/useAuth';
import { useUserData } from './hooks/useUserData';
import { useStory } from './hooks/useStory';
import { Navigation } from './components/Navigation';
import { LibraryView } from './components/LibraryView';
import { MarketView } from './components/MarketView';
import { EditorView } from './components/EditorView';
import { ReaderView } from './components/ReaderView';
import { LegacyModal } from './components/LegacyModal';
import { Story } from './types';

type View = 'library' | 'market' | 'edit' | 'read';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUserData(user);
  const { stories, marketStories, loading: storiesLoading } = useStory(user, userData);
  
  const [view, setView] = useState<View>('library');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [showLegacyModal, setShowLegacyModal] = useState(false);

  const loading = authLoading || userLoading || storiesLoading;

  const handleLegacyActivate = async () => {
    if (!user || !db) return;
    
    const appId = getAppId();
    const userRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
    await updateDoc(userRef, { 
      isGoldMember: true, 
      legacyVerified: true 
    });
    setShowLegacyModal(false);
  };

  const handleSave = async (data: Story) => {
    if (!user || !db) return;
    
    try {
      const appId = getAppId();
      const payload = { 
        ...data, 
        updatedAt: serverTimestamp(), 
        userId: user.uid 
      };
      
      if (data.id) {
        await updateDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'stories', data.id), 
          payload
        );
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(
          collection(db, 'artifacts', appId, 'public', 'data', 'stories'), 
          payload
        );
      }
      setView('library');
    } catch (e) {
      alert("Error saving. Reduce image sizes.");
      console.error(e);
    }
  };

  const handlePurchase = (story: Story) => {
    // TODO: Implement marketplace purchase logic
    alert("Simulated Purchase - Marketplace economy coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0b2e] flex items-center justify-center text-amber-400 font-serif text-xl animate-pulse">
        Unfolding the Map...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 font-sans text-slate-800">
      <Navigation 
        view={view === 'library' || view === 'market' ? view : 'library'} 
        userData={userData} 
        onViewChange={(v) => setView(v)}
      />

      <main className="max-w-6xl mx-auto p-6">
        {view === 'library' && (
          <LibraryView
            stories={stories}
            userData={userData}
            onCreateStory={() => {
              setCurrentStory(null);
              setView('edit');
            }}
            onReadStory={(story) => {
              setCurrentStory(story);
              setView('read');
            }}
            onEditStory={(story) => {
              setCurrentStory(story);
              setView('edit');
            }}
            onShowLegacyModal={() => setShowLegacyModal(true)}
          />
        )}

        {view === 'market' && (
          <MarketView
            marketStories={marketStories}
            onPurchase={handlePurchase}
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
    </div>
  );
}

