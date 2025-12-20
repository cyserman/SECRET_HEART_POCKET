import { FilterOption, TransitionOption } from '../types';

export const FILTERS: Record<string, FilterOption> = {
  none: { name: "Original", style: "" },
  dreamy: { name: "Dreamy Blur", style: "blur(5px) brightness(1.1)" }, 
  vintage: { name: "Vintage", style: "sepia(0.8) contrast(1.1)" },
  art: { name: "Oil Paint", style: "saturate(2) blur(1px) contrast(1.1)" },
  sketch: { name: "Sketch", style: "grayscale(1) contrast(2)" }
};

export const TRANSITIONS: Record<string, TransitionOption> = {
  fade: { name: "Fade", class: "transition-opacity duration-1000" },
  sparkle: { name: "Sparkle", class: "animate-pulse" },
  circle: { name: "Ripple", class: "transition-circle" },
  funnel: { name: "Warp", class: "transition-funnel" }
};

export const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1519331379826-f9478550c187?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532598687258-a83cb3f10928?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
];

