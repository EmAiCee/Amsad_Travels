'use client'

import { AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ErrorDisplayProps {
  error: string | null
  onClose?: () => void
}

export default function ErrorDisplay({ error, onClose }: ErrorDisplayProps) {
  if (!error) return null

  // Check if it's a validation error with suggestions
  const isValidationError = error.includes('not a valid city') || error.includes('not a valid airport')
  
  // Extract different parts of the error message
  const lines = error.split('\n').filter(line => line.trim())
  const mainError = lines[0] || error
  const suggestion = lines.find(line => line.includes('💡') || line.includes('Please enter'))
  const examples = lines.find(line => line.includes('📝') || line.includes('Examples'))
  const popular = lines.find(line => line.includes('🏙️') || line.includes('Popular cities'))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-4"
      >
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-blue-600" size={18} />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-blue-800">
                  {mainError}
                </p>
                
                {suggestion && (
                  <p className="mt-1 text-sm text-blue-700">
                    {suggestion.replace('💡', 'Tip:')}
                  </p>
                )}

                {examples && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Example
                    </p>
                    <p className="text-sm text-blue-700">
                      {examples.replace('📝', '')}
                    </p>
                  </div>
                )}

                {popular && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Popular Destinations
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {popular.replace('🏙️ Popular cities:', '').split(',').slice(0, 8).map((city) => (
                        <span 
                          key={city.trim()} 
                          className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {city.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!isValidationError && (
                  <p className="mt-2 text-sm text-blue-700">
                    {error}
                  </p>
                )}
              </div>
              
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 ml-4 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}