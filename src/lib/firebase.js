// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "joke-or-stroke.firebaseapp.com",
  projectId: "joke-or-stroke",
  storageBucket: "joke-or-stroke.appspot.com",
  messagingSenderId: "815639401614",
  appId: "1:815639401614:web:1366143addfccdf84aa5df",
  measurementId: "G-JH0Y7B6QQB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
