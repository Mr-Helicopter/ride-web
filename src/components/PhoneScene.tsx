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

    // Smooth camera & model choreography using scroll-based keyframes (Option B)
    if (groupRef.current) {
      const g = groupRef.current;
      const isMobile = window.innerWidth < 768;

      // Define the exact still "spots" for each feature
      const spotsDesk = [
        { x: 1.35, y: -0.15, z: 0, rx: 0.08, ry: Math.PI - 0.38, rz: -0.04, scale: 0.315 }, // Hero
        { x: 1.50, y: -1.60, z: 1.7, rx: 0.20, ry: Math.PI - 0.16, rz: 0.02, scale: 0.435 }, // Feature 1 (Wrong Bus)
        { x: 1.40, y: -0.05, z: 0.2, rx: 0.01, ry: Math.PI, rz: 0.00, scale: 0.338 }, // Feature 2 (Alarm)
        { x: -1.60, y: -0.08, z: 0, rx: 0.06, ry: Math.PI + 0.24, rz: 0.02, scale: 0.330 }  // Feature 3 (Summary)
      ];

      const spotsMob = [
        { x: 0.00, y: 0.50, z: 0, rx: 0.08, ry: Math.PI - 0.38, rz: -0.04, scale: 0.240 },
        { x: 0.30, y: -1.60, z: 1.7, rx: 0.20, ry: Math.PI - 0.16, rz: 0.02, scale: 0.360 },
        { x: 0.25, y: -0.05, z: 0.2, rx: 0.01, ry: Math.PI, rz: 0.00, scale: 0.260 },
        { x: -0.35, y: -0.08, z: 0, rx: 0.06, ry: Math.PI + 0.24, rz: 0.02, scale: 0.250 }
      ];

      const spots = isMobile ? spotsMob : spotsDesk;

      // Map spots to scroll progress ranges
      // e.g. from 0 to 0.15, stay at Hero. From 0.15 to 0.25, transition to F1.
      const kfs = [
        { s: 0.00, ...spots[0] },
        { s: 0.15, ...spots[0] }, // End Hero rest

        { s: 0.25, ...spots[1] }, // Start F1 rest
        { s: 0.40, ...spots[1] }, // End F1 rest

        { s: 0.50, ...spots[2] }, // Start F2 rest
        { s: 0.65, ...spots[2] }, // End F2 rest

        { s: 0.75, ...spots[3] }, // Start F3 rest
        { s: 1.00, ...spots[3] }  // End F3 rest
      ];

      let targetX = 0, targetY = 0, targetZ = 0, rotX = 0, rotY = 0, rotZ = 0, targetScale = 0;

      if (scrollProgress <= kfs[0].s) {
        ({ x: targetX, y: targetY, z: targetZ, rx: rotX, ry: rotY, rz: rotZ, scale: targetScale } = kfs[0]);
      } else if (scrollProgress >= kfs[kfs.length - 1].s) {
        ({ x: targetX, y: targetY, z: targetZ, rx: rotX, ry: rotY, rz: rotZ, scale: targetScale } = kfs[kfs.length - 1]);
      } else {
        for (let i = 0; i < kfs.length - 1; i++) {
          const k1 = kfs[i];
          const k2 = kfs[i + 1];
          if (scrollProgress >= k1.s && scrollProgress <= k2.s) {
            const p = (scrollProgress - k1.s) / (k2.s - k1.s);
            // Ease-in-out curve for buttery scroll transitions
            const easeP = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            targetX = THREE.MathUtils.lerp(k1.x, k2.x, easeP);
            targetY = THREE.MathUtils.lerp(k1.y, k2.y, easeP);
            targetZ = THREE.MathUtils.lerp(k1.z, k2.z, easeP);
            rotX = THREE.MathUtils.lerp(k1.rx, k2.rx, easeP);
            rotY = THREE.MathUtils.lerp(k1.ry, k2.ry, easeP);
            rotZ = THREE.MathUtils.lerp(k1.rz, k2.rz, easeP);
            targetScale = THREE.MathUtils.lerp(k1.scale, k2.scale, easeP);
            break;
          }
        }
      }

      // Fast lerp coefficient so it responds snappily to scroll, with slight trailing smoothness
      g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.12);
      g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.12);
      g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, 0.12);

      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, rotX, 0.12);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, rotY, 0.12);
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, rotZ, 0.12);

      const currentScale = g.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.12);
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
    <div className="w-full h-full pointer-events-none z-40">
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
