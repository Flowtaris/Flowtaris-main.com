'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from '@/components/ui/PageTransition'
import { ArrowRight } from 'lucide-react'

export function FinanceCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="bg-[#FAFAFA] pb-24 lg:pb-32 overflow-hidden relative">
      <div className="container-content mx-auto px-6 max-w-7xl relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* Left Text Content */}
          <div className="w-full lg:w-5/12 space-y-8 z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[34px] font-bold text-gray-900 leading-[1.2] max-w-[450px]"
            >
              Ready to experience high-performance finance?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/contact" className="inline-block group">
                <div className="bg-[#00D639] hover:bg-[#00c033] text-black/90 font-medium text-[16px] px-[16px] py-[11px] h-[48px] rounded-full flex items-center justify-center gap-2 transition-colors duration-300">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <div className="w-full lg:w-7/12 flex justify-end lg:justify-center relative" style={{ perspective: '1200px' }}>
            <motion.div
              className="relative w-full max-w-[550px] aspect-[4/3]"
              initial={{ rotateX: 20, rotateY: -10, opacity: 0, scale: 0.9 }}
              animate={isInView ? { rotateX: 15, rotateY: -15, opacity: 1, scale: 1 } : { rotateX: 20, rotateY: -10, opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* Base Plate / Dashboard Container */}
              <div
                className="absolute inset-0 bg-white border border-gray-100 rounded-3xl overflow-hidden"
                style={{ transform: 'translateZ(0px)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}
              >
                {/* Header Dots */}
                <div className="h-12 border-b border-gray-50 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-[#00D639]" />
                </div>

                {/* Grid */}
                <div className="absolute inset-0 top-12 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
              </div>

              {/* Animated Bar Chart Layer */}
              <div className="absolute bottom-8 left-8 right-8 h-40 flex items-end justify-between gap-3 px-4" style={{ transform: 'translateZ(40px)' }}>
                {[30, 45, 35, 60, 50, 80, 65, 95, 80, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-gradient-to-t from-[#00D639]/40 to-[#00D639]/10 rounded-t-md border-t-2 border-[#00D639]"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${height}%` } : { height: 0 }}
                    transition={{ duration: 1, delay: 0.2 + (i * 0.05), ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>

              {/* Glowing Line Chart Layer */}
              <div className="absolute inset-0 top-12" style={{ transform: 'translateZ(80px)' }}>
                <svg className="w-full h-full overflow-visible" viewBox="0 0 550 350">
                  <defs>
                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Smooth curve intercepting the bars */}
                  <motion.path
                    d="M 20 280 Q 150 250 250 180 T 500 80"
                    fill="none"
                    stroke="#111827"
                    strokeWidth="5"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))" }}
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />

                  {/* High performance dot */}
                  <motion.circle
                    cx="500" cy="80" r="8" fill="#00D639"
                    filter="url(#neonGlow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 2.2, type: "spring" }}
                  />
                  <motion.circle
                    cx="500" cy="80" r="16" stroke="#00D639" strokeWidth="2" fill="none"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1.5, opacity: [0, 1, 0] } : { scale: 0.5, opacity: 0 }}
                    transition={{ delay: 2.4, duration: 2, repeat: Infinity }}
                  />
                </svg>
              </div>


              {/* Floating ambient glow lights */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00D639]/10 blur-[80px] rounded-full pointer-events-none" style={{ transform: 'translateZ(-50px)' }} />

            </motion.div>
          </div>

        </div>
      </div>

      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  )
}
