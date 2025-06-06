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
import { db, rtdb } from "./firebase";

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

// ✅ Join the session as a player (without premature deletion)
export async function joinSessionAsPlayer(sessionId, username, userId) {
  console.log("🧪 joinSessionAsPlayer() called with:", { sessionId, username, userId });

  // Firestore: store player profile (do NOT auto-delete this on disconnect anymore)
  const firestoreRef = doc(db, "sessions", sessionId, "activePlayers", userId);
  await setDoc(firestoreRef, {
    username,
    joinedAt: serverTimestamp(),
  }, { merge: true });

  // Realtime Database: use for disconnect detection only
  const rtdbRef = ref(rtdb, `presence/${sessionId}/${userId}`);
  await set(rtdbRef, true);

  // Clean up only Realtime Database entry on disconnect
  onDisconnect(rtdbRef).remove();
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
  }, 20000); // every 20 seconds
}
