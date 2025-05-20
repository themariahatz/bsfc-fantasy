import React, { useState } from 'react';
import { scoringRules } from '../../utils/scoringRules';
import { players } from '../../data/mockPlayers';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { saveGameweekData } from '../../utils/saveGameweekData';

const AdminForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [position, setPosition] = useState('Defender');
  const [gameweek, setGameweek] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [entries, setEntries] = useState([]);

  const auth = getAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = adminCredentials;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log("✅ Logged in:", userCredential.user.uid);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleAddStat = () => {
    setEntries([...entries, { stat: '', value: 1, points: 0 }]);
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = field === 'value' || field === 'customPointValue'
      ? parseFloat(value)
      : value;

    const stat = updated[index].stat;
    const val = updated[index].value || 1;

    if (stat === 'custom') {
      const pointsPer = updated[index].customPointValue || 0;
      updated[index].points = val * pointsPer;
    } else {
      updated[index].points = scoringRules[stat]
        ? scoringRules[stat] * val
        : 0;
    }

    setEntries(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const player = players.find((p) => p.id === selectedPlayer);
    if (!player) return;

    try {
      await saveGameweekData(selectedPlayer, gameweek, entries, player.name, position);
      alert('Gameweek data saved!');
    } catch (err) {
      console.error('Error saving data:', err);
      alert('Failed to save data');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button
              type="submit"
              className="bg-purple-700 text-white w-full py-2 rounded-md hover:bg-purple-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-4xl bg-gradient-to-b from-cyan-100 to-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Points Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-purple-800 mb-1">Gameweek</label>
            <input
              type="number"
              min="1"
              placeholder="Enter gameweek"
              value={gameweek}
              onChange={(e) => setGameweek(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

                {/* Player Selector and Position */}
        <div className="grid grid-cols-2 gap-4 items-start">
        <div>
            <label className="block font-medium text-purple-800 mb-1">Player</label>
            <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            >
            <option value="">Select a player</option>
            {players.map((p) => (
                <option key={p.id} value={p.id}>
                {p.name}
                </option>
            ))}
            </select>
        </div>

        <div>
            <label className="block font-medium text-purple-800 mb-1">Position</label>
            <div className="flex flex-wrap gap-4">
            {['Goalkeeper', 'Defender', 'Midfielder'].map((role) => (
                <label key={role} className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="position"
                    value={role}
                    checked={position === role}
                    onChange={() => setPosition(role)}
                    className="text-purple-700"
                />
                <span className="text-sm">{role}</span>
                </label>
            ))}
            </div>
        </div>
        </div>


          <div className="space-y-4">
            {entries.map((entry, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 items-start">
                <select
                  value={entry.stat}
                  onChange={(e) => handleStatChange(i, 'stat', e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select Stat</option>
                  {Object.keys(scoringRules).map((key) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>

                <input
                  type="number"
                  value={entry.value}
                  min="1"
                  onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                  className="border p-2 rounded"
                />

                <div className="text-right font-semibold pt-2">
                  {isNaN(entry.points) ? '--' : `${entry.points > 0 ? '+' : ''}${entry.points}`}
                </div>

                {entry.stat === 'custom' && (
                  <div className="col-span-3 bg-white border rounded p-3 mt-2 shadow-sm space-y-2">
                    <input
                      type="text"
                      placeholder="Custom stat name"
                      value={entry.customLabel || ''}
                      onChange={(e) => handleStatChange(i, 'customLabel', e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Points per unit"
                      value={entry.customPointValue || ''}
                      onChange={(e) => handleStatChange(i, 'customPointValue', e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddStat}
              className="text-sm text-purple-700 hover:underline"
            >
              + Add Stat
            </button>
          </div>

          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
          >
            Submit Gameweek Stats
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
