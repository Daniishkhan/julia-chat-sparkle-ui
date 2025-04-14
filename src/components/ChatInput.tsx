
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
      <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm">
        <input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-6 py-4 bg-transparent outline-none text-gray-800 disabled:text-gray-400 rounded-l-full text-base"
        />
        <button 
          type="submit" 
          className={`p-3 rounded-full m-1 ${isLoading || !message.trim() ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
          disabled={isLoading || !message.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
