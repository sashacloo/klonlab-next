'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

interface TunnelSegmentProps {
  position: [number, number, number]
}

export function TunnelSegment({ position }: TunnelSegmentProps) {
  const tunnelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (tunnelRef.current) {
      // Subtle animation for tunnel walls
      tunnelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.01
    }
  })

  return (
    <group ref={tunnelRef} position={position}>
      {/* Tunnel walls */}
      <RigidBody type="fixed">
        {/* Left wall */}
        <mesh position={[-8, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 8, 20]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        <CuboidCollider args={[0.25, 4, 10]} position={[-8, 2, 0]} />

        {/* Right wall */}
        <mesh position={[8, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 8, 20]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        <CuboidCollider args={[0.25, 4, 10]} position={[8, 2, 0]} />

        {/* Ceiling */}
        <mesh position={[0, 6, 0]} receiveShadow>
          <boxGeometry args={[16, 0.5, 20]} />
          <meshStandardMaterial 
            color="#0f0f23" 
            roughness={0.9}
          />
        </mesh>
        <CuboidCollider args={[8, 0.25, 10]} position={[0, 6, 0]} />
      </RigidBody>

      {/* Decorative elements */}
      <group>
        {/* Neon strips */}
        <mesh position={[-7.8, 3, 0]}>
          <boxGeometry args={[0.1, 0.2, 18]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[7.8, 3, 0]}>
          <boxGeometry args={[0.1, 0.2, 18]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Floor panels */}
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[0, -1.9, -8 + i * 2]} receiveShadow>
            <boxGeometry args={[14, 0.1, 1.8]} />
            <meshStandardMaterial 
              color="#2a2a2a" 
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
