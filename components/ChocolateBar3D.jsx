"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

function ChocolateBar() {
  const group = useRef(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.position.y = Math.sin(t * 0.9) * 0.12;

    // Oscillate within a bounded range instead of drifting continuously,
    // so the bar never idles at an unflattering edge-on angle.
    const idleY = Math.sin(t * 0.22) * 0.32;
    const targetY = idleY + pointer.x * 0.45;
    const targetX = 0.22 - pointer.y * 0.22;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
  });

  const rows = 3;
  const cols = 3;
  const segW = 0.62;
  const segH = 0.62;
  const gap = 0.08;
  const totalW = cols * segW + (cols - 1) * gap;
  const totalH = rows * segH + (rows - 1) * gap;

  const squares = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = -totalW / 2 + segW / 2 + c * (segW + gap);
      const y = totalH / 2 - segH / 2 - r * (segH + gap);
      squares.push(
        <RoundedBox
          key={`${r}-${c}`}
          args={[segW, segH, 0.22]}
          radius={0.07}
          smoothness={4}
          position={[x, y, 0.24]}
        >
          <meshStandardMaterial color="#7a4a2e" roughness={0.55} metalness={0.05} />
        </RoundedBox>
      );
    }
  }

  return (
    <group ref={group} rotation={[0.22, 0, 0]}>
      <RoundedBox args={[2.5, 2.5, 0.5]} radius={0.16} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3a1f14" roughness={0.6} metalness={0.05} />
      </RoundedBox>
      {squares}
    </group>
  );
}

export default function ChocolateBar3D({ className = "" }) {
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`canvas3d-wrap ${className}`}>
      <Canvas
        resize={{ debounce: 0, offsetSize: true }}
        camera={{ position: [0, 0, 5.6], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff3e0" />
        <directionalLight position={[-4, 1, 3]} intensity={0.9} color="#ffe4b8" />
        <directionalLight position={[0, -3, -2]} intensity={0.4} color="#c1272d" />
        <pointLight position={[-3, 3, 4]} intensity={0.6} color="#d9a441" />
        <Suspense fallback={null}>
          <ChocolateBar />
        </Suspense>
      </Canvas>
    </div>
  );
}
