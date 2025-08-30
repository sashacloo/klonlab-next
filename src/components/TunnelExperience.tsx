'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls, KeyboardControls } from '@react-three/drei'
import * as THREE from 'three'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
]

export function TunnelExperience() {
  const playerRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [, get] = useKeyboardControls()
  
  const speed = 5

  useFrame((state, delta) => {
    if (!playerRef.current) return

    const { forward, backward, leftward, rightward } = get()
    
    // Movement
    const direction = new THREE.Vector3()
    
    if (forward) direction.z -= 1
    if (backward) direction.z += 1
    if (leftward) direction.x -= 1
    if (rightward) direction.x += 1
    
    direction.normalize().multiplyScalar(speed * delta)
    
    // Update position
    playerRef.current.position.add(direction)
    
    // Keep camera following player
    camera.position.copy(playerRef.current.position)
    camera.position.y += 1.6 // Eye level
  })

  return (
    <KeyboardControls map={keyboardMap}>
      <group>
        {/* Player (invisible) */}
        <group ref={playerRef} position={[0, 0, 0]} />

        {/* Simple tunnel */}
        <group>
          {/* Left wall */}
          <mesh position={[-5, 2, -10]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 8, 20]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          {/* Right wall */}
          <mesh position={[5, 2, -10]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 8, 20]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          {/* Ceiling */}
          <mesh position={[0, 6, -10]} receiveShadow>
            <boxGeometry args={[10, 0.5, 20]} />
            <meshStandardMaterial color="#0f0f23" />
          </mesh>

          {/* Floor */}
          <mesh position={[0, -2, -10]} receiveShadow>
            <boxGeometry args={[10, 0.5, 20]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        </group>

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
        />
        <pointLight position={[0, 5, -10]} intensity={0.8} color="#4a90e2" />
      </group>
    </KeyboardControls>
  )
}
