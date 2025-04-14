
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false, 
  placeholder = "Type your message..." 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center bg-white rounded-lg border border-gray-200">
        <input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-800 disabled:text-gray-400 rounded-lg"
        />
        <button 
          type="submit" 
          className={`p-3 ${isLoading || !message.trim() ? 'bg-gray-300' : 'bg-black'} text-white rounded-lg m-1 transition-colors`}
          disabled={isLoading || !message.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
