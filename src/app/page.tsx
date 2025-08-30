'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LandingPage } from '@/components/LandingPage'
import { Scene3D } from '@/components/Scene3D'

export default function Home() {
  const [showExperience, setShowExperience] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnterExperience = () => {
    setIsTransitioning(true)
    
    // Delay the 3D scene activation to allow for transition animation
    setTimeout(() => {
      setShowExperience(true)
      setIsTransitioning(false)
    }, 2000)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!showExperience && !isTransitioning && (
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
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-white text-2xl font-bold"
            >
              Entering Experience...
            </motion.div>
            
            {/* Tunnel effect overlay */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 50, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 border-4 border-white rounded-full"
            />
          </motion.div>
        )}

        {showExperience && (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Scene3D isActive={true} />
            
            {/* Instructions overlay */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-8 left-8 z-50 text-white"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                <h3 className="font-bold mb-2">Controls</h3>
                <p className="text-sm opacity-80">
                  WASD / Arrow Keys: Move<br/>
                  Mouse: Look around<br/>
                  Walk into rooms to explore
                </p>
              </div>
            </motion.div>

            {/* Exit button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              onClick={() => {
                setShowExperience(false)
                setIsTransitioning(false)
              }}
              className="absolute top-8 right-8 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              Exit Experience
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
