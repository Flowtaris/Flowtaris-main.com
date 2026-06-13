'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { NAV_SERVICES, NAV_INDUSTRIES, SITE_EMAIL } from '@/lib/constants/navigation'
import { ArrowRight } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

const SOCIAL_LINKS = [
  { label: 'Email', href: `mailto:${SITE_EMAIL}` },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/flowtaris' },
  { label: 'X', href: 'https://x.com/flowtaris' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Magnetic Cursor Light Physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    const rect = document.getElementById('footer-vault')?.getBoundingClientRect()
    if (rect) {
      mouseX.set(rect.width / 2)
      mouseY.set(rect.height / 2)
    }
  }

  return (
    <footer
      id="footer-vault"
      className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] bg-black overflow-hidden group cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Deep Space Ambient Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-black">
        {/* Extremely Bright Autonomous Orbs using Radial Gradients for true emission */}
        <div className="absolute top-[-30%] left-[-20%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle_at_center,#00D639_0%,transparent_70%)] opacity-[0.35] animate-pulse mix-blend-screen" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-30%] right-[-20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle_at_center,#0055FF_0%,transparent_70%)] opacity-[0.25] animate-pulse mix-blend-screen" style={{ animationDuration: '12s', animationDelay: '2s' }} />

        {/* Interactive Magnetic Core (Follows Mouse) */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#00FF66_0%,transparent_60%)] opacity-0 group-hover:opacity-[0.85] transition-opacity duration-700 mix-blend-screen"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />
      </div>

      {/* 2. Frosted Glass Vault Layer */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[60px] border-t border-white/[0.05]" />

      {/* 3. Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between px-6 lg:px-16 pt-24 pb-12">

        {/* Top: Monolithic Branding */}
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none mt-12 relative">

          {/* 
            This is the magic. color-dodge makes the text violently light up when a bright color passes underneath it.
            Normally it is a dim grey, but the mouse tracker will ignite it.
          */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,18vw,15rem)] font-black tracking-tighter leading-none text-[#555] mix-blend-color-dodge select-none"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            FLOWTARIS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 text-sm md:text-lg lg:text-xl font-medium tracking-wide mt-4 md:mt-[-20px]"
          >
            Institutional grade systems, perfected.
          </motion.p>
        </div>

        {/* Bottom: Ultra-Minimalist Floating Nav */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-8 mt-24 pointer-events-auto"
        >
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Clean Row Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-sm font-medium text-white/20 pl-4 border-l border-white/10">
              &copy; {currentYear}
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
