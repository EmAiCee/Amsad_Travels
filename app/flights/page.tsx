'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/common/Button'
import Card from '@/components/ui/Card'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { Plane, Calendar, Users, Clock, Search } from 'lucide-react'

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: { code: string; city: string; airport: string };
  destination: { code: string; city: string; airport: string };
  departure: { date: Date; time: string };
  arrival: { date: Date; time: string };
  duration: string;
  stops: number;
  price: { amount: number; currency: string };
  class: string;
  availableSeats: number;
}

const COMMON_AIRPORTS = [
  { code: 'LOS', city: 'Lagos, Nigeria' },
  { code: 'ABV', city: 'Abuja, Nigeria' },
  { code: 'PHC', city: 'Port Harcourt, Nigeria' },
  { code: 'KAN', city: 'Kano, Nigeria' },
  { code: 'ENU', city: 'Enugu, Nigeria' },
  { code: 'QOW', city: 'Owerri, Nigeria' },
  { code: 'LHR', city: 'London, UK' },
  { code: 'JFK', city: 'New York, USA' },
  { code: 'DXB', city: 'Dubai, UAE' },
  { code: 'CDG', city: 'Paris, France' },
  { code: 'FRA', city: 'Frankfurt, Germany' },
  { code: 'IST', city: 'Istanbul, Turkey' },
  { code: 'DOH', city: 'Doha, Qatar' },
  { code: 'ADD', city: 'Addis Ababa, Ethiopia' },
  { code: 'NBO', city: 'Nairobi, Kenya' },
  { code: 'JNB', city: 'Johannesburg, South Africa' },
];

export default function FlightsPage() {
  const [loading, setLoading] = useState(false)
  const [flights, setFlights] = useState<Flight[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: '1',
  })
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  const searchFlights = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFlights([])
    setError(null)

    try {
      const queryParams = new URLSearchParams({
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults,
      })

      if (searchParams.returnDate) {
        queryParams.append('returnDate', searchParams.returnDate)
      }

      const response = await fetch(`/api/flights/search?${queryParams}`)
      const data = await response.json()

      if (!response.ok) {
        let errorMessage = data.error || 'Unable to complete your search'
        
        if (data.suggestion) {
          errorMessage += `\n\n${data.suggestion}`
        }
        
        if (data.examples) {
          errorMessage += `\n\nExamples: ${data.examples}`
        }
        
        if (data.validCities) {
          errorMessage += `\n\nPopular cities: ${data.validCities}`
        }
        
        setError(errorMessage)
        setLoading(false)
        return
      }

      if (data.data && data.data.length === 0) {
        setError('No flights available for this route on the selected date. Try adjusting your search.')
      } else {
        setFlights(data.data || [])
      }
    } catch (error) {
      console.error('Search error:', error)
      setError('Unable to connect to our flight service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="gradient-primary py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Find Your Perfect Flight
            </h1>
            <form onSubmit={searchFlights}>
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
                {/* Row 1: From, To, Departure Date, Search Button */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      From
                    </label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                      <input
                        type="text"
                        placeholder="City or airport code"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        value={searchParams.origin}
                        onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                        onFocus={() => setShowOriginSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
                        required
                      />
                      {showOriginSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {COMMON_AIRPORTS
                            .filter(a => 
                              a.code.toLowerCase().includes(searchParams.origin.toLowerCase()) || 
                              a.city.toLowerCase().includes(searchParams.origin.toLowerCase())
                            )
                            .map((airport) => (
                              <button
                                key={airport.code}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex justify-between"
                                onClick={() => {
                                  setSearchParams({...searchParams, origin: airport.code})
                                  setShowOriginSuggestions(false)
                                }}
                              >
                                <span className="font-medium">{airport.code}</span>
                                <span className="text-gray-500">{airport.city}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      To
                    </label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary rotate-45" size={18} />
                      <input
                        type="text"
                        placeholder="City or airport code"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                        onFocus={() => setShowDestinationSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                        required
                      />
                      {showDestinationSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {COMMON_AIRPORTS
                            .filter(a => 
                              a.code.toLowerCase().includes(searchParams.destination.toLowerCase()) || 
                              a.city.toLowerCase().includes(searchParams.destination.toLowerCase())
                            )
                            .map((airport) => (
                              <button
                                key={airport.code}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex justify-between"
                                onClick={() => {
                                  setSearchParams({...searchParams, destination: airport.code})
                                  setShowDestinationSuggestions(false)
                                }}
                              >
                                <span className="font-medium">{airport.code}</span>
                                <span className="text-gray-500">{airport.city}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Departure Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        value={searchParams.departureDate}
                        onChange={(e) => setSearchParams({...searchParams, departureDate: e.target.value})}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button type="submit" variant="primary" className="w-full h-[52px]" disabled={loading}>
                      <Search size={20} />
                      {loading ? 'Searching...' : 'Search Flights'}
                    </Button>
                  </div>
                </div>
                
                {/* Row 2: Passengers and Return Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Passengers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <select
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 appearance-none bg-white"
                        value={searchParams.adults}
                        onChange={(e) => setSearchParams({...searchParams, adults: e.target.value})}
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Return Date <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <input
                        type="date"
                        placeholder="Select return date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        value={searchParams.returnDate}
                        onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})}
                        min={searchParams.departureDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Help text */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    💡 Leave "Return Date" empty for one-way flights
                  </span>
                </div>
              </div>
            </form>
          </motion.div>
        </Container>
      </section>

      {/* Error Display */}
      <Container className="py-4">
        <ErrorDisplay 
          error={error} 
          onClose={() => setError(null)}
        />
      </Container>

      {/* Flight Results */}
      <Container className="py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Searching for available flights...</p>
          </div>
        )}

        {flights.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{flights.length} flights found</p>
            </div>

            <div className="space-y-4">
              {flights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex-1 flex items-center gap-6">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <Plane className="text-brand-primary rotate-45" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{flight.airline}</h3>
                          <p className="text-sm text-gray-500">{flight.origin.code} → {flight.destination.code}</p>
                          <p className="text-xs text-gray-400">Flight {flight.flightNumber}</p>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center gap-8">
                        <div className="text-center">
                          <p className="font-semibold text-lg">{flight.departure.time}</p>
                          <p className="text-xs text-gray-500">{flight.origin.code}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-500">{flight.duration}</span>
                          </div>
                          <div className="w-24 h-px bg-gray-300 relative">
                            <div className="w-2 h-2 bg-brand-primary rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
                          </div>
                          <p className="text-xs text-gray-500">{flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-lg">{flight.arrival.time}</p>
                          <p className="text-xs text-gray-500">{flight.destination.code}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-2xl font-bold text-brand-primary">
                          ₦{flight.price.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">{flight.class}</p>
                        <Button variant="primary" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {!loading && flights.length === 0 && !error && (
          <div className="text-center py-12">
            <Plane size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Search for Flights</h3>
            <p className="text-gray-400">Enter your travel details above to find available flights</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {COMMON_AIRPORTS.slice(0, 12).map((airport) => (
                <span key={airport.code} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {airport.code} - {airport.city}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}