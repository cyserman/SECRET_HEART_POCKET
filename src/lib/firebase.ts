/// <reference types="vite/client" />
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration will be provided at runtime via global variables
// These are injected by the hosting environment (matching Gold Master pattern)
declare global {
  interface Window {
    __firebase_config?: string;
    __app_id?: string;
    __initial_auth_token?: string;
  }
  // Support direct global variables (Gold Master pattern)
  const __firebase_config: string | undefined;
  const __app_id: string | undefined;
  const __initial_auth_token: string | undefined;
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export const initializeFirebase = () => {
  if (app) return { app, auth: auth!, db: db!, storage: storage! };

  // Get config from global variables (Gold Master pattern) or environment
  let configStr: string;
  try {
    // Try global variable first (Gold Master pattern)
    configStr = typeof __firebase_config !== 'undefined' 
      ? __firebase_config 
      : (typeof window !== 'undefined' && window.__firebase_config)
        ? window.__firebase_config
        : import.meta.env.VITE_FIREBASE_CONFIG || '';
  } catch {
    // Fallback to environment variable
    configStr = import.meta.env.VITE_FIREBASE_CONFIG || '';
  }
  
  // Validate config exists and is not empty
  if (!configStr || configStr === '{}' || configStr.trim() === '') {
    console.error('Firebase config not found! Please set VITE_FIREBASE_CONFIG in Vercel environment variables.');
    throw new Error('Firebase configuration not found. Please set VITE_FIREBASE_CONFIG environment variable.');
  }

  let firebaseConfig;
  try {
    firebaseConfig = JSON.parse(configStr);
  } catch (e) {
    console.error('Invalid Firebase config JSON:', e);
    throw new Error('Invalid Firebase configuration format. Must be valid JSON.');
  }

  // Validate required fields
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('Firebase config missing required fields:', firebaseConfig);
    throw new Error('Firebase configuration missing required fields (apiKey, projectId).');
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  return { app, auth, db, storage };
};

export const getAppId = (): string => {
  try {
    if (typeof __app_id !== 'undefined') return __app_id;
  } catch {}
  
  if (typeof window !== 'undefined' && window.__app_id) {
    return window.__app_id;
  }
  return import.meta.env.VITE_APP_ID || 'default-app-id';
};

export const getInitialAuthToken = (): string | undefined => {
  try {
    if (typeof __initial_auth_token !== 'undefined') return __initial_auth_token;
  } catch {}
  
  if (typeof window !== 'undefined' && window.__initial_auth_token) {
    return window.__initial_auth_token;
  }
  return import.meta.env.VITE_INITIAL_AUTH_TOKEN;
};

export { auth, db, storage };

