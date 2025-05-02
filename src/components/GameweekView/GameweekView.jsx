import React, { useState } from 'react';
import GameweekHeader from '../GameweekHeader'; 
import Pitch from '../Pitch'; 
const GameweekView = ({ players}) => {
    const matchScores = {
        1: 'Bus Stop FC 5 - 0 Slurpies',
        2: 'Bus Stop FC 3 - 0 Beer Bellies',
        3: 'Bus Stop FC 6 - 0 Whose Your Ma',
        // Add more gameweeks as needed
      };
  const [week, setWeek] = useState(1); // ← shared state for header + field

  const handlePrev = () => setWeek((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setWeek((prev) => prev + 1);

const currentScore = matchScores[week] || 'TBD';

  return (

<div className="w-full flex justify-center mt-10">
  <div className="w-full max-w-5xl bg-gradient-to-b from-cyan-200 to-white py-10 px-4 rounded-lg shadow-sm">
    <GameweekHeader
      week={week}
      onPrev={handlePrev}
      onNext={handleNext}
      matchScore={currentScore}
    />
    <Pitch players={players} week={week} />
  </div>
</div>
  );
};

export default GameweekView;
