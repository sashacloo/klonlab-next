'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

interface RoomProps {
  position: [number, number, number]
  isActive: boolean
  roomType: 'about' | 'portfolio' | 'contact' | 'services'
}

export function Room({ position, isActive, roomType }: RoomProps) {
  const roomRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (roomRef.current && isActive) {
      // Gentle floating animation when room is active
      roomRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const getRoomContent = () => {
    switch (roomType) {
      case 'about':
        return {
          title: 'About Studio',
          description: 'Creative digital experiences\nand innovative solutions',
          color: '#4a90e2'
        }
      case 'portfolio':
        return {
          title: 'Portfolio',
          description: 'Featured projects\nand case studies',
          color: '#e24a90'
        }
      case 'contact':
        return {
          title: 'Contact',
          description: 'Get in touch\nfor collaborations',
          color: '#90e24a'
        }
      case 'services':
        return {
          title: 'Services',
          description: 'Web development\nand digital design',
          color: '#e2904a'
        }
    }
  }

  const content = getRoomContent()

  return (
    <group ref={roomRef} position={position}>
      {/* Room structure */}
      <RigidBody type="fixed">
        {/* Floor */}
        <mesh position={[0, -2, 0]} receiveShadow>
          <boxGeometry args={[12, 0.2, 12]} />
          <meshStandardMaterial 
            color={isActive ? content.color : '#1a1a1a'} 
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
        <CuboidCollider args={[6, 0.1, 6]} position={[0, -2, 0]} />

        {/* Walls */}
        <mesh position={[-6, 2, 0]} castShadow>
          <boxGeometry args={[0.3, 8, 12]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[6, 2, 0]} castShadow>
          <boxGeometry args={[0.3, 8, 12]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0, 2, -6]} castShadow>
          <boxGeometry args={[12, 8, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0, 2, 6]} castShadow>
          <boxGeometry args={[12, 8, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>

        {/* Ceiling */}
        <mesh position={[0, 6, 0]}>
          <boxGeometry args={[12, 0.3, 12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </RigidBody>

      {/* Content display */}
      {isActive && (
        <group>
          {/* Title */}
          <Text
            position={[0, 3, -5.5]}
            fontSize={1.2}
            color={content.color}
            anchorX="center"
            anchorY="middle"
          >
            {content.title}
          </Text>

          {/* Description */}
          <Text
            position={[0, 1.5, -5.5]}
            fontSize={0.6}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            textAlign="center"
          >
            {content.description}
          </Text>

          {/* Interactive elements */}
          <mesh
            position={[0, 0, -5]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => {
              // Handle room interaction
              console.log(`Entered ${roomType} room`)
            }}
          >
            <boxGeometry args={[2, 1, 0.2]} />
            <meshStandardMaterial 
              color={hovered ? content.color : '#3a3a3a'}
              emissive={hovered ? content.color : '#000000'}
              emissiveIntensity={hovered ? 0.2 : 0}
            />
          </mesh>

          <Text
            position={[0, 0, -4.8]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            Enter
          </Text>

          {/* Ambient lighting for room */}
          <pointLight 
            position={[0, 4, 0]} 
            intensity={0.8} 
            color={content.color}
            distance={15}
          />
        </group>
      )}

      {/* Entry portal effect */}
      <mesh position={[0, 1, 6.1]} visible={isActive}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial 
          color={content.color}
          emissive={content.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
