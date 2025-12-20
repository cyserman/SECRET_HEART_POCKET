import { Lock } from 'lucide-react';
import { Story } from '../types';
import { DEFAULT_IMAGES } from '../lib/constants';

interface MarketViewProps {
  marketStories: Story[];
  onPurchase: (story: Story) => void;
}

export const MarketView = ({ marketStories, onPurchase }: MarketViewProps) => {
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

