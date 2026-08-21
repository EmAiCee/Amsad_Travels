// Real IATA airport codes with city names
const AIRPORT_DATABASE = {
  'LOS': { code: 'LOS', city: 'Lagos', country: 'Nigeria', name: 'Murtala Muhammed International Airport' },
  'ABV': { code: 'ABV', city: 'Abuja', country: 'Nigeria', name: 'Nnamdi Azikiwe International Airport' },
  'PHC': { code: 'PHC', city: 'Port Harcourt', country: 'Nigeria', name: 'Port Harcourt International Airport' },
  'KAN': { code: 'KAN', city: 'Kano', country: 'Nigeria', name: 'Mallam Aminu Kano International Airport' },
  'ENU': { code: 'ENU', city: 'Enugu', country: 'Nigeria', name: 'Akanu Ibiam International Airport' },
  'QOW': { code: 'QOW', city: 'Owerri', country: 'Nigeria', name: 'Sam Mbakwe International Cargo Airport' },
  'IBE': { code: 'IBE', city: 'Ibadan', country: 'Nigeria', name: 'Ibadan Airport' },
  'CBQ': { code: 'CBQ', city: 'Calabar', country: 'Nigeria', name: 'Margaret Ekpo International Airport' },
  'BEN': { code: 'BEN', city: 'Benin City', country: 'Nigeria', name: 'Benin Airport' },
  'MIU': { code: 'MIU', city: 'Maiduguri', country: 'Nigeria', name: 'Maiduguri International Airport' },
  'SKO': { code: 'SKO', city: 'Sokoto', country: 'Nigeria', name: 'Sadiq Abubakar III International Airport' },
  'JFK': { code: 'JFK', city: 'New York', country: 'USA', name: 'John F. Kennedy International Airport' },
  'LHR': { code: 'LHR', city: 'London', country: 'UK', name: 'Heathrow Airport' },
  'CDG': { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  'DXB': { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
  'ADD': { code: 'ADD', city: 'Addis Ababa', country: 'Ethiopia', name: 'Addis Ababa Bole International Airport' },
  'ACC': { code: 'ACC', city: 'Accra', country: 'Ghana', name: 'Kotoka International Airport' },
  'NBO': { code: 'NBO', city: 'Nairobi', country: 'Kenya', name: 'Jomo Kenyatta International Airport' },
  'JNB': { code: 'JNB', city: 'Johannesburg', country: 'South Africa', name: 'O.R. Tambo International Airport' },
  'CAI': { code: 'CAI', city: 'Cairo', country: 'Egypt', name: 'Cairo International Airport' },
  'IST': { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },
  'DOH': { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International Airport' },
  'FRA': { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport' },
  'AMS': { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Schiphol Airport' },
  'BKK': { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport' },
  'NRT': { code: 'NRT', city: 'Tokyo', country: 'Japan', name: 'Narita International Airport' },
  'SIN': { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Singapore Changi Airport' },
  'HKG': { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong', name: 'Hong Kong International Airport' },
  'YYZ': { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International Airport' },
  'LAX': { code: 'LAX', city: 'Los Angeles', country: 'USA', name: 'Los Angeles International Airport' },
  'MIA': { code: 'MIA', city: 'Miami', country: 'USA', name: 'Miami International Airport' },
  'ATL': { code: 'ATL', city: 'Atlanta', country: 'USA', name: 'Hartsfield-Jackson Atlanta International Airport' },
  'ORD': { code: 'ORD', city: 'Chicago', country: 'USA', name: 'O\'Hare International Airport' },
  'MAD': { code: 'MAD', city: 'Madrid', country: 'Spain', name: 'Madrid-Barajas Airport' },
  'MUC': { code: 'MUC', city: 'Munich', country: 'Germany', name: 'Munich Airport' },
  'MXP': { code: 'MXP', city: 'Milan', country: 'Italy', name: 'Milan Malpensa Airport' },
  'BCN': { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'Barcelona-El Prat Airport' },
};

export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export function findAirport(search: string): Airport | null {
  const query = search.toUpperCase().trim();
  
  // If it's exactly 3 letters, try to find as code
  if (query.length === 3) {
    const found = AIRPORT_DATABASE[query as keyof typeof AIRPORT_DATABASE];
    if (found) return found;
  }
  
  // Search by city name (case insensitive)
  const cityMatch = Object.values(AIRPORT_DATABASE).find(
    airport => airport.city.toUpperCase() === query
  );
  if (cityMatch) return cityMatch;
  
  // Search by partial city name (e.g., "Lagos" matches "Lagos")
  const partialMatch = Object.values(AIRPORT_DATABASE).find(
    airport => airport.city.toUpperCase().includes(query)
  );
  if (partialMatch) return partialMatch;
  
  // Search by country
  const countryMatch = Object.values(AIRPORT_DATABASE).find(
    airport => airport.country.toUpperCase().includes(query)
  );
  if (countryMatch) return countryMatch;
  
  return null;
}

export function searchAirports(query: string): Airport[] {
  const q = query.toUpperCase().trim();
  
  if (!q) return [];
  
  const results = Object.values(AIRPORT_DATABASE).filter(airport => {
    return (
      airport.code.includes(q) ||
      airport.city.toUpperCase().includes(q) ||
      airport.country.toUpperCase().includes(q) ||
      airport.name.toUpperCase().includes(q)
    );
  });
  
  return results.slice(0, 10); // Limit to 10 results
}

export function getAllAirports(): Airport[] {
  return Object.values(AIRPORT_DATABASE);
}

export function getAirportCodes(): string[] {
  return Object.keys(AIRPORT_DATABASE);
}

export function getCityName(code: string): string {
  const airport = AIRPORT_DATABASE[code as keyof typeof AIRPORT_DATABASE];
  return airport ? airport.city : code;
}

export function getAirportName(code: string): string {
  const airport = AIRPORT_DATABASE[code as keyof typeof AIRPORT_DATABASE];
  return airport ? airport.name : `${code} Airport`;
}