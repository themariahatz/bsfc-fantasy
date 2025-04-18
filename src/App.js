import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import Tabs from './components/Tabs';
import { players as mockPlayers } from './data/mockPlayers';
import GameweekView from './components/GameweekView';
import AdminForm from './components/AdminForm';
import Header from './components/Header';
import Rules from './components/Rules'

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState('GW Points');
  return (
    <div className="App" style={{ fontFamily: 'sans-serif' }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {/* //<Tabs activeTab={activeTab} onTabChange={setActiveTab} /> */}
        {activeTab === 'GW Points' && <GameweekView players={mockPlayers} week={1} />}
        {activeTab === 'Leaderboard' && <Leaderboard players={mockPlayers}/>}
        {activeTab === 'Rules' && <Rules />}
        {activeTab === 'Points Entry' && <AdminForm />}

      {selectedPlayer && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{selectedPlayer.name} - Total: {selectedPlayer.totalPoints}pt</h2>
          <ul>
            {selectedPlayer.weekly.map((week) => (
              <li key={week.week}>
                <strong>Week {week.week} ({week.points}pt):</strong>
                <ul>
                  {Object.entries(week.breakdown).map(([desc, pts], i) => (
                    <li key={i}>{desc}: {pts > 0 ? `+${pts}` : `${pts}`}pt</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedPlayer(null)}>Close</button>
        </div>
)}
    </div>
  );
}

export default App;
