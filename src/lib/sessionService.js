import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment
} from 'firebase/firestore';

// Reference to the shared session
const sessionRef = doc(db, 'sessions', 'global');

// 🟢 Create session if it doesn't exist
export async function initGlobalSession() {
  const sessionSnap = await getDoc(sessionRef);

  if (!sessionSnap.exists()) {
    await setDoc(sessionRef, {
      jokes: 0,
      strokes: 0,
      flatlined: false,
      users: {},
      lastUpdated: new Date().toISOString()
    });
    console.log('🔥 Created new shared session');
  } else {
    console.log('✅ Shared session already exists');
  }
}

// ➕ Increment joke count in Firestore
export async function voteJoke() {
  await updateDoc(sessionRef, {
    jokes: increment(1),
    lastUpdated: new Date().toISOString()
  });
}

// ➕ Increment stroke count in Firestore
export async function voteStroke() {
  await updateDoc(sessionRef, {
    strokes: increment(1),
    lastUpdated: new Date().toISOString()
  });
}

// 🔁 Listen for real-time session changes
export function listenToSession(callback) {
  return onSnapshot(sessionRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
}
