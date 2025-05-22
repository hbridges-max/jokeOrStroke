import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { ref, set, onDisconnect } from "firebase/database";
import { db, rtdb } from "./firebase"; // Firestore (db) and Realtime Database (rtdb)

// ✅ Cast a vote for JOKE
export async function voteJoke(username) {
  const sessionRef = doc(db, "sessions", "global");
  await updateDoc(sessionRef, {
    jokes: increment(1),
    lastVotedBy: username,
  });
}

// ✅ Cast a vote for STROKE
export async function voteStroke(username) {
  const sessionRef = doc(db, "sessions", "global");
  await updateDoc(sessionRef, {
    strokes: increment(1),
    lastVotedBy: username,
  });
}

// ✅ Reset session counters
export async function resetSession() {
  const sessionRef = doc(db, "sessions", "global");
  await setDoc(sessionRef, {
    jokes: 0,
    strokes: 0,
    lastVotedBy: "",
  });
}

// ✅ Listen for live updates to the session document
export function listenToSession(callback) {
  const sessionRef = doc(db, "sessions", "global");
  return onSnapshot(sessionRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      callback(docSnapshot.data());
    }
  });
}

// ✅ Join the session as a player
export async function joinSessionAsPlayer(sessionId, username, userId) {
  const firestoreRef = doc(db, "sessions", sessionId, "activePlayers", userId);

  await setDoc(firestoreRef, {
    username,
    joinedAt: serverTimestamp(),
  });

  const rtdbRef = ref(rtdb, `presence/${sessionId}/${userId}`);
  await set(rtdbRef, true);
  onDisconnect(rtdbRef).remove().then(async () => {
    await deleteDoc(firestoreRef).catch(() => {});
  });
}

// ✅ Listen to active player list
export function listenToActivePlayers(sessionId, callback) {
  const playersRef = collection(db, "sessions", sessionId, "activePlayers");
  return onSnapshot(playersRef, (snapshot) => {
    const players = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(players);
  });
}

// ✅ Heartbeat to keep lastSeen fresh
export function startHeartbeat(sessionId, userId) {
  const playerRef = doc(db, "sessions", sessionId, "activePlayers", userId);
  return setInterval(() => {
    setDoc(playerRef, { lastSeen: serverTimestamp() }, { merge: true });
  }, 20000);
}
