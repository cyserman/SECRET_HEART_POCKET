export default function StatsScroller() {
  return (
    <div className="flex items-center bg-[#1a2333] border-t border-white/5 overflow-x-auto py-2 px-4 gap-2 whitespace-nowrap [scrollbar-width:none]">
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none;}`}</style>
      <span className="text-xs text-white font-bold pr-2 border-r border-white/20">$4,280 Raised</span>
      {["Nature", "Silly Voices", "Bedtime", "Adventure"].map((t) => (
        <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white">
          {t}
        </span>
      ))}
    </div>
  );
}
