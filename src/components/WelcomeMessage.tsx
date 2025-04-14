
import React from 'react';
import { Bot } from 'lucide-react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center px-4 py-10">
      <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-8">
        <Bot size={36} className="text-white" />
      </div>
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">Hi, BusinessBot here</h1>
      <h2 className="text-3xl font-medium text-gray-800 mb-6">Can I help you with anything?</h2>
      <p className="text-gray-600 mb-10 text-center max-w-md text-lg">
        Ready to assist you with anything you need, from answering questions about subcontractors to providing recommendations. Let's get started!
      </p>
    </div>
  );
};

export default WelcomeMessage;
