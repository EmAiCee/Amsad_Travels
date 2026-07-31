'use client'

import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Container from '../ui/Container'
import Button from '../common/Button'
import { Calendar, Users, Clock } from 'lucide-react'

const packages = [
  {
    id: 1,
    title: 'European Adventure',
    description: '7 days exploring the best of Europe',
    price: '$1,299',
    duration: '7 Days',
    group: 'Up to 15 people',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Tropical Paradise',
    description: '5 days in exotic beach destinations',
    price: '$899',
    duration: '5 Days',
    group: 'Up to 10 people',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Cultural Journey',
    description: '10 days discovering ancient civilizations',
    price: '$1,599',
    duration: '10 Days',
    group: 'Up to 12 people',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
]

export default function FeaturedPackages() {
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
              <Card className="h-full flex flex-col">
                <div 
                  className="h-48 bg-cover bg-center rounded-t-2xl"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{pkg.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
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
                    <span className="text-2xl font-bold text-brand-primary">{pkg.price}</span>
                    <Button variant="primary" size="sm">Book Now</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}