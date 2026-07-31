'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Container from '@/components/ui/Container'


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration attempt:', formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-primary/10 via-white to-brand-secondary/10 py-20">
      <Container>
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="gradient-primary rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">TH</span>
              </div>
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-gray-500 mt-2">Start your journey with us</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon={<User size={18} />}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                icon={<Phone size={18} />}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  icon={<Lock size={18} />}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={<Lock size={18} />}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1 rounded" />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="text-brand-primary hover:text-red-600">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-brand-primary hover:text-red-600">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-primary font-medium hover:text-red-600">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}