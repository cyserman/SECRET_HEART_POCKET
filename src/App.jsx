import { useState, useEffect } from 'react';
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

export default function App() {
  const [error, setError] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  useEffect(() => {
    // Catch any unhandled errors
    const handleError = (e) => {
      console.error('Global error:', e.error);
      const msg = e.error?.message || 'Unknown error';
      setError(msg);
      if (msg.includes('Firebase') || msg.includes('configuration') || msg.includes('auth/configuration') || msg.includes('418')) {
        setFirebaseError(msg);
      }
    };
    
    const handleRejection = (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      const msg = e.reason?.message || String(e.reason) || 'Promise rejection';
      setError(msg);
      if (msg.includes('Firebase') || msg.includes('configuration') || msg.includes('auth/configuration') || msg.includes('418')) {
        setFirebaseError(msg);
      }
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  // Hooks must be called unconditionally
  const { user, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUserData(user);
  const { stories, marketStories, loading: storiesLoading } = useStory(user, userData);
  
  const [view, setView] = useState('library');
  const [currentStory, setCurrentStory] = useState(null);
  const [showLegacyModal, setShowLegacyModal] = useState(false);

  const loading = authLoading || userLoading || storiesLoading;

  // Show Firebase config error with helpful message
  if (firebaseError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl border border-indigo-100">
          <h1 className="text-3xl font-black text-indigo-900 mb-4">🔧 Configuration Needed</h1>
          <p className="text-slate-700 mb-6">
            Firebase configuration is missing. Please set environment variables in Vercel.
          </p>
          <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-sm">
            <p className="font-bold text-indigo-900 mb-2">Quick Fix:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Go to <a href="https://vercel.com/cysermans-projects/secret-heart-pocket/settings/environment-variables" target="_blank" className="text-indigo-600 underline">Vercel Environment Variables</a></li>
              <li>Add <code className="bg-white px-2 py-1 rounded">VITE_FIREBASE_CONFIG</code> with your Firebase config JSON</li>
              <li>Add <code className="bg-white px-2 py-1 rounded">VITE_APP_ID</code> = <code className="bg-white px-2 py-1 rounded">secret-heart-pocket</code></li>
              <li>Redeploy the project</li>
            </ol>
          </div>
          <p className="text-xs text-slate-500 mb-4">Error: {firebaseError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Reload After Fix
          </button>
        </div>
      </div>
    );
  }

  // Show generic error if something crashes
  if (error && !firebaseError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading App</h1>
          <p className="text-slate-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

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

  const handleSave = async (data) => {
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
        const newPayload = { ...payload, createdAt: serverTimestamp() };
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

  const handlePurchase = (_story) => {
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

