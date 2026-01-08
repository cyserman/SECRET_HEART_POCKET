import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, getAppId, initializeFirebase } from "./firebase";

// Canonical ID so it's the same for everyone
export const DEFAULT_STORY_ID = "default_leif_lewie_heart_pocket";

const TITLE = "My Daddy Never Sleeps";
const SUBTITLE = "Leif & Lewie — The Heart Pocket";
// const VISIBILITY = "public" as const; // Unused
const MPS = 6;

const PAGES: string[] = [
  `Once upon a time, there were two brave little explorers named Leif and Lewie. They were masters of their own backyard kingdom. They loved to laugh until their bellies hurt, build forts out of sofa cushions that reached the sky, and make funny sounds that made their daddy smile so big it almost broke his face.`,

  `Their daddy loved them more than all the stars in the midnight sky. He thought about them every morning when the sun stretched its golden arms over the horizon, and every night when the moon tucked itself into the clouds to sleep.`,

  `One day, the daddy had to go on a long trip. But even when he was far away, across hills and oceans, he kept their love right in his heart pocket—a little invisible pocket that never, ever runs out of space.`,

  `Whenever the boys laughed at a cartoon, or built a Lego tower that didn't fall down, or looked up at the bright white moon, the daddy could feel it. It felt like a warm light reaching all the way from their home, zooming through the air, and landing right in his chest.`,

  `And each and every night, Daddy would whisper: "Goodnight, my brave boys. I love you. You are my heart, my light, and my biggest adventure." Even though they couldn't always see each other, their love never stopped being treasured.`,

  `Just as the sun still shines for daddies on the other side of our planet while we sleep tight, Daddy's love is always for his sons. We're together always in our dreams again—at least until the dawn brings a new day. The End.`,
];

export async function seedDefaultHeartPocketStory() {
  // Ensure Firebase is initialized
  try {
    initializeFirebase();
  } catch (error) {
    console.warn("Firebase initialization failed, skipping seed:", error);
    return { seeded: false as const, id: DEFAULT_STORY_ID };
  }
  
  if (!db) {
    console.warn("Firestore not available, skipping seed");
    return { seeded: false as const, id: DEFAULT_STORY_ID };
  }

  const appId = getAppId();
  const storyRef = doc(db, "artifacts", appId, "public", "data", "stories", DEFAULT_STORY_ID);
  const existing = await getDoc(storyRef);
  
  if (existing.exists()) {
    console.log("Default story already exists, skipping seed");
    return { seeded: false as const, id: DEFAULT_STORY_ID };
  }

  // Root story doc (public, safe)
  // Using isPublished for compatibility with existing codebase
  await setDoc(
    storyRef,
    {
      userId: "SYSTEM",
      title: TITLE,
      author: "Dad",
      tagline: SUBTITLE,
      isPublished: true,
      isPackaged: true,
      category: "FAMILY" as const,
      price: 0,
      settings: {
        mps: MPS,
        transition: "fade",
        filter: "none",
      },
      pagesCount: PAGES.length,
      systemSeed: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  // Pages (public only) - stored in pagesPublic subcollection
  for (let i = 0; i < PAGES.length; i++) {
    const pageId = `p${i + 1}`;
    await setDoc(
      doc(db, "artifacts", appId, "public", "data", "stories", DEFAULT_STORY_ID, "pagesPublic", pageId),
      {
        id: pageId,
        index: i,
        text: PAGES[i],
        publicImageRefs: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  console.log(`✅ Seeded default story: ${TITLE} (${PAGES.length} pages)`);
  return { seeded: true as const, id: DEFAULT_STORY_ID };
}
