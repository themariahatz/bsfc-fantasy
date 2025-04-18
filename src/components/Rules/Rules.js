import React from 'react';

const Rules = () => {
    return (
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-4xl bg-gradient-to-b from-cyan-100 to-white rounded-xl shadow-md p-6">
          {/* Main Title */}
          <h1 className="text-4xl font-extrabold text-purple-800 text-center mb-8">
            Rules
          </h1>
  
          {/* How to Make Points */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">How to Earn Points</h2>
            <ul className="list-disc list-inside space-y-2 text-purple-800">
              <li>
                Scoring a goal: <span className="text-green-600 font-bold">+5</span>
                <ul className="ml-6 list-disc text-sm italic text-purple-700 space-y-1">
                  <li>+5pt: Score a bicycle kick</li>
                  <li>+3pt: Score from outside the box</li>
                  <li>+2pt: Scoring a header</li>
                  <li>+2pt: Scoring a volley</li>
                </ul>
              </li>
              <li>Clean Sheet: <span className="text-green-600 font-bold">+5</span></li>
              <li>Getting past Kitty: <span className="text-green-600 font-bold">+5</span></li>
              <li>If you take a photo that ends up on a Bus Stop FC Instagram post: <span className="text-green-600 font-bold">+4</span></li>
              <li>
                Assist: <span className="text-green-600 font-bold">+3</span>
                <ul className="ml-6 list-disc text-sm italic text-purple-700">
                  <li>+3pt: Assist Maria (cause I said so)</li>
                </ul>
              </li>
              <li>Attend scrimmage/practice: <span className="text-green-600 font-bold">+2</span></li>
              <li>First to arrive at field: <span className="text-green-600 font-bold">+1</span></li>
              <li>Best Walkup outfit: <span className="text-green-600 font-bold">+1</span></li>
              <li>You arrive to game with Bus Stop FC warm up rugby: <span className="text-green-600 font-bold">+1</span></li>
            </ul>
          </div>
  
          {/* How to Lose Points */}
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">How to Lose Points</h2>
            <ul className="list-disc list-inside space-y-2 text-purple-800">
              <li>Yellow or Red card: <span className="text-red-600 font-bold">-5</span></li>
              <li>Cursing at the ref: <span className="text-red-600 font-bold">-4</span></li>
              <li>Arriving late (after the game has started): <span className="text-red-600 font-bold">-3</span></li>
              <li>Signing up but not showing up: <span className="text-red-600 font-bold">-3</span></li>
              <li>Forgetting your jersey: <span className="text-red-600 font-bold">-2</span></li>
              <li>Showing up but not signing up: <span className="text-red-600 font-bold">-2</span></li>
              <li>Getting nutmegged: <span className="text-red-600 font-bold">-2</span></li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Rules;