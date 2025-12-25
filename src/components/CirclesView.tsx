import { Plus, QrCode, Hash, Flame, Gift, Activity } from 'lucide-react';
import { useState } from 'react';

interface Circle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  image: string;
  members?: Array<{ name: string; role: 'kid' | 'parent' | 'educator'; avatar: string }>;
}

interface CirclesViewProps {
  onCreateCircle?: () => void;
  onJoinCircle?: () => void;
}

export const CirclesView = ({ onCreateCircle, onJoinCircle }: CirclesViewProps) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'gifts' | 'activity'>('stories');

  // Mock data - in production, these would come from Firebase
  const circles: Circle[] = [
    {
      id: '1',
      name: 'The Johnson Family',
      description: 'Our cozy campfire',
      memberCount: 4,
      image: '/api/placeholder/400/200',
      members: [
        { name: 'Dad', role: 'parent', avatar: 'D' },
        { name: 'Mom', role: 'parent', avatar: 'M' },
        { name: 'Leif', role: 'kid', avatar: 'L' },
        { name: 'Lewie', role: 'kid', avatar: 'L' },
      ]
    },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Campfire Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-ember-400 to-ember-500 shadow-2xl shadow-ember-500/40 mb-2">
          <Flame size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Your Circles</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Gather around the campfire and share stories with your trusted groups
        </p>
      </div>

      {/* Create/Join Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onCreateCircle}
          className="card-dark rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 transition-all border-2 border-dashed border-slate-600 hover:border-orange-500"
        >
          <div className="w-12 h-12 bg-ember-400 rounded-full flex items-center justify-center">
            <Plus size={24} className="text-white" />
          </div>
          <span className="font-semibold text-white">Create Circle</span>
        </button>

        <button 
          onClick={onJoinCircle}
          className="card-dark rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 transition-all border-2 border-dashed border-slate-600 hover:border-orange-500"
        >
          <div className="w-12 h-12 bg-ember-400 rounded-full flex items-center justify-center">
            <Hash size={24} className="text-white" />
          </div>
          <span className="font-semibold text-white">Join by Code</span>
        </button>
      </div>

      {/* Circles List */}
      {circles.length === 0 ? (
        <div className="glass-warm rounded-2xl p-12 text-center border border-white/10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-ember-400/20 to-ember-500/20 border-4 border-ember-400/30 mx-auto mb-6">
            <Flame size={48} className="text-ember-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No campfires yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Circles are like digital campfires where families gather to share stories. Create your first circle to begin!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {circles.map((circle) => (
            <div 
              key={circle.id}
              className="card-dark rounded-3xl overflow-hidden border border-slate-700 hover:border-orange-500/30 transition-all"
            >
              {/* Circle Banner with Campfire Aesthetic */}
              <div className="h-40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(251,146,60,0.15),transparent_50%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame size={64} className="text-orange-500/30" />
                </div>
                {/* Floating Embers Effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse delay-75" />
                <div className="absolute top-6 right-20 w-1 h-1 bg-orange-200 rounded-full animate-pulse delay-150" />
              </div>
              
              {/* Circle Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-ember-400 to-ember-500 rounded-full flex items-center justify-center shadow-lg shadow-ember-500/30 border-2 border-ember-300">
                      <Flame size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{circle.name}</h3>
                      <p className="text-sm text-slate-400">{circle.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{circle.memberCount}</div>
                    <div className="text-xs text-slate-500">Members</div>
                  </div>
                </div>

                {/* Member Avatars */}
                {circle.members && (
                  <div className="flex items-center gap-2">
                    {circle.members.map((member, idx) => (
                      <div 
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${
                          member.role === 'parent' 
                            ? 'bg-gradient-to-br from-ember-400 to-ember-500' 
                            : member.role === 'kid'
                            ? 'bg-gradient-to-br from-night-400 to-night-500'
                            : 'bg-gradient-to-br from-ember-300 to-ember-400'
                        }`}
                        title={`${member.name} (${member.role})`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                )}

                {/* Circle Tabs */}
                <div className="flex gap-2 border-b border-slate-700">
                  <button
                    onClick={() => setActiveTab('stories')}
                    className={`px-4 py-2 font-semibold text-sm transition-all ${
                      activeTab === 'stories'
                        ? 'text-ember-400 border-b-2 border-ember-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Stories
                  </button>
                  <button
                    onClick={() => setActiveTab('gifts')}
                    className={`px-4 py-2 font-semibold text-sm transition-all flex items-center gap-2 ${
                      activeTab === 'gifts'
                        ? 'text-ember-400 border-b-2 border-ember-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Gift size={16} />
                    Gifts
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`px-4 py-2 font-semibold text-sm transition-all flex items-center gap-2 ${
                      activeTab === 'activity'
                        ? 'text-ember-400 border-b-2 border-ember-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Activity size={16} />
                    Activity
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[100px]">
                  {activeTab === 'stories' && (
                    <div className="text-center text-slate-500 py-6">
                      <p className="text-sm">Share stories within your circle</p>
                    </div>
                  )}
                  {activeTab === 'gifts' && (
                    <div className="text-center text-slate-500 py-6">
                      <p className="text-sm">Gifted stories will appear here</p>
                    </div>
                  )}
                  {activeTab === 'activity' && (
                    <div className="text-center text-slate-500 py-6">
                      <p className="text-sm">Recent circle activity</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-slate-700">
                  <button className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 active:scale-95 transition-all">
                    View Stories
                  </button>
                  <button className="px-4 py-2 bg-ember-400/20 text-ember-400 font-semibold rounded-xl border border-ember-400/30 hover:bg-ember-400/30 active:scale-95 transition-all flex items-center gap-2 glass-warm">
                    <QrCode size={18} />
                    Invite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="glass-warm rounded-2xl p-6 border border-white/10">
        <h3 className="font-semibold text-white mb-2">About Circles</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Circles are private groups where you can share stories with specific people. Perfect for families, 
          classrooms, or close friends. Each circle has its own unique invite code and shared story collection.
        </p>
      </div>
    </div>
  );
};

