import { Heart, Smartphone, UploadCloud } from 'lucide-react';

interface LegacyModalProps {
  onActivate: () => void;
  onClose: () => void;
}

export const LegacyModal = ({ onActivate, onClose }: LegacyModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl">
        <Heart size={48} className="text-amber-500 mx-auto mb-4" fill="currentColor" />
        <h2 className="text-2xl font-black text-center mb-2">The Legacy Lock</h2>
        <p className="text-center text-slate-500 mb-8 text-sm">
          To unlock premium design tools, connect this app to a child's future savings or bank account.
        </p>
        <div className="space-y-3 mb-8">
          <div className="p-4 bg-slate-50 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-indigo-400">
            <Smartphone className="text-indigo-600"/> 
            <div className="flex-1 text-sm font-bold">Link Savings Account API</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-indigo-400">
            <UploadCloud className="text-indigo-600"/> 
            <div className="flex-1 text-sm font-bold">Upload Photo of Bank Book</div>
          </div>
        </div>
        <button 
          onClick={onActivate} 
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-indigo-700 active:scale-95 hover:shadow-lg transition-all"
        >
          Verify & Unlock Gold
        </button>
        <button 
          onClick={onClose} 
          className="w-full mt-2 text-slate-400 text-sm font-bold active:scale-95 hover:shadow-lg transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

