import React from 'react';

const tabs = ['GW Points', 'Leaderboard', 'Rules', 'Points Entry'];

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex justify-start gap-1 px-2 sm:gap-2 sm:px-6 md:px-20 overflow-x-auto max-w-full whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1 text-xs 
            sm:px-6 sm:py-3 sm:text-base
            font-semibold transition-colors duration-200
            border border-b-0
            ${
              activeTab === tab
                ? 'bg-white text-purple-900'
                : 'bg-lime-300 text-purple-900 hover:bg-lime-400'
            }
            rounded-t-md`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
