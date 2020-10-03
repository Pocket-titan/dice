import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';

const Plane = (props: any) => {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
  );
};

const Cube = (props: any) => {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas
      concurrent
      shadowMap
      colorManagement
      gl={{ alpha: false }}
      camera={{ position: [-1, 1, 2.5], fov: 50 }}
      style={{
        backgroundColor: `rgb(${173}, ${216}, ${230})`,
        height: '100vh',
        width: '100vw',
      }}
    >
      <color attach="background" args={[173, 216, 230]} />
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <Physics>
        <Plane />
        <Cube />
      </Physics>
    </Canvas>
  );
};

export default App;
