'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function InteractiveCaseList({ cases }: { cases: any[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // To make a trailing image effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!cases || cases.length === 0) return null

  return (
    <section className="bg-white py-24 relative" ref={containerRef}>
      <div className="container-content relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-8 bg-slate-300" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
            More Engagements
          </span>
        </div>

        <div className="flex flex-col border-t border-slate-200">
          {cases.map((cs, idx) => {
            const metrics = Array.isArray(cs.metrics) ? cs.metrics as Array<{ label: string; value: string; unit?: string }> : []
            const isHovered = hoveredIndex === idx

            return (
              <Link 
                href={`/case-studies/${cs.slug}`} 
                key={cs.slug}
                className="group relative block border-b border-slate-200 py-10 transition-colors hover:bg-slate-50"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between relative z-10 px-4 md:px-0">
                  
                  {/* Left: Title & Tags */}
                  <div className="flex-1 max-w-3xl">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(cs.platforms as string[])?.slice(0, 3).map((p) => (
                        <Badge key={p} variant="slate" className="text-slate-600 border-slate-200 bg-transparent">{p}</Badge>
                      ))}
                    </div>
                    <h3 
                      className="text-2xl md:text-4xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300" 
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {cs.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-1 group-hover:text-slate-700 transition-colors font-medium">
                      {cs.outcome_summary}
                    </p>
                  </div>

                  {/* Right: Key Metric & Arrow */}
                  <div className="flex items-center gap-12 md:justify-end shrink-0">
                    {metrics.length > 0 && (
                      <div className="text-left md:text-right">
                        <div className="text-2xl md:text-3xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{metrics[0]?.value}{metrics[0]?.unit}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{metrics[0]?.label}</div>
                      </div>
                    )}
                    
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 text-slate-400 bg-white group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:border-gold-500 transition-all duration-300 shadow-sm">
                      <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Floating Image Reveal (Desktop Only) */}
      <div className="hidden md:block pointer-events-none absolute inset-0 overflow-hidden z-0">
        <AnimatePresence>
          {hoveredIndex !== null && cases[hoveredIndex]?.cover_image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 0.15, 
                scale: 1,
                x: mousePos.x - 300, // offset to center the image
                y: mousePos.y - 200,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 100, damping: 25, opacity: { duration: 0.2 } }}
              className="absolute w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ top: 0, left: 0 }}
            >
              <Image 
                src={cases[hoveredIndex].cover_image_url} 
                alt="Case Study"
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
