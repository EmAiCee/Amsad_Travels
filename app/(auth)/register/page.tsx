'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'  // ✅ Import router
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Container from '@/components/ui/Container'

export default function RegisterPage() {
  const router = useRouter()  // ✅ Initialize router
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)  // ✅ Add loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // ✅ Optional: Add password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Store tokens
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('refreshToken', data.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      // ✅ Better error handling
      console.error('Registration error:', error)
      // Optionally show error to user
      alert(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
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
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
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
                  required
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
                required
              />

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1 rounded" required />
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

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={isLoading}  // ✅ Disable while loading
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
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