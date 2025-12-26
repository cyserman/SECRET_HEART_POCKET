import React from "react";
import { Wand2 } from "lucide-react";
import { gentlePolish } from "../lib/ui/textPolish";

export default function SpellPolishBar({
  value,
  onChange,
  label = "Polish (gentle)",
}: {
  value: string;
  onChange: (next: string) => void;
  label?: string;
}) {
  return (
    <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(gentlePolish(value))}
        className="rounded-2xl px-4 py-3 bg-white text-slate-800 font-extrabold shadow-md hover:shadow-lg active:scale-95 transition flex items-center gap-2 justify-center"
        title="Fix spacing and quotes gently (does not rewrite your voice)"
      >
        <Wand2 className="h-5 w-5" />
        {label}
      </button>
      <div className="text-xs text-slate-500">
        Uses your browser's spellcheck underline + a gentle tidy pass (no rewriting).
      </div>
    </div>
  );
}

