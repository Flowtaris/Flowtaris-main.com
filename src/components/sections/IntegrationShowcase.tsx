'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Activity, GitMerge, Database, Workflow, Server, Zap, Layers, Cpu } from 'lucide-react'

const integrations = [
  { 
    from: 'Coupa', 
    to: 'NetSuite', 
    title: 'Procurement to GL',
    href: '/integrations/procurement-to-GL', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    fromIcon: <Activity className="w-6 h-6 text-white" />,
    toIcon: <Database className="w-6 h-6 text-white" />,
    description: 'Procurement-to-GL journal automation with full reconciliation and audit trail.' 
  },
  { 
    from: 'Workday', 
    to: 'NetSuite', 
    title: 'HCM Sync',
    href: '/integrations/hcm-sync', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    fromIcon: <GitMerge className="w-6 h-6 text-white" />,
    toIcon: <Database className="w-6 h-6 text-white" />,
    description: 'Payroll journal entry automation from HCM to ERP — eliminating manual finance work.' 
  },
  { 
    from: 'Coupa', 
    to: 'SAP', 
    title: 'IDoc Management',
    href: '/integrations/idoc-management', 
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=800',
    fromIcon: <Activity className="w-6 h-6 text-white" />,
    toIcon: <Layers className="w-6 h-6 text-white" />,
    description: 'Procurement workflow sync between Coupa and SAP S/4HANA with IDoc management.' 
  },
  { 
    from: 'Ironclad', 
    to: 'Coupa', 
    title: 'Contract Lifecycle',
    href: '/integrations/contract-lifecycle', 
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    fromIcon: <Workflow className="w-6 h-6 text-white" />,
    toIcon: <Activity className="w-6 h-6 text-white" />,
    description: 'Contract lifecycle to procurement workflow — automated supplier onboarding.' 
  },
  { 
    from: 'Workday', 
    to: 'Coupa', 
    title: 'Identity Provisioning',
    href: '/integrations/identity-provisioning', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    fromIcon: <Server className="w-6 h-6 text-white" />,
    toIcon: <Activity className="w-6 h-6 text-white" />,
    description: 'Employee provisioning and access management automation across HR and procurement.' 
  },
  { 
    from: 'Zylo', 
    to: 'ERP', 
    title: 'SaaS Governance',
    href: '/integrations/saas-governance', 
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&q=80&w=800',
    fromIcon: <Zap className="w-6 h-6 text-white" />,
    toIcon: <Cpu className="w-6 h-6 text-white" />,
    description: 'SaaS portfolio governance and software asset management automation.' 
  },
]

interface IntegrationShowcaseProps {
  hideViewAll?: boolean;
}

export function IntegrationShowcase({ hideViewAll = false }: IntegrationShowcaseProps = {}) {
  return (
    <section className="bg-[#FAFAFA] py-24 font-sans border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#E8A020]" />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A020]"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                Integration Depth
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-[#0A1834] max-w-2xl tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              We connect the systems{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A020] to-[#D97706]">
                your business depends on
              </span>
            </h2>
          </div>
          {!hideViewAll && (
            <Link
              href="/services/erp-integrations"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-[#0A1834] group hover:text-[#E8A020] transition-colors pb-2"
            >
              View All Integrations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* The Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {integrations.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative h-[450px] w-full block bg-[#020617] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/5"
            >
              
              {/* === THE BACKGROUND ENVIRONMENT === */}
              <div className="absolute inset-0 bg-[#061024] opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms]">
                {/* Cyber Matrix Grid */}
                <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              </div>

              {/* === THE IMPLODING PHOTO === */}
              {/* Default: Covers entire card. Hover: Violently collapses into a 64px circle at exactly x:60px y:120px */}
              <div 
                className="absolute inset-0 z-20 transition-all duration-[900ms] ease-[cubic-bezier(0.85,0,0.15,1)] [clip-path:circle(150%_at_60px_120px)] group-hover:[clip-path:circle(32px_at_60px_120px)]"
              >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-150" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1834] via-[#0A1834]/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                
                {/* The Initial Title (Disappears as photo implodes) */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">{item.from}</span>
                    <ArrowRight className="w-3 h-3 text-[#E8A020]" strokeWidth={3} />
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">{item.to}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>{item.title}</h3>
                </div>
              </div>


              {/* === THE DATA FLOW SEQUENCE (REVEALED ON HOVER) === */}
              
              {/* 1. SOURCE NODE (Coupa) - Forms over the imploded photo */}
              {/* Center is at 60px, 120px. Size is 64x64. Position = left: 60-32=28px, top: 120-32=88px */}
              <div className="absolute left-[28px] top-[88px] w-16 h-16 rounded-full flex items-center justify-center z-30">
                <div className="w-full h-full rounded-full bg-[#E8A020]/20 border-2 border-[#E8A020] flex items-center justify-center shadow-[0_0_30px_rgba(232,160,32,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[500ms] backdrop-blur-md">
                  {item.fromIcon}
                </div>
                <span className="absolute -bottom-6 text-[10px] font-black text-[#E8A020] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[500ms] whitespace-nowrap">{item.from}</span>
              </div>

              {/* 2. TARGET NODE (NetSuite) - Flashes into existence on the right */}
              <div className="absolute right-[28px] top-[88px] w-16 h-16 rounded-full flex items-center justify-center z-30">
                <div className="w-full h-full rounded-full bg-[#00E5FF]/20 border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.5)] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-[1000ms] backdrop-blur-md">
                  {item.toIcon}
                </div>
                <span className="absolute -bottom-6 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[1000ms] whitespace-nowrap">{item.to}</span>
              </div>

              {/* 3. THE CONNECTION BEAM & HIGHWAY */}
              <div className="absolute left-[92px] right-[92px] top-[120px] h-[2px] z-20">
                {/* The tracking rail */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[600ms]" />
                
                {/* The hyper-speed laser strike */}
                <div className="absolute inset-y-0 left-0 bg-[#E8A020] shadow-[0_0_15px_#E8A020] w-0 group-hover:w-full transition-all duration-[300ms] ease-linear delay-[700ms]" />

                {/* The Multi-lane Data Highway (SVG) */}
                <div className="absolute -inset-y-4 inset-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[1100ms] overflow-hidden">
                  <svg width="100%" height="100%" preserveAspectRatio="none">
                    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#E8A020" strokeWidth="1" strokeDasharray="15 40">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="0.6s" repeatCount="indefinite" />
                    </line>
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#00E5FF" strokeWidth="2" strokeDasharray="40 100">
                      <animate attributeName="stroke-dashoffset" values="140;0" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#E8A020" strokeWidth="1" strokeDasharray="10 30">
                      <animate attributeName="stroke-dashoffset" values="80;0" dur="0.8s" repeatCount="indefinite" />
                    </line>
                  </svg>
                </div>
              </div>

              {/* === THE REVEALED TEXT === */}
              <div className="absolute bottom-0 inset-x-0 p-8 z-30 pointer-events-none">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[800ms] delay-[900ms]">
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-sora)' }}>{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A1834] border border-[#E8A020]/30 rounded-full text-[#E8A020] font-bold text-xs shadow-lg pointer-events-auto hover:bg-[#E8A020] hover:text-[#0A1834] transition-all duration-300">
                    Explore Architecture <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        {!hideViewAll && (
          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/services/erp-integrations"
              className="flex items-center gap-2 text-sm font-bold text-[#0A1834] group hover:text-[#E8A020] transition-colors"
            >
              View All Integrations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
