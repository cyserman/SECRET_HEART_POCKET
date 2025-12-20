import { Plus, Edit3, Award } from 'lucide-react';
import { Story, UserData } from '../types';
import { FILTERS } from '../lib/constants';
import { DEFAULT_IMAGES } from '../lib/constants';

interface LibraryViewProps {
  stories: Story[];
  userData: UserData;
  onCreateStory: () => void;
  onReadStory: (story: Story) => void;
  onEditStory: (story: Story) => void;
  onShowLegacyModal: () => void;
  onBrowseMarket: () => void;
}

export const LibraryView = ({ 
  stories, 
  userData, 
  onCreateStory, 
  onReadStory, 
  onEditStory,
  onShowLegacyModal,
  onBrowseMarket
}: LibraryViewProps) => {
  const hasStories = stories.length > 0;

  return (
    <div className="space-y-8">
      {/* Dashboard Pizzazz - Legacy Lock CTA */}
      {!userData.isGoldMember && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Award size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Unlock Legacy Mode</h3>
              <p className="text-xs opacity-90">Verify a child's bank account to get Gold features.</p>
            </div>
          </div>
          <button 
            onClick={onShowLegacyModal} 
            className="bg-white text-amber-600 px-6 py-2 rounded-full font-bold text-sm active:scale-95 hover:shadow-lg transition-all"
          >
            Activate Now
          </button>
        </div>
      )}

      {!hasStories && (
        <div className="bg-white/70 border border-indigo-100 rounded-3xl p-8 shadow-lg text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-indigo-50 text-indigo-900 px-4 py-2 rounded-full font-bold text-xs border border-indigo-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Connected. Anonymous account ready. No stories yet.
          </div>
          <h2 className="text-2xl font-black text-indigo-900">Start your first memory</h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            You’re signed in anonymously. Create a story to unlock the editor, or browse the Market to view published stories. Gold perks stay locked until you verify and upgrade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              onClick={onCreateStory} 
              className="px-5 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 active:scale-95 hover:shadow-lg transition-all"
            >
              Create my first story
            </button>
            <button 
              onClick={onBrowseMarket} 
              className="px-5 py-3 rounded-full bg-white text-indigo-700 font-bold border border-indigo-200 hover:border-indigo-400 active:scale-95 hover:shadow-lg transition-all"
            >
              Browse the Market
            </button>
          </div>
          <div className="text-xs text-slate-500">
            Tip: Library fills with your drafts, purchases, or packaged stories. Market shows published stories once available.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* New Story Card */}
        <div 
          onClick={onCreateStory} 
          className="bg-white/50 border-2 border-dashed border-indigo-200 rounded-3xl flex flex-col items-center justify-center h-56 cursor-pointer hover:bg-white hover:border-indigo-500 transition-all group"
        >
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-100">
            <Plus className="text-indigo-600"/>
          </div>
          <span className="font-bold text-indigo-900">New Story</span>
        </div>

        {/* Story Cards */}
        {stories.map(s => (
          <div 
            key={s.id} 
            onClick={() => onReadStory(s)} 
            className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all h-56 relative group cursor-pointer"
          >
            <img 
              src={s.pages[0]?.images?.[0]?.url || DEFAULT_IMAGES[0]} 
              style={{ filter: FILTERS[s.settings?.filter || 'none'].style }} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt={s.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-bold text-lg leading-tight truncate">{s.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs opacity-70">By {s.author}</span>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onEditStory(s); 
                  }} 
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 active:scale-95 hover:shadow-lg transition-all"
                >
                  <Edit3 size={14}/>
                </button>
              </div>
            </div>
            {s.isPackaged && (
              <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xl uppercase tracking-tighter">
                <Award size={12} /> Original
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
