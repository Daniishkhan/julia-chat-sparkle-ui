
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneCall, X } from "lucide-react";
import { toast } from "sonner";

interface CallModalProps {
  phone: string;
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

const CallModal: React.FC<CallModalProps> = ({ 
  phone, 
  isOpen, 
  onClose,
  companyName
}) => {
  const handleCall = () => {
    toast.success(`Calling ${companyName}`);
    
    // Simulate call delay
    setTimeout(() => {
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
          <DialogTitle className="text-xl font-semibold">Make Call</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium">{companyName}</h3>
            <p className="text-xl font-semibold mt-2">{phone}</p>
          </div>
          
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 rounded-full h-16 w-16 p-0"
              onClick={handleCall}
            >
              <PhoneCall className="h-6 w-6" />
            </Button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            Click the button above to initiate call
          </p>
        </div>
        
        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;
