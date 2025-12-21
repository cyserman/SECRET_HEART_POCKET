import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface CreateStoryModalProps {
  onClose: () => void;
  onCreate: (data: { title: string; tagline: string; storyType: number; aiAssist: boolean }) => void;
}

export const CreateStoryModal = ({ onClose, onCreate }: CreateStoryModalProps) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [storyType, setStoryType] = useState(5); // 1-10 scale
  const [aiAssist, setAiAssist] = useState(false);
  const [step] = useState(1); // Track progress

  const handleNext = () => {
    if (!title.trim()) {
      alert('Please enter a story title');
      return;
    }
    onCreate({ title, tagline, storyType, aiAssist });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-orange-400">Create Story</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Story Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Story Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Magical Treehouse"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border-2 border-slate-600 focus:border-orange-500 focus:outline-none transition-colors placeholder:text-slate-500"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="A short & sweet adventure"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border-2 border-slate-600 focus:border-orange-500 focus:outline-none transition-colors placeholder:text-slate-500"
            />
          </div>

          {/* Story Type Slider */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Story Type</label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={storyType}
                onChange={(e) => setStoryType(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Short & Sweet</span>
                <span>Epic Journey</span>
              </div>
            </div>
          </div>

          {/* AI Story Assistant */}
          <div className="bg-slate-700/50 rounded-xl p-4 flex items-center justify-between border border-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Sparkles size={20} className="text-purple-400" />
              </div>
              <span className="font-semibold text-slate-200">AI Story Assistant</span>
            </div>
            <button
              onClick={() => setAiAssist(!aiAssist)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                aiAssist ? 'bg-orange-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  aiAssist ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pt-2">
            <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-orange-500' : 'bg-slate-600'}`} />
            <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-orange-500' : 'bg-slate-600'}`} />
            <div className={`w-2 h-2 rounded-full ${step === 3 ? 'bg-orange-500' : 'bg-slate-600'}`} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900/50 flex justify-end">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Next: Content
          </button>
        </div>
      </div>
    </div>
  );
};

