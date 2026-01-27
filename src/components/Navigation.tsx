import { Heart, Home, Users, ShoppingBag, User, Flame, Coins } from 'lucide-react';
import { UserData } from '../types';
import { CLICKABLE_LAYER } from '../lib/ui/uiSafety';
import { Avatar } from './shared/Avatar';
import { NavButton } from './shared/NavButton';

interface NavigationProps {
  view: string;
  userData: UserData;
  onViewChange: (view: any) => void;
  onCreateStory?: () => void;
  onProfileClick?: () => void;
}

export const Navigation = ({ view, userData, onViewChange, onCreateStory, onProfileClick }: NavigationProps) => {
  return (
    <>
      {/* Top Header */}
      <header className={["sticky top-0 z-[100] glass-warm px-6 py-4 flex justify-between items-center border-b border-white/10", CLICKABLE_LAYER].join(" ")}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Heart size={28} className="text-ember-400 fill-ember-400 drop-shadow-lg animate-ember" />
            <div className="absolute inset-0 blur-xl bg-ember-400/40 -z-10"></div>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight font-serif">
            Secret Heart
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {userData.isGoldMember && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-ember-400/25 to-ember-500/25 rounded-full border border-ember-300/40 backdrop-blur-sm">
              <Flame size={16} className="text-ember-300 animate-ember" />
              <span className="text-ember-300 text-xs font-bold">GOLD</span>
            </div>
          )}
          <div className="flex items-center gap-2 glass-warm px-4 py-2 rounded-full border border-white/15">
            <Coins size={16} className="text-ember-400" />
            <span className="text-ember-400 font-bold text-sm tabular-nums">{userData.balance}</span>
          </div>
          <button
            type="button"
            onClick={onProfileClick || (() => onViewChange('profile'))}
            aria-label="Open profile"
          >
            <Avatar size="sm" className="ring-2 ring-ember-400/30 ring-offset-2 ring-offset-night-950 hover:scale-110 active:scale-95 transition-all cursor-pointer">
              <User size={18} className="text-white" />
            </Avatar>
          </button>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className={["fixed bottom-0 left-0 right-0 z-[100] glass-warm border-t border-white/10", CLICKABLE_LAYER].join(" ")}>
        <div className="max-w-6xl mx-auto flex justify-around items-center py-3">
          <NavButton
            icon={<Home size={24} />}
            label="Home"
            isActive={view === 'library'}
            onClick={() => onViewChange('library')}
          />
          
          <NavButton
            icon={<Users size={24} />}
            label="Circles"
            isActive={view === 'circles'}
            onClick={() => onViewChange('circles')}
          />
          
          <NavButton
            icon={<ShoppingBag size={24} />}
            label="Market"
            isActive={view === 'market'}
            onClick={() => onViewChange('market')}
          />
          
          <NavButton
            icon={<User size={24} />}
            label="Profile"
            isActive={view === 'profile'}
            onClick={() => onViewChange('profile')}
          />
        </div>
        
        {/* FAB (Floating Action Button) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8">
          <button
            type="button"
            onClick={onCreateStory}
            className="w-16 h-16 bg-gradient-to-br from-ember-400 via-ember-500 to-ember-600 rounded-full shadow-2xl shadow-ember-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all ring-4 ring-night-950/50 hover:shadow-ember-500/60 group"
          >
            <span className="text-white text-3xl font-light group-hover:rotate-90 transition-transform duration-300">+</span>
          </button>
        </div>
      </nav>
    </>
  );
};

