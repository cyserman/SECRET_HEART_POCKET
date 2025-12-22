import { useMemo, useState } from "react";

export type Mps = 1 | 5 | 10;

export type ImageRef = {
  publicUrl: string;
  publicPath?: string;
  width?: number;
  height?: number;
  blurHash?: string;
};

export type StoryPage = {
  id: string;
  index: number;
  text: string;
  publicImageRefs: ImageRef[];
  originalImageRefs?: { storagePath: string }[];
};

export type StoryDoc = {
  id: string;
  title: string;
  ownerUid: string;
  circleId?: string | null;
  marketVisibility: "public_obfuscated" | "private";
  status: "draft" | "published";
  mpsDefault: Mps;
};

export type ReaderSlide = {
  key: string;
  pageId: string;
  pageIndex: number;
  text: string;
  images: ImageRef[];
};

function clampMps(mps: number): Mps {
  if (mps <= 1) return 1;
  if (mps <= 5) return 5;
  return 10;
}

export function useStory(params: { story?: StoryDoc | null; pages?: StoryPage[] | null }) {
  const { story, pages } = params;
  const [mps, setMpsState] = useState<Mps>(story?.mpsDefault ?? 1);

  const sortedPages = useMemo(() => (pages ?? []).slice().sort((a, b) => a.index - b.index), [pages]);

  const slides: ReaderSlide[] = useMemo(() => {
    const m = clampMps(mps);
    return sortedPages.map((p) => ({
      key: `page:${p.id}:mps:${m}`,
      pageId: p.id,
      pageIndex: p.index,
      text: p.text,
      images: (p.publicImageRefs ?? []).slice(0, m),
    }));
  }, [sortedPages, mps]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? null;

  function next() { setActiveIndex((i) => Math.min(i + 1, Math.max(0, slides.length - 1))); }
  function prev() { setActiveIndex((i) => Math.max(i - 1, 0)); }
  function jumpTo(i: number) { setActiveIndex(() => Math.max(0, Math.min(i, slides.length - 1))); }

  return {
    mps,
    setMps: (v: number) => setMpsState(clampMps(v)),
    slides,
    activeIndex,
    activeSlide,
    next,
    prev,
    jumpTo,
  };
}
