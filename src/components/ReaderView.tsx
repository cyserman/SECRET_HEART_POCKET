import { useState, useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, ChevronDown } from 'lucide-react';
import { Story } from '../types';
import { DEFAULT_IMAGES } from '../lib/constants';

interface ReaderViewProps {
  story: Story;
  onBack: () => void;
}

export const ReaderView = ({ story, onBack }: ReaderViewProps) => {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const imgs = story.pages.flatMap(p => p.images || []);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (playing && imgs.length > 1) {
      t = setInterval(() => setIdx(prev => (prev + 1) % imgs.length), 5000);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [playing, imgs.length]);

  const handlePrevious = () => {
    setIdx(prev => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIdx(prev => (prev + 1) % imgs.length);
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <button 
          onClick={onBack} 
          className="w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all"
        >
          <X size={24}/>
        </button>
        <div className="text-slate-400 text-sm font-semibold">WATCH MODE</div>
      </div>

      {/* Story Card */}
      <div className="relative max-w-md w-full mx-auto px-6">
        <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
          {/* Story Image */}
          <div className="relative h-96">
            <img 
              src={imgs[idx]?.url || DEFAULT_IMAGES[0]} 
              className="w-full h-full object-cover transition-all duration-700" 
              alt="Story"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            
            {/* NOW PLAYING Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <div className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                {playing && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                NOW PLAYING
              </div>
            </div>

            {/* Story Title & Subtitle */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <h2 className="text-white text-2xl font-bold mb-2">{story.title}</h2>
              <p className="text-slate-300 text-sm">{story.pages[idx]?.text?.substring(0, 60) || 'Slide on rings of Saturn.'}</p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="p-6 flex items-center justify-center gap-4">
            <button 
              onClick={handlePrevious}
              disabled={imgs.length <= 1}
              className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <button 
              onClick={() => setPlaying(!playing)} 
              className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/50 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              {playing ? (
                <Pause size={32} fill="currentColor" />
              ) : (
                <Play size={32} fill="currentColor" className="ml-1" />
              )}
            </button>
            
            <button 
              onClick={handleNext}
              disabled={imgs.length <= 1}
              className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Swipe Hint */}
        <div className="mt-6 text-center">
          <div className="text-slate-500 text-sm flex items-center justify-center gap-2">
            Swipe for next story
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

