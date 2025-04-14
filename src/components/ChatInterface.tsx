
import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ChatInput from './ChatInput';
import { findSubcontractors } from '../services/api';
import { toast } from '../components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Bot } from 'lucide-react';
import SubcontractorList from './SubcontractorList';
import { ScrollArea } from './ui/scroll-area';

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
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-xl w-full text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">What can I help with?</h1>
            <div className="bg-white rounded-2xl shadow-lg p-2 mx-auto">
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isLoading={isLoading} 
                placeholder="Ask anything about subcontractors..." 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col relative">
          <ScrollArea className="flex-1 p-4 pb-20">
            <div className="max-w-2xl w-full mx-auto space-y-4 pt-8">
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
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-2xl mx-auto">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
