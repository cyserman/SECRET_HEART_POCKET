import { Users, Plus, QrCode, Hash } from 'lucide-react';

interface Circle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  image: string;
}

interface CirclesViewProps {
  onCreateCircle?: () => void;
  onJoinCircle?: () => void;
}

export const CirclesView = ({ onCreateCircle, onJoinCircle }: CirclesViewProps) => {
  // Mock data - in production, these would come from Firebase
  const circles: Circle[] = [
    {
      id: '1',
      name: 'The Johnson Family',
      description: 'Our cozy campfire',
      memberCount: 4,
      image: '/api/placeholder/400/200', // This would be a real image URL
    },
  ];

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold text-white">Your Circles</h2>

      {/* Create/Join Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onCreateCircle}
          className="card-dark rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 transition-all border-2 border-dashed border-slate-600 hover:border-orange-500"
        >
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <Plus size={24} className="text-white" />
          </div>
          <span className="font-semibold text-white">Create Circle</span>
        </button>

        <button 
          onClick={onJoinCircle}
          className="card-dark rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 transition-all border-2 border-dashed border-slate-600 hover:border-orange-500"
        >
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <Hash size={24} className="text-white" />
          </div>
          <span className="font-semibold text-white">Join by Code</span>
        </button>
      </div>

      {/* Circles List */}
      {circles.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 text-center border border-slate-700">
          <Users size={48} className="text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No circles yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Circles let you share stories with family, friends, or students. Create your first circle to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {circles.map((circle) => (
            <div 
              key={circle.id}
              className="card-dark rounded-2xl overflow-hidden hover:-translate-y-1 transition-all cursor-pointer"
            >
              {/* Circle Banner Image */}
              <div className="h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/api/placeholder/800/200')] bg-cover bg-center opacity-30" />
              </div>
              
              {/* Circle Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">{circle.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{circle.name}</h3>
                      <p className="text-sm text-slate-400">{circle.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-300">{circle.memberCount} Members</div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-slate-700">
                  <button className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all">
                    View Stories
                  </button>
                  <button className="px-4 py-2 bg-orange-500/20 text-orange-400 font-semibold rounded-lg border border-orange-500/30 hover:bg-orange-500/30 transition-all flex items-center gap-2">
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
      <div className="glass-dark rounded-2xl p-6 border border-slate-700">
        <h3 className="font-semibold text-white mb-2">About Circles</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Circles are private groups where you can share stories with specific people. Perfect for families, 
          classrooms, or close friends. Each circle has its own unique invite code and shared story collection.
        </p>
      </div>
    </div>
  );
};

