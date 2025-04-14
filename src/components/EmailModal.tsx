
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { toast } from "sonner";

interface EmailModalProps {
  recipient: string;
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ 
  recipient, 
  isOpen, 
  onClose,
  companyName
}) => {
  const [from, setFrom] = useState("john.rep@company.com");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = () => {
    if (!subject.trim()) {
      toast.error("Please enter a subject for your email");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      toast.success(`Email sent to ${companyName}`);
      setIsSending(false);
      setSubject("");
      setMessage("");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Send Email</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <label htmlFor="recipients" className="text-sm font-medium text-gray-500 mb-1 block">
              Recipients
            </label>
            <Input 
              id="recipients"
              value={recipient} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          
          <div>
            <label htmlFor="from" className="text-sm font-medium text-gray-500 mb-1 block">
              From
            </label>
            <Input 
              id="from"
              value={from} 
              onChange={(e) => setFrom(e.target.value)} 
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="text-sm font-medium text-gray-500 mb-1 block">
              Subject
            </label>
            <Input 
              id="subject"
              placeholder="Enter email subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
            />
          </div>
          
          <div>
            <label htmlFor="message" className="text-sm font-medium text-gray-500 mb-1 block">
              Message
            </label>
            <Textarea 
              id="message"
              placeholder="Type your message here..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            className="bg-julia-primary"
            onClick={handleSendEmail}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send Email
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
