'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '../ui/Card'
import Container from '../ui/Container'
import Button from '../common/Button'
import { Calendar, Users, Clock, MapPin } from 'lucide-react'

interface Package {
  id: string
  title: string
  description: string
  price: string
  duration: string
  group: string
  image: string
  destination: string
  included: string[]
  rating: number
  reviews: number
}

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages/featured')
        const data = await response.json()
        
        if (data.success) {
          setPackages(data.data)
        } else {
          setPackages(getMockPackages())
        }
      } catch (error) {
        console.error('Error fetching packages:', error)
        setPackages(getMockPackages())
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const getMockPackages = (): Package[] => {
    return [
      {
        id: '1',
        title: 'European Adventure',
        description: '7 days exploring the best of Europe',
        price: '₦1,299,000',
        duration: '7 Days',
        group: 'Up to 15 people',
        destination: 'Europe',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        included: ['Flights', 'Hotels', 'Breakfast', 'Tours'],
        rating: 4.9,
        reviews: 156
      },
      {
        id: '2',
        title: 'Tropical Paradise',
        description: '5 days in exotic beach destinations',
        price: '₦899,000',
        duration: '5 Days',
        group: 'Up to 10 people',
        destination: 'Bali',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        included: ['Hotels', 'Meals', 'Transfers', 'Activities'],
        rating: 4.8,
        reviews: 215
      },
      {
        id: '3',
        title: 'Cultural Journey',
        description: '10 days discovering ancient civilizations',
        price: '₦1,599,000',
        duration: '10 Days',
        group: 'Up to 12 people',
        destination: 'Egypt',
        image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        included: ['Flights', 'Hotels', 'Meals', 'Guided Tours', 'Transport'],
        rating: 4.9,
        reviews: 184
      }
    ]
  }

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Holiday Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Loading packages...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Holiday Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Curated travel experiences designed for unforgettable memories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/packages/${pkg.id}`}>
                <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center rounded-t-2xl relative"
                    style={{ backgroundImage: `url(${pkg.image})` }}
                  >
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin size={14} className="text-brand-primary" />
                      <span className="text-xs font-medium">{pkg.destination}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{pkg.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {pkg.group}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        Flexible
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-brand-primary">{pkg.price}</span>
                        <p className="text-xs text-gray-500">per person</p>
                      </div>
                      <Button variant="primary" size="sm">Book Now</Button>
                    </div>
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