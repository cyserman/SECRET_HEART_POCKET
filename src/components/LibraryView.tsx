import { Award, Rocket, DollarSign } from 'lucide-react';
import { Story, UserData } from '../types';
import { FILTERS } from '../lib/constants';
import { DEFAULT_IMAGES } from '../lib/constants';
import { useState } from 'react';

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
  const [activeCategory, setActiveCategory] = useState('Featured');
  
  const categories = ['Featured', "Dad's Wisdom", 'Science & Nature', 'Silly Voices'];
  const kidsFundRaised = 4280; // This would come from user data in production

  return (
    <div className="space-y-6 pb-24">
      {/* Kids Future Fund Banner */}
      <div className="glass-dark p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket size={20} className="text-orange-400" />
          <span className="text-sm font-semibold text-slate-300">Kids Future Fund</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-full">
          <DollarSign size={16} className="text-white" />
          <span className="text-white font-bold">{kidsFundRaised.toLocaleString()} Raised</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Legacy Lock CTA */}
      {!userData.isGoldMember && (
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Award size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Unlock Legacy Mode</h3>
              <p className="text-sm opacity-90">Verify a child's bank account to get Gold features.</p>
            </div>
          </div>
          <button 
            onClick={onShowLegacyModal} 
            className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold text-sm active:scale-95 hover:shadow-xl transition-all shadow-lg"
          >
            Activate Now
          </button>
        </div>
      )}

      {!hasStories && (
        <div className="glass-dark rounded-2xl p-8 relative overflow-hidden border border-slate-700">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10" />
          <div className="relative space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-3 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-xs font-bold border border-orange-500/30">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                Your story library awaits
              </div>
              <h2 className="text-3xl font-black text-white">Start Creating Memories</h2>
              <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                Capture your family's precious moments. Share stories with loved ones or keep them private in your secret heart pocket.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={onCreateStory} 
                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 active:scale-95 hover:shadow-xl transition-all"
              >
                Create Your First Story
              </button>
              <button 
                onClick={onBrowseMarket} 
                className="px-6 py-3 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700 hover:border-slate-600 hover:-translate-y-0.5 active:scale-95 hover:shadow-xl transition-all"
              >
                Browse the Market
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {/* Story Cards - Illustrated Style */}
        {stories.map(s => (
          <div 
            key={s.id} 
            className="card-dark rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20 transition-all cursor-pointer group"
          >
            {/* Card Image */}
            <div 
              onClick={() => onReadStory(s)}
              className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900"
            >
              <img 
                src={s.pages[0]?.images?.[0]?.url || DEFAULT_IMAGES[0]} 
                style={{ filter: FILTERS[s.settings?.filter || 'none'].style }} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={s.title}
              />
              
              {/* Memory Count Badge - Top Right */}
              <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-slate-700">
                ○ {s.pages?.length || 1}
              </div>
              
              {/* Category Badge - Top Left */}
              <div className="absolute top-2 left-2">
                <div className="bg-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                  {s.category || 'FAMILY'}
                </div>
              </div>
            </div>
            
            {/* Card Footer */}
            <div className="p-3 space-y-2">
              <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">
                {s.title}
              </h3>
              <p className="text-slate-400 text-xs line-clamp-1">
                {s.pages[0]?.text?.substring(0, 40) || 'A magical adventure'}...
              </p>
              
              {/* Author & Actions */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[10px] text-white font-bold">
                    {s.author?.[0] || 'D'}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{s.author || 'Dad'}</span>
                </div>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onEditStory(s); 
                  }} 
                  className="p-1.5 bg-slate-800 rounded-full hover:bg-orange-500 hover:text-white active:scale-95 transition-all text-orange-400 border border-orange-500/30"
                >
                  <DollarSign size={12}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
