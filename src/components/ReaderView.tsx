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
  const [currentTime, setCurrentTime] = useState(0); // seconds
  const imgs = story.pages.flatMap(p => p.images || []);
  const totalDuration = (imgs.length || 1) * 5; // 5 seconds per image

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (playing && imgs.length > 1) {
      t = setInterval(() => setIdx(prev => (prev + 1) % imgs.length), 5000);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [playing, imgs.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next >= totalDuration) return 0;
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [playing, totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalDuration) * 100;

  const handlePrevious = () => {
    setIdx(prev => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIdx(prev => (prev + 1) % imgs.length);
  };

  return (
    <div className="fixed inset-0 bg-night-950 z-[100] overflow-hidden flex items-center justify-center">
      {/* Background - Dimmed for bedtime */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-night-950 via-night-900 to-night-950 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(79,78,232,0.1),transparent_70%)]" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <button 
          onClick={onBack} 
          className="w-12 h-12 glass-warm rounded-full flex items-center justify-center text-white border border-white/15 hover:bg-white/10 active:scale-95 transition-all"
        >
          <X size={24}/>
        </button>
        <div className="text-ember-300 text-sm font-semibold">BEDTIME MODE</div>
      </div>

      {/* Story Card */}
      <div className="relative max-w-md w-full mx-auto px-6">
        <div className="glass-warm rounded-3xl overflow-hidden shadow-2xl border border-white/15">
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
              <div className="bg-ember-400/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-ember-300/30">
                {playing && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                NOW PLAYING
              </div>
            </div>

            {/* Story Title & Subtitle */}
            <div className="absolute bottom-6 left-6 right-6 text-center space-y-3">
              <h2 className="text-white text-2xl font-bold mb-2">{story.title}</h2>
              <p className="text-slate-300 text-sm">{story.tagline || story.pages[idx]?.text?.substring(0, 60) || 'Slide on rings of Saturn.'}</p>
              
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-ember-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="p-6 flex items-center justify-center gap-4">
            <button 
              onClick={handlePrevious}
              disabled={imgs.length <= 1}
              className="w-12 h-12 glass-warm rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <button 
              onClick={() => setPlaying(!playing)} 
              className="w-20 h-20 bg-gradient-to-br from-ember-400 to-ember-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-ember-500/40 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-ember-300/30"
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
              className="w-12 h-12 glass-warm rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Swipe Hint */}
        <div className="mt-6 text-center">
          <div className="text-slate-400 text-sm flex items-center justify-center gap-2">
            Swipe for next story
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

