import { useState, useEffect } from 'react';
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
    console.log("handleSave called with:", data);
    console.log("Current user:", user);
    console.log("Current db:", db);
    
    if (!user) {
      console.error("Save failed: No user", { user, authLoading, userLoading });
      alert("Error: Not signed in. The app is trying to sign you in anonymously. Please wait a moment and try again, or refresh the page.");
      return;
    }
    
    if (!db) {
      console.error("Save failed: No db", { db });
      alert("Error: Database not connected. Please refresh the page.");
      return;
    }
    
    try {
      const appId = getAppId();
      console.log("App ID:", appId);
      
      // Clean up data - remove file objects, keep only URLs (do this asynchronously)
      const cleanData = await new Promise((resolve) => {
        // Use requestIdleCallback to avoid blocking
        const cleanup = () => {
          const cleaned = {
            ...data,
            pages: data.pages.map(page => ({
              ...page,
              images: page.images.map(img => ({ url: img.url })) // Remove file objects
            }))
          };
          resolve(cleaned);
        };
        
        if (window.requestIdleCallback) {
          window.requestIdleCallback(cleanup, { timeout: 100 });
        } else {
          setTimeout(cleanup, 0);
        }
      });
      
      const payload = { 
        ...cleanData, 
        updatedAt: serverTimestamp(), 
        userId: user.uid 
      };
      
      console.log("Saving payload:", payload);
      
      if (data.id) {
        console.log("Updating existing story:", data.id);
        await updateDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'stories', data.id), 
          payload
        );
        console.log("Story updated successfully!");
      } else {
        console.log("Creating new story");
        const newPayload = { ...payload, createdAt: serverTimestamp() };
        const docRef = await addDoc(
          collection(db, 'artifacts', appId, 'public', 'data', 'stories'), 
          newPayload
        );
        console.log("Story saved successfully! ID:", docRef.id);
      }
      
      // Navigate back to library (yield to browser first)
      setTimeout(() => {
        setView('library');
      }, 0);
    } catch (e) {
      console.error("Save error:", e);
      alert(`Error saving story: ${e.message || "Please check console (F12) for details."}`);
      throw e; // Re-throw so EditorView can catch it
    }
  };

  const handlePurchase = (_story) => {
    // TODO: Implement marketplace purchase logic
    alert("Simulated Purchase - Marketplace economy coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-indigo-600 font-serif text-2xl font-bold animate-pulse">
            Unfolding the Map...
          </div>
          <div className="text-slate-500 text-sm">
            Loading your stories...
          </div>
        </div>
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

      {view === 'read' && currentStory ? (
        <main role="main">
          <ReaderView
            story={currentStory}
            onBack={() => setView('library')}
          />
        </main>
      ) : (
        <main className="max-w-6xl mx-auto p-6" role="main">
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

