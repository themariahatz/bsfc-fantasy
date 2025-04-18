import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveGameweekData(playerId, week, breakdown, playerName, position) {
  const points = breakdown.reduce((sum, item) => sum + parseInt(item.points), 0);

  const gameweekRef = doc(db, "players", playerId, "gameweeks", String(week));
  await setDoc(gameweekRef, {
    week,
    position,
    breakdown: breakdown.reduce((acc, curr) => {
      acc[curr.stat] = {
        value: parseInt(curr.value),
        points: parseInt(curr.points),
      };
      return acc;
    }, {}),
    points,
    timestamp: Date.now(),
  });

  const playerRef = doc(db, "players", playerId);
  const playerSnap = await getDoc(playerRef);

  if (playerSnap.exists()) {
    const prevTotal = playerSnap.data().totalPoints || 0;
    await updateDoc(playerRef, {
      totalPoints: prevTotal + points,
    });
  } else {
    //Create the player doc if it doesn't exist
    await setDoc(playerRef, {
      name: playerName,
      totalPoints: points,
    });
  }
}
