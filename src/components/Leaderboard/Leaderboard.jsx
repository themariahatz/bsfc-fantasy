import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersCollection = collection(db, "players");
      const snapshot = await getDocs(playersCollection);
      const playersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersData);
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => b.totalPoints - a.totalPoints);

  if (loading) {
    return <p className="text-center mt-10 text-purple-700">Loading...</p>;
  }

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-4xl bg-gradient-to-b from-cyan-100 to-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Leaderboard</h2>

        <div className="grid grid-cols-3 font-semibold text-purple-700 border-b pb-2 mb-4">
          <span>Rank</span>
          <span className="text-center">Player</span>
          <span className="text-right">Points</span>
        </div>

        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="grid grid-cols-3 items-center py-2 px-3 border-b last:border-b-0 hover:bg-cyan-50 transition"
          >
            <span>{index + 1}</span>
            <span className="text-center">{player.name}</span>
            <span className="text-right font-medium">{player.totalPoints}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
