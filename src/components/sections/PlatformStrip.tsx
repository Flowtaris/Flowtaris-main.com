'use client'

import { useEffect, useRef, useState } from 'react'

const PLATFORMS = [
  { name: 'NetSuite',   sub: 'ERP',            color: '#3B82F6' },
  { name: 'Coupa',      sub: 'Procurement',     color: '#10B981' },
  { name: 'SAP',        sub: 'S/4HANA',         color: '#8B5CF6' },
  { name: 'Workday',    sub: 'HCM',             color: '#F59E0B' },
  { name: 'Ironclad',   sub: 'CLM',             color: '#EC4899' },
  { name: 'Workato',    sub: 'Integration',     color: '#06B6D4' },
  { name: 'Salesforce', sub: 'CRM',             color: '#F97316' },
  { name: 'Make',       sub: 'Automation',      color: '#A855F7' },
  { name: 'Zylo',       sub: 'SaaS Management', color: '#14B8A6' },
]

// Each item occupies a slot in a horizontal conveyor
// Items are spaced evenly, centered on the active index
// CSS 3D transform creates perspective depth

export function PlatformStrip({
  label = 'Enterprise Platforms We Support',
}: {
  dark?: boolean
  label?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance every 2.5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % PLATFORMS.length)
    }, 2500)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const getItemStyle = (index: number) => {
    // Distance from active (wrapping)
    const total  = PLATFORMS.length
    let dist     = index - activeIndex
    // Wrap to shortest path
    if (dist > total / 2)  dist -= total
    if (dist < -total / 2) dist += total

    const absD = Math.abs(dist)

    // Visibility cutoff — only show ±3 from center
    if (absD > 3) return { display: 'none' as const }

    const translateX  = dist * 180     // horizontal spacing (px)
    const translateZ  = -absD * 90     // depth recession
    const rotateY     = dist * -18     // perspective rotation
    const scale       = 1 - absD * 0.18
    const opacity     = absD === 0 ? 1 : absD === 1 ? 0.65 : absD === 2 ? 0.3 : 0.12
    const blur        = absD === 0 ? 0 : absD === 1 ? 1 : absD === 2 ? 4 : 8
    const zIndex      = 10 - absD

    return {
      transform:  `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      filter:     blur > 0 ? `blur(${blur}px)` : 'none',
      zIndex,
      pointerEvents: (absD === 0 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
    }
  }

  return (
    <section
      className="overflow-hidden py-16 border-y"
      style={{
        background:   '#060D1A',
        borderColor:  'rgba(232,160,32,0.08)',
        perspective:  '1200px',
      }}
    >
      {/* Label */}
      <p
        className="text-center mb-10 text-[11px] uppercase tracking-[0.22em]"
        style={{
          color:      'rgba(232,160,32,0.5)',
          fontFamily: 'var(--font-jetbrains)',
        }}
      >
        {label}
      </p>

      {/* 3D carousel container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height:          '120px',
          perspective:     '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Left gradient mask */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #060D1A 20%, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #060D1A 20%, transparent)' }}
        />

        {/* Items */}
        {PLATFORMS.map((platform, i) => {
          const style    = getItemStyle(i)
          const isActive = i === activeIndex
          if (style.display === 'none') return null

          return (
            <div
              key={platform.name}
              onClick={() => setActiveIndex(i)}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                width:      '160px',
                height:     '80px',
                borderRadius: '14px',
                background:  isActive
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(255,255,255,0.02)',
                border:     `1px solid ${isActive ? `${platform.color}50` : 'rgba(255,255,255,0.06)'}`,
                transition:  'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                ...style,
              }}
            >
              {/* Color accent line */}
              <div
                style={{
                  width:        '32px',
                  height:       '2px',
                  background:   platform.color,
                  borderRadius: '1px',
                  marginBottom: '8px',
                  opacity:      isActive ? 1 : 0.4,
                  transition:   'opacity 0.4s',
                }}
              />
              <span
                style={{
                  fontSize:   isActive ? '18px' : '15px',
                  fontWeight: '700',
                  color:      isActive ? 'white' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-sora)',
                  transition: 'all 0.4s',
                  letterSpacing: '0.01em',
                }}
              >
                {platform.name}
              </span>
              <span
                style={{
                  fontSize:      '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         isActive ? platform.color : 'rgba(255,255,255,0.25)',
                  fontFamily:    'var(--font-jetbrains)',
                  marginTop:     '4px',
                  transition:    'color 0.4s',
                }}
              >
                {platform.sub}
              </span>
            </div>
          )
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {PLATFORMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width:        i === activeIndex ? '24px' : '6px',
              height:       '6px',
              borderRadius: '3px',
              background:   i === activeIndex ? '#E8A020' : 'rgba(255,255,255,0.15)',
              border:       'none',
              padding:      0,
              cursor:       'pointer',
              transition:   'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            aria-label={`Select ${PLATFORMS[i]?.name}`}
          />
        ))}
      </div>
    </section>
  )
}
