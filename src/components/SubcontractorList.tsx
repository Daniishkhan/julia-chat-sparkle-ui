
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, Mail, PhoneCall } from "lucide-react";
import CompanyDetailsModal from './CompanyDetailsModal';
import EmailModal from './EmailModal';
import CallModal from './CallModal';
import { toast } from "sonner";

interface Subcontractor {
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
  match_explanation: string;
  website?: string;
  description?: string;
}

interface SubcontractorListProps {
  subcontractors: Subcontractor[];
  query: string;
}

const SubcontractorList: React.FC<SubcontractorListProps> = ({ subcontractors, query }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewingCompany, setViewingCompany] = useState<Subcontractor | null>(null);
  const [emailingCompany, setEmailingCompany] = useState<Subcontractor | null>(null);
  const [callingCompany, setCallingCompany] = useState<Subcontractor | null>(null);

  const toggleSelection = (id: string) => {
    setSelectedIds(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(itemId => itemId !== id) 
        : [...prevSelected, id]
    );
  };

  const emailSelected = () => {
    const selectedCompanies = subcontractors.filter(sub => selectedIds.includes(sub.id));
    
    if (selectedCompanies.length === 1) {
      // If only one company is selected, open the email modal for that company
      setEmailingCompany(selectedCompanies[0]);
    } else {
      // For multiple companies, prepare a list of emails
      const emails = selectedCompanies.map(company => company.email).join(', ');
      const companyNames = selectedCompanies.map(company => company.company_name).join(', ');
      
      // Create a temporary subcontractor object to pass to the email modal
      const multipleRecipients: Subcontractor = {
        id: 'multiple',
        email: emails,
        company_name: 'Multiple Companies',
        phone: '',
        contact: '',
        location: { borough: '', address: '' },
        capabilities: [],
        certifications: [],
        yearsInBusiness: 0,
        employeeCount: 0,
        projectCapacity: '',
        match_explanation: ''
      };
      
      setEmailingCompany(multipleRecipients);
      toast.info(`Preparing email to ${selectedCompanies.length} companies`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-700 mb-2">
        Here are {subcontractors.length} companies that match your search for "{query}":
      </div>
      
      {subcontractors.map((subcontractor) => (
        <Card key={subcontractor.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center p-4">
            <div className="flex items-center gap-3 flex-1">
              <Checkbox 
                id={`select-${subcontractor.id}`}
                checked={selectedIds.includes(subcontractor.id)}
                onCheckedChange={() => toggleSelection(subcontractor.id)}
              />
              <div className="flex-1">
                <div className="font-medium">{subcontractor.company_name}</div>
                <div className="text-sm text-gray-500">
                  Location: {subcontractor.location.borough}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Capabilities: {subcontractor.capabilities.join(", ")}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title="View details"
                onClick={() => setViewingCompany(subcontractor)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title={`Email: ${subcontractor.email}`}
                onClick={() => setEmailingCompany(subcontractor)}
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title={`Call: ${subcontractor.phone}`}
                onClick={() => setCallingCompany(subcontractor)}
              >
                <PhoneCall className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      {selectedIds.length > 0 && (
        <Button 
          onClick={emailSelected}
          className="mt-4 bg-julia-primary"
          size="sm"
        >
          <Mail className="mr-2 h-4 w-4" /> Email Selected ({selectedIds.length})
        </Button>
      )}

      <CompanyDetailsModal 
        company={viewingCompany} 
        isOpen={!!viewingCompany} 
        onClose={() => setViewingCompany(null)} 
      />
      
      {emailingCompany && (
        <EmailModal
          recipient={emailingCompany.email}
          companyName={emailingCompany.company_name}
          isOpen={!!emailingCompany}
          onClose={() => setEmailingCompany(null)}
        />
      )}
      
      {callingCompany && (
        <CallModal
          phone={callingCompany.phone}
          companyName={callingCompany.company_name}
          isOpen={!!callingCompany}
          onClose={() => setCallingCompany(null)}
        />
      )}
    </div>
  );
};

export default SubcontractorList;
