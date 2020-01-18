import React, { useState, useRef } from "react"
import { Canvas, useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

import './style.css';

const Box = () => {
  // const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "gray" : "hotpink"
  })
  // useFrame(() => {
  //   meshRef.current.rotation.y += 0.01
  // })

  return(
    <a.mesh
      // ref={meshRef} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <a.meshBasicMaterial attach="material" color={props.color}/>
    </a.mesh>
  )
}

const IndexPage = () => (
  <Canvas>
    <Box />
  </Canvas>
)

export default IndexPage
