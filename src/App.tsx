import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Suspense } from 'react'

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </div>
      <Overlay />
    </>
  )
}


export default App
