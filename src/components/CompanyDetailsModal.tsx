
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X } from "lucide-react";
import { Button } from "./ui/button";

interface CompanyDetailsModalProps {
  company: {
    id: string;
    phone: string;
    email: string;
    contact: string;
    company_name: string;
    location: {
      borough: string;
      address: string;
    };
    capabilities: string[];
    certifications: string[];
    yearsInBusiness: number;
    employeeCount: number;
    projectCapacity: string;
    website?: string;
    description?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ 
  company, 
  isOpen, 
  onClose 
}) => {
  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{company.company_name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Primary Contact</h3>
              <p className="mt-1">{company.contact}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="mt-1">{company.phone}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{company.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Website</h3>
              <p className="mt-1 flex items-center gap-1">
                {company.website ? (
                  <>
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-julia-blue hover:underline flex items-center"
                    >
                      {company.website} <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </>
                ) : (
                  "Not available"
                )}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Full Address</h3>
            <p className="mt-1">{company.location.address}, {company.location.borough}</p>
          </div>
          
          {company.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-sm">{company.description}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Key Services</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {company.capabilities.map((capability, i) => (
                <Badge key={i} variant="outline" className="bg-julia-softPurple border-none">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {company.certifications.map((cert, i) => (
                <Badge key={i} className="bg-julia-softGreen border-none text-gray-800">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Years in Business</h3>
              <p className="mt-1">{company.yearsInBusiness} years</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee Count</h3>
              <p className="mt-1">{company.employeeCount} employees</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Project Capacity</h3>
              <p className="mt-1">{company.projectCapacity}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-julia-primary"
          >
            Contact Company
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetailsModal;
