import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

export function bootstrapAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe();
        resolve(user);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous auth failed", error);
          resolve(null);
        });
      }
    });
  });
}
