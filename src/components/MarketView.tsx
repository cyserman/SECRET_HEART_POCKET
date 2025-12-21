import { Lock } from 'lucide-react';
import { Story } from '../types';
import { DEFAULT_IMAGES } from '../lib/constants';

interface MarketViewProps {
  marketStories: Story[];
  onPurchase: (story: Story) => void;
  onBackToLibrary?: () => void;
}

export const MarketView = ({ marketStories, onPurchase, onBackToLibrary }: MarketViewProps) => {
  if (marketStories.length === 0) {
    return (
      <div className="glass-dark rounded-2xl p-10 text-center space-y-4 pb-24 border border-slate-700">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-xs font-bold border border-orange-500/30">
          Marketplace is quiet
        </div>
        <h3 className="text-2xl font-bold text-white">No published stories yet</h3>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Publish from the editor to see your story here, or check back later for community drops. Your library stays private until you publish.
        </p>
        <div className="flex items-center justify-center">
          <button 
            onClick={onBackToLibrary} 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Go to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
      {marketStories.map(s => (
        <div key={s.id} className="card-dark rounded-2xl overflow-hidden">
          <div className="h-48 relative overflow-hidden">
            <img 
              src={s.pages[0]?.images?.[0]?.url || DEFAULT_IMAGES[0]} 
              style={{ filter: "blur(15px)" }} 
              className="w-full h-full object-cover" 
              alt={s.title}
            />
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
              <Lock size={32} className="text-slate-300" />
            </div>
            <div className="absolute top-3 right-3 bg-orange-500 text-white font-bold px-3 py-1.5 rounded-full shadow-lg text-xs">
              {s.price || 'Free'}
            </div>
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
              ○ {s.pages?.length || 1}
            </div>
          </div>
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-lg text-white">{s.title}</h3>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs text-white font-bold">
                {s.author?.[0] || 'M'}
              </div>
              <span className="text-xs text-slate-400">{s.author}</span>
            </div>
            <button 
              onClick={() => onPurchase(s)} 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Unlock Story
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
