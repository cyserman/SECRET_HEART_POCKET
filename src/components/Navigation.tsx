import { Heart, Home, Users, ShoppingBag, User, Flame, Coins } from 'lucide-react';
import { UserData } from '../types';

interface NavigationProps {
  view: string;
  userData: UserData;
  onViewChange: (view: any) => void;
  onCreateStory?: () => void;
}

export const Navigation = ({ view, userData, onViewChange, onCreateStory }: NavigationProps) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 glass-dark px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart size={24} className="text-orange-400 fill-orange-400" />
          <h1 className="text-xl font-bold text-white">
            Secret Heart
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {userData.isGoldMember && (
            <div className="flex items-center gap-1 text-amber-400">
              <Flame size={16} />
            </div>
          )}
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-orange-500/20">
            <Coins size={16} className="text-orange-400" />
            <span className="text-orange-400 font-semibold text-sm">{userData.balance}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-slate-700">
        <div className="max-w-6xl mx-auto flex justify-around items-center py-3">
          <button
            onClick={() => onViewChange('library')}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-all ${
              view === 'library' ? 'text-orange-400' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Home size={24} className={view === 'library' ? 'fill-orange-400' : ''} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          
          <button
            onClick={() => onViewChange('circles')}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-all ${
              view === 'circles' ? 'text-orange-400' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Users size={24} className={view === 'circles' ? 'fill-orange-400' : ''} />
            <span className="text-xs font-semibold">Circles</span>
          </button>
          
          <button
            onClick={() => onViewChange('market')}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-all ${
              view === 'market' ? 'text-orange-400' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <ShoppingBag size={24} className={view === 'market' ? 'fill-orange-400' : ''} />
            <span className="text-xs font-semibold">Market</span>
          </button>
          
          <button
            onClick={() => onViewChange('profile')}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-all ${
              view === 'profile' ? 'text-orange-400' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <User size={24} className={view === 'profile' ? 'fill-orange-400' : ''} />
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
        
        {/* FAB (Floating Action Button) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8">
          <button 
            onClick={onCreateStory}
            className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg shadow-orange-500/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <span className="text-white text-3xl font-light">+</span>
          </button>
        </div>
      </nav>
    </>
  );
};

