'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Plane, Calendar, Users } from 'lucide-react'
import Button from '../common/Button'
import Container from '../ui/Container'

export default function HeroSection() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    passengers: '1'
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate inputs
      if (!searchData.origin || !searchData.destination || !searchData.departureDate) {
        alert('Please fill in all required fields')
        setLoading(false)
        return
      }

      // Build search query
      const params = new URLSearchParams({
        origin: searchData.origin.toUpperCase(),
        destination: searchData.destination.toUpperCase(),
        departureDate: searchData.departureDate,
        adults: searchData.passengers,
      })

      // Redirect to flights page with search params
      router.push(`/flights?${params.toString()}`)
    } catch (error) {
      console.error('Search error:', error)
      alert('Failed to search. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 to-brand-dark/30" />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
            backgroundAttachment: 'fixed'
          }}
        />
      </div>

      {/* Content */}
      <Container>
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="text-white text-sm">✈️ Explore the World</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover Your
              <span className="gradient-primary bg-clip-text text-transparent block">
                Next Adventure
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
              Find the best flights, hotels, and holiday packages at unbeatable prices. 
              Your journey begins here.
            </p>
          </motion.div>

          {/* Search Form - Now Functional */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl"
          >
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                  <input
                    type="text"
                    placeholder="From (e.g., LOS)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                    value={searchData.origin}
                    onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
                    required
                  />
                </div>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary rotate-45" size={18} />
                  <input
                    type="text"
                    placeholder="To (e.g., LHR)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                    required
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                    value={searchData.departureDate}
                    onChange={(e) => setSearchData({...searchData, departureDate: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full h-[52px]"
                  disabled={loading}
                >
                  <Search size={20} />
                  {loading ? 'Searching...' : 'Search Now'}
                </Button>
              </div>

              <div className="mt-3 relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all appearance-none bg-white"
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}