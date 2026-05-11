import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Sparkles, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function RotatingGroup() {
  const group = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Mouse tracking interpolation
    const targetRotationY = state.mouse.x * 0.5
    const targetRotationX = -state.mouse.y * 0.5
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY + t * 0.1, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05)
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 128, 128]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>

      {/* Floating abstract elements */}
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={2} floatIntensity={2}>
          <Sphere 
            args={[0.1, 16, 16]} 
            position={[
              Math.sin(i) * 4,
              Math.cos(i) * 4,
              Math.sin(i * 2) * 2
            ]}
          >
            <meshStandardMaterial color={i % 2 === 0 ? "#a855f7" : "#f43f5e"} emissive="#ffffff" emissiveIntensity={0.5} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export default function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <Environment preset="city" />
      
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow />
      <pointLight position={[-10, -10, -10]} color="#6366f1" intensity={5} />
      
      <RotatingGroup />

      <Sparkles count={200} scale={10} size={2} speed={0.5} opacity={0.5} color="#ffffff" />
      
      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />
    </>
  )
}
