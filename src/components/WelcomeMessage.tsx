
import React from 'react';
import { Bot } from 'lucide-react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center">
      <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
        <Bot size={30} className="text-white" />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">Hi, BusinessBot here</h1>
      <h2 className="text-2xl font-medium text-gray-800 mb-4">Can I help you with anything?</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md text-sm">
        Ready to assist you with anything you need, from answering questions about subcontractors to providing recommendations. Let's get started!
      </p>
    </div>
  );
};

export default WelcomeMessage;
