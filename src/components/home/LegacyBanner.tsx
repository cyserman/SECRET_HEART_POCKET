import { Lock } from "lucide-react";

export default function LegacyBanner({ onActivate }: { onActivate: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-4 mb-8">
      <div className="relative bg-[#0f172a] border-l-4 border-white/20 rounded-r-lg p-5 shadow-lg ring-1 ring-white/10">
        <div className="absolute -left-3 top-4 bg-white text-[#0B1221] rounded-full p-1 border-2 border-[#0B1221]">
          <Lock className="w-4 h-4" />
        </div>

        <div className="pl-2">
          <h3 className="text-xl font-bold font-serif text-white mb-1">Unlock Legacy Mode</h3>
          <p className="text-sm text-neutral-300 leading-relaxed mb-4">
            Verify a child&apos;s bank account to get Gold features.
          </p>
          <div className="flex justify-center">
            <button
              onClick={onActivate}
              className="bg-gray-200 hover:bg-white text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
            >
              Activate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
