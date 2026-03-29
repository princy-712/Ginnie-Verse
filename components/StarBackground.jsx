"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual star component to avoid BufferGeometry issues
const Star = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.002, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
};

const StarBackground = (props) => {
  const groupRef = useRef();
  
  const stars = React.useMemo(() => {
    const starPositions = [];
    for (let i = 0; i < 500; i++) { // Reduced number for performance
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 1.2;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Validate coordinates
      if (isFinite(x) && isFinite(y) && isFinite(z)) {
        starPositions.push([x, y, z]);
      }
    }
    return starPositions;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x -= delta / 10;
      groupRef.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      {stars.map((position, index) => (
        <Star key={index} position={position} />
      ))}
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1]">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Add error boundary for Three.js errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Three.js Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="fixed inset-0 w-full h-full z-[-1] bg-[#030014]" />;
    }

    return this.props.children;
  }
}

const SafeStarsCanvas = () => {
  return (
    <ErrorBoundary>
      <StarsCanvas />
    </ErrorBoundary>
  );
};

export default SafeStarsCanvas;
