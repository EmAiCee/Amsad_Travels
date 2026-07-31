'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/common/Button'
import Card from '@/components/ui/Card'
import { Calendar, Users, Clock, MapPin, Star, ChevronRight } from 'lucide-react'

const packages = [
  {
    id: 1,
    title: 'Enchanting Europe',
    description: 'Discover the romance of Paris, the history of Rome, and the beauty of Barcelona',
    destination: 'Europe',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 2499,
    duration: '10 Days',
    group: 'Up to 12',
    rating: 4.9,
    reviews: 156,
    included: ['Flights', 'Hotels', 'Meals', 'Transport', 'Guided Tours']
  },
  // Add more packages...
]

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-dark py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Holiday Packages
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Curated travel experiences for every kind of explorer
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Packages Grid */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-64">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{pkg.rating}</span>
                    <span className="text-sm text-gray-500">({pkg.reviews})</span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{pkg.title}</h3>
                      <p className="text-gray-500 flex items-center gap-1">
                        <MapPin size={14} />
                        {pkg.destination}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-brand-primary">
                      ${pkg.price}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={16} className="text-brand-secondary" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} className="text-brand-secondary" />
                      {pkg.group} people
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} className="text-brand-secondary" />
                      Flexible dates
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.included.map((item) => (
                      <span key={item} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                        ✓ {item}
                      </span>
                    ))}
                  </div>

                  <Button variant="primary" className="mt-auto">
                    View Details <ChevronRight size={18} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  )
}