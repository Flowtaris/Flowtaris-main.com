'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function PageTransition() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const prevPath = useRef(pathname)
  const [label, setLabel] = useState('Flowtaris')

  useEffect(() => {
    if (prevPath.current !== pathname) {
      const parts = pathname.split('/').filter(Boolean)
      const raw = parts[parts.length - 1] ?? 'Flowtaris'
      const formatted = raw
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      setLabel(formatted || 'Flowtaris')

      setShow(true)
      const t = setTimeout(() => {
        setShow(false)
        prevPath.current = pathname
      }, 900)
      return () => clearTimeout(t)
    }
    return undefined
  }, [pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1, originY: 1 }}
          exit={{ scaleY: 0, originY: 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: '#060D1A', transformOrigin: 'bottom' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #E8A020, transparent)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #E8A020, transparent)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#0A1628',
                border: '1.5px solid rgba(232,160,32,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#E8A020', fontFamily: 'var(--font-sora)' }}>
                F
              </span>
            </div>

            <div className="text-center">
              <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,160,32,0.6)', fontFamily: 'var(--font-jetbrains)' }}>
                Flowtaris
              </p>
              <p style={{ fontSize: '18px', fontWeight: '600', color: 'white', fontFamily: 'var(--font-sora)', marginTop: '4px' }}>
                {label}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
