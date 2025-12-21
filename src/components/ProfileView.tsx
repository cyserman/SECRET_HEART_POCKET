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

  const badges = [
    { icon: Mic, name: 'Voice Artist', unlocked: false },
    { icon: Book, name: 'Storyteller', unlocked: true },
    { icon: ThumbsUp, name: 'Helper', unlocked: true },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-dark rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{storiesCreated}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Created</div>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{helpedCount}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Helped</div>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{circlesCount}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Circles</div>
        </div>
      </div>

      {/* Legacy Vault Card */}
      <div className="card-dark rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Legacy Vault
              {userData.isGoldMember && (
                <Award size={18} className="text-orange-400 fill-orange-400" />
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
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 active:scale-95 transition-all"
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
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 border-2 border-orange-400' 
                  : 'bg-slate-700 border-2 border-slate-600'
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
          <button className="w-full px-4 py-3 bg-slate-800 text-slate-300 font-semibold rounded-xl text-left hover:bg-slate-700 transition-all">
            Privacy Settings
          </button>
          <button className="w-full px-4 py-3 bg-slate-800 text-slate-300 font-semibold rounded-xl text-left hover:bg-slate-700 transition-all">
            Notification Preferences
          </button>
          <button className="w-full px-4 py-3 bg-slate-800 text-slate-300 font-semibold rounded-xl text-left hover:bg-slate-700 transition-all">
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

