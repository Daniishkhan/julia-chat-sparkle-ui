
import React from 'react';
import { Bot } from 'lucide-react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto my-8 text-center">
      <div className="w-16 h-16 bg-julia-primary rounded-2xl flex items-center justify-center mb-6">
        <Bot size={40} className="text-white" />
      </div>
      <h1 className="text-3xl font-semibold text-julia-primary mb-4">Welcome to Julia</h1>
      <p className="text-gray-600 mb-8 px-4 text-center max-w-md">
        Your AI assistant for discovering and connecting with diverse, qualified subcontractors in your area.
      </p>
    </div>
  );
};

export default WelcomeMessage;
