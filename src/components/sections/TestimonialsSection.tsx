'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Testimonial } from '@/types/database'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = RTL, -1 = LTR
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const length = testimonials?.length || 0

  useEffect(() => {
    if (length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + direction + length) % length)
    }, 4000)

    return () => clearInterval(interval)
  }, [length, isPaused, direction])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + length) % length)
  }

  if (!testimonials || testimonials.length === 0) return null

  const variants = {
    enter: (dir: number) => ({
      x: dir === 1 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir === 1 ? -100 : 100,
      opacity: 0,
    })
  }

  const currentTestimonial = testimonials[currentIndex]
  if (!currentTestimonial) return null

  return (
    <section 
      className="py-24 md:py-32 bg-[#FAFAFA] overflow-hidden" 
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Header & Controls */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              <span className="font-light">From our</span><br />
              <span className="font-bold">clients.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md">
              Here&apos;s what industry leaders had to say about Flowtaris.
            </p>
            
            {/* Minimalist Controls */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePrev}
                className="w-14 h-14 flex items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-all bg-white shadow-sm"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
              </button>
              
              <button 
                onClick={handleNext}
                className="w-14 h-14 flex items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-all bg-white shadow-sm"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Right Side: Testimonial Carousel */}
          <div className="lg:col-span-8 relative min-h-[350px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full flex flex-col"
              >
                {/* Large Blue Quote Mark */}
                <div className="text-[#1E3A8A] text-6xl md:text-8xl font-serif leading-none mb-4 md:mb-6" aria-hidden="true">
                  &ldquo;
                </div>

                <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 leading-snug font-medium mb-10">
                  {currentTestimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  {currentTestimonial.image_url ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 bg-slate-200 shadow-sm">
                      <img src={currentTestimonial.image_url} alt={currentTestimonial.client_name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-slate-600 font-medium text-2xl">{currentTestimonial.client_name.charAt(0)}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col">
                    <div className="font-bold text-slate-900 text-lg md:text-xl">
                      {currentTestimonial.client_name}
                    </div>
                    {(currentTestimonial.client_role || currentTestimonial.client_company) && (
                      <div className="text-sm md:text-base text-slate-500 mt-0.5">
                        {currentTestimonial.client_role}
                        {currentTestimonial.client_role && currentTestimonial.client_company ? ', ' : ''}
                        {currentTestimonial.client_company}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
