import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import CustomCursor from './components/CustomCursor'
import { Loader, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

function App() {
  return (
    <>
      <CustomCursor />
      <div className="canvas-container">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
        <Loader />
      </div>
      
      <Overlay />
    </>
  )
}

export default App
