import dotenv from 'dotenv';
// Toma las configuraciones.
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

//*Firestore Apps

//Auth
import { getAuth } from 'firebase/auth';
//Storage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from 'firebase/storage';
//Store
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//*Apps
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
