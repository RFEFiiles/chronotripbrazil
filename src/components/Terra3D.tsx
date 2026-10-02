import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import texturaTerra from "../assets/terra-textura.jpg";

function Terra() {
  const textura = useTexture(texturaTerra);
  textura.colorSpace = THREE.SRGBColorSpace;
  const grupo = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (grupo.current) grupo.current.rotation.y += dt * 0.08;
  });

  return (
    <group ref={grupo}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={textura} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Brilho de atmosfera */}
      <mesh scale={1.06}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#4cc9f0" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export function Terra3D() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  if (!montado) return null;

  return (
    <Canvas
      camera={{ position: [0, 0.9, 8.2], fov: 45 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} />
      <pointLight position={[-6, -2, -4]} intensity={0.6} color="#4cc9f0" />
      <Suspense fallback={null}>
        <Terra />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
