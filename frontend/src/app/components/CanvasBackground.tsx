"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Preload, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../context/ThemaeContext";

function WarpedGrid({ isDarkMode }: { isDarkMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle undulating movement
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -10, -10]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial
        color={isDarkMode ? "#06b6d4" : "#0ea5e9"}
        wireframe
        transparent
        opacity={isDarkMode ? 0.15 : 0.2}
      />
    </mesh>
  );
}

function NebulaGlow({ isDarkMode }: { isDarkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cyan Nebula */}
      <mesh position={[10, 5, -15]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={isDarkMode ? 0.03 : 0.05} 
        />
      </mesh>
      
      {/* Lime Nebula */}
      <mesh position={[-15, -5, -10]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial 
          color="#a3e635" 
          transparent 
          opacity={isDarkMode ? 0.03 : 0.05} 
        />
      </mesh>

      {/* Purple Nebula (Dark Mode Only) */}
      {isDarkMode && (
        <mesh position={[0, -10, -20]}>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial 
            color="#a855f7" 
            transparent 
            opacity={0.02} 
          />
        </mesh>
      )}
    </group>
  );
}

function FloatingTech({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <mesh position={[7, 3, -5]} rotation={[Math.PI / 4, 0, 0]}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color={isDarkMode ? "#a3e635" : "#84cc16"}
          speed={3}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.15}
          wireframe={true}
        />
      </mesh>

      <mesh position={[-8, -4, -8]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshWobbleMaterial
          color={isDarkMode ? "#06b6d4" : "#0891b2"}
          speed={2}
          factor={0.4}
          transparent
          opacity={0.1}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function CanvasBackground() {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={[isDarkMode ? "#020617" : "#f1f5f9"]} />
        
        <ambientLight intensity={isDarkMode ? 0.3 : 1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#a3e635" />

        <WarpedGrid isDarkMode={isDarkMode} />
        <NebulaGlow isDarkMode={isDarkMode} />
        <FloatingTech isDarkMode={isDarkMode} />
        
        <Sparkles 
          count={isDarkMode ? 100 : 50} 
          scale={20} 
          size={2} 
          speed={0.5} 
          color={isDarkMode ? "#06b6d4" : "#334155"} 
          opacity={isDarkMode ? 0.5 : 0.2} 
        />

        <fog attach="fog" args={[isDarkMode ? "#020617" : "#f1f5f9", 10, 40]} />
        <Preload all />
      </Canvas>
    </div>
  );
}
