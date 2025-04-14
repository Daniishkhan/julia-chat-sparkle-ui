
import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center bg-white rounded-lg border border-gray-200">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-800 disabled:text-gray-400"
        />
        <button type="button" className="p-3 text-gray-500 hover:text-gray-700" disabled={isLoading}>
          <Mic size={20} />
        </button>
        <button 
          type="submit" 
          className={`p-3 ${isLoading ? 'bg-gray-300' : 'bg-julia-primary'} text-white rounded-lg mx-1 my-1 transition-colors`}
          disabled={isLoading || !message.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
