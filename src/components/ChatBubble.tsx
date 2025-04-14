
import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Welcome message card when collapsed */}
      <div className="mb-4 bg-white rounded-lg shadow-lg p-6 max-w-xs animate-fade-in">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-julia-primary rounded-lg flex items-center justify-center mr-3">
            <Bot size={24} className="text-white" />
          </div>
          <h2 className="text-lg font-semibold text-julia-primary">Welcome to Julia</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Your AI assistant for discovering and connecting with diverse, qualified subcontractors in your area. Please open chat on bottom right to start your search.
        </p>
      </div>

      {/* Chat bubble */}
      <div 
        className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
        onClick={onClick}
      >
        <div className="relative">
          {/* Bubble background */}
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white">
            <div 
              className="w-full h-full bg-gradient-to-r from-julia-primary to-blue-500 flex items-center justify-center"
            >
              <MessageCircle size={28} className="text-white" />
            </div>
          </div>
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
