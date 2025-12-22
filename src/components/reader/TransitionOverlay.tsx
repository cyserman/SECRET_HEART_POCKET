import { useMemo } from "react";

type TransitionType = "ripple" | "warp" | "sparkle";

function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function TransitionOverlay({ slideKey, type }: { slideKey: string; type: TransitionType }) {
  const sparkles = useMemo(() => {
    const base = slideKey.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return Array.from({ length: 12 }).map((_, i) => {
      const r1 = rand(base + i * 13);
      const r2 = rand(base + i * 29);
      const r3 = rand(base + i * 41);
      return { left: `${10 + r1 * 80}%`, top: `${15 + r2 * 70}%`, delay: `${r3 * 120}ms` };
    });
  }, [slideKey]);

  if (type === "ripple") return <div key={slideKey} className="sh-ripple" />;

  if (type === "sparkle") {
    return (
      <div key={slideKey} className="sh-sparkle">
        {sparkles.map((s, idx) => (
          <span key={idx} className="sh-sparkle-dot" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
        ))}
      </div>
    );
  }

  return null;
}
