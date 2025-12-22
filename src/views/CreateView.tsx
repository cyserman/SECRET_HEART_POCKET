import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, db, storage, functions } from "../lib/firebase";

export default function CreateView() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleCreate() {
    if (!auth.currentUser) {
      alert("Sign in required (anonymous is fine).");
      return;
    }
    if (!file) return;

    setBusy(true);
    try {
      const storyRef = await addDoc(collection(db, "stories"), {
        title: "Untitled Story",
        tag: "Adventure",
        status: "draft",
        ownerUid: auth.currentUser.uid,
        marketVisibility: "public_obfuscated",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        mpsDefault: 1,
        pageCount: 1,
      });

      const storyId = storyRef.id;

      const originalPath = `private/stories/${storyId}/${auth.currentUser.uid}/${uuidv4()}.jpg`;
      const originalRef = ref(storage, originalPath);
      await uploadBytes(originalRef, file);

      const gen = httpsCallable(functions, "generatePublicVariant");
      const result: any = await gen({ storyId, originalPath });

      const publicUrl = result.data.publicUrl;
      const publicPath = result.data.publicPath;

      await addDoc(collection(db, "stories", storyId, "pages"), {
        index: 0,
        text: "Once upon a time…",
        publicImageRefs: [{ publicUrl, publicPath }],
        originalImageRefs: [{ storagePath: originalPath }],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Draft created!");
      window.location.href = `/story/${storyId}`;
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1221] text-white p-6">
      <h1 className="text-2xl font-serif font-bold mb-4">Create</h1>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="block mb-4" />

      <button disabled={!file || busy} onClick={handleCreate} className="bg-white text-black font-bold px-4 py-2 rounded">
        {busy ? "Uploading…" : "Create Draft"}
      </button>
    </div>
  );
}
