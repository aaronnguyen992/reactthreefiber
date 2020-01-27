import React, { useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

import './style.css';

extend({ OrbitControls })

const Space = () => {
  const[model, setModel] = useState()
  useEffect(() => {
    new GLTFLoader().load('/scene.gltf', setModel)
  })
  
  return model ? <primitive object={model.scene} /> : null
}

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })
  return (
    <orbitControls 
      args={[camera, gl.domElement]}
      ref={orbitRef}
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
    />
  )
}

const Plane = () => {
  return(
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]}/>
      <meshPhysicalMaterial attach="material" color="gray"/>
    </mesh>
  )
}

const Box = () => {
  // const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray"
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
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <a.meshPhysicalMaterial attach="material" color={props.color}/>
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow/>
    </a.mesh>
  )
}

const IndexPage = () => (
  <div className="container">
    <h1>Hello World</h1>
    <Canvas camera={{ position: [0, 0, 20] }} onCreated={({ gl }) => {
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}>
      <ambientLight intensity={0.5}/>
      <spotLight position={[15, 20, 5]} penumbra={1} castShadow/>
      <fog attach="fog" args={["black", 10, 25]} />
      <Controls />
      {/* <Box /> */}
      {/* <Plane /> */}
      <Space />
    </Canvas>
  </div>
)

export default IndexPage
