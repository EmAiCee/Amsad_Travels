'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../ui/Card'
import Container from '../ui/Container'
import { MapPin, Star } from 'lucide-react'

interface Destination {
  id: string
  name: string
  image: string
  price: string
  rating: number
  reviews: number
  city: string
  country: string
  currency: string
}

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Fetch real popular destinations from your API
        const response = await fetch('/api/destinations/popular')
        const data = await response.json()
        
        if (data.success) {
          setDestinations(data.data)
        } else {
          // Fallback to mock data if API fails
          setDestinations(getMockDestinations())
        }
      } catch (error) {
        console.error('Error fetching destinations:', error)
        // Fallback to mock data
        setDestinations(getMockDestinations())
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const getMockDestinations = (): Destination[] => {
    return [
      {
        id: '1',
        name: 'Paris, France',
        city: 'Paris',
        country: 'France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: '₦450,000',
        rating: 4.8,
        reviews: 1243,
        currency: 'NGN'
      },
      {
        id: '2',
        name: 'Bali, Indonesia',
        city: 'Bali',
        country: 'Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: '₦280,000',
        rating: 4.9,
        reviews: 2156,
        currency: 'NGN'
      },
      {
        id: '3',
        name: 'Rome, Italy',
        city: 'Rome',
        country: 'Italy',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: '₦380,000',
        rating: 4.7,
        reviews: 987,
        currency: 'NGN'
      },
      {
        id: '4',
        name: 'Tokyo, Japan',
        city: 'Tokyo',
        country: 'Japan',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: '₦550,000',
        rating: 4.9,
        reviews: 1845,
        currency: 'NGN'
      }
    ]
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Loading destinations...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most sought-after destinations around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/flights?destination=${destination.city}`}>
                <Card className="group h-full">
                  <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{destination.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <MapPin size={14} />
                          {destination.reviews.toLocaleString()} reviews
                        </p>
                      </div>
                      <p className="text-lg font-bold text-brand-primary">
                        {destination.price}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Starting from</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}