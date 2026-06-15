'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export function CaseStudyHero({
  title,
  outcomeSummary,
  metrics,
  coverImage,
}: {
  title: string
  outcomeSummary?: string | null
  metrics: Array<{ label: string; value: string; unit?: string }>
  coverImage?: string | null
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
  }

  return (
    <section className="bg-[#FAFAFA] min-h-[90vh] pt-32 pb-16 px-4 md:px-8 font-sans overflow-hidden relative">
      {/* Ultra-premium subtle dot grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      
      <div className="max-w-[1400px] mx-auto w-full h-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Main Title Card (Col Span 7) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-12 lg:col-span-7 bg-white/90 backdrop-blur-2xl rounded-3xl p-8 md:p-14 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-200/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
                <Link href="/case-studies" className="hover:text-black transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> All Case Studies
                </Link>
                <span className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                <span className="text-black">Client Success Story</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-gray-900 leading-[1.05] tracking-tight mb-8 max-w-2xl">
                {title}
              </h1>
            </div>
            
            {outcomeSummary && (
              <p className="text-lg md:text-xl text-gray-500 leading-[1.8] max-w-xl font-medium mt-auto">
                {outcomeSummary}
              </p>
            )}
          </motion.div>

          {/* Featured Image Card (Col Span 5) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-12 lg:col-span-5 bg-white rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-200/60 h-[300px] lg:h-auto min-h-[400px] relative group"
          >
            <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src={coverImage || "/images/cs_hero_cover.png"} 
              alt={title}
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
            />
          </motion.div>

          {/* Metrics Row (Split across the bottom) */}
          {metrics.map((m, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className={`col-span-1 md:col-span-4 bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)] border border-gray-200/60 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500`}
            >
              {/* Decorative hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="text-[40px] md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-2 tracking-tighter leading-none">
                  {m.value}<span className="text-gray-300 font-medium ml-1">{m.unit}</span>
                </div>
                <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-4 max-w-[200px]">
                  {m.label}
                </div>
              </div>
              
              {/* Abstract geometric element inside metric card */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-tr from-gray-100 to-white rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
