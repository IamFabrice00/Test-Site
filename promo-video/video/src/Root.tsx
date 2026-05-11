import { Composition } from 'remotion'
import { PromoComposition } from './PromoComposition'
import './index.css'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InstagramPromo"
        component={PromoComposition}
        durationInFrames={900} // 30 seconds at 30 fps
        fps={30}
        width={1080}
        height={1920} // Vertical format for Instagram
      />
    </>
  )
}
