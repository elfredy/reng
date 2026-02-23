import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    if (!firebaseConfig.apiKey) {
      throw new Error(
        "Missing Firebase config. Canlı (production) mühitdə NEXT_PUBLIC_FIREBASE_API_KEY və digər NEXT_PUBLIC_FIREBASE_* dəyişənlərini hosting panelində (Vercel/Netlify və s.) əlavə edin."
      );
    }
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getAuthInstance(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export function getAnalyticsSafe(): Analytics | null {
  if (typeof window === "undefined") return null;
  if (!analytics) {
    try {
      analytics = getAnalytics(getFirebaseApp());
    } catch {
      analytics = null;
    }
  }
  return analytics;
}
