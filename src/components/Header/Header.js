import React from 'react';
import logo from '../../assets/busStopLogo.png';
import Tabs from '../Tabs';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="relative bg-gradient-to-r from-cyan-200 to-purple-200 h-[200px] sm:h-[265px] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center h-full -mt-4 space-x-4">
            <img
            src={logo}
            alt="Bus Stop FC Logo"
            className="w-[90px] sm:w-auto sm:h-[150px] mt-[-10px] sm:mt-[-30px]"
            />
            <h1 className="text-2xl sm:text-4xl font-bold text-purple-900 mt-[-10px] sm:mt-[-30px]">
            Spring Fantasy
            </h1>
        </div>

      <div className="absolute bottom-0 w-full translate-y-[0px]">
        <Tabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </header>
  );
};

export default Header;
