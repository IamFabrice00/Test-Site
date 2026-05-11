import { Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion'
import { MilanoScene } from './components/MilanoScene'
import { TechScene } from './components/TechScene'
import { AbstractScene } from './components/AbstractScene'
import { Title } from './components/Title'

export const PromoComposition: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: '#030712' }}>
      {/* Background Music could be added here */}
      
      <Sequence from={0} durationInFrames={180}>
        <MilanoScene />
      </Sequence>

      <Sequence from={180} durationInFrames={180}>
        <TechScene />
      </Sequence>

      <Sequence from={360} durationInFrames={180}>
        <AbstractScene />
      </Sequence>

      <Sequence from={540} durationInFrames={180}>
        <TechScene showAlternative />
      </Sequence>

      <Sequence from={720} durationInFrames={180}>
        <MilanoScene showFinal />
      </Sequence>

      {/* Global Title Overlays */}
      <Title />
    </AbsoluteFill>
  )
}
