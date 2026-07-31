import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-red-600 focus:ring-red-500 shadow-lg hover:shadow-red-500/30',
    secondary: 'bg-brand-secondary text-white hover:bg-blue-600 focus:ring-blue-500 shadow-lg hover:shadow-blue-500/30',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',
    ghost: 'text-brand-primary hover:bg-red-50 focus:ring-brand-primary'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-3',
    lg: 'px-8 py-4 text-lg gap-3'
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="animate-spin" size={20} />}
      {children}
    </motion.button>
  )
}