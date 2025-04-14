
import React from 'react';
import { Settings, User } from 'lucide-react';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username = 'John Rep' }) => {
  return (
    <header className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <div className="text-julia-primary mr-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 16H8V14H16V16ZM14.5 11.5C13.67 11.5 13 10.83 13 10C13 9.17 13.67 8.5 14.5 8.5C15.33 8.5 16 9.17 16 10C16 10.83 15.33 11.5 14.5 11.5ZM9.5 11.5C8.67 11.5 8 10.83 8 10C8 9.17 8.67 8.5 9.5 8.5C10.33 8.5 11 9.17 11 10C11 10.83 10.33 11.5 9.5 11.5Z" fill="currentColor"/>
          </svg>
        </div>
        <span className="font-bold text-lg text-julia-primary">BusinessBot</span>
      </div>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4">
          <Settings size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mr-2">
            <User size={20} className="text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
