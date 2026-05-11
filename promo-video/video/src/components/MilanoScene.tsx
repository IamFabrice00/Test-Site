import { Img, staticFile, useCurrentFrame, interpolate, AbsoluteFill } from 'remotion'

export const MilanoScene: React.FC<{ showFinal?: boolean }> = ({ showFinal }) => {
  const frame = useCurrentFrame()
  
  const scale = interpolate(frame, [0, 180], [1.1, 1.3])
  const opacity = interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0])

  return (
    <AbsoluteFill>
      <Img 
        src={staticFile('skyline.png')} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transform: `scale(${scale})`,
          filter: 'brightness(0.6) contrast(1.2)',
          opacity
        }} 
      />
      <AbsoluteFill style={{ 
        background: 'linear-gradient(to top, rgba(3,7,18,0.8) 0%, transparent 100%)' 
      }} />
    </AbsoluteFill>
  )
}
