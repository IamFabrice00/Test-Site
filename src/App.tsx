import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <Scene />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </div>
      <Overlay />
    </>
  )
}

export default App
