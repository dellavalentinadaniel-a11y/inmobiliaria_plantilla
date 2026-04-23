import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// This is a placeholder config.
// In a real scenario, this would be populated by the set_up_firebase tool.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "env-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "env-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "env-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "env-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "env-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "env-app-id"
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

export const initFirebase = () => {
  if (!getApps().length) {
    // Try to load from a config file if it exists, otherwise use env or placeholders
    // For now, we manually handle the missing config to prevent crashes
    try {
      // In AI Studio, we usually have firebase-applet-config.json
      // But since provisioning failed, we'll guard this
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.warn("Firebase config is missing or invalid. Please set it up in the Settings.", error);
    }
  } else {
    app = getApps()[0];
  }
  
  if (app) {
    db = getFirestore(app);
    auth = getAuth(app);
  }
};

export { db, auth };
