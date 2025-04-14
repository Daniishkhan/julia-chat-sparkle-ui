
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone } from "lucide-react";

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
}

interface SubcontractorListProps {
  subcontractors: Subcontractor[];
  query: string;
}

const SubcontractorList: React.FC<SubcontractorListProps> = ({ subcontractors, query }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(itemId => itemId !== id) 
        : [...prevSelected, id]
    );
  };

  const emailSelected = () => {
    const selectedCompanies = subcontractors
      .filter(sub => selectedIds.includes(sub.id))
      .map(sub => sub.company_name)
      .join(", ");
    
    alert(`Email would be sent to: ${selectedCompanies}`);
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
              <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" title={`Email: ${subcontractor.email}`}>
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" title={`Call: ${subcontractor.phone}`}>
                <Phone className="h-4 w-4" />
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
    </div>
  );
};

export default SubcontractorList;
