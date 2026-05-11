import { Img, staticFile, useCurrentFrame, interpolate, AbsoluteFill } from 'remotion'

export const TechScene: React.FC<{ showAlternative?: boolean }> = ({ showAlternative }) => {
  const frame = useCurrentFrame()
  
  const scale = interpolate(frame, [0, 180], [1.2, 1.0])
  const opacity = interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0])

  return (
    <AbsoluteFill>
      <Img 
        src={staticFile('workspace.png')} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transform: `scale(${scale})`,
          filter: 'brightness(0.7) saturate(1.2)',
          opacity
        }} 
      />
      <AbsoluteFill style={{ 
        background: 'linear-gradient(45deg, rgba(99,102,241,0.2) 0%, transparent 100%)' 
      }} />
    </AbsoluteFill>
  )
}
