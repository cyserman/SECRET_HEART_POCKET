import { Heart, Smartphone, UploadCloud } from 'lucide-react';

interface LegacyModalProps {
  onActivate: () => void;
  onClose: () => void;
}

export const LegacyModal = ({ onActivate, onClose }: LegacyModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-night-950/90 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="glass-warm rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-white/15">
        <Heart size={48} className="text-ember-400 mx-auto mb-4" fill="currentColor" />
        <h2 className="text-2xl font-black text-center mb-2 text-white">The Legacy Lock</h2>
        <p className="text-center text-slate-300 mb-8 text-sm">
          To unlock premium design tools, connect this app to a child's future savings or bank account.
        </p>
        <div className="space-y-3 mb-8">
          <div className="p-4 glass-warm rounded-2xl border border-white/15 flex items-center gap-4 cursor-pointer hover:border-ember-400/50 transition-all">
            <Smartphone className="text-ember-400"/> 
            <div className="flex-1 text-sm font-bold text-slate-200">Link Savings Account API</div>
          </div>
          <div className="p-4 glass-warm rounded-2xl border border-white/15 flex items-center gap-4 cursor-pointer hover:border-ember-400/50 transition-all">
            <UploadCloud className="text-ember-400"/> 
            <div className="flex-1 text-sm font-bold text-slate-200">Upload Photo of Bank Book</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onActivate} 
          className="w-full bg-gradient-to-r from-ember-400 to-ember-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-ember-500/30 hover:shadow-xl active:scale-95 transition-all"
        >
          Verify & Unlock Gold
        </button>
        <button
          type="button"
          onClick={onClose} 
          className="w-full mt-2 text-slate-400 text-sm font-bold active:scale-95 hover:text-slate-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

