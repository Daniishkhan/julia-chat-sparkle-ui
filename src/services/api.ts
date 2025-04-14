
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
    // Use mock data for now as we're having issues with the API
    console.log('Using mock data for search: ', text);
    
    // Create more varied mock data for demonstration purposes
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
        },
        {
          id: "SC002",
          phone: "(718) 555-9876",
          email: "contact@brooklynsteel.com",
          contact: "Maria Rodriguez",
          company_name: "Brooklyn Steel Experts",
          location: {
            borough: "Brooklyn",
            address: "45 Atlantic Ave, Brooklyn, NY 11201"
          },
          capabilities: [
            "Steel Fabrication",
            "Structural Steel",
            "Metal Decking"
          ],
          certifications: [
            "WBE",
            "MWBE"
          ],
          yearsInBusiness: 8,
          employeeCount: 75,
          projectCapacity: "$1M-$10M",
          match_explanation: "Brooklyn Steel Experts is located in Brooklyn, NYC, and specializes in steel fabrication and structural steel work."
        },
        {
          id: "SC003",
          phone: "(347) 555-4321",
          email: "info@queensmetalworks.com",
          contact: "David Kim",
          company_name: "Queens Metalworks Inc.",
          location: {
            borough: "Queens",
            address: "123 Northern Blvd, Queens, NY 11101"
          },
          capabilities: [
            "Metal Fabrication",
            "Steel Erection",
            "Welding Services"
          ],
          certifications: [
            "MBE",
            "DBE"
          ],
          yearsInBusiness: 12,
          employeeCount: 60,
          projectCapacity: "$2M-$8M",
          match_explanation: "Queens Metalworks Inc. provides steel fabrication and metal work services in the NYC area."
        },
        {
          id: "SC004",
          phone: "(646) 555-7890",
          email: "contact@bronxmetalfab.com",
          contact: "James Wilson",
          company_name: "Bronx Metal Fabrication",
          location: {
            borough: "Bronx",
            address: "890 East Tremont Ave, Bronx, NY 10460"
          },
          capabilities: [
            "Custom Steel Fabrication",
            "Ornamental Metal Work",
            "Steel Installation"
          ],
          certifications: [
            "SBE",
            "LBE"
          ],
          yearsInBusiness: 20,
          employeeCount: 45,
          projectCapacity: "$500K-$5M",
          match_explanation: "Bronx Metal Fabrication provides custom steel fabrication services in NYC."
        },
        {
          id: "SC005",
          phone: "(929) 555-6543",
          email: "hello@statenislandsteel.com",
          contact: "Robert Chen",
          company_name: "Staten Island Steel Construction",
          location: {
            borough: "Staten Island",
            address: "78 Victory Blvd, Staten Island, NY 10301"
          },
          capabilities: [
            "Structural Steel",
            "Steel Framing",
            "Steel Detailing"
          ],
          certifications: [
            "SDVOB",
            "SBE"
          ],
          yearsInBusiness: 17,
          employeeCount: 35,
          projectCapacity: "$1M-$7M",
          match_explanation: "Staten Island Steel Construction provides structural steel services throughout NYC."
        }
      ],
      total_matches: 5,
      returned_matches: 5,
      query_type: "ai_assisted",
      search_criteria: {
        capabilities: ["steel"],
        certifications: null,
        location: "nyc",
        project_size: null
      },
      match_quality: "semantic"
    };
  } catch (error) {
    console.error('Error fetching subcontractors:', error);
    
    // Return a minimal fallback response
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
