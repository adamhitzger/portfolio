"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Line } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"
import t, { type Lang } from "@/lib/translations"

function ParticleField() {
  const points = useRef<THREE.Points>(null!)
  const count = 600

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const teal = new THREE.Color("#4dd0b8")
    const white = new THREE.Color("#94a3b8")
    for (let i = 0; i < count; i++) {
      const c = Math.random() > 0.7 ? teal : white
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return cols
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function FloatingOrb({ position, color, speed, distort }: {
  position: [number, number, number]; color: string; speed: number; distort: number
}) {
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.6, 8]} />
        <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.2} metalness={0.8} transparent opacity={0.7} />
      </mesh>
    </Float>
  )
}

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null!)
  useFrame((state) => {
    if (gridRef.current) gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 1
  })
  return <gridHelper ref={gridRef} args={[30, 30, "#1a3a4a", "#0d2030"]} position={[0, -3, 0]} />
}

function ConnectionLines() {
  const lineRef = useRef<THREE.Group>(null!)
  useFrame((state) => {
    if (lineRef.current) lineRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  const lines = useMemo(() => {
    const lineData: { start: [number, number, number]; end: [number, number, number] }[] = []
    const nodeCount = 12
    const nodes: [number, number, number][] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push([(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 8])
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0]
        const dy = nodes[i][1] - nodes[j][1]
        const dz = nodes[i][2] - nodes[j][2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 4) {
          lineData.push({ start: nodes[i], end: nodes[j] })
        }
      }
    }
    return lineData
  }, [])

  return (
    <group ref={lineRef}>
      {lines.map((line, i) => (
        <Line key={i} points={[line.start, line.end]} color="#1a4a5a" transparent opacity={0.3} lineWidth={1} />
      ))}
    </group>
  )
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <fog attach="fog" args={["#0a1628", 5, 25]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#4dd0b8" />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#e2e8f0" />
      <ParticleField />
      <ConnectionLines />
      <GridFloor />
      <FloatingOrb position={[-3, 1.5, -2]} color="#4dd0b8" speed={1.5} distort={0.4} />
      <FloatingOrb position={[3.5, -1, -3]} color="#1a4a5a" speed={1} distort={0.3} />
      <FloatingOrb position={[-2, -2, -1]} color="#0d3040" speed={2} distort={0.5} />
      <FloatingOrb position={[2, 2, -4]} color="#4dd0b8" speed={1.2} distort={0.35} />
   
    </Canvas>
  )
}

export default function HeroScene({ lang }: { lang: Lang }) {
  

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground font-mono">{t.hero.loading[lang]}</p>
          </div>
        </div>
      }>
        <div className="absolute inset-0"><Scene3D /></div>
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="flex flex-col items-center gap-8 text-center max-w-3xl">
          <div className="relative">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_40px_rgba(77,208,184,0.15)]">
              <Image src="/me.jpeg" alt="Adam Hitzger" width={176} height={176} className="object-cover w-full h-full" priority />
            </div>
            <div className="absolute -inset-1 rounded-full border border-primary/20 animate-[spin_12s_linear_infinite]" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance">
              Adam Hitzger
            </h1>
            <div className="h-px w-24 bg-primary/60" />
            <p className="text-lg md:text-xl text-primary font-mono">{t.hero.subtitle[lang]}</p>
          </div>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
            {t.hero.description[lang]}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a href="#projects" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:brightness-110 transition-all duration-200">
              {t.hero.viewProjects[lang]}
            </a>
            <a href="#contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-200">
              {t.hero.getInTouch[lang]}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {["Next.js", "TypeScript", "Beckhoff", "B&R", "Arduino", "Fanuc FOCAS"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono text-muted-foreground border border-border/60 rounded-full bg-card/50 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-muted-foreground text-sm font-mono">{t.hero.scrollToExplore[lang]}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
