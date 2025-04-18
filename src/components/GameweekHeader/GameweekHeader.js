import React from 'react';

const GameweekHeader = ({ week, onPrev, onNext, matchScore }) => {
  return (
    <div className="py-6 px-4 rounded-md shadow-md relative mb-6 sm:px-8 text-center sm:text-left gap-2">
      {/* Navigation Arrows */}
      <h2 className="text-center text-xl font-bold text-purple-900 sm:text-3xl w-full sm:w-auto">Gameweek {week}</h2>

      <button
        onClick={onPrev}
        // className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-900 font-semibold hover:underline"
        className="absolute text-purple-900 left-4 top-14 -translate-y-1/2 top-1/2 hover:underline text-sm sm:text-base font-semibold transition"

      >
        ← Previous
      </button>


      <button
        onClick={onNext}
        //className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-900 font-semibold hover:underline"
        className="absolute text-purple-900 right-4 top-14 -translate-y-1/2 top-1/2 hover:underline text-sm sm:text-base font-semibold transition"

      >
        Next →
      </button>

      {/* Match Score Box */}
      <div className="mt-6 flex justify-center">
        <div className="bg-white sm:text-lg px-10 py-4 rounded-lg shadow-md text-center">
          <p className=" font-bold text-purple-800">{matchScore}</p>
        </div>
      </div>
    </div>
  );
};

export default GameweekHeader;
