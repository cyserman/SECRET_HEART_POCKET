import { Heart, Coins, User } from "lucide-react";
import TopTabs from "./TopTabs";
import StatsScroller from "./StatsScroller";

export default function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1221]/95 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-md mx-auto md:max-w-7xl md:px-8">
        <div className="flex items-center justify-between px-4 py-4">
          <a href="/" className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-white fill-white" />
            <span className="text-2xl font-bold text-white tracking-tight font-serif">Secret Heart</span>
          </a>

          <div className="flex items-center gap-4">
            <button className="text-neutral-300 hover:text-white relative" aria-label="Coins">
              <Coins className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold text-white rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="text-neutral-300 hover:text-white" aria-label="Profile">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

        <TopTabs />
        <StatsScroller />
      </div>
    </header>
  );
}
