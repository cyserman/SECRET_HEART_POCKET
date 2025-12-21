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
  const { user, loading: authLoading } = useAuth();
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

  const handleCreateStory = (data: { title: string; tagline: string; storyType: number; aiAssist: boolean }) => {
    setCurrentStory({
      title: data.title,
      author: user?.displayName || user?.email || 'Explorer',
      tagline: data.tagline,
      category: 'FAMILY',
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
        const newPayload: any = { ...payload, createdAt: serverTimestamp() };
        await addDoc(
          collection(db, 'artifacts', appId, 'public', 'data', 'stories'), 
          newPayload
        );
      }
      setView('library');
    } catch (e) {
      alert("Error saving. Reduce image sizes.");
      console.error(e);
    }
  };

  const handlePurchase = (_story: Story) => {
    // TODO: Implement marketplace purchase logic
    alert("Simulated Purchase - Marketplace economy coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-orange-400 font-serif text-xl animate-pulse">
        Unfolding the Map...
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
