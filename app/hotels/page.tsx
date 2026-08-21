'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/common/Button'
import Card from '@/components/ui/Card'
import ErrorDisplay from '@/components/ui/ErrorDisplay'
import { Search, MapPin, Star, Users, Calendar, Bed } from 'lucide-react'

interface Hotel {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  price: { amount: number; currency: string; perNight: number };
  amenities: string[];
  image: string;
  stars: number;
  description: string;
  availability: boolean;
}

export default function HotelsPage() {
  const [loading, setLoading] = useState(false)
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  })

  // Helper functions defined inside the component
  const getToday = (): string => {
    return new Date().toISOString().split('T')[0]
  }

  const getMinCheckOut = (): string => {
    if (searchParams.checkIn) {
      const date = new Date(searchParams.checkIn)
      date.setDate(date.getDate() + 1)
      return date.toISOString().split('T')[0]
    }
    return getToday()
  }

  const getNights = (): number => {
    if (searchParams.checkIn && searchParams.checkOut) {
      const checkInDate = new Date(searchParams.checkIn)
      const checkOutDate = new Date(searchParams.checkOut)
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
    }
    return 1
  }

  const searchHotels = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setHotels([])
    setError(null)

    try {
      // Validate that check-out is not empty
      if (!searchParams.checkOut) {
        setError('Check-out date is required. Please select a check-out date.')
        setLoading(false)
        return
      }

      const queryParams = new URLSearchParams({
        destination: searchParams.destination,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests,
      })

      const response = await fetch(`/api/hotels/search?${queryParams}`)
      const data = await response.json()

      if (!response.ok) {
        let errorMessage = data.error || 'Unable to complete your search'
        
        if (data.suggestion) {
          errorMessage += `\n\n${data.suggestion}`
        }
        
        setError(errorMessage)
        setLoading(false)
        return
      }

      if (data.data && data.data.length === 0) {
        setError('No hotels available for this destination on the selected dates. Try adjusting your search.')
      } else {
        setHotels(data.data || [])
      }
    } catch (error) {
      console.error('Search error:', error)
      setError('Unable to connect to our hotel service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const today = getToday()
  const minCheckOut = getMinCheckOut()
  const nights = getNights()

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="gradient-secondary py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Find Your Perfect Stay
            </h1>
            <form onSubmit={searchHotels}>
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
                {/* Row 1: Destination, Check-in, Check-out, Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <input
                        type="text"
                        placeholder="City name (e.g., Lagos)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
                        value={searchParams.checkIn}
                        onChange={(e) => {
                          const newCheckIn = e.target.value
                          // Auto-set check-out to day after check-in
                          const newCheckOut = newCheckIn ? (() => {
                            const date = new Date(newCheckIn)
                            date.setDate(date.getDate() + 1)
                            return date.toISOString().split('T')[0]
                          })() : ''
                          
                          setSearchParams({
                            ...searchParams, 
                            checkIn: newCheckIn,
                            checkOut: searchParams.checkOut || newCheckOut
                          })
                        }}
                        required
                        min={today}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
                        value={searchParams.checkOut}
                        onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                        required
                        min={minCheckOut}
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button type="submit" variant="secondary" className="w-full h-[52px]" disabled={loading}>
                      <Search size={20} />
                      {loading ? 'Searching...' : 'Search Hotels'}
                    </Button>
                  </div>
                </div>
                
                {/* Row 2: Guests */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                      <select
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 appearance-none bg-white"
                        value={searchParams.guests}
                        onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Help text */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    💡 Check-out must be at least one day after check-in
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

      {/* Hotel Results */}
      <Container className="py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-secondary border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Searching for available hotels...</p>
          </div>
        )}

        {hotels.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{hotels.length} hotels found</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {hotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-64 h-48 md:h-auto">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{hotel.name}</h3>
                            <p className="text-gray-500 flex items-center gap-1">
                              <MapPin size={14} />
                              {hotel.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{hotel.rating}</span>
                            <span className="text-sm text-gray-500">({hotel.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 my-3">
                          <div className="flex items-center gap-1">
                            <Bed size={16} className="text-brand-secondary" />
                            <span className="text-sm">{hotel.stars} Star</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} className="text-brand-secondary" />
                            <span className="text-sm">{searchParams.guests} Guests</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 4).map((amenity) => (
                            <span key={amenity} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                              +{hotel.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-brand-secondary">
                              ₦{hotel.price.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">Total for {nights} night{nights > 1 ? 's' : ''}</p>
                          </div>
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {!loading && hotels.length === 0 && !error && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Search for Hotels</h3>
            <p className="text-gray-400">Enter your destination and dates above to find available hotels</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Lagos</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Abuja</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Port Harcourt</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Ibadan</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Kano</span>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}