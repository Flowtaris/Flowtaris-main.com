'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ════════════════════════════════════════════════════════
   ANIMATED SECTION — Scroll-triggered reveal (Robust)
   ════════════════════════════════════════════════════════ */

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  // useInView is much more reliable than whileInView prop in Next.js App Router
  const isInView = useInView(ref, { once: true, margin: "-10px" })

  const directionOffsets = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none: { x: 0, y: 0 },
  }

  const offset = directionOffsets[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════
   STAGGERED GRID — Children animate in sequence
   ════════════════════════════════════════════════════════ */

interface StaggeredGridProps {
  children: React.ReactNode
  className?: string
  staggerMs?: number
}

export function StaggeredGrid({
  children,
  className,
  staggerMs = 80,
}: StaggeredGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerMs / 1000,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants} className="h-full">
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants} className="h-full">{children}</motion.div>}
    </motion.div>
  )
}
