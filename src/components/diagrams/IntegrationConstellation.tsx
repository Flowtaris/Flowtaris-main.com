'use client'

import { useEffect, useState, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ────────────────────────────────────────────────────────
// Planet data — solar system style
// ────────────────────────────────────────────────────────
const PLANETS = [
  {
    name:       'NetSuite',
    abbr:       'NS',
    color:      '#3B82F6',
    emissive:   '#1D4ED8',
    radius:     0.18,
    orbitA:     2.6,   // semi-major axis
    orbitB:     1.6,   // semi-minor axis
    orbitTilt:  0.3,   // inclination in radians
    speed:      0.38,
    startAngle: 0,
    hasRing:    false,
  },
  {
    name:       'Coupa',
    abbr:       'CP',
    color:      '#10B981',
    emissive:   '#059669',
    radius:     0.16,
    orbitA:     2.0,
    orbitB:     1.4,
    orbitTilt:  -0.2,
    speed:      0.52,
    startAngle: Math.PI / 3,
    hasRing:    false,
  },
  {
    name:       'SAP',
    abbr:       'SAP',
    color:      '#8B5CF6',
    emissive:   '#7C3AED',
    radius:     0.22,
    orbitA:     3.2,
    orbitB:     2.0,
    orbitTilt:  0.5,
    speed:      0.25,
    startAngle: Math.PI * 0.7,
    hasRing:    true,   // Saturn-style ring
  },
  {
    name:       'Workday',
    abbr:       'WD',
    color:      '#F59E0B',
    emissive:   '#D97706',
    radius:     0.19,
    orbitA:     2.4,
    orbitB:     1.8,
    orbitTilt:  -0.4,
    speed:      0.44,
    startAngle: Math.PI * 1.2,
    hasRing:    false,
  },
  {
    name:       'Ironclad',
    abbr:       'IC',
    color:      '#EC4899',
    emissive:   '#DB2777',
    radius:     0.14,
    orbitA:     1.7,
    orbitB:     1.2,
    orbitTilt:  0.6,
    speed:      0.65,
    startAngle: Math.PI * 1.6,
    hasRing:    false,
  },
  {
    name:       'Workato',
    abbr:       'WKT',
    color:      '#06B6D4',
    emissive:   '#0891B2',
    radius:     0.15,
    orbitA:     2.9,
    orbitB:     2.2,
    orbitTilt:  -0.15,
    speed:      0.30,
    startAngle: Math.PI * 0.4,
    hasRing:    false,
  },
]

// ────────────────────────────────────────────────────────
// Orbit ring (decorative — shows the orbital path)
// ────────────────────────────────────────────────────────
function OrbitPath({ a, b, tilt }: { a: number; b: number; tilt: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(theta) * a, 0, Math.sin(theta) * b))
    }
    return pts
  }, [a, b])

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  return (
    <group rotation={[tilt, 0, 0]}>
      {/* @ts-expect-error */}
      <line geometry={geometry}>
        <lineBasicMaterial color="#E8A020" transparent opacity={0.06} linewidth={1} />
      </line>
    </group>
  )
}

// ────────────────────────────────────────────────────────
// Single planet
// ────────────────────────────────────────────────────────
function Planet({ data }: { data: typeof PLANETS[number] }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const angle    = useRef(data.startAngle)

  useFrame((_, delta) => {
    angle.current += delta * data.speed * 0.4
    const x = Math.cos(angle.current) * data.orbitA
    const z = Math.sin(angle.current) * data.orbitB
    const y = Math.sin(angle.current + data.orbitTilt) * 0.3

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z)
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2
      meshRef.current.rotation.x += delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Planet body */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Saturn-style ring */}
      {data.hasRing && (
        <mesh rotation={[Math.PI / 3.5, 0, 0]}>
          <torusGeometry args={[data.radius * 1.7, data.radius * 0.2, 2, 64]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Platform abbreviation label */}
      <Text
        position={[0, data.radius + 0.18, 0]}
        fontSize={0.1}
        color="rgba(255,255,255,0.8)"
        anchorX="center"
        anchorY="bottom"
      >
        {data.abbr}
      </Text>
    </group>
  )
}

// ────────────────────────────────────────────────────────
// Asteroid belt — particle ring
// ────────────────────────────────────────────────────────
const ASTEROID_POSITIONS = (() => {
  const count = 600
  const pos   = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const r     = 3.6 + (Math.random() - 0.5) * 0.6
    pos[i * 3]     = Math.cos(angle) * r
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15
    pos[i * 3 + 2] = Math.sin(angle) * r * 0.7
  }
  return pos
})()

function AsteroidBelt() {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[ASTEROID_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#E8A020" transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

// ────────────────────────────────────────────────────────
// Center sun — the Flowtaris node
// Interactive: hover enlarges + shows FLOWTARIS text
// ────────────────────────────────────────────────────────
function SunNode() {
  const meshRef   = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const scaleTarget = useRef(1)

  useFrame((_, delta) => {
    if (!meshRef.current || !coronaRef.current) return
    meshRef.current.rotation.y += delta * 0.4
    coronaRef.current.rotation.z -= delta * 0.2

    // Smooth scale transition
    scaleTarget.current = hovered ? 1.35 : 1.0
    meshRef.current.scale.lerp(
      new THREE.Vector3(scaleTarget.current, scaleTarget.current, scaleTarget.current),
      delta * 6
    )
  })

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#C87010"
          emissiveIntensity={0.6}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshStandardMaterial
          color="#0A1628"
          emissive="#E8A020"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Rotating corona ring */}
      <mesh ref={coronaRef}>
        <torusGeometry args={[0.62, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#E8A020"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.78, 0.01, 8, 100]} />
        <meshBasicMaterial color="#E8A020" transparent opacity={0.3} />
      </mesh>

      {/* F / FLOWTARIS text */}
      {!hovered ? (
        <Text
          position={[0, 0, 0.43]}
          fontSize={0.26}
          color="#E8A020"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          F
        </Text>
      ) : (
        <Text
          position={[0, 0, 0.43]}
          fontSize={0.09}
          color="#E8A020"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          FLOWTARIS
        </Text>
      )}

      {/* Point light emanating from center */}
      <pointLight color="#E8A020" intensity={3.0} distance={8} decay={2} />
    </group>
  )
}

// ────────────────────────────────────────────────────────
// Full scene
// ────────────────────────────────────────────────────────
function SolarScene() {
  const systemRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (systemRef.current) {
      systemRef.current.rotation.y += delta * 0.04
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />

      <group ref={systemRef}>
        <SunNode />
        {PLANETS.map(planet => (
          <group key={planet.name}>
            <OrbitPath a={planet.orbitA} b={planet.orbitB} tilt={planet.orbitTilt} />
            <Planet data={planet} />
          </group>
        ))}
        <AsteroidBelt />
      </group>
    </>
  )
}

// ────────────────────────────────────────────────────────
// Static SVG fallback (mobile / no WebGL)
// ────────────────────────────────────────────────────────
function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[380px]">
      <svg viewBox="0 0 400 360" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8A020" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#E8A020" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="200" cy="180" r="70" fill="url(#sunGlow)"/>
        <circle cx="200" cy="180" r="38" fill="#0A1628" stroke="#E8A020" strokeWidth="2"/>
        <text x="200" y="187" textAnchor="middle" fill="#E8A020" fontSize="24" fontWeight="700" fontFamily="sans-serif">F</text>
        {[
          { x: 80,  y: 70,  label: 'NS',  color: '#3B82F6', r: 18 },
          { x: 340, y: 100, label: 'CP',  color: '#10B981', r: 16 },
          { x: 350, y: 270, label: 'SAP', color: '#8B5CF6', r: 20 },
          { x: 200, y: 320, label: 'WD',  color: '#F59E0B', r: 18 },
          { x: 55,  y: 270, label: 'IC',  color: '#EC4899', r: 14 },
          { x: 65,  y: 160, label: 'WKT', color: '#06B6D4', r: 15 },
        ].map(node => (
          <g key={node.label}>
            <line x1="200" y1="180" x2={node.x} y2={node.y} stroke="#E8A020" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 8">
              <animate attributeName="stroke-dashoffset" values="0;-48" dur="3s" repeatCount="indefinite"/>
            </line>
            <circle cx={node.x} cy={node.y} r={node.r} fill="#0A1628" stroke={node.color} strokeWidth="1.5" strokeOpacity="0.7"/>
            <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ────────────────────────────────────────────────────────
// Main export — client-side WebGL detection
// ────────────────────────────────────────────────────────
export function IntegrationConstellation() {
  const [mounted,  setMounted]  = useState(false)
  const [hasWebGL, setHasWebGL] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true)
      try {
        const c  = document.createElement('canvas')
        const gl = c.getContext('webgl2') || c.getContext('webgl')
        setHasWebGL(!!gl)
      } catch { setHasWebGL(false) }
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-gold-500/30 border-t-gold-500 animate-spin"/>
      </div>
    )
  }

  if (!hasWebGL) return <StaticFallback />

  return (
    <div className="w-full h-[520px] lg:h-[560px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.5, 8.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.shadowMap.enabled = true
        }}
      >
        <Suspense fallback={null}>
          <SolarScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
