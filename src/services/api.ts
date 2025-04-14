
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
    // Use a mock response when the real API is not available
    // This is for development/testing to handle connection issues
    const useMockData = false; // Set to false to use the real API

    if (useMockData) {
      console.log('Using mock data as fallback');
      return {
        matches: [
          {
            id: "SC001",
            phone: "(212) 555-1234",
            email: "info@metroconstruction.com",
            contact: "John Chui",
            company_name: "Metro Construction Solutions",
            location: {
              borough: "Manhattan",
              address: "123 Broadway, New York, NY 10007"
            },
            capabilities: [
              "General Construction",
              "Concrete Work",
              "Steel Fabrication"
            ],
            certifications: [
              "MBE",
              "SBE"
            ],
            yearsInBusiness: 15,
            employeeCount: 150,
            projectCapacity: "$5M-$20M",
            match_explanation: "Metro Construction Solutions is located in Manhattan, NYC, and has 'Steel Fabrication' listed in their capabilities."
          }
        ],
        total_matches: 1,
        returned_matches: 1,
        query_type: "ai_assisted",
        search_criteria: {
          capabilities: ["steel"],
          certifications: null,
          location: "nyc",
          project_size: null
        },
        match_quality: "semantic"
      };
    }

    // Using the real API endpoint with CORS handling
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://24.144.88.94/find-subcontractors', {
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
    
    // Return a fallback response for development/testing
    // This ensures the UI can still function even if the API is down
    return {
      matches: [
        {
          id: "SC001",
          phone: "(212) 555-1234",
          email: "info@metroconstruction.com",
          contact: "John Chui",
          company_name: "Metro Construction Solutions (Fallback Data)",
          location: {
            borough: "Manhattan",
            address: "123 Broadway, New York, NY 10007"
          },
          capabilities: [
            "General Construction",
            "Concrete Work", 
            "Steel Fabrication"
          ],
          certifications: [
            "MBE",
            "SBE"
          ],
          yearsInBusiness: 15,
          employeeCount: 150,
          projectCapacity: "$5M-$20M",
          match_explanation: "Fallback data - API connection failed"
        }
      ],
      total_matches: 1,
      returned_matches: 1,
      query_type: "fallback",
      search_criteria: {
        capabilities: ["steel"],
        certifications: null,
        location: "nyc",
        project_size: null
      },
      match_quality: "fallback"
    };
  }
};
