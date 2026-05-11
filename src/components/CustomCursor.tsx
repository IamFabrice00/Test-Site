import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useSpring(0, { damping: 20, stiffness: 250 })
  const mouseY = useSpring(0, { damping: 20, stiffness: 250 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.stack-card') ||
        target.closest('.value-card')
      
      setIsHovered(!!isClickable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: mouseX,
        y: mouseY,
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.8)',
        mixBlendMode: isHovered ? 'normal' : 'difference'
      }}
    />
  )
}
