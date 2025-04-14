
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <div 
      className="fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      onClick={onClick}
    >
      <div className="relative">
        {/* Bubble background with placeholder image */}
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
  );
};

export default ChatBubble;
