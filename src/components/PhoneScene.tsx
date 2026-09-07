import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PhoneScreenRenderer, ShowcaseState } from './PhoneScreenCanvas';

interface PhoneModelProps {
  scrollProgress: number;
}

const PhoneModel: React.FC<PhoneModelProps> = ({ scrollProgress }) => {
  const { scene } = useGLTF('/models/iphone16pro.glb');
  const groupRef = useRef<THREE.Group>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);

  // Initialize dynamic canvas renderer
  const screenRenderer = useMemo(() => new PhoneScreenRenderer(), []);

  // Create Three.js CanvasTexture from offscreen canvas
  const canvasTexture = useMemo(() => {
    const canvas = screenRenderer.getCanvas();
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, [screenRenderer]);

  // Clone scene and setup materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Find and configure screen mesh and materials
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // In our model, "BhDnXwkkSqMJhmR_001_1" or "OyNwAnMBolLlrul_001" is the screen plane
        if (
          mesh.name.includes('BhDnXwkkSqMJhmR') ||
          (mesh.material as THREE.Material)?.name === 'OyNwAnMBolLlrul_001' ||
          (mesh.material as THREE.Material)?.name?.includes('OyNwAnMBol')
        ) {
          screenMeshRef.current = mesh;
          mesh.material = new THREE.MeshBasicMaterial({
            map: canvasTexture,
            toneMapped: false,
          });
        }
      }
    });

    return clone;
  }, [scene, canvasTexture]);

  // Animate canvas texture and phone transforms on frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Determine active state from scroll progress (0 to 1)
    let activeState: ShowcaseState = 'hero';
    let sectionProgress = 0;

    if (scrollProgress < 0.18) {
      activeState = 'hero';
      sectionProgress = scrollProgress / 0.18;
    } else if (scrollProgress < 0.48) {
      activeState = 'wrong-bus';
      sectionProgress = (scrollProgress - 0.18) / 0.30;
    } else if (scrollProgress < 0.74) {
      activeState = 'alarm';
      sectionProgress = (scrollProgress - 0.48) / 0.26;
    } else {
      activeState = 'summary';
      sectionProgress = 1;
    }

    // Render new frame to 2D canvas & mark texture dirty
    screenRenderer.render({
      state: activeState,
      progress: sectionProgress,
      time,
    });
    canvasTexture.needsUpdate = true;

    // Smooth camera & model choreography using scrollProgress
    if (groupRef.current) {
      const g = groupRef.current;

      // Base 25% smaller scale multipliers (0.75x)
      let targetX = 1.35;
      let targetY = -0.15;
      let targetZ = 0;
      let rotX = 0.08;
      let rotY = Math.PI - 0.38; // Model inverted: PI flips front to face camera
      let rotZ = -0.04;
      let targetScale = 0.315; // 0.42 * 0.75

      // Responsive adjustments for mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        targetX = 0;
        targetY = 0.5;
        targetScale = 0.24;
      }

      if (scrollProgress < 0.18) {
        // Hero stage: angled nicely on the right side
        const p = scrollProgress / 0.18;
        targetX = isMobile ? 0 : 1.45 - p * 0.2;
        targetY = isMobile ? 0.5 : -0.15;
        rotY = Math.PI - 0.38 + p * 0.15;
        rotX = 0.08 - p * 0.04;
        rotZ = -0.04;
        targetScale = isMobile ? 0.24 : 0.315;
      } else if (scrollProgress < 0.48) {
        // Feature 1 - Wrong Bus Detection: camera tracks close to Dynamic Island
        const p = (scrollProgress - 0.18) / 0.30;
        targetX = isMobile ? 0.4 : 1.6 - p * 0.2; // Shifted nicely to the right
        targetY = -1.5 - p * 0.25; // Move phone down so top Dynamic Island is centered
        targetZ = 1.6 + p * 0.3;  // Zoom in
        rotY = Math.PI - 0.12 - p * 0.08;
        rotX = 0.18 + p * 0.04;
        rotZ = 0.02;
        targetScale = isMobile ? 0.36 : 0.435; // 0.58 * 0.75
      } else if (scrollProgress < 0.74) {
        // Feature 2 - Deboard Alarm: straight facing forward on right column
        const p = (scrollProgress - 0.48) / 0.26;
        targetX = isMobile ? 0.3 : 1.45 - p * 0.1;
        targetY = -0.05;
        targetZ = 0.2;
        rotY = Math.PI; // Straight facing forward
        rotX = 0.02 * (1 - p);
        rotZ = 0;
        targetScale = isMobile ? 0.26 : 0.338; // 0.45 * 0.75
      } else {
        // Feature 3 - Trip Summary: stays permanently locked in place even with further scrolling
        targetX = isMobile ? -0.35 : -1.60;
        targetY = -0.08;
        targetZ = 0;
        rotY = Math.PI + 0.24;
        rotX = 0.06;
        rotZ = 0.02;
        targetScale = isMobile ? 0.25 : 0.33;
      }

      // Smooth lerp for buttery motion
      g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.08);
      g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.08);
      g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, 0.08);

      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, rotX, 0.08);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, rotY, 0.08);
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, rotZ, 0.08);

      const currentScale = g.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
      g.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <group ref={groupRef} position={[1.35, -0.15, 0]} rotation={[0.08, Math.PI - 0.38, -0.04]} scale={0.315}>
      {/* Model offset centering wrapper */}
      <group position={[-1.86, 0, 0]}>
        <primitive object={clonedScene} />
      </group>

      {/* Auxiliary crisp screen mesh */}
      <mesh position={[0, 0, -0.415]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[6.66, 14.5]} />
        <meshBasicMaterial map={canvasTexture} toneMapped={false} />
      </mesh>
    </group>
  );
};

export const PhoneScene: React.FC<PhoneModelProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 15, 10]} intensity={1.9} castShadow />
        <directionalLight position={[-10, 10, -8]} intensity={1.3} color="#90b8f8" />
        <spotLight position={[0, 12, 6]} intensity={2.2} angle={0.6} penumbra={0.8} />

        <PhoneModel scrollProgress={scrollProgress} />

        <ContactShadows
          position={[0, -3.2, 0]}
          opacity={0.4}
          scale={10}
          blur={2.4}
          far={6}
        />
      </Canvas>
    </div>
  );
};

// Preload model
useGLTF.preload('/models/iphone16pro.glb');
