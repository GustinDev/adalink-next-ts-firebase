import dotenv from 'dotenv';
dotenv.config();
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
  apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Apps
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };

//DB Users
export async function userExist(uid) {
  //Definimos en donde buscar la referencia (users). Le decimos que busque en "db", en la colección de "users" el documento (data: uid).
  const docRef = doc(db, 'users', uid);
  //Le decimos que traiga la data-documento, le pasamos la referencia:
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  //res contiene: data (muestra solo la data), exist (devuelve true o false si existe) y get (nos trae todo).
  return docSnap.exists();
}
