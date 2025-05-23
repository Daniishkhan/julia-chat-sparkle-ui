
import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ChatInput from './ChatInput';
import { findSubcontractors } from '../services/api';
import { toast } from '../components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Bot, Send } from 'lucide-react';
import SubcontractorList from './SubcontractorList';
import { ScrollArea } from './ui/scroll-area';
import WelcomeMessage from './WelcomeMessage';

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-lg overflow-hidden">
      <Header />
      
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white">
          <WelcomeMessage />
          <div className="w-full max-w-xl mx-auto mt-8 px-4">
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              placeholder="Ask anything about subcontractors..." 
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full">
          <ScrollArea className="flex-1">
            <div className="max-w-3xl w-full mx-auto space-y-4 py-8 px-4">
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
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-tr-none' 
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
                      <AvatarFallback className="bg-blue-400 text-white">
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
                  <div className="max-w-[75%] p-3 rounded-lg bg-julia-softGreen text-gray-800 rounded-tl-none border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder="Ask anything about subcontractors..." />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
