import { Img, staticFile, useCurrentFrame, interpolate, AbsoluteFill } from 'remotion'

export const AbstractScene: React.FC = () => {
  const frame = useCurrentFrame()
  
  const rotation = interpolate(frame, [0, 180], [0, 10])
  const scale = interpolate(frame, [0, 180], [1.0, 1.2])
  const opacity = interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0])

  return (
    <AbsoluteFill>
      <Img 
        src={staticFile('abstract.png')} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          opacity
        }} 
      />
      <AbsoluteFill style={{ 
        mixBlendMode: 'overlay',
        background: 'radial-gradient(circle, transparent 0%, rgba(3,7,18,0.5) 100%)' 
      }} />
    </AbsoluteFill>
  )
}
