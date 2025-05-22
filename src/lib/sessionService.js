import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment
} from 'firebase/firestore';

const sessionRef = doc(db, 'sessions', 'global');

export async function initGlobalSession() {
  const sessionSnap = await getDoc(sessionRef);

  if (!sessionSnap.exists()) {
    await setDoc(sessionRef, {
      jokes: 0,
      strokes: 0,
      flatlined: false,
      users: {},
      lastVotedBy: '',
      lastUpdated: new Date().toISOString()
    });
    console.log('🔥 Created new shared session');
  } else {
    console.log('✅ Shared session already exists');
  }
}

export async function voteJoke(name) {
  await updateDoc(sessionRef, {
    jokes: increment(1),
    lastVotedBy: name,
    lastUpdated: new Date().toISOString()
  });
}

export async function voteStroke(name) {
  await updateDoc(sessionRef, {
    strokes: increment(1),
    lastVotedBy: name,
    lastUpdated: new Date().toISOString()
  });
}

export async function resetSession() {
  await setDoc(sessionRef, {
    jokes: 0,
    strokes: 0,
    flatlined: false,
    users: {},
    lastVotedBy: '',
    lastUpdated: new Date().toISOString()
  });
}

export function listenToSession(callback) {
  return onSnapshot(sessionRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
}
