'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import NextLink, { LinkProps } from 'next/link'
import { useTransitionContext, TransitionContextType } from '@/components/ui/PageTransitionProvider'

// Custom Link Component for Transitions
export interface TransitionLinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  children: React.ReactNode
}

export const Link = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, children, ...props }, ref) => {
    const { navigate } = useTransitionContext()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow modifier clicks (cmd/ctrl click to open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
        return
      }

      e.preventDefault()
      if (onClick) onClick(e)
      navigate(href.toString())
    }

    return (
      <NextLink ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </NextLink>
    )
  }
)
Link.displayName = 'Link'

// 4. PageTransition Curtain Component
export function PageTransition() {
  const { isTransitioning } = useTransitionContext()
  const columns = [0, 1, 2, 3, 4]

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9998] flex w-screen h-screen overflow-hidden pointer-events-none">
          {/* Staggered Shutter Columns */}
          {columns.map((i) => (
            <motion.div
              key={i}
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.05,
              }}
              style={{
                background: 'linear-gradient(to bottom, #0F2040 0%, #060D1A 100%)',
              }}
              className="h-full flex-1 relative border-r border-white/[0.015] last:border-r-0 pointer-events-auto"
            >
              {/* Gold Sweeping Line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E8A020, #F5C860, transparent)',
                  boxShadow: '0 0 12px rgba(232, 160, 32, 0.6)',
                }}
              />
            </motion.div>
          ))}

          {/* Central Logo & Tagline Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="flex flex-col items-center max-w-xl w-[90%] text-center"
            >
              <div className="relative mb-6">
                {/* Logo glow pulse */}
                <div className="absolute -inset-4 rounded-full bg-gold-500/10 blur-xl opacity-60 animate-pulse pointer-events-none" />
                <Image
                  src="/images/logo.png"
                  alt="Flowtaris Logo"
                  width={112}
                  height={112}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(232,160,32,0.4)]"
                  priority
                />
              </div>

              {/* Tagline */}
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-sora)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #FFF 30%, #F9DFA0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '1.2',
                }}
              >
                The Science of Business Flow
              </motion.h1>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

