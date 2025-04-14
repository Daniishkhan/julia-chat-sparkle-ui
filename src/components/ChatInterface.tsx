
import React, { useState } from 'react';
import Header from './Header';
import WelcomeMessage from './WelcomeMessage';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      
      // In a real app, you'd handle the bot response here
      // For now, we'll keep it simple since we're just showing the welcome screen
    }
  };

  const toggleChatExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isExpanded) {
    return <ChatBubble onClick={toggleChatExpansion} />;
  }

  return (
    <div className="flex flex-col h-screen bg-julia-bg">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <div className="space-y-4">
            {/* This is for future chat message rendering */}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-julia-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sticky bottom-0">
        <ChatInput onSendMessage={handleSendMessage} />
        <button 
          onClick={toggleChatExpansion}
          className="absolute bottom-20 right-4 p-2 rounded-full bg-julia-primary text-white shadow-lg"
          aria-label="Minimize chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
