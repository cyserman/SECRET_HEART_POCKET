import { doc, getDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchStory(storyId: string) {
  const snap = await getDoc(doc(db, "stories", storyId));
  if (!snap.exists()) throw new Error("Story not found");
  return { id: snap.id, ...snap.data() };
}

export async function fetchPages(storyId: string) {
  // Option A adjustment: Fetch from pagesPublic
  const q = query(collection(db, "stories", storyId, "pagesPublic"), orderBy("index", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
