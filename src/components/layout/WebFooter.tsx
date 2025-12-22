import { Heart } from "lucide-react";

export default function WebFooter() {
  return (
    <footer className="bg-[#080d19] border-t border-white/5 py-12 px-6 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-white fill-white" />
          <span className="font-serif font-bold text-lg">Secret Heart</span>
        </div>

        <div className="text-neutral-500 text-sm">© 2025 Secret Heart Inc. All stories secure.</div>

        <div className="flex gap-6">
          <a href="/privacy" className="text-neutral-400 hover:text-white text-sm">Privacy</a>
          <a href="/terms" className="text-neutral-400 hover:text-white text-sm">Terms</a>
          <a href="/safety" className="text-neutral-400 hover:text-white text-sm">Safety</a>
        </div>
      </div>
    </footer>
  );
}
