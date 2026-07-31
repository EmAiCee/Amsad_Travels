'use client'

import { motion } from 'framer-motion'
import { Search, Plane, Hotel, Calendar, Users } from 'lucide-react'
import Button from '../common/Button'
import Container from '../ui/Container'

export default function HeroSection() {
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
              <span className="text-white text-sm">Explore the World</span>
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

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary">
                  <Plane size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary">
                  <Users size={18} />
                </div>
                <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all appearance-none bg-white">
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
              </div>
              <Button variant="primary" className="w-full h-[52px]">
                <Search size={20} />
                Search Now
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}