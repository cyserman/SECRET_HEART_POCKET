import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Teleprompter from "../components/reader/Teleprompter";
import MpsControl from "../components/reader/MpsControl";
import TransitionOverlay from "../components/reader/TransitionOverlay";
import { fetchStory, fetchPages } from "../hooks/useReaderData";
import { useStory } from "../hooks/useStory";

export default function ReaderView() {
  const { id } = useParams();
  const storyId = id!;

  const storyQ = useQuery({ queryKey: ["story", storyId], queryFn: () => fetchStory(storyId) });
  const pagesQ = useQuery({ queryKey: ["pages", storyId], queryFn: () => fetchPages(storyId) });

  if (storyQ.isLoading || pagesQ.isLoading) return <div className="p-6 text-white">Loading…</div>;
  if (storyQ.isError || pagesQ.isError) return <div className="p-6 text-red-300">Error loading story.</div>;

  const story = storyQ.data as any;
  const pages = pagesQ.data as any;

  const { slides, activeSlide, activeIndex, next, prev, mps, setMps } = useStory({ story, pages });

  const transitionMode = useMemo<"ripple" | "warp" | "sparkle">(() => {
    const modes = ["sparkle", "ripple", "warp"] as const;
    return modes[activeIndex % modes.length];
  }, [activeIndex]);

  if (!activeSlide) return null;

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <div
        key={activeSlide.key}
        className={["absolute inset-0 sh-slide-enter", transitionMode === "warp" ? "sh-warp" : ""].join(" ")}
      >
        <div className="absolute inset-0">
          <img src={activeSlide.images[0]?.publicUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>

        <TransitionOverlay slideKey={activeSlide.key} type={transitionMode} />

        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
          <span className="text-sm opacity-70">{activeIndex + 1} / {slides.length}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/10">Public Preview</span>
        </div>

        <MpsControl value={mps as any} onChange={setMps as any} />
        <Teleprompter text={activeSlide.text} />
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center z-30">
        <button onClick={prev} className="p-3 text-white/70 hover:text-white" disabled={activeIndex === 0}>
          <ChevronLeft size={32} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center z-30">
        <button onClick={next} className="p-3 text-white/70 hover:text-white" disabled={activeIndex === slides.length - 1}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
