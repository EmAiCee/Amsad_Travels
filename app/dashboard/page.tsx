'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Calendar, 
  Plane, 
  Hotel, 
  MapPin, 
  Heart, 
  Bell, 
  Settings, 
  LogOut,
  Search,
  ChevronRight,
  Star,
  Clock,
  CreditCard,
  Globe,
  Users,
  Plus,
  Menu,
  X
} from 'lucide-react'
import Image from 'next/image'

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: '2024',
    trips: 12,
    savedDestinations: 8,
    loyaltyPoints: 2450
  }

  // Mock upcoming trips
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
      dates: 'Jun 15 - Jun 22, 2025',
      status: 'Confirmed',
      flight: 'GA 872',
      hotel: 'The Mulia Resort'
    },
    {
      id: 2,
      destination: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
      dates: 'Aug 3 - Aug 10, 2025',
      status: 'Pending',
      flight: 'AF 381',
      hotel: 'Le Meurice'
    }
  ]

  // Mock recent bookings
  const recentBookings = [
    {
      id: 1,
      type: 'Flight',
      details: 'JFK → LAX',
      date: 'May 10, 2025',
      status: 'Completed',
      price: '$449'
    },
    {
      id: 2,
      type: 'Hotel',
      details: 'Grand Hotel, Rome',
      date: 'Apr 28, 2025',
      status: 'Completed',
      price: '$1,280'
    }
  ]

  // Mock saved destinations
  const savedDestinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
      savedDate: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
      savedDate: '1 month ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="gradient-primary rounded-xl w-10 h-10 flex items-center justify-center">
                <span className="text-xl font-bold text-white">TH</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">TravelHaven</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md mx-4">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search destinations, hotels, flights..." 
                className="bg-transparent outline-none px-3 flex-1 text-sm"
              />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <span className="hidden sm:block text-sm font-medium">{user.name}</span>
              </div>
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-2 text-sm">
                  <span className="text-brand-primary font-medium">Member since {user.memberSince}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 py-4 border-b border-gray-100">
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-primary">{user.trips}</p>
                  <p className="text-xs text-gray-500">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-primary">{user.savedDestinations}</p>
                  <p className="text-xs text-gray-500">Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-primary">{user.loyaltyPoints}</p>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1 pt-4">
                {[
                  { id: 'overview', icon: User, label: 'Overview' },
                  { id: 'trips', icon: Plane, label: 'My Trips' },
                  { id: 'bookings', icon: Calendar, label: 'Bookings' },
                  { id: 'saved', icon: Heart, label: 'Saved' },
                  { id: 'wallet', icon: CreditCard, label: 'Wallet' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      activeTab === item.id
                        ? 'bg-brand-primary/10 text-brand-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-6 sm:p-8 text-white mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user.name}! 👋</h1>
                  <p className="text-white/80 mt-1">Ready for your next adventure?</p>
                </div>
                <button className="mt-4 sm:mt-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  Plan New Trip
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Upcoming Trips', value: upcomingTrips.length, icon: Calendar, color: 'text-blue-500' },
                { label: 'Bookings', value: recentBookings.length, icon: CreditCard, color: 'text-green-500' },
                { label: 'Saved Places', value: user.savedDestinations, icon: MapPin, color: 'text-pink-500' },
                { label: 'Loyalty Points', value: user.loyaltyPoints, icon: Star, color: 'text-yellow-500' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`${stat.color}`} size={20} />
                    <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Upcoming Trips */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Upcoming Trips</h2>
                <Link href="/trips" className="text-sm text-brand-primary hover:text-red-600 flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="relative w-full sm:w-40 h-32 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image 
                        src={trip.image} 
                        alt={trip.destination}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{trip.destination}</h3>
                          <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} /> {trip.dates}
                            </span>
                            <span className="flex items-center gap-1">
                              <Plane size={14} /> {trip.flight}
                            </span>
                            <span className="flex items-center gap-1">
                              <Hotel size={14} /> {trip.hotel}
                            </span>
                          </div>
                        </div>
                        <span className={`mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings & Saved Destinations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Recent Bookings</h2>
                  <Link href="/bookings" className="text-sm text-brand-primary hover:text-red-600 flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            booking.type === 'Flight' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {booking.type}
                          </span>
                          <span className="text-sm font-medium">{booking.details}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>{booking.date}</span>
                          <span className="text-green-600">{booking.status}</span>
                        </div>
                      </div>
                      <span className="font-semibold">{booking.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Destinations */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Saved Destinations</h2>
                  <Link href="/saved" className="text-sm text-brand-primary hover:text-red-600 flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {savedDestinations.map((dest) => (
                    <div key={dest.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                          src={dest.image} 
                          alt={dest.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{dest.name}</h4>
                        <p className="text-xs text-gray-500">Saved {dest.savedDate}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-full">
                        <Heart size={18} className="fill-pink-500 text-pink-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-16 right-0 w-64 bg-white rounded-xl shadow-xl p-4 m-2" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1">
              {[
                { id: 'overview', icon: User, label: 'Overview' },
                { id: 'trips', icon: Plane, label: 'My Trips' },
                { id: 'bookings', icon: Calendar, label: 'Bookings' },
                { id: 'saved', icon: Heart, label: 'Saved' },
                { id: 'wallet', icon: CreditCard, label: 'Wallet' },
                { id: 'settings', icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    activeTab === item.id
                      ? 'bg-brand-primary/10 text-brand-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}