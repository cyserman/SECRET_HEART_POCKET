import { Lock, Heart, Gift, Sparkles } from 'lucide-react';
import { Story } from '../types';
import { DEFAULT_IMAGES } from '../lib/constants';
import { useState } from 'react';
import { KidsImpactBanner } from './shared/KidsImpactBanner';
import { Avatar } from './shared/Avatar';
import { Badge } from './shared/Badge';
import { Button } from './shared/Button';

interface MarketViewProps {
  marketStories: Story[];
  onPurchase: (story: Story) => void;
  onBackToLibrary?: () => void;
}

export const MarketView = ({ marketStories, onPurchase, onBackToLibrary }: MarketViewProps) => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  // Mock Kids Impact data
  const kidsImpactTotal = 12450; // Total credits routed to children
  const storiesHelping = 127; // Number of stories contributing

  if (marketStories.length === 0) {
    return (
      <div className="space-y-6 pb-24">
        {/* Kids Impact Banner */}
        <KidsImpactBanner variant="impact" fundRaised={kidsImpactTotal} storiesHelping={storiesHelping} />

        <div className="glass-warm rounded-2xl p-10 text-center space-y-4 border border-white/10">
          <div className="inline-flex items-center gap-2 bg-ember-400/20 text-ember-400 px-4 py-2 rounded-full text-xs font-bold border border-ember-400/30">
            Marketplace is quiet
          </div>
          <h3 className="text-2xl font-bold text-white">No published stories yet</h3>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Publish from the editor to see your story here, or check back later for community drops. Your library stays private until you publish.
          </p>
          <div className="flex items-center justify-center">
            <button 
              onClick={onBackToLibrary} 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-ember-400 to-ember-500 text-white font-bold shadow-lg shadow-ember-500/30 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Go to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Kids Impact Banner */}
      <KidsImpactBanner variant="impact" fundRaised={kidsImpactTotal} storiesHelping={storiesHelping} />

      {/* Category Carousels */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-ember-400" />
            Top Gifted
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {marketStories.slice(0, 4).map(s => (
              <MarketStoryCard 
                key={s.id} 
                story={s} 
                onPurchase={onPurchase}
                onGift={(story) => {
                  setSelectedStory(story);
                  setShowGiftModal(true);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Bedtime Stories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {marketStories.slice(0, 4).map(s => (
              <MarketStoryCard 
                key={`bedtime-${s.id}`} 
                story={s} 
                onPurchase={onPurchase}
                onGift={(story) => {
                  setSelectedStory(story);
                  setShowGiftModal(true);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Dad's Messages</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {marketStories.map(s => (
              <MarketStoryCard 
                key={`dads-${s.id}`} 
                story={s} 
                onPurchase={onPurchase}
                onGift={(story) => {
                  setSelectedStory(story);
                  setShowGiftModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gift Modal */}
      {showGiftModal && selectedStory && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-sm">
          <div className="w-full max-w-md glass-warm rounded-3xl shadow-2xl border border-white/15 overflow-hidden">
            <div className="p-6 border-b border-white/10 glass-warm">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Gift size={24} className="text-ember-400" />
                Gift This Story
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-300">
                Send "{selectedStory.title}" as a gift. Credits will flow to their collection and support the Kids Future Fund.
              </p>
              <Button 
                onClick={() => {
                  onPurchase(selectedStory);
                  setShowGiftModal(false);
                }} 
                className="w-full"
              >
                Send Gift
              </Button>
              <button 
                onClick={() => setShowGiftModal(false)}
                className="w-full px-6 py-3 glass-warm text-slate-300 font-semibold rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Market Story Card Component
interface MarketStoryCardProps {
  story: Story;
  onPurchase: (story: Story) => void;
  onGift: (story: Story) => void;
}

const MarketStoryCard = ({ story, onPurchase, onGift }: MarketStoryCardProps) => (
  <div className="card-dark rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20 transition-all">
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
      <img 
        src={story.pages[0]?.images?.[0]?.url || DEFAULT_IMAGES[0]} 
        style={{ filter: "blur(15px)" }} 
        className="w-full h-full object-cover" 
        alt={story.title}
      />
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
        <Lock size={32} className="text-slate-400" />
      </div>
      
      {/* Price Badge */}
      <div className="absolute top-2 right-2">
        <Badge variant="price">{story.price ? `${story.price}¢` : 'Free'}</Badge>
      </div>
      
      {/* Memory Count */}
      <div className="absolute top-2 left-2">
        <Badge variant="memory">○ {story.pages?.length || 1}</Badge>
      </div>
      
      {/* Category Badge */}
      <div className="absolute bottom-2 left-2">
        <Badge variant="category">{story.category || 'FAMILY'}</Badge>
      </div>
    </div>
    
    <div className="p-3 space-y-3">
      <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">{story.title}</h3>
      <div className="flex items-center gap-2">
        <Avatar size="xs">{story.author?.[0] || 'M'}</Avatar>
        <span className="text-xs text-slate-300">By {story.author}</span>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onPurchase(story)} size="sm" className="flex-1">
          Unlock
        </Button>
        <button 
          onClick={() => onGift(story)}
          className="px-3 py-2 glass-warm text-ember-400 rounded-xl border border-ember-400/30 hover:bg-ember-400/20 active:scale-95 transition-all"
        >
          <Gift size={16} />
        </button>
      </div>
    </div>
  </div>
);
