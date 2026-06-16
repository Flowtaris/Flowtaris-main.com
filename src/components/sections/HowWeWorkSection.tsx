'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const METHODOLOGY_STEPS = [
  {
    id: 'discovery',
    title: 'Discovery & Architecture',
    subtitle: 'Phase 1',
    description: 'We don’t start with code. We start by mapping your business processes to standard enterprise data models, identifying automation gaps.',
    deliverables: [
      'Current State Process Mapping',
      'Gap Analysis & Risk Register',
      'Future State Architecture Diagram',
      'Initial Implementation Timeline',
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', // Blue/Gold Architectural Glass
  },
  {
    id: 'design',
    title: 'Solution Design',
    subtitle: 'Phase 2',
    description: 'Translating architecture into actionable, platform-specific design documents that guarantee technical alignment before build.',
    deliverables: [
      'Business Requirements Document (BRD)',
      'Solution Design Document (SDD)',
      'Integration Data Mapping',
      'Security & Access Matrix',
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200', // Precise Geometric Abstract
  },
  {
    id: 'build',
    title: 'Build & Configuration',
    subtitle: 'Phase 3',
    description: 'Agile sprints delivering functional vertical slices of the platform. You see progress every two weeks, not just at the end.',
    deliverables: [
      'Core Platform Configuration',
      'Custom Scripting & Workflows',
      'Middleware Integration Build',
      'Sprint Review Demos',
    ],
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200', // Dynamic Light Trails
  },
  {
    id: 'test',
    title: 'UAT & Training',
    subtitle: 'Phase 4',
    description: 'Rigorous end-to-end testing with your team using real-world scenarios. We train the trainer to ensure internal adoption.',
    deliverables: [
      'System Integration Testing (SIT)',
      'User Acceptance Testing (UAT)',
      'End-User Training Materials',
      'Cutover Plan',
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200', // Clean Minimal Intersection
  },
  {
    id: 'deploy',
    title: 'Go-Live & Hypercare',
    subtitle: 'Phase 5',
    description: 'A structured, weekend cutover followed by intensive production support (Hypercare) to ensure immediate operational stability.',
    deliverables: [
      'Production Data Migration',
      'Go-Live Execution',
      '30-Day Hypercare Support',
      'Transition to Managed Services',
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', // Golden Liquid Scale
  },
]

const DURATION = 6000 // 6 seconds per phase

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // Spotlight & Hover State
  const [mouseState, setMouseState] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Starts playing when 20% of section is visible
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMouseState({ x, y })
  }

  // Auto-Play Physics Engine
  useEffect(() => {
    let startTime = Date.now()
    let animationFrameId: number

    const tick = () => {
      // Pause progress if the user is hovering to read the card or if section is not in view
      if (isHovered || !isInView) {
        startTime += 16.66 // approximate frame time shift
        animationFrameId = requestAnimationFrame(tick)
        return
      }

      const elapsed = Date.now() - startTime
      const currentProgress = (elapsed / DURATION) * 100

      if (currentProgress >= 100) {
        setActiveStep((prev) => (prev + 1) % METHODOLOGY_STEPS.length)
        startTime = Date.now()
      } else {
        setProgress(currentProgress)
      }
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [activeStep, isHovered, isInView]) // Restarts cleanly if user manually clicks a step

  return (
    <section ref={sectionRef} className="bg-slate-50 border-t border-slate-200 overflow-hidden font-sans relative z-10 w-full py-24 md:py-32">

      {/* 100/100 Continuous Floating Keyframes */}
      <style>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-6px) rotateX(2deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-8px) rotateX(-2deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-4px) rotateX(1deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotateX(0deg); } 50% { transform: translateY(-7px) rotateX(-1deg); } }
        .animate-float-0 { animation: float-0 4s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 5s ease-in-out infinite 0.5s; }
        .animate-float-2 { animation: float-2 4.5s ease-in-out infinite 1s; }
        .animate-float-3 { animation: float-3 5.5s ease-in-out infinite 1.5s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* LEFT SIDE: Highly Polished Kinetic Menu */}
        <div className="w-full lg:w-1/3 flex flex-col z-50 relative shrink-0">

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#E8A020]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A020]" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                Our Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-navy-900 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Engineered for Certainty.
            </h2>
          </div>

          {/* Cinematic Auto-Play Sidebar Menu */}
          <div className="flex flex-col gap-2">
            {METHODOLOGY_STEPS.map((step, idx) => {
              const isActive = activeStep === idx

              return (
                <div key={idx} className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveStep(idx)}
                    className="group relative w-full flex items-center p-5 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none text-left"
                  >
                    {/* Hover Background Pill */}
                    <div className="absolute inset-0 rounded-2xl bg-slate-200/40 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />

                    {/* Active Kinetic Pill with Progress Wash */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-white shadow-[0_20px_40px_-10px_rgba(10,24,52,0.05)] border border-slate-100 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                    >
                      {/* Golden Progress Background Wash */}
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-[#E8A020]/[0.03]"
                        style={{ width: isActive ? `${progress}%` : '0%' }}
                      />
                      {/* Golden Progress Bottom Border */}
                      <div
                        className="absolute left-0 bottom-0 h-0.5 bg-[#E8A020]"
                        style={{ width: isActive ? `${progress}%` : '0%' }}
                      />
                    </div>

                    {/* Active Golden Edge Indicator */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 rounded-r-full bg-[#E8A020] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'h-10 opacity-100' : 'h-0 opacity-0'
                        }`}
                    />

                    {/* Menu Text */}
                    <div className="relative z-10 flex items-center gap-5 ml-4">
                      <div className={`text-sm font-bold tracking-widest transition-colors duration-500 ${isActive ? 'text-[#E8A020]' : 'text-slate-500 group-hover:text-[#E8A020]/70'}`} style={{ fontFamily: 'var(--font-jetbrains)' }}>
                        0{idx + 1}
                      </div>
                      <div className={`text-lg font-black transition-colors duration-500 ${isActive ? 'text-navy-900' : 'text-slate-500 group-hover:text-navy-700'}`} style={{ fontFamily: 'var(--font-sora)' }}>
                        {step.title}
                      </div>
                    </div>
                  </button>

                  {/* MOBILE ACCORDION CONTENT */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isActive ? 'max-h-[1000px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm ml-2 mr-2">
                      <div className="relative w-full h-48 mb-5 rounded-xl overflow-hidden">
                        <Image src={step.image} alt={step.title} fill sizes="(max-width: 1024px) 100vw, 0vw" className="object-cover" />
                      </div>
                      <p className="text-slate-700 text-sm mb-5 leading-relaxed font-medium">
                        {step.description}
                      </p>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                        Deliverables
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {step.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#E8A020] shrink-0 mt-0.5" />
                            <span className="text-sm font-bold text-navy-900">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* 
          RIGHT SIDE: The Luminous Glass Vault
          A stack of massive, highly polished ambient glass cards.
        */}
        <div className="hidden lg:block w-full lg:w-2/3 h-[600px] md:h-[650px] relative pointer-events-none perspective-[2000px]">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx
            const isPast = idx < activeStep
            const isFuture = idx > activeStep

            // Flawless Flat Scale and Blur Animation Logic
            let transform = 'scale(1) translateZ(0)'
            let opacity = 0
            let filter = 'blur(0px)'

            if (isActive) {
              transform = `scale(1) translateZ(0)`
              opacity = 1
              filter = 'blur(0px)'
            } else if (isPast) {
              transform = 'scale(0.85) translateZ(-150px)'
              opacity = 0
              filter = 'blur(20px)'
            } else if (isFuture) {
              transform = 'scale(1.1) translateZ(150px)'
              opacity = 0
              filter = 'blur(20px)'
            }

            const transitionClass = 'transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]'

            return (
              <div
                key={idx}
                onMouseMove={isActive ? handleMouseMove : undefined}
                onMouseEnter={() => isActive && setIsHovered(true)}
                onMouseLeave={() => isActive && setIsHovered(false)}
                className={`absolute inset-0 rounded-[32px] overflow-hidden border border-white/60 ${transitionClass}`}
                style={{
                  transform,
                  opacity,
                  filter,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 0,
                  // 100/100: Thick Beveled Glass Edge Glow
                  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 0 40px 0 rgba(232,160,32,0.05), 0 40px 100px -20px rgba(10,24,52,0.12)'
                }}
              >
                {/* 1. Ambient Background Artwork */}
                <div className="absolute inset-0 z-0 bg-slate-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className={`object-cover transition-transform duration-[2000ms] ease-out ${isActive ? 'scale-100 opacity-50' : 'scale-110 opacity-0'}`}
                  />
                  {/* Brand Color Burn */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/20 to-[#E8A020]/20 mix-blend-overlay" />

                  {/* Massive Kinetic Typography Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
                    <span className="text-[350px] md:text-[500px] font-black text-white leading-none tracking-tighter" style={{ fontFamily: 'var(--font-sora)' }}>
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* 2. Heavy Frosted Glass Diffuser */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[40px] z-10" />

                {/* 3. Surface Polish Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/20 z-10" />

                {/* 4. The Interactive Mouse Spotlight */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 mix-blend-screen"
                  style={{
                    opacity: isHovered && isActive ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mouseState.x}px ${mouseState.y}px, rgba(232,160,32,0.15), transparent 40%)`
                  }}
                />

                {/* 5. The Cinematic Laser Scanner Wipe */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none transition-transform duration-[1200ms] ease-out"
                  style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(232,160,32,0.8) 35%, rgba(255,255,255,1) 36%, rgba(232,160,32,0.2) 45%, transparent 55%)',
                    transform: isActive ? 'translateX(100%)' : 'translateX(-100%)'
                  }}
                />

                {/* 6. Staggered Cinematic Content */}
                <div className="relative z-30 p-8 md:p-14 flex flex-col h-full">

                  {/* Title Row */}
                  <div
                    className="transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-5 mb-8"
                    style={{ transitionDelay: '100ms', opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(20px)' }}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#E8A020] flex items-center justify-center font-black text-xl md:text-2xl shrink-0" style={{ fontFamily: 'var(--font-sora)' }}>
                      0{idx + 1}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black text-navy-900 leading-tight" style={{ fontFamily: 'var(--font-sora)' }}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div
                    className="transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transitionDelay: '200ms', opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(20px)' }}
                  >
                    <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-medium tracking-tight">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables Grid (3D Split-Flap + Continuous Float) */}
                  <div
                    className="mt-auto transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transitionDelay: '300ms', opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(20px)' }}
                  >
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                      Key Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" style={{ perspective: '1000px' }}>
                      {step.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{
                            transitionDelay: `${400 + i * 150}ms`,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'rotateX(0deg) translateY(0)' : 'rotateX(-90deg) translateY(20px)',
                            transformOrigin: 'top center'
                          }}
                        >
                          {/* Inner container handles the continuous floating animation without fighting the transition transform */}
                          <div className={`flex items-center gap-3 bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/80 shadow-[0_4px_12px_-4px_rgba(10,24,52,0.05)] ${isActive ? `animate-float-${i % 4}` : ''}`}>
                            <CheckCircle2 className="w-5 h-5 text-[#E8A020] shrink-0" />
                            <span className="text-sm font-bold text-navy-900">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
