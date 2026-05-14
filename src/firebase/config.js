import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Read from .env (copy .env.example to .env). No hardcoded fallbacks; fail fast if config is missing.
// Read from .env, but provide hardcoded fallbacks so Vercel deployment works without extra config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAfZdULlcqPiCQPuMXPGt4DR-ysd9BIK8c",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "campus-ol.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "campus-ol",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "campus-ol.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "830631652868",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:830631652868:web:79a4b0a9f4183bb337cf51",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-05QJ3YZDT0"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export { firebase };

// Firestore offline persistence: cache data for offline browsing and sync when back online
try {
  firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: multiple tabs open.');
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('Firestore persistence failed:', err.message);
    }
  });
} catch (_) {}

// Firestore: create composite indexes in Firebase Console as needed for:
// products (category, createdAt), (status, createdAt), (location.state, location.city, createdAt)
// conversations (participants array-contains, lastMessageAt)
