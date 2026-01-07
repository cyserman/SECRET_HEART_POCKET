import { Heart, Rocket, DollarSign } from 'lucide-react';

interface KidsImpactBannerProps {
  variant?: 'fund' | 'impact';
  fundRaised?: number;
  storiesHelping?: number;
}

export const KidsImpactBanner = ({ 
  variant = 'fund', 
  fundRaised = 4280, 
  storiesHelping = 127 
}: KidsImpactBannerProps) => {
  if (variant === 'fund') {
    return (
      <div className="glass-warm p-4 rounded-2xl flex items-center justify-between border border-ember-400/30">
        <div className="flex items-center gap-3">
          <Rocket size={20} className="text-ember-300" />
          <span className="text-sm font-semibold text-slate-200">Kids Future Fund</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-ember-400 to-ember-500 px-4 py-2 rounded-full shadow-lg shadow-ember-500/30">
          <DollarSign size={16} className="text-white" />
          <span className="text-white font-bold">${fundRaised.toLocaleString()} Raised</span>
        </div>
      </div>
    );
  }

  // Impact variant
  return (
    <div className="glass-warm rounded-2xl p-6 border border-ember-400/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ember-400 to-ember-500 flex items-center justify-center shadow-lg">
            <Heart size={24} className="text-white fill-white" />
          </div>
          <div>
            <div className="text-sm text-slate-400">Kids Impact / Future Fund</div>
            <div className="text-2xl font-black text-white">${fundRaised.toLocaleString()}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-ember-400">{storiesHelping}</div>
          <div className="text-xs text-slate-400">Stories helping</div>
        </div>
      </div>
      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-ember-400 to-ember-500 rounded-full" style={{ width: '67%' }} />
      </div>
      <div className="mt-2 text-xs text-slate-500 text-center">
        67% of creators routing earnings to children's futures
      </div>
    </div>
  );
};
