import { Crown, Coins } from 'lucide-react';
import { UserData } from '../types';

interface NavigationProps {
  view: 'library' | 'market';
  userData: UserData;
  onViewChange: (view: 'library' | 'market') => void;
}

export const Navigation = ({ view, userData, onViewChange }: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex justify-between items-center shadow-sm rounded-b-3xl">
      <h1 className="text-xl font-black text-indigo-900 flex items-center gap-2">
        Secret Heart {userData.isGoldMember && (
          <Crown size={20} className="text-amber-500 fill-amber-500"/>
        )}
      </h1>
      <div className="flex gap-3">
        <div className="flex bg-slate-100 p-1 rounded-full border">
          <button 
            onClick={() => onViewChange('library')} 
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 hover:shadow-lg ${
              view === 'library' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-500'
            }`}
          >
            Library
          </button>
          <button 
            onClick={() => onViewChange('market')} 
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 hover:shadow-lg ${
              view === 'market' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-500'
            }`}
          >
            Market
          </button>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full font-bold text-xs border border-amber-200">
          <Coins size={14} className="text-amber-600 fill-amber-600" />
          <span>{userData.balance}</span>
        </div>
      </div>
    </nav>
  );
};

