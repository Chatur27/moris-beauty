"use client";

import { ContactShadows, Float, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { MathUtils, SRGBColorSpace, type Group } from "three";

useTexture.preload("/rivage-glow-bottle.png");

function CanvasHealth({
  onContextLost,
  onContextRestored,
}: {
  onContextLost: () => void;
  onContextRestored: () => void;
}) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };
    const handleContextRestored = () => onContextRestored();

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost, false);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored, false);
    };
  }, [gl, onContextLost, onContextRestored]);

  return null;
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const size = useThree((state) => state.size);
  const sent = useRef(false);
  const stableFrames = useRef(0);
  const previousSize = useRef({ width: 0, height: 0 });

  useFrame(() => {
    if (sent.current || size.width < 120 || size.height < 120) return;

    const widthStable = Math.abs(previousSize.current.width - size.width) < 0.5;
    const heightStable = Math.abs(previousSize.current.height - size.height) < 0.5;

    if (widthStable && heightStable) {
      stableFrames.current += 1;
    } else {
      stableFrames.current = 0;
      previousSize.current = { width: size.width, height: size.height };
    }

    if (stableFrames.current >= 4) {
      sent.current = true;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(onReady);
      });
    }
  });

  return null;
}
function ProductStage({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const texture = useTexture("/rivage-glow-bottle.png");
  const displayTexture = useMemo(() => {
    const clonedTexture = texture.clone();
    clonedTexture.colorSpace = SRGBColorSpace;
    clonedTexture.anisotropy = 4;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [texture]);

  useEffect(() => () => displayTexture.dispose(), [displayTexture]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = animate ? state.pointer.y * 0.08 : 0;
    const targetY = animate ? state.pointer.x * 0.13 : -0.08;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetX, 5, delta);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetY, 5, delta);
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      animate ? Math.sin(state.clock.elapsedTime * 0.7) * 0.08 : 0,
      4,
      delta,
    );
  });

  return (
    <group ref={group} rotation={[0.03, -0.08, -0.025]}>
      <Float
        speed={animate ? 1 : 0}
        rotationIntensity={animate ? 0.05 : 0}
        floatIntensity={animate ? 0.12 : 0}
      >
        <RoundedBox
          args={[3.05, 4.2, 0.16]}
          radius={0.24}
          smoothness={4}
          position={[0, 0, -0.28]}
          castShadow
        >
          <meshPhysicalMaterial
            color="#efb08d"
            roughness={0.32}
            metalness={0.04}
            transmission={0.06}
            clearcoat={0.9}
            clearcoatRoughness={0.16}
          />
        </RoundedBox>
        <mesh position={[0, 0.02, 0.02]}>
          <planeGeometry args={[2.56, 3.55]} />
          <meshBasicMaterial
            map={displayTexture}
            transparent
            alphaTest={0.015}
            toneMapped={false}
          />
        </mesh>
      </Float>

      <mesh position={[-1.72, 1.33, -0.45]} rotation={[0.35, 0.2, 0]}>
        <torusGeometry args={[0.62, 0.025, 18, 64]} />
        <meshStandardMaterial color="#f8e8d0" transparent opacity={0.48} />
      </mesh>
      <mesh position={[1.65, -1.36, -0.5]} rotation={[0.5, 0.4, 0.35]}>
        <torusGeometry args={[0.85, 0.03, 18, 64]} />
        <meshStandardMaterial color="#f7d2b9" transparent opacity={0.32} />
      </mesh>
      <mesh position={[1.73, 1.35, -0.12]} castShadow>
        <sphereGeometry args={[0.34, 28, 28]} />
        <meshPhysicalMaterial color="#f0d7b4" roughness={0.24} clearcoat={1} />
      </mesh>
      <mesh position={[-1.62, -1.45, -0.05]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshPhysicalMaterial color="#b8cbb8" roughness={0.3} clearcoat={0.8} />
      </mesh>
      <ContactShadows position={[0, -2.25, 0]} opacity={0.24} scale={5.8} blur={2.4} far={3.8} />
    </group>
  );
}

export default function HeroScene({
  animate = true,
  onReady,
  onFailure,
}: {
  animate?: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.2]}
      camera={{ position: [0, 0.05, 6.4], fov: 31 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.8 }}
      frameloop={animate ? "always" : "demand"}
      shadows
    >
      <CanvasHealth onContextLost={onFailure} onContextRestored={onReady} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 5, 5]} intensity={1.95} castShadow shadow-mapSize-width={512} shadow-mapSize-height={512} />
      <pointLight position={[-3.5, 2.5, 3.5]} intensity={18} color="#ffe0c5" />
      <pointLight position={[3.5, -1.5, 2.8]} intensity={9} color="#f7c2aa" />
      <Suspense fallback={null}>
        <ProductStage animate={animate} />
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
