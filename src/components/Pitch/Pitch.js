import React, { useState, useEffect } from 'react';
import styles from './Pitch.module.scss';
import PlayerCard from '../PlayerCard';
import { db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore"; // Add to your imports
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { statLabels } from '../../utils/statLabels';

const Pitch = ({ week }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collectionGroup(db, 'gameweeks'), where('week', '==', week));
      const snapshot = await getDocs(q);
      const gameweekData = [];
  
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const pathParts = docSnap.ref.path.split('/');
        const playerId = pathParts[1]; // e.g., "1"
  
        // 🔍 Fetch top-level player doc
        const playerDocRef = doc(db, 'players', playerId);
        const playerDocSnap = await getDoc(playerDocRef);
        const playerData = playerDocSnap.exists() ? playerDocSnap.data() : {};
  
        gameweekData.push({
          id: playerId,
          name: playerData.name || 'Unknown',
          position: data.position || 'Midfielder',
          gameweek: {
            points: data.points,
            breakdown: Object.entries(data.breakdown).map(([stat, { value, points }]) => ({
              stat,
              value,
              points,
            })),
          },
        });
      }
  
      setPlayers(gameweekData);
    };
  
    fetchData();
  }, [week]);

  const groupByPosition = (position) =>
    players.filter((player) => player.position === position);

  const midfielders = groupByPosition('Midfielder');
  const midRow1 = midfielders.slice(-1);
  const midRow2 = midfielders.slice(-4, -1);
  const midRow3 = midfielders.slice(0, -4);

  return (
    <div className={styles.gameweekView}>
      <div className={styles.pitch}>
        <div className={styles.line}>
          {groupByPosition('Goalkeeper').map((player) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              points={player.gameweek.points}
              onClick={() => setSelectedPlayer(player)}
            />
          ))}
        </div>

        <div className={styles.line}>
          {groupByPosition('Defender').map((player) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              points={player.gameweek.points}
              onClick={() => setSelectedPlayer(player)}
            />
          ))}
        </div>

        <div className={styles.midfieldLine}>
          <div className={styles.row}>
            {midRow1.map((player) => (
              <PlayerCard
                key={player.id}
                name={player.name}
                points={player.gameweek.points}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
          <div className={styles.row}>
            {midRow2.map((player) => (
              <PlayerCard
                key={player.id}
                name={player.name}
                points={player.gameweek.points}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
          <div className={styles.row}>
            {midRow3.map((player) => (
              <PlayerCard
                key={player.id}
                name={player.name}
                points={player.gameweek.points}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedPlayer && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{selectedPlayer.name}</h2>
            <table className={styles.breakdownTable}>
              <thead>
                <tr>
                  <th>Statistic</th>
                  <th>Value</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {selectedPlayer.gameweek.breakdown.map((item, index) => (
                  <tr key={index}>
                    <td>{statLabels[item.stat] || item.stat}</td>
                    <td>{item.value}</td>
                    <td>{item.points > 0 ? `+${item.points}` : item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setSelectedPlayer(null)}
              className={styles.closeButton}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pitch;
