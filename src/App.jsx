import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
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
  const { user, loading: authLoading, error: authError } = useAuth();
  const { userData, loading: userLoading } = useUserData(user);
  const { stories, marketStories, loading: storiesLoading } = useStory(user, userData);
  
  const [view, setView] = useState('library');
  const [currentStory, setCurrentStory] = useState(null);
  const [showLegacyModal, setShowLegacyModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleCreateStory = (data) => {
    setCurrentStory({
      title: data.title,
      author: user?.displayName || user?.email || 'Explorer',
      tagline: data.tagline,
      category: data.category,
      price: data.price,
      isPublished: data.visibility === 'marketplace',
      settings: { mps: data.storyType, transition: 'fade', filter: 'none' },
      pages: [{ text: '', images: [] }]
    });
    setShowCreateModal(false);
    setView('edit');
  };

  const handleSave = async (data) => {
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
        const newPayload = { ...storyPayload, createdAt: serverTimestamp() };
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

  const handlePurchase = (_story) => {
    // TODO: Implement marketplace purchase logic
    alert("Simulated Purchase - Marketplace economy coming soon!");
  };

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md">
          <div className="glass-dark rounded-3xl p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-ember-400/20 to-ember-500/20 ring-8 ring-ember-400/10">
              <div className="text-4xl">🔒</div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Authentication Required</h1>
              <p className="text-slate-300">{authError}</p>
            </div>
            
            <div className="card-dark rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center gap-2 text-ember-400 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-ember-400 animate-pulse"></div>
                Quick Fix
              </div>
              <ol className="text-slate-200 text-sm space-y-2 list-decimal list-inside">
                <li>Visit <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-ember-400 hover:text-ember-300 underline">Firebase Console</a></li>
                <li>Select your project</li>
                <li>Go to <span className="text-white font-medium">Authentication → Sign-in method</span></li>
                <li>Enable <span className="text-white font-medium">"Anonymous"</span> authentication</li>
                <li>Return here and click Retry</li>
              </ol>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              className="w-full btn-orange px-6 py-3.5 rounded-xl font-bold"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ember-400 to-ember-500 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ember-400 to-ember-500 animate-pulse"></div>
            <Heart size={40} className="absolute inset-0 m-auto text-white fill-white animate-float" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Unfolding the Map</h2>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 rounded-full bg-ember-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-ember-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-ember-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md">
          <div className="glass-dark rounded-3xl p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-ember-400/20 to-ember-500/20 ring-8 ring-ember-400/10 animate-pulse">
              <div className="text-4xl">⏳</div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Connecting...</h1>
              <p className="text-slate-300">Setting up your secure session</p>
            </div>
            
            <p className="text-sm text-slate-400">
              If this takes too long, anonymous auth might not be enabled
            </p>
            
            <button 
              onClick={() => window.location.reload()} 
              className="w-full px-6 py-3 glass-warm hover:bg-white/10 rounded-xl font-semibold text-white transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-50">
      <Navigation 
        view={view}
        userData={userData} 
        onViewChange={(v) => setView(v)}
        onCreateStory={() => setShowCreateModal(true)}
      />

      <main className="max-w-6xl mx-auto p-6 pt-8">
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
