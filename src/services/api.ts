
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

    // Log request details
    console.log('Sending API request to find subcontractors with text:', text);
    
    // Using the real API endpoint with CORS handling
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://24.144.88.94/find-subcontractors';
    const fullUrl = corsProxyUrl + apiUrl;
    
    console.log('Using CORS proxy URL:', fullUrl);
    
    const requestBody = JSON.stringify({
      text,
      max_tokens: 150
    });
    
    console.log('Request body:', requestBody);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    console.log('API response status:', response.status);
    console.log('API response status text:', response.statusText);
    
    // Log response headers for debugging
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log('Response headers:', headers);

    if (!response.ok) {
      // Get the response text to see if there's an error message
      const errorText = await response.text();
      console.error(`API response error text: ${errorText}`);
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error fetching subcontractors:', error);
    
    // If error is a Response object, try to get more details
    if (error instanceof Response) {
      try {
        const errorBody = await error.text();
        console.error('Error response body:', errorBody);
      } catch (e) {
        console.error('Could not read error response body:', e);
      }
    }
    
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
