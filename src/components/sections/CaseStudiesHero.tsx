'use client'

import { motion } from 'framer-motion'

export function CaseStudiesHero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-[#0B1121] pt-32 pb-20">
      {/* Background glowing effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-gold-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[140px] mix-blend-screen" />
        
        {/* Subtle dot grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        {/* Fade out edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121] via-transparent to-[#0B1121]" />
      </div>

      <div className="container-content relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/10 mb-8 backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-gold-300 uppercase">
              Proven Enterprise Outcomes
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-bold text-white mb-8 tracking-tight leading-[1.1]" 
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Transformations That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600">
              Deliver Impact.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            Every case study here represents a high-stakes enterprise engagement — complex systems, demanding timelines, and real business outcomes. These are not estimates. These are results.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
