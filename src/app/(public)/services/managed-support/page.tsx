'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Activity, Users, Zap, Database, Lock, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'support',
    title: '24/7 Incident Resolution',
    desc: 'Rapid response to critical system errors, integration failures, and user access issues with strict SLA adherence.',
    icon: Clock,
    imageBg: 'from-[#059669]/20 to-[#047857]/20',
    primaryColor: 'text-[#059669]',
    primaryBg: 'bg-[#059669]',
  },
  {
    id: 'enhancements',
    title: 'Continuous Enhancements',
    desc: 'Proactively develop new saved searches, reports, custom fields, and workflows to adapt to your evolving business needs.',
    icon: Zap,
    imageBg: 'from-[#FFD166]/20 to-[#059669]/20',
    primaryColor: 'text-[#FFD166]',
    primaryBg: 'bg-[#FFD166]',
  },
  {
    id: 'release',
    title: 'Release Management',
    desc: 'Rigorous testing of NetSuite and Coupa bi-annual releases in sandbox environments to ensure zero disruption to production.',
    icon: ShieldCheck,
    imageBg: 'from-[#7A84F2]/20 to-[#141736]/20',
    primaryColor: 'text-[#7A84F2]',
    primaryBg: 'bg-[#7A84F2]',
  },
  {
    id: 'admin',
    title: 'Dedicated Administration',
    desc: 'Act as your dedicated system administrator, managing user roles, permissions, and security compliance audits.',
    icon: Users,
    imageBg: 'from-[#059669]/20 to-[#141736]/20',
    primaryColor: 'text-[#059669]',
    primaryBg: 'bg-[#059669]',
  }
]

const BENEFITS = [
  { title: 'Strict SLAs', desc: 'Guaranteed response and resolution times for critical, high, and normal priority incidents.', icon: Clock },
  { title: 'Sandbox Testing', desc: 'All changes and enhancements are rigorously tested in Sandbox before production deployment.', icon: ShieldCheck },
  { title: 'Proactive Monitoring', desc: 'We monitor integration logs and system performance to catch errors before users notice them.', icon: Activity },
  { title: 'Security Audits', desc: 'Regular reviews of user roles, permissions, and separation of duties to maintain compliance.', icon: Lock },
  { title: 'Strategic Roadmap', desc: 'Quarterly business reviews to align system capabilities with your strategic business goals.', icon: Users },
  { title: 'Predictable Costs', desc: 'Flat-rate managed support plans that eliminate unpredictable billing spikes.', icon: Database },
]

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ManagedSupportPage() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <main className="bg-white selection:bg-[#059669] selection:text-white">
      <section className="relative pt-[100px] pb-24 overflow-hidden bg-[#059669]">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <motion.div
              className="lg:w-[55%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[42px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                Always-On Enterprise Support
              </h1>
              <div className="w-16 h-1 bg-white/50 mb-8" />
              <p className="text-[18px] text-white/90 leading-relaxed mb-10 max-w-2xl font-light">
                Protect your ERP investment. Flowtaris provides dedicated administration, rigorous release testing, and lightning-fast incident resolution for complex enterprise environments.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#141736] text-white font-bold text-[15px] hover:bg-[#0B0D1F] transition-colors border border-transparent shadow-lg">
                  Request Support Plan
                </Link>
                <button onClick={() => scrollToSection('features')} className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-transparent text-white font-bold text-[15px] border border-white/50 hover:bg-white hover:text-[#059669] transition-colors">
                  View Coverage
                </button>
              </div>
            </motion.div>

            <div className="lg:w-[45%] relative h-[400px] lg:h-[500px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[450px] aspect-square">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                    className="absolute top-0 right-10 w-64 h-64 rounded-full bg-[#141736]/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <ShieldCheck className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-[#047857]/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <Activity className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
                    className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#FFD166]/90 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <Clock className="w-12 h-12 text-[#141736] opacity-90" strokeWidth={1} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={cn(
        "sticky top-[90px] z-40 bg-white border-b border-slate-200 transition-all duration-300 shadow-sm",
        scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center gap-8 overflow-x-auto hide-scrollbar">
          {['Overview', 'Benefits', 'Features', 'Methodology'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="py-5 text-[14px] font-bold text-slate-600 hover:text-[#059669] whitespace-nowrap border-b-[3px] border-transparent hover:border-[#059669] transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex items-center py-2">
            <Link href="/contact" className="px-6 py-2.5 text-[13px] font-bold bg-[#141736] text-white rounded-[4px] hover:bg-[#059669] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="mb-16 text-center">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Why Choose Flowtaris Support?
            </h2>
            <div className="w-16 h-1 bg-[#059669] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 rounded-[8px] hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center mb-6 text-[#059669] rounded-[4px] group-hover:bg-[#059669] group-hover:text-white transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-bold text-[#141736] mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-28 relative overflow-hidden bg-gradient-to-br from-[#059669] to-[#047857]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)] -translate-y-1/3 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(20,23,54,0.15),transparent_60%)] translate-y-1/3 -translate-x-1/4 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-[36px] md:text-[46px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Comprehensive SLA Coverage
            </h2>
            <div className="w-16 h-1 bg-white/50 mx-auto mb-6" />
            <p className="text-[18px] text-white/90 max-w-3xl mx-auto font-light">Explore the pillars of our managed services model that keep your business running smoothly.</p>
          </div>

          <div className="flex flex-col lg:flex-row relative mt-16">
            <div className="w-full lg:w-[30%] flex flex-col z-20 relative lg:-mr-4">
              {TABS.map((tab) => {
                const isActive = activeTab.id === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "text-left px-8 py-6 transition-all duration-300 w-full rounded-l-[12px] relative",
                      isActive
                        ? "bg-white text-[#141736] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] rounded-r-[12px] lg:rounded-r-none z-30"
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    <span className={cn("font-bold text-[18px]", isActive ? "text-[#141736]" : "text-white/80")}>
                      {tab.title}
                    </span>
                    {isActive && (
                      <div className="hidden lg:block absolute right-[-2px] top-0 bottom-0 w-1 bg-white" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="w-full lg:w-[70%] bg-white rounded-[12px] shadow-[0_20px_60px_rgba(5,150,105,0.15)] relative z-10 mt-6 lg:mt-0 min-h-[500px] border border-[#059669]/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-10 lg:p-14 flex flex-col lg:flex-row gap-12 h-full"
                >
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={cn("w-12 h-12 rounded-[8px] flex items-center justify-center bg-opacity-10", activeTab.primaryBg)}>
                        <activeTab.icon className={cn("w-6 h-6", activeTab.primaryColor)} />
                      </div>
                      <h3 className="text-[28px] font-bold text-[#141736]" style={{ fontFamily: 'var(--font-sora)' }}>
                        {activeTab.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-[16px] leading-relaxed mb-10">
                      {activeTab.desc}
                    </p>
                    <div>
                      <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#059669] text-white font-bold text-[15px] hover:bg-[#141736] transition-colors border border-transparent shadow-[0_10px_20px_rgba(5,150,105,0.2)]">
                        Explore Capability
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-1/2 flex items-center justify-center">
                    <div className="w-full bg-[#F0FDF4] rounded-[8px] p-6 border border-[#059669]/20 shadow-inner relative aspect-[4/3] flex flex-col overflow-hidden">
                      <div className="flex items-center gap-2 mb-4 border-b border-[#059669]/10 pb-4">
                        <div className="w-3 h-3 rounded-full bg-[#059669]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#059669]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#059669]/40" />
                      </div>
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/3 h-20 bg-white rounded shadow-sm border border-[#059669]/10 flex flex-col justify-center items-center gap-2">
                          <div className={cn("w-6 h-6 rounded-full opacity-20", activeTab.primaryBg)} />
                          <div className="w-1/2 h-2 bg-slate-100 rounded" />
                        </div>
                        <div className="w-1/3 h-20 bg-white rounded shadow-sm border border-slate-100 flex flex-col justify-center items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100" />
                          <div className="w-1/2 h-2 bg-slate-100 rounded" />
                        </div>
                        <div className="w-1/3 h-20 bg-white rounded shadow-sm border border-slate-100 flex flex-col justify-center items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100" />
                          <div className="w-1/2 h-2 bg-slate-100 rounded" />
                        </div>
                      </div>
                      <div className="w-full flex-1 bg-white rounded shadow-sm border border-[#059669]/10 p-5 flex flex-col gap-3">
                        <div className="w-full h-3 bg-[#059669]/10 rounded" />
                        <div className="w-5/6 h-3 bg-slate-100 rounded" />
                        <div className="w-4/6 h-3 bg-slate-100 rounded" />
                        <div className="mt-auto flex justify-between items-end">
                          <div className={cn("w-12 h-12 rounded opacity-10", activeTab.primaryBg)} />
                          <div className="w-24 h-6 bg-slate-100 rounded" />
                        </div>
                      </div>
                      <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br mix-blend-multiply", activeTab.imageBg)} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section id="methodology" className="py-28 bg-[#F0FDF4] border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="mb-20">
            <h2 className="text-[36px] md:text-[46px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              A Rigorous Support Methodology
            </h2>
            <div className="w-16 h-1 bg-[#059669] mb-8" />
            <p className="text-slate-600 text-[18px] leading-relaxed max-w-3xl">
              We operate as a seamless extension of your IT team. From submitting a ticket to deploying a complex enhancement, our process is transparent, secure, and highly efficient.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                phase: '01',
                title: 'Ticketing & Triage',
                desc: 'Users submit requests via a dedicated portal. Tickets are immediately triaged by severity and routed to the appropriate subject matter expert.',
                features: ['Custom Portal', 'SLA Tracking', 'Priority Routing'],
                color: 'bg-[#059669]'
              },
              {
                phase: '02',
                title: 'Investigation & Resolution',
                desc: 'Our engineers investigate root causes, not just symptoms. For critical issues, resolution begins immediately. For enhancements, we scope the effort.',
                features: ['Root Cause Analysis', 'Code Review', 'Configuration Updates'],
                color: 'bg-[#141736]'
              },
              {
                phase: '03',
                title: 'Sandbox Testing',
                desc: 'All modifications—no matter how small—are implemented and tested in a Sandbox environment to prevent regression in production.',
                features: ['UAT Validation', 'Regression Testing', 'Change Control'],
                color: 'bg-[#FFD166]'
              },
              {
                phase: '04',
                title: 'Deployment & Documentation',
                desc: 'Changes are migrated to production during approved maintenance windows. All configurations and scripts are thoroughly documented.',
                features: ['Zero-Downtime Deploy', 'Process Documentation', 'User Training'],
                color: 'bg-[#059669]'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-[12px] shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300">
                <div className={cn("md:w-32 flex flex-col items-center justify-center p-8 text-white", step.color === 'bg-[#FFD166]' ? 'text-[#141736]' : 'text-white', step.color)}>
                  <span className="text-[40px] font-black tracking-tighter opacity-80" style={{ fontFamily: 'var(--font-sora)' }}>{step.phase}</span>
                </div>
                <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
                  <h3 className="text-[24px] font-bold text-[#141736] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>{step.title}</h3>
                  <p className="text-slate-600 text-[16px] leading-relaxed mb-8 max-w-4xl">{step.desc}</p>
                  <div className="flex flex-wrap gap-4">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#F0FDF4] border border-slate-200 rounded-[4px] px-4 py-2">
                        <Activity className="w-4 h-4 text-[#059669]" />
                        <span className="text-[13px] font-bold text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
