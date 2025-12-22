export interface Story {
  id?: string;
  title: string;
  author: string;
  tagline?: string;
  category?: 'FAMILY' | 'SCHOOL' | 'FREE' | 'EDUCATOR';
  userId?: string;
  pages: StoryPage[];
  settings: StorySettings;
  createdAt?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
  isPublished?: boolean;
  isPackaged?: boolean;
  price?: number | string;
}

export interface StoryPage {
  text: string;
  images: StoryImage[];
}

export interface StoryImage {
  url: string;
  path?: string; // Firebase Storage path for deletion/management
}

export interface StorySettings {
  mps: number; // Memories Per Story (1-10)
  mpsDefault?: number; // Default MPS value (for safe fallback)
  transition: 'fade' | 'sparkle' | 'circle' | 'funnel';
  filter: 'none' | 'dreamy' | 'vintage' | 'art' | 'sketch';
}

export interface UserData {
  balance: number;
  purchased: string[];
  isGoldMember: boolean;
  legacyVerified?: boolean;
}

export interface FilterOption {
  name: string;
  style: string;
}

export interface TransitionOption {
  name: string;
  class: string;
}

