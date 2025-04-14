
interface SearchCriteria {
  capabilities: string[] | null;
  certifications: string[] | null;
  location: string | null;
  project_size: string | null;
}

interface Location {
  borough: string;
  address: string;
}

interface Subcontractor {
  id: string;
  phone: string;
  email: string;
  contact: string;
  company_name: string;
  location: Location;
  capabilities: string[];
  certifications: string[];
  yearsInBusiness: number;
  employeeCount: number;
  projectCapacity: string;
  match_explanation: string;
}

interface SubcontractorResponse {
  matches: Subcontractor[];
  total_matches: number;
  returned_matches: number;
  query_type: string;
  search_criteria: SearchCriteria;
  match_quality: string;
}

export const findSubcontractors = async (text: string): Promise<SubcontractorResponse> => {
  try {
    const response = await fetch('http://24.144.88.94/find-subcontractors', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching subcontractors:', error);
    throw error;
  }
};
