'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/common/Button'
import Card from '@/components/ui/Card'
import { Search, MapPin, Star, Users, Wifi, Coffee, Parking, Bed } from 'lucide-react'

const hotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 342,
    price: 299,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
    stars: 5
  },
  // Add more hotels...
]

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
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
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                  <input
                    type="text"
                    placeholder="Search hotels by city or destination..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative w-full md:w-48">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={18} />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 appearance-none bg-white">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
                <Button variant="secondary" className="w-full md:w-auto h-[52px]">
                  <Search size={20} />
                  Search Hotels
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Hotel Results */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-6">Filters</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Price Range</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="500" className="flex-1" />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Star Rating</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label key={stars} className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center">
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                          ))}
                          {Array.from({ length: 5 - stars }).map((_, i) => (
                            <Star key={i} size={16} className="text-gray-300" />
                          ))}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Amenities</label>
                  <div className="space-y-2">
                    {['Free WiFi', 'Pool', 'Parking', 'Restaurant', 'Spa'].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="rounded" />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
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
                          <span className="text-sm">5 Star</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} className="text-brand-secondary" />
                          <span className="text-sm">2 Guests</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity) => (
                          <span key={amenity} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-brand-secondary">
                            ${hotel.price}
                          </p>
                          <p className="text-sm text-gray-500">per night</p>
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
        </div>
      </Container>
    </div>
  )
}