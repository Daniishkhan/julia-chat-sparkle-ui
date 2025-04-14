
import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
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
          className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-800"
        />
        <button type="button" className="p-3 text-gray-500 hover:text-gray-700">
          <Mic size={20} />
        </button>
        <button 
          type="submit" 
          className="p-3 bg-julia-primary text-white rounded-lg mx-1 my-1 hover:bg-opacity-90 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
