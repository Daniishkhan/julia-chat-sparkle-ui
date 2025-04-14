
import React, { useState } from 'react';
import Header from './Header';
import WelcomeMessage from './WelcomeMessage';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import { findSubcontractors } from '../services/api';
import { toast } from '../components/ui/sonner';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setIsLoading(true);
      
      try {
        // Make API request
        const response = await findSubcontractors(text);
        
        // Create bot response with company names
        let botResponseText = "";
        
        if (response.matches && response.matches.length > 0) {
          botResponseText = "Here are the companies that match your request:\n\n";
          response.matches.forEach((match, index) => {
            botResponseText += `${index + 1}. ${match.company_name}\n`;
          });
        } else {
          botResponseText = "No matching companies found. Please try a different search.";
        }
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: botResponseText,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        // Handle error
        console.error('Failed to fetch data:', error);
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: "Sorry, I encountered an error while searching for subcontractors. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
        toast.error("Failed to fetch subcontractors");
      } finally {
        setIsLoading(false);
      }
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
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-julia-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-white text-gray-800 rounded-tl-none border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="sticky bottom-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
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
