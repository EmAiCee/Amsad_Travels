'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/common/Button'
import Card from '@/components/ui/Card'
import { Plane, Calendar, Users, ArrowRight, Clock, DollarSign } from 'lucide-react'

interface Flight {
  id: number
  airline: string
  from: string
  to: string
  departure: string
  arrival: string
  price: number
  duration: string
  stops: number
}

const sampleFlights: Flight[] = [
  {
    id: 1,
    airline: 'Delta Airlines',
    from: 'New York (JFK)',
    to: 'London (LHR)',
    departure: '08:00 AM',
    arrival: '08:30 PM',
    price: 549,
    duration: '7h 30m',
    stops: 0
  },
  {
    id: 2,
    airline: 'American Airlines',
    from: 'New York (JFK)',
    to: 'London (LHR)',
    departure: '11:30 AM',
    arrival: '11:45 PM',
    price: 489,
    duration: '8h 15m',
    stops: 1
  },
  // Add more flights...
]

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  })

  const [flights, setFlights] = useState(sampleFlights)

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
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                  <input
                    type="text"
                    placeholder="From"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary rotate-45" size={18} />
                  <input
                    type="text"
                    placeholder="To"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                  />
                </div>
                <Button variant="primary" className="w-full h-[52px]">
                  <Plane size={20} />
                  Search Flights
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Flight Results */}
      <Container className="py-12">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{flights.length} flights found</p>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Departure Time</option>
              <option>Duration</option>
            </select>
          </div>
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
                      <p className="text-sm text-gray-500">{flight.from} → {flight.to}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center gap-8">
                    <div>
                      <p className="font-semibold">{flight.departure}</p>
                      <p className="text-sm text-gray-500">Departure</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{flight.duration}</span>
                      </div>
                      <div className="w-24 h-px bg-gray-300 relative">
                        <div className="w-2 h-2 bg-brand-primary rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
                      </div>
                      <p className="text-xs text-gray-500">{flight.stops === 0 ? 'Direct' : `${flight.stops} stop`}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{flight.arrival}</p>
                      <p className="text-sm text-gray-500">Arrival</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-2xl font-bold text-brand-primary">
                      ${flight.price}
                    </p>
                    <Button variant="primary" size="sm">
                      Select <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  )
}