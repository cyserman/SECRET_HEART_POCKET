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
      <div className="bg-white/80 border border-indigo-100 rounded-3xl p-10 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-100">
          Marketplace is quiet
        </div>
        <h3 className="text-2xl font-black text-indigo-900">No published stories yet</h3>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Publish from the editor to see your story here, or check back later for community drops. Your library stays private until you publish.
        </p>
        <div className="flex items-center justify-center">
          <button 
            onClick={onBackToLibrary} 
            className="px-5 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 active:scale-95 hover:shadow-lg transition-all"
          >
            Go to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {marketStories.map(s => (
        <div key={s.id} className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
          <div className="h-48 bg-slate-200 relative overflow-hidden">
            <img 
              src={s.pages[0]?.images?.[0]?.url || DEFAULT_IMAGES[0]} 
              style={{ filter: "blur(15px)" }} 
              className="w-full h-full object-cover" 
              alt={s.title}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Lock size={32} className="text-white/80" />
            </div>
            <div className="absolute top-3 right-3 bg-white text-indigo-900 font-bold px-3 py-1 rounded-full shadow-lg text-xs">
              {s.price || 'Free'}
            </div>
          </div>
          <div className="p-6 text-center">
            <h3 className="font-bold text-lg text-slate-800 mb-4">{s.title}</h3>
            <button 
              onClick={() => onPurchase(s)} 
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl shadow-md hover:bg-indigo-700 active:scale-95 hover:shadow-lg transition-all"
            >
              Unlock Story
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
