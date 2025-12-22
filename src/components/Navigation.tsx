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
        <div className="flex items-center gap-3">
          <div className="relative">
            <Heart size={28} className="text-orange-500 fill-orange-500 drop-shadow-lg animate-glow" />
            <div className="absolute inset-0 blur-xl bg-orange-500/50 -z-10"></div>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Secret Heart
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {userData.isGoldMember && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full border border-amber-400/30">
              <Flame size={16} className="text-amber-400 animate-glow" />
              <span className="text-amber-400 text-xs font-bold">GOLD</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-4 py-2 rounded-full border border-orange-500/20 backdrop-blur-sm">
            <Coins size={16} className="text-orange-400" />
            <span className="text-orange-400 font-bold text-sm tabular-nums">{userData.balance}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center ring-2 ring-orange-500/20 ring-offset-2 ring-offset-slate-900">
            <User size={18} className="text-white" />
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/5">
        <div className="max-w-6xl mx-auto flex justify-around items-center py-3">
          <button
            onClick={() => onViewChange('library')}
            className={`flex flex-col items-center gap-1.5 px-6 py-2 transition-all relative ${
              view === 'library' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {view === 'library' && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            )}
            <Home size={24} className={view === 'library' ? 'fill-orange-500 drop-shadow-lg' : ''} />
            <span className="text-[11px] font-semibold tracking-wide">Home</span>
          </button>
          
          <button
            onClick={() => onViewChange('circles')}
            className={`flex flex-col items-center gap-1.5 px-6 py-2 transition-all relative ${
              view === 'circles' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {view === 'circles' && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            )}
            <Users size={24} className={view === 'circles' ? 'fill-orange-500 drop-shadow-lg' : ''} />
            <span className="text-[11px] font-semibold tracking-wide">Circles</span>
          </button>
          
          <button
            onClick={() => onViewChange('market')}
            className={`flex flex-col items-center gap-1.5 px-6 py-2 transition-all relative ${
              view === 'market' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {view === 'market' && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            )}
            <ShoppingBag size={24} className={view === 'market' ? 'fill-orange-500 drop-shadow-lg' : ''} />
            <span className="text-[11px] font-semibold tracking-wide">Market</span>
          </button>
          
          <button
            onClick={() => onViewChange('profile')}
            className={`flex flex-col items-center gap-1.5 px-6 py-2 transition-all relative ${
              view === 'profile' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {view === 'profile' && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            )}
            <User size={24} className={view === 'profile' ? 'fill-orange-500 drop-shadow-lg' : ''} />
            <span className="text-[11px] font-semibold tracking-wide">Profile</span>
          </button>
        </div>
        
        {/* FAB (Floating Action Button) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8">
          <button 
            onClick={onCreateStory}
            className="w-16 h-16 bg-gradient-to-br from-orange-500 via-orange-600 to-pink-600 rounded-full shadow-2xl shadow-orange-500/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all ring-4 ring-slate-900/50 hover:shadow-orange-500/70 group"
          >
            <span className="text-white text-3xl font-light group-hover:rotate-90 transition-transform duration-300">+</span>
          </button>
        </div>
      </nav>
    </>
  );
};

