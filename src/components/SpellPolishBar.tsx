import { Wand2, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface SpellPolishBarProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export default function SpellPolishBar({
  value,
  onChange,
  label = "Polish Text",
  className = ""
}: SpellPolishBarProps) {
  const [isPolishing, setIsPolishing] = useState(false);

  const handlePolish = async () => {
    if (!value || value.trim().length === 0) return;

    setIsPolishing(true);

    // Simulate API call delay for "AI magic" feeling
    setTimeout(() => {
      // Simple heuristic polishing for the MVP (since we don't have a backend LLM connected yet)
      // In a real app, this would call an API endpoint
      const polished = polishText(value);
      onChange(polished);
      setIsPolishing(false);
    }, 1500);
  };

  // Simple heuristic text improver for MVP demo purposes
  const polishText = (text: string): string => {
    let result = text.trim();

    // 1. Capitalize first letter of sentences
    result = result.replace(/(?:^|[.!?]\s+)([a-z])/g, (m) => m.toUpperCase());

    // 2. Fix spacing around punctuation
    result = result.replace(/\s+([.,!?])/g, '$1');

    // 3. Ensure single space after punctuation
    result = result.replace(/([.,!?])(?=[a-zA-Z])/g, '$1 ');

    // 4. Expand common contractions (optional style choice for storybooks)
    // result = result.replace(/\bcan't\b/gi, 'cannot');

    return result;
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        onClick={handlePolish}
        disabled={isPolishing || !value.trim()}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
          ${isPolishing
            ? 'bg-amber-400/10 text-amber-400 cursor-wait'
            : !value.trim()
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 active:scale-95'
          }
        `}
      >
        {isPolishing ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            <span>Polishing...</span>
          </>
        ) : (
          <>
            <Wand2 size={12} />
            <span>{label}</span>
          </>
        )}
      </button>

      {isPolishing && (
        <div className="flex items-center gap-1 text-[10px] text-amber-400 animate-pulse">
          <Sparkles size={10} />
          <span>Adding magic dust...</span>
        </div>
      )}
    </div>
  );
}
