import { useState } from 'react';
import { X, Sparkles, Image, Mic, Globe } from 'lucide-react';

interface CreateStoryModalProps {
  onClose: () => void;
  onCreate: (data: { 
    title: string; 
    tagline: string; 
    storyType: number; 
    aiAssist: boolean;
    category: string;
    price: number;
    visibility: 'circle' | 'marketplace';
  }) => void;
}

export const CreateStoryModal = ({ onClose, onCreate }: CreateStoryModalProps) => {
  const [step, setStep] = useState(1); // 1=Details, 2=Content, 3=Publish
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [storyType, setStoryType] = useState(5); // 1-10 scale
  const [aiAssist, setAiAssist] = useState(false);
  const [category] = useState('FAMILY');
  const [price, setPrice] = useState(0);
  const [visibility, setVisibility] = useState<'circle' | 'marketplace'>('circle');

  const handleNext = () => {
    if (step === 1) {
      if (!title.trim()) {
        alert('Please enter a story title');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      onCreate({ title, tagline, storyType, aiAssist, category, price, visibility });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-sm">
      <div className="w-full max-w-md glass-warm rounded-3xl shadow-2xl border border-white/15 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 glass-warm">
          <div>
            <h2 className="text-2xl font-bold text-ember-400">Create Story</h2>
            <p className="text-xs text-slate-400 mt-1">
              {step === 1 && 'Tell us about your story'}
              {step === 2 && 'Add your content'}
              {step === 3 && 'Publish & share'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full glass-warm hover:bg-white/10 flex items-center justify-center text-slate-300 transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* STEP 1: DETAILS */}
          {step === 1 && (
            <>
              {/* Story Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Story Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Magical Treehouse"
                  className="w-full px-4 py-3 glass-warm text-white rounded-xl border-2 border-white/15 focus:border-ember-400 focus:outline-none transition-colors placeholder:text-slate-400"
                  autoFocus
                />
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Tagline <span className="text-slate-400">(optional)</span></label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="A short & sweet adventure"
                  className="w-full px-4 py-3 glass-warm text-white rounded-xl border-2 border-white/15 focus:border-ember-400 focus:outline-none transition-colors placeholder:text-slate-400"
                />
              </div>

              {/* Story Length Slider */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300">Story Length</label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={storyType}
                    onChange={(e) => setStoryType(Number(e.target.value))}
                    className="w-full accent-ember-400"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Short & Sweet</span>
                    <span>Epic Journey</span>
                  </div>
                </div>
              </div>

              {/* AI Story Assistant */}
              <div className="glass-warm rounded-xl p-4 flex items-center justify-between border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Sparkles size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 text-sm">AI Story Assistant</div>
                    <div className="text-xs text-slate-400">Help write your story</div>
                  </div>
                </div>
                <button
                  onClick={() => setAiAssist(!aiAssist)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    aiAssist ? 'bg-ember-400' : 'glass-warm border border-white/15'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${
                      aiAssist ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </>
          )}

          {/* STEP 2: CONTENT */}
          {step === 2 && (
            <>
              <div className="text-center space-y-3 py-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-ember-400/20 to-ember-500/20 border-2 border-dashed border-ember-400/30 flex items-center justify-center">
                    <Image size={32} className="text-ember-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Choose Cover Template</h3>
                  <p className="text-xs text-slate-400">Or upload your own artwork</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['Night Sky', 'Fort Builder', 'Sunrise'].map((template) => (
                  <button
                    key={template}
                    className="aspect-square rounded-xl glass-warm hover:bg-white/10 border-2 border-transparent hover:border-ember-400 transition-all active:scale-95 flex items-center justify-center text-xs font-semibold text-slate-200"
                  >
                    {template}
                  </button>
                ))}
              </div>

              <div className="glass-warm rounded-xl p-4 border border-white/15 text-center">
                <Mic size={24} className="text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300 font-semibold">Record Audio</p>
                <p className="text-xs text-slate-400 mt-1">Add your voice narration</p>
              </div>
            </>
          )}

          {/* STEP 3: PUBLISH */}
          {step === 3 && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Price (in credits)</label>
                <div className="flex gap-2">
                  {[0, 1, 2].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrice(p)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        price === p
                          ? 'bg-ember-400 text-white shadow-lg shadow-ember-500/30'
                          : 'glass-warm text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      {p === 0 ? 'Free' : `${p} credit${p > 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Share with</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVisibility('circle')}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                      visibility === 'circle'
                        ? 'bg-ember-400 text-white'
                        : 'glass-warm text-slate-200'
                    }`}
                  >
                    Circle Only
                  </button>
                  <button
                    onClick={() => setVisibility('marketplace')}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      visibility === 'marketplace'
                        ? 'bg-ember-400 text-white'
                        : 'glass-warm text-slate-200'
                    }`}
                  >
                    <Globe size={16} />
                    Marketplace
                  </button>
                </div>
              </div>

              <div className="bg-ember-400/10 rounded-xl p-4 border border-ember-400/30 glass-warm">
                <p className="text-xs text-ember-300 leading-relaxed">
                  ✨ All earnings from this story will be routed to verified child accounts. Real-world withdrawals require Legacy Lock verification.
                </p>
              </div>
            </>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pt-2">
            <div className={`w-2 h-2 rounded-full transition-all ${step === 1 ? 'bg-ember-400 w-6' : 'bg-white/20'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step === 2 ? 'bg-ember-400 w-6' : 'bg-white/20'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step === 3 ? 'bg-ember-400 w-6' : 'bg-white/20'}`} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 glass-warm border-t border-white/10 flex justify-between gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 glass-warm text-slate-200 font-semibold rounded-xl hover:bg-white/10 active:scale-95 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-8 py-3 bg-gradient-to-r from-ember-400 to-ember-500 text-white font-bold rounded-xl shadow-lg shadow-ember-500/30 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            {step === 3 ? 'Publish Story' : `Next: ${step === 1 ? 'Content' : 'Publish'}`}
          </button>
        </div>
      </div>
    </div>
  );
};

