import { Story } from '../../types';
import { DEFAULT_IMAGES } from '../constants';

/**
 * Normalize story settings with safe defaults
 */
export const normalizeStorySettings = (settings?: any) => {
  const mps = Math.min(Math.max(settings?.mps || 10, 1), 10); // Clamp 1-10
  return {
    mps,
    mpsDefault: settings?.mpsDefault ?? mps,
    transition: settings?.transition || 'fade',
    filter: settings?.filter || 'none'
  };
};

/**
 * Normalize a story by ensuring all required fields exist with defaults
 */
export const normalizeStory = (story: Story): Story => {
  return {
    ...story,
    pages: (story.pages || []).map(page => ({ 
      ...page, 
      images: page.images && page.images.length > 0 
        ? page.images 
        : [{ url: DEFAULT_IMAGES[0] }] 
    })),
    settings: normalizeStorySettings(story.settings)
  };
};
