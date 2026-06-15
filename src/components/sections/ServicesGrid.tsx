import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'

// Mini architectural SVG for each service — unique, technical, not generic
const ServiceVisuals = {
  netsuite: () => (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(232,160,32,0.3)] transition-all">
      {/* ERP database architecture */}
      <rect x="4" y="8" width="48" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.2" fill="rgba(59,130,246,0.08)"/>
      <rect x="4" y="23" width="48" height="10" rx="2" stroke="#E8A020" strokeWidth="1.2" fill="rgba(232,160,32,0.08)"/>
      <rect x="4" y="38" width="22" height="10" rx="2" stroke="rgba(232,160,32,0.4)" strokeWidth="1" fill="rgba(232,160,32,0.04)"/>
      <rect x="30" y="38" width="22" height="10" rx="2" stroke="rgba(59,130,246,0.4)" strokeWidth="1" fill="rgba(59,130,246,0.04)"/>
      <path d="M28 18v5M15 33v5M41 33v5" stroke="rgba(232,160,32,0.5)" strokeWidth="1" strokeDasharray="2 2"/>
      <circle cx="28" cy="13" r="2" fill="#3B82F6"/>
      <circle cx="28" cy="28" r="2" fill="#E8A020"/>
    </svg>
  ),
  coupa: () => (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(232,160,32,0.3)] transition-all">
      {/* Procurement flow */}
      <rect x="4" y="10" width="14" height="10" rx="2" stroke="#10B981" strokeWidth="1.2" fill="rgba(16,185,129,0.08)"/>
      <rect x="21" y="10" width="14" height="10" rx="2" stroke="#E8A020" strokeWidth="1.2" fill="rgba(232,160,32,0.08)"/>
      <rect x="38" y="10" width="14" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.2" fill="rgba(59,130,246,0.08)"/>
      <path d="M18 15h3M35 15h3" stroke="#E8A020" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M11 20v8h34v-8" stroke="rgba(232,160,32,0.3)" strokeWidth="1"/>
      <rect x="12" y="28" width="32" height="18" rx="3" stroke="#E8A020" strokeWidth="1.2" fill="rgba(232,160,32,0.05)"/>
      <path d="M18 35h20M18 39h12" stroke="rgba(232,160,32,0.5)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  integrations: () => (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(232,160,32,0.3)] transition-all">
      {/* Hub and spoke integration */}
      <circle cx="28" cy="28" r="7" stroke="#E8A020" strokeWidth="1.5" fill="rgba(232,160,32,0.1)"/>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x2  = 28 + Math.cos(rad) * 16
        const y2  = 28 + Math.sin(rad) * 16
        const colors = ['#3B82F6','#10B981','#6366F1','#F59E0B','#EC4899','#8B5CF6']
        return (
          <g key={deg}>
            <line x1="28" y1="28" x2={x2} y2={y2} stroke={`${colors[i]}60`} strokeWidth="1" strokeDasharray="2 2"/>
            <circle cx={x2} cy={y2} r="5" stroke={colors[i]} strokeWidth="1.2" fill={`${colors[i]}15`}/>
          </g>
        )
      })}
    </svg>
  ),
  support: () => (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(232,160,32,0.3)] transition-all">
      {/* 24/7 support lifecycle */}
      <circle cx="28" cy="28" r="20" stroke="rgba(232,160,32,0.2)" strokeWidth="1"/>
      <path d="M28 8 A20 20 0 0 1 48 28" stroke="#E8A020" strokeWidth="2" strokeLinecap="round"/>
      <path d="M48 28 A20 20 0 0 1 28 48" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 48 A20 20 0 0 1 8 28" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 28 A20 20 0 0 1 28 8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="28" cy="28" r="8" fill="#0A1628" stroke="#E8A020" strokeWidth="1.2"/>
      <path d="M25 25l6 3-6 3V25z" fill="#E8A020"/>
    </svg>
  ),
  automation: () => (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(232,160,32,0.3)] transition-all">
      {/* Workflow automation */}
      <rect x="4" y="12" width="10" height="8" rx="2" stroke="#E8A020" strokeWidth="1.2" fill="rgba(232,160,32,0.08)"/>
      <rect x="23" y="12" width="10" height="8" rx="2" stroke="#3B82F6" strokeWidth="1.2" fill="rgba(59,130,246,0.08)"/>
      <rect x="42" y="12" width="10" height="8" rx="2" stroke="#10B981" strokeWidth="1.2" fill="rgba(16,185,129,0.08)"/>
      <rect x="23" y="36" width="10" height="8" rx="2" stroke="#E8A020" strokeWidth="1.2" fill="rgba(232,160,32,0.08)"/>
      <path d="M14 16h9M33 16h9" stroke="rgba(232,160,32,0.5)" strokeWidth="1.2" strokeLinecap="round" markerEnd="url(#arrow)"/>
      <path d="M28 20v16" stroke="rgba(232,160,32,0.5)" strokeWidth="1.2" strokeDasharray="3 2"/>
      <path d="M52 16v14a4 4 0 01-4 4h-7" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="28" cy="29" r="3" fill="#E8A020" opacity="0.8"/>
    </svg>
  ),
  sapworkday: () => (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(232,160,32,0.3)] transition-all">
      {/* Enterprise platform layers */}
      <rect x="8" y="8" width="40" height="12" rx="3" stroke="#6366F1" strokeWidth="1.2" fill="rgba(99,102,241,0.08)"/>
      <rect x="8" y="24" width="40" height="12" rx="3" stroke="#E8A020" strokeWidth="1.2" fill="rgba(232,160,32,0.08)"/>
      <rect x="8" y="40" width="40" height="10" rx="3" stroke="#F59E0B" strokeWidth="1.2" fill="rgba(245,158,11,0.08)"/>
      <text x="28" y="16" textAnchor="middle" fill="#6366F1" fontSize="6" fontFamily="monospace">SAP S/4HANA</text>
      <text x="28" y="32" textAnchor="middle" fill="#E8A020" fontSize="6" fontFamily="monospace">Integration Layer</text>
      <text x="28" y="47" textAnchor="middle" fill="#F59E0B" fontSize="6" fontFamily="monospace">Workday HCM</text>
      <path d="M28 20v4M28 36v4" stroke="rgba(232,160,32,0.5)" strokeWidth="1" strokeDasharray="2 2"/>
    </svg>
  ),
}

const services = [
  {
    Visual:      ServiceVisuals.netsuite,
    label:       'NetSuite Consulting',
    href:        '/services/netsuite-consulting',
    description: 'Implementation, customization, SuiteScript, release management and ongoing managed support for Oracle NetSuite environments.',
    tags:        ['Implementation', 'SuiteScript', 'Release Mgmt'],
  },
  {
    Visual:      ServiceVisuals.coupa,
    label:       'Coupa Consulting',
    href:        '/services/coupa-consulting',
    description: 'Procurement, supplier management, invoicing, approvals and full Coupa lifecycle support from deployment to release governance.',
    tags:        ['Procurement', 'Approvals', 'Integrations'],
  },
  {
    Visual:      ServiceVisuals.integrations,
    label:       'ERP Integrations',
    href:        '/services/erp-integrations',
    description: 'Secure, monitored and documented integrations between NetSuite, Coupa, SAP, Workday, Ironclad and enterprise middleware platforms.',
    tags:        ['API', 'Middleware', 'Automation'],
  },
  {
    Visual:      ServiceVisuals.support,
    label:       'Managed Support',
    href:        '/services/managed-support',
    description: 'Always-on production support, incident resolution, enhancement delivery and release testing across your enterprise application stack.',
    tags:        ['24/7 Support', 'Enhancements', 'Release Testing'],
  },
  {
    Visual:      ServiceVisuals.automation,
    label:       'AI & Automation',
    href:        '/services/ai-automation',
    description: 'Workflow automation, business process automation and AI-ready enterprise process design that eliminates manual effort at scale.',
    tags:        ['Workflow', 'Process Design', 'AI-Ready'],
  },
  {
    Visual:      ServiceVisuals.sapworkday,
    label:       'SAP & Workday',
    href:        '/services/sap-workday',
    description: 'SAP S/4HANA and Workday HCM consulting, integration, configuration and optimization for enterprise environments.',
    tags:        ['SAP S/4HANA', 'Workday HCM', 'Integrations'],
  },
]

export function ServicesGrid({ dynamicServices = [] }: { dynamicServices?: any[] }) {
  const visualKeys = Object.keys(ServiceVisuals) as (keyof typeof ServiceVisuals)[];

  const displayServices = dynamicServices.length > 0
    ? dynamicServices.map((ds, idx) => {
        const heroData = ds.services_hero && ds.services_hero.length > 0 ? ds.services_hero[0] : null;
        const visualKey = visualKeys[idx % visualKeys.length] as keyof typeof ServiceVisuals;
        return {
          Visual: ServiceVisuals[visualKey],
          label: ds.name,
          href: `/services/${ds.slug}`,
          description: heroData?.normal_description || 'Enterprise implementation and custom consulting.',
          tags: ['Consulting', 'Implementation', 'Support'],
        }
      })
    : services;

  return (
    <section className="bg-[#FAFAFA] py-24 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-16">
          <div className="h-[1px] w-8 bg-[#E8A020]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E8A020]">
            Core Portfolio
          </span>
        </div>

        {/* Elite Institutional Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => {
            return (
              <Link 
                key={index}
                href={service.href}
                className="group flex flex-col h-full bg-white border border-slate-200 p-10 md:p-14 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(10,22,40,0.08)] hover:-translate-y-1 relative overflow-hidden min-h-[460px] rounded-2xl"
                style={{ '--brand-color': service.color } as React.CSSProperties}
              >
                {/* Subtle top border accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--brand-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Numbering */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] group-hover:text-[var(--brand-color)] transition-colors duration-500">
                    No. {`0${index + 1}`.slice(-2)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 relative z-10">
                  <h2 className="text-3xl font-light text-[#0A1628] mb-6 leading-tight group-hover:text-[var(--brand-color)] transition-colors duration-500" style={{ fontFamily: 'var(--font-sora)' }}>
                    {service.label}
                  </h2>
                  <p className="text-sm text-slate-500 font-light leading-relaxed max-w-[95%] mb-8">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 bg-slate-50 text-slate-500 border border-slate-200 transition-colors duration-500 group-hover:border-[var(--brand-color)]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 flex items-center gap-4 relative z-10">
                  <div className="h-[1px] w-8 group-hover:w-12 bg-slate-300 group-hover:bg-[var(--brand-color)] transition-all duration-500 ease-out" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-[var(--brand-color)] transition-colors duration-500">
                    Explore Configuration
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
