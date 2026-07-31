'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Container from '@/components/ui/Container'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log('Login attempt:', formData)
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
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  icon={<Lock size={18} />}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-brand-primary hover:text-red-600">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500">
                Don't have an account?{' '}
                <Link href="/register" className="text-brand-primary font-medium hover:text-red-600">
                  Sign up now
                </Link>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  Facebook
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}