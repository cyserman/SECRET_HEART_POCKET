import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 bg-black z-[100] overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-slate-900">
        <img 
          src={imgs[idx]?.url || DEFAULT_IMAGES[0]} 
          className="w-full h-full object-cover transition-opacity duration-1000" 
          alt="Story background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="relative h-full flex flex-col p-6 pointer-events-none">
        <button 
          onClick={onBack} 
          className="pointer-events-auto w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md self-start active:scale-95 hover:shadow-lg transition-all"
        >
          <ArrowLeft size={20}/>
        </button>
        <div className="flex-1" />
        <div className="max-w-3xl mx-auto w-full pointer-events-auto bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl mb-12">
          <div className="h-32 overflow-hidden relative">
            <p className="text-white text-2xl font-serif leading-relaxed text-center animate-scroll-text">
              {story.pages.map(p => p.text).join(" • ")}
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setPlaying(!playing)} 
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-900 shadow-2xl active:scale-95 hover:shadow-lg transition-all"
            >
              {playing ? (
                <Pause size={40} fill="currentColor" />
              ) : (
                <Play size={40} fill="currentColor" className="ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scrollText { 
          0% { transform: translateY(100%); } 
          100% { transform: translateY(-100%); } 
        }
        .animate-scroll-text { 
          animation: scrollText 40s linear infinite; 
        }
      `}</style>
    </div>
  );
};

