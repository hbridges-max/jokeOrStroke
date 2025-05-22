import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ref, set, onDisconnect } from "firebase/database";
import { db, rtdb } from "./firebase"; // Firestore (db) and Realtime Database (rtdb)

// Join the session and appear in the activePlayers list
export async function joinSessionAsPlayer(sessionId, username, userId) {
  const firestoreRef = doc(db, "sessions", sessionId, "activePlayers", userId);

  await setDoc(firestoreRef, {
    username,
    joinedAt: serverTimestamp(),
  });

  // For presence handling using Realtime Database
  const rtdbRef = ref(rtdb, `presence/${sessionId}/${userId}`);
  await set(rtdbRef, true);
  onDisconnect(rtdbRef).remove().then(async () => {
    await deleteDoc(firestoreRef).catch(() => {});
  });
}

// Listen for real-time updates to active players
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

// Periodic heartbeat to update lastSeen timestamp
export function startHeartbeat(sessionId, userId) {
  const playerRef = doc(db, "sessions", sessionId, "activePlayers", userId);
  return setInterval(() => {
    setDoc(playerRef, { lastSeen: serverTimestamp() }, { merge: true });
  }, 20000); // update every 20 seconds
}
