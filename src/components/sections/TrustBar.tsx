'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'

// Custom SVG illustrations — purposely engineered-looking
function CertificationIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="8" y="12" width="48" height="36" rx="4" stroke="#E8A020" strokeWidth="1.5" fill="rgba(232,160,32,0.05)"/>
      <path d="M20 24h24M20 30h16M20 36h20" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
      <circle cx="48" cy="46" r="8" fill="#0A1628" stroke="#E8A020" strokeWidth="1.5"/>
      <path d="M44.5 46l2 2 4-4" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <path d="M32 8L10 18v14c0 10 9.5 20 22 24 12.5-4 22-14 22-24V18L32 8z" stroke="#E8A020" strokeWidth="1.5" fill="rgba(232,160,32,0.05)"/>
      <path d="M22 32l6 6 14-14" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18h44" stroke="rgba(232,160,32,0.2)" strokeWidth="1"/>
    </svg>
  )
}

function IntegrationIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="4" y="24" width="16" height="16" rx="3" stroke="#3B82F6" strokeWidth="1.5" fill="rgba(59,130,246,0.1)"/>
      <rect x="44" y="24" width="16" height="16" rx="3" stroke="#10B981" strokeWidth="1.5" fill="rgba(16,185,129,0.1)"/>
      <path d="M20 32h10M34 32h10" stroke="#E8A020" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="32" cy="32" r="6" fill="#0A1628" stroke="#E8A020" strokeWidth="1.5"/>
      <path d="M29 32h6" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 29v6" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function GlobeIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <circle cx="32" cy="32" r="22" stroke="#E8A020" strokeWidth="1.5" fill="rgba(232,160,32,0.05)"/>
      <ellipse cx="32" cy="32" rx="12" ry="22" stroke="rgba(232,160,32,0.4)" strokeWidth="1"/>
      <path d="M10 32h44" stroke="rgba(232,160,32,0.4)" strokeWidth="1"/>
      <path d="M13 20h38M13 44h38" stroke="rgba(232,160,32,0.2)" strokeWidth="0.8"/>
      <circle cx="32" cy="22" r="3" fill="#E8A020" opacity="0.7"/>
      <circle cx="20" cy="36" r="2" fill="#3B82F6" opacity="0.7"/>
      <circle cx="44" cy="28" r="2" fill="#10B981" opacity="0.7"/>
    </svg>
  )
}

const trustItems = [
  {
    Illustration: CertificationIllustration,
    stat:         null,
    title:        'Certified Consultants',
    description:  'NetSuite, Coupa & SAP certified across every platform we deliver.',
    accent:       '#E8A020',
  },
  {
    Illustration: ShieldIllustration,
    stat:         null,
    title:        'Audit-Ready Delivery',
    description:  'SOX-compliant implementations with full documentation and controls.',
    accent:       '#E8A020',
  },
  {
    Illustration: IntegrationIllustration,
    stat:         null,
    title:        'Enterprise Integrations',
    description:  'Secure, monitored and documented. Every integration ships with runbooks.',
    accent:       '#3B82F6',
  },
  {
    Illustration: GlobeIllustration,
    stat:         null,
    title:        'Global Coverage',
    description:  'Clients across US, UK and APAC. Enterprise time-zone support.',
    accent:       '#10B981',
  },
]

export function TrustBar({ dark: _dark = false }: { dark?: boolean }) {
  return (
    <section style={{ background: '#060D1A', borderTop: '1px solid rgba(232,160,32,0.1)', borderBottom: '1px solid rgba(232,160,32,0.1)' }}>
      <div className="container-content py-16">
        <AnimatedSection>
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block relative mb-8">
            <div className="absolute top-1/2 left-16 right-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.2), rgba(232,160,32,0.4), rgba(232,160,32,0.2), transparent)' }} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustItems.map((item) => {
              const Illustration = item.Illustration
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(232,160,32,0.05)'
                    ;(e.currentTarget as HTMLElement).style.border = '1px solid rgba(232,160,32,0.2)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                    ;(e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.05)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid ${item.accent}30` }}>
                    <Illustration />
                  </div>
                  <div>
                    <h3
                      className="text-sm font-bold text-white mb-1.5"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
