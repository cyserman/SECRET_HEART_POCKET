import { useEffect, useRef } from "react";

export default function Teleprompter({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollTop = 0;
    const words = text.split(" ").length;
    const duration = Math.min(Math.max(words * 120, 4000), 14000);

    el.style.scrollBehavior = "auto";
    requestAnimationFrame(() => {
      el.style.scrollBehavior = "smooth";
      el.scrollTop = el.scrollHeight;
    });

    const timer = setTimeout(() => {}, duration);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl">
      <div ref={ref} className="max-h-48 overflow-hidden rounded-xl bg-black/50 backdrop-blur-xl px-6 py-4 text-lg leading-relaxed">
        {text}
      </div>
    </div>
  );
}
