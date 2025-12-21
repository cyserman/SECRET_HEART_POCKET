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
  const demoStory = stories.find((s) => s.id === 'demo-story');

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
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-amber-500 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_rgba(255,255,255,0))]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-4 lg:col-span-2">
              <div className="inline-flex items-center gap-3 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/25">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Christine is live — steering your first fold
              </div>
              <h2 className="text-3xl font-black drop-shadow-sm">A Daddy Never Stops Loving</h2>
              <p className="text-sm text-indigo-50 max-w-2xl">
                This pocket is a present for the boys. Profits flow into their new bank accounts. Add your own memories, publish when you’re ready, or keep it private and safe.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={onCreateStory} 
                  className="px-5 py-3 rounded-full bg-white text-indigo-900 font-bold shadow-md hover:-translate-y-0.5 active:scale-95 hover:shadow-xl transition-all"
                >
                  Create my first story
                </button>
                <button 
                  onClick={onBrowseMarket} 
                  className="px-5 py-3 rounded-full bg-white/10 text-white font-bold border border-white/30 hover:border-white hover:-translate-y-0.5 active:scale-95 hover:shadow-xl transition-all"
                >
                  Browse the Market
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-indigo-50">
                <div className="bg-white/10 border border-white/15 rounded-2xl p-3">
                  <div className="font-black text-white">Step 1</div>
                  <div>Add a memory page and image.</div>
                </div>
                <div className="bg-white/10 border border-white/15 rounded-2xl p-3">
                  <div className="font-black text-white">Step 2</div>
                  <div>Preview, keep private, or publish.</div>
                </div>
                <div className="bg-white/10 border border-white/15 rounded-2xl p-3">
                  <div className="font-black text-white">Step 3</div>
                  <div>Watch profits land in the boys’ accounts.</div>
                </div>
              </div>
            </div>

            <div className="bg-white text-indigo-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-indigo-50 flex items-center justify-between">
                <div className="text-xs font-bold text-indigo-500">Featured Memory</div>
                <div className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-black uppercase">Gift</div>
              </div>
              <div className="p-6 space-y-3">
                <div className="font-black text-lg leading-tight">
                  {demoStory?.title || 'A Daddy Never Stops Loving'}
                </div>
                <div className="text-sm text-slate-600">
                  {demoStory?.pages?.[0]?.text || 'This pocket is a present for the boys—a soft place to keep the moments where we laughed the hardest and learned the most.'}
                </div>
                <div className="text-xs text-slate-500">
                  {demoStory?.pages?.[1]?.text || 'Every story we add here grows brighter. Profits from this app sail into their accounts to fuel new adventures.'}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-indigo-600">By Dad</div>
                  <button 
                    onClick={onCreateStory}
                    className="text-xs font-bold px-3 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
                  >
                    Open Editor
                  </button>
                </div>
              </div>
            </div>
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
