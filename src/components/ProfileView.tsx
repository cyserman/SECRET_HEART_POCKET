import { Award, Lock, Mic, ThumbsUp, Book } from 'lucide-react';
import { UserData } from '../types';

interface ProfileViewProps {
  userData: UserData;
  storiesCreated: number;
  onShowLegacyModal: () => void;
}

export const ProfileView = ({ userData, storiesCreated, onShowLegacyModal }: ProfileViewProps) => {
  // Mock data - in production, these would come from user's actual data
  const helpedCount = 450; // Number of people helped/engaged
  const circlesCount = 4; // Number of circles user is part of
  const level = Math.floor(storiesCreated / 3) + 1; // Calculate level
  const storiesOwned = storiesCreated + 12; // Created + purchased

  const badges = [
    { icon: Mic, name: 'Voice Artist', unlocked: storiesCreated >= 5 },
    { icon: Book, name: 'Storyteller', unlocked: storiesCreated >= 1 },
    { icon: ThumbsUp, name: 'Helper', unlocked: helpedCount >= 100 },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Profile Header */}
      <div className="glass-dark rounded-3xl p-6 border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ember-400 to-ember-500 flex items-center justify-center text-3xl text-white font-bold shadow-xl shadow-ember-500/30 border-4 border-ember-300">
            D
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Daddy
              {userData.isGoldMember && (
                <Award size={20} className="text-amber-400 fill-amber-400" />
              )}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-sm text-ember-400 font-semibold">Level {level}</div>
              <div className="text-xs text-slate-400">• Dad's Legacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-3">
        <div className="card-dark rounded-2xl p-4 text-center border border-white/10 hover:border-ember-400/30 transition-all">
          <div className="text-3xl font-bold text-white">{storiesCreated}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Created</div>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center border border-white/10 hover:border-ember-400/30 transition-all">
          <div className="text-3xl font-bold text-white">{storiesOwned}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Owned</div>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center border border-white/10 hover:border-ember-400/30 transition-all">
          <div className="text-3xl font-bold text-white">{helpedCount}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Helped</div>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center border border-white/10 hover:border-ember-400/30 transition-all">
          <div className="text-3xl font-bold text-white">{circlesCount}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Circles</div>
        </div>
      </div>

      {/* Watch UI Preview */}
      <div className="card-dark rounded-3xl p-6 border border-slate-700">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span>🕐</span>
          Watch Stories
        </h3>
        <div className="bg-slate-900 rounded-2xl p-6 space-y-3">
          <div className="text-center">
            <div className="inline-block bg-slate-800 rounded-xl px-4 py-2 border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">Story of the Day</div>
              <div className="text-sm font-bold text-white">The Sleepy Moon</div>
              <button className="mt-2 w-10 h-10 rounded-full bg-ember-400 text-white flex items-center justify-center mx-auto shadow-lg">
                ▶
              </button>
            </div>
          </div>
          <div className="text-xs text-slate-500 text-center">
            Swipe to change • Tap to play
          </div>
        </div>
      </div>

      {/* Legacy Vault Card */}
      <div className="card-dark rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-ember-400 to-ember-500 rounded-full flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Legacy Vault
              {userData.isGoldMember && (
                <Award size={18} className="text-ember-400 fill-ember-400" />
              )}
            </h3>
            <p className="text-sm text-slate-400">
              {userData.isGoldMember 
                ? "Your stories are secured in the vault with Gold benefits."
                : "Secure your voice for the future. Unlock long-term storage and set up a Kid-First Future Fund."}
            </p>
          </div>
        </div>
        {!userData.isGoldMember && (
          <button 
            onClick={onShowLegacyModal}
            className="w-full px-6 py-3 bg-gradient-to-r from-ember-400 to-ember-500 text-white font-bold rounded-xl shadow-lg shadow-ember-500/20 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Unlock Legacy
          </button>
        )}
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Badges</h3>
        <div className="flex gap-4">
          {badges.map((badge, idx) => (
            <div 
              key={idx}
              className={`card-dark rounded-2xl p-6 flex-1 flex flex-col items-center gap-3 ${
                badge.unlocked ? '' : 'opacity-30'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                badge.unlocked 
                  ? 'bg-gradient-to-br from-ember-400 to-ember-500 border-2 border-ember-300' 
                  : 'glass-warm border-2 border-white/15'
              }`}>
                <badge.icon size={28} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{badge.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="card-dark rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Account</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 glass-warm text-slate-200 font-semibold rounded-xl text-left hover:bg-white/10 transition-all">
            Privacy Settings
          </button>
          <button className="w-full px-4 py-3 glass-warm text-slate-200 font-semibold rounded-xl text-left hover:bg-white/10 transition-all">
            Notification Preferences
          </button>
          <button className="w-full px-4 py-3 glass-warm text-slate-200 font-semibold rounded-xl text-left hover:bg-white/10 transition-all">
            Data & Storage
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-slate-500 text-xs space-y-1">
        <p>Version 1.0.0 • Built with 🧡 for Leif & Lewie</p>
        <p className="italic">Never stop exploring.</p>
      </div>
    </div>
  );
};

