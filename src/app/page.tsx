'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LandingPage } from '@/components/LandingPage'

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnterExperience = () => {
    setIsTransitioning(true)
    
    // Delay the 3D scene activation to allow for transition animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 2000)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {!isTransitioning && (
          <motion.div
            key="landing"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              z: -1000,
              rotateX: 15
            }}
            transition={{ 
              duration: 2, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-0"
          >
            <LandingPage onEnterExperience={handleEnterExperience} />
          </motion.div>
        )}

        {isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 50, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 border-4 border-white rounded-full"
            />
          </motion.div>
        )}

        {(
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
