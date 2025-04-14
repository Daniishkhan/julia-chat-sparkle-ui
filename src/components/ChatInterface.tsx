import React, { useState } from 'react';
import Header from './Header';
import WelcomeMessage from './WelcomeMessage';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import SubcontractorList from './SubcontractorList';
import { findSubcontractors } from '../services/api';
import { toast } from '../components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  subcontractors?: any[];
  query?: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setIsLoading(true);
      
      try {
        console.log('Initiating API request for text:', text);
        
        const response = await findSubcontractors(text);
        
        console.log('Received API response:', response);
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: '',
          sender: 'bot',
          timestamp: new Date(),
          subcontractors: response.matches,
          query: text
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to fetch subcontractors: ${errorMessage}`);
        
        const errorResponseMessage: Message = {
          id: Date.now() + 1,
          text: `I had trouble connecting to the server. Error: ${errorMessage}`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, errorResponseMessage]);
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
              <div 
                key={message.id} 
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } items-start gap-2`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-10 w-10 bg-avatar-gradient-1 text-white shadow-md">
                    <AvatarFallback className="bg-julia-accent text-white">
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div 
                  className={`max-w-2xl w-full p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-julia-primary text-white rounded-tr-none' 
                      : 'bg-julia-softBlue text-gray-800 rounded-tl-none border border-gray-200'
                  }`}
                >
                  {message.text && (
                    <pre className="whitespace-pre-wrap font-sans text-sm">{message.text}</pre>
                  )}
                  
                  {message.sender === 'bot' && message.subcontractors && message.subcontractors.length > 0 && (
                    <SubcontractorList 
                      subcontractors={message.subcontractors} 
                      query={message.query || ''}
                    />
                  )}
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-10 w-10 bg-avatar-gradient-2 text-white shadow-md">
                    <AvatarFallback className="bg-julia-blue text-white">
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-start gap-2">
                <Avatar className="h-10 w-10 bg-avatar-gradient-3 text-white shadow-md">
                  <AvatarFallback className="bg-julia-accent text-white">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-2xl w-full p-3 rounded-lg bg-julia-softGreen text-gray-800 rounded-tl-none border border-gray-200">
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
