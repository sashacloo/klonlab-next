'use client'

import React from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useKeyboardControls, KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import * as THREE from 'three'

interface Scene3DProps {
  isActive: boolean
}

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
]

function PlayerController() {
  const playerRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [, get] = useKeyboardControls()
  
  const speed = 5

  useFrame((state, delta) => {
    if (!playerRef.current) return

    const { forward, backward, leftward, rightward } = get()
    
    const direction = new THREE.Vector3()
    
    if (forward) direction.z -= 1
    if (backward) direction.z += 1
    if (leftward) direction.x -= 1
    if (rightward) direction.x += 1
    
    direction.normalize().multiplyScalar(speed * delta)
    
    playerRef.current.position.add(direction)
    
    camera.position.copy(playerRef.current.position)
    camera.position.y += 0
  })

  return <group ref={playerRef} position={[0, 0, 0]} />
}

function TunnelScene() {
  const tunnelEntranceRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (tunnelEntranceRef.current) {
      // Animate tunnel entrance moving away from camera
      const time = state.clock.elapsedTime
      tunnelEntranceRef.current.position.z = -time * 2 // Move away at 2 units per second
    }
  })

  return (
    <>
      <PlayerController />
      
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[0, 5, -10]} intensity={1.2} color="#4a90e2" />
      <pointLight position={[0, 5, -30]} intensity={1.2} color="#e24a90" />
      
      {/* Moving wall inside tunnel */}
      <group ref={tunnelEntranceRef} position={[0, 0, 0]}>
        {/* Wall that travels through tunnel */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[15.5, 7.5, 0.1]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </group>
      
      {/* Tunnel walls - start from camera position */}
      <group>
        {/* Left wall */}
        <mesh position={[-8, 0, -25]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 8, 50]} />
          <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.1} />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[8, 0, -25]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 8, 50]} />
          <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.1} />
        </mesh>
        
        {/* Ceiling */}
        <mesh position={[0, 4, -25]} receiveShadow>
          <boxGeometry args={[16, 0.5, 50]} />
          <meshStandardMaterial color="#555555" roughness={0.7} />
        </mesh>
        
        {/* Floor */}
        <mesh position={[0, -4, -25]} receiveShadow>
          <boxGeometry args={[16, 0.5, 50]} />
          <meshStandardMaterial color="#777777" roughness={0.5} metalness={0.2} />
        </mesh>
        
        {/* Neon strips */}
        <mesh position={[-7.8, 1, -25]}>
          <boxGeometry args={[0.1, 0.2, 48]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[7.8, 1, -25]}>
          <boxGeometry args={[0.1, 0.2, 48]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
        </mesh>
      </group>
      
      {/* Extended tunnel */}
      <group position={[0, 0, -30]}>
        <mesh position={[-8, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 8, 20]} />
          <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[8, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 8, 20]} />
          <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[0, 4, 0]} receiveShadow>
          <boxGeometry args={[16, 0.5, 20]} />
          <meshStandardMaterial color="#555555" roughness={0.7} />
        </mesh>
        <mesh position={[0, -4, 0]} receiveShadow>
          <boxGeometry args={[16, 0.5, 20]} />
          <meshStandardMaterial color="#777777" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>
    </>
  )
}

function WebGLErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasWebGLError, setHasWebGLError] = React.useState(false)

  React.useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setHasWebGLError(true)
    }
  }, [])

  if (hasWebGLError) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h2 className="text-2xl mb-4">WebGL Not Supported</h2>
          <p className="mb-4">Your browser doesn't support WebGL or it's disabled.</p>
          <p className="text-sm opacity-80">Please try a different browser or enable WebGL.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export function Scene3D({ isActive }: Scene3DProps) {
  if (!isActive) return null

  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 z-50 bg-black">
        <Canvas
          camera={{
            position: [0, 0, 0],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
          }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          }}
        >
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <KeyboardControls map={keyboardMap}>
                <TunnelScene />
              </KeyboardControls>
            </Physics>
          </Suspense>
        </Canvas>
        
        {/* Debug info */}
        <div className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded">
          3D Scene Active
        </div>
      </div>
    </WebGLErrorBoundary>
  )
}
