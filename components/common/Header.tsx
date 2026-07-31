'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plane, Hotel, Package, User, Menu, X, LogOut } from 'lucide-react'
import Button from './Button'
import Container from '../ui/Container'

const navItems = [
  { name: 'Flights', href: '/flights', icon: Plane },
  { name: 'Hotels', href: '/hotels', icon: Hotel },
  { name: 'Packages', href: '/packages', icon: Package },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isAuthenticated = false // Will be replaced with actual auth state

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="gradient-primary rounded-lg p-2 shadow-md">
              <Plane size={24} className="rotate-45 text-white" />
            </div>
            <span className="text-2xl font-bold text-brand-dark">
              Amsad<span className="text-brand-primary">Travels</span>
            </span>
          </Link>
          

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg font-medium
                    transition-colors duration-200 relative
                    ${isActive 
                      ? 'text-brand-primary' 
                      : 'text-gray-600 hover:text-brand-primary'
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User size={18} />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <LogOut size={18} />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-brand-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${pathname === item.href 
                      ? 'bg-red-50 text-brand-primary' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-2 px-4">
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full">
                    <LogOut size={18} />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button variant="primary" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </Container>
    </header>
  )
}