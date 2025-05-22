import { useEffect, useState } from "react";
import { listenToActivePlayers } from "../lib/sessionService";

export default function PlayerList({ sessionId }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToActivePlayers(sessionId, setPlayers);
    return () => unsubscribe();
  }, [sessionId]);

  return (
    <div className="bg-white/20 p-3 rounded-xl mt-4 text-sm max-w-xs mx-auto shadow-lg">
      <p className="font-semibold text-white mb-2">🎮 Active Players:</p>
      <ul className="space-y-1">
        {players.map((player) => (
          <li key={player.id} className="text-white">
            🟢 {player.username}
          </li>
        ))}
        {players.length === 0 && <li className="text-white/70 italic">No one’s here yet...</li>}
      </ul>
    </div>
  );
}
