import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion'

export const Title: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const opacity = interpolate(frame, [0, 15, 885, 900], [0, 1, 1, 0])
  
  const getSpring = (offset: number) => spring({
    frame: frame - offset,
    fps,
    config: { damping: 12 }
  })

  return (
    <AbsoluteFill style={{ 
      opacity, 
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      {frame >= 0 && frame < 180 && (
        <div style={{ transform: `scale(${getSpring(0)})`, textAlign: 'center' }}>
          <h2 style={{ fontSize: '60px', fontWeight: 300, marginBottom: '20px' }}>MILANO</h2>
          <h1 style={{ fontSize: '120px', fontWeight: 900, lineHeight: 1 }}>FUTURE <br /> <span style={{ color: '#6366f1' }}>LAB</span></h1>
        </div>
      )}

      {frame >= 180 && frame < 360 && (
        <div style={{ transform: `scale(${getSpring(180)})`, textAlign: 'center' }}>
          <h2 style={{ fontSize: '60px', fontWeight: 300, marginBottom: '20px' }}>SITI WEB</h2>
          <h1 style={{ fontSize: '100px', fontWeight: 900, lineHeight: 1 }}>DESIGN <br /> <span style={{ color: '#f43f5e' }}>PREMIUM</span></h1>
        </div>
      )}

      {frame >= 360 && frame < 540 && (
        <div style={{ transform: `scale(${getSpring(360)})`, textAlign: 'center' }}>
          <h2 style={{ fontSize: '60px', fontWeight: 300, marginBottom: '20px' }}>CREATIVITÀ</h2>
          <h1 style={{ fontSize: '100px', fontWeight: 900, lineHeight: 1 }}>EXPERIENCE <br /> <span style={{ color: '#a855f7' }}>UNIQUE</span></h1>
        </div>
      )}

      {frame >= 540 && frame < 720 && (
        <div style={{ transform: `scale(${getSpring(540)})`, textAlign: 'center' }}>
          <h2 style={{ fontSize: '60px', fontWeight: 300, marginBottom: '20px' }}>TECNOLOGIA</h2>
          <h1 style={{ fontSize: '110px', fontWeight: 900, lineHeight: 1 }}>FAST & <br /> <span style={{ color: '#6366f1' }}>MODERN</span></h1>
        </div>
      )}

      {frame >= 720 && (
        <div style={{ transform: `scale(${getSpring(720)})`, textAlign: 'center' }}>
          <h2 style={{ fontSize: '60px', fontWeight: 300, marginBottom: '20px' }}>PRONTO A SCALARE?</h2>
          <h1 style={{ fontSize: '120px', fontWeight: 900, lineHeight: 1 }}>TEST SITE <br /> <span style={{ color: '#6366f1' }}>LAB</span></h1>
          <div style={{ marginTop: '60px', background: 'white', color: 'black', padding: '30px 60px', borderRadius: '99px', fontSize: '40px', fontWeight: 800 }}>
            LINK IN BIO
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}
