import type { Mps } from "../../hooks/useStory";

const steps: Mps[] = [1, 5, 10];

export default function MpsControl({ value, onChange }: { value: Mps; onChange: (v: Mps) => void }) {
  return (
    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-xl px-3 py-2 ring-1 ring-white/10">
        <span className="text-xs text-white/70">Memories</span>
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={[
              "text-xs font-bold px-3 py-1 rounded-full transition",
              value === s ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20",
            ].join(" ")}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
