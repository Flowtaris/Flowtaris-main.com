'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Network, Database, Webhook, ShieldCheck, Zap, ArrowLeftRight, Code, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'api',
    title: 'Custom API Architecture',
    desc: 'Design and deploy robust REST/GraphQL APIs that connect legacy systems with modern SaaS applications in real-time.',
    icon: Code,
    imageBg: 'from-[#E8A020]/20 to-[#B47B14]/20',
    primaryColor: 'text-[#E8A020]',
    primaryBg: 'bg-[#E8A020]',
  },
  {
    id: 'middleware',
    title: 'Middleware Deployment',
    desc: 'Leverage enterprise iPaaS solutions like MuleSoft, Boomi, and Celigo to orchestrate complex data flows without point-to-point brittle code.',
    icon: Network,
    imageBg: 'from-[#FFD166]/20 to-[#E8A020]/20',
    primaryColor: 'text-[#FFD166]',
    primaryBg: 'bg-[#FFD166]',
  },
  {
    id: 'data-sync',
    title: 'Bidirectional Sync',
    desc: 'Ensure 100% data integrity with sub-second bidirectional syncing across ERPs, CRMs, and HRIS systems.',
    icon: ArrowLeftRight,
    imageBg: 'from-[#7A84F2]/20 to-[#141736]/20',
    primaryColor: 'text-[#7A84F2]',
    primaryBg: 'bg-[#7A84F2]',
  },
  {
    id: 'webhooks',
    title: 'Event-Driven Webhooks',
    desc: 'Trigger automated workflows instantly across your technology stack using secure, scalable webhook architectures.',
    icon: Webhook,
    imageBg: 'from-[#E8A020]/20 to-[#141736]/20',
    primaryColor: 'text-[#E8A020]',
    primaryBg: 'bg-[#E8A020]',
  }
]

const BENEFITS = [
  { title: 'Zero Data Silos', desc: 'Unify your enterprise data by connecting disparate systems into a single, cohesive ecosystem.', icon: Database },
  { title: 'Sub-Second Latency', desc: 'Experience true real-time data flows with highly optimized API connections and webhook triggers.', icon: Zap },
  { title: 'Enterprise Security', desc: 'Protect data in transit with end-to-end encryption, OAuth 2.0, and stringent API gateway policies.', icon: ShieldCheck },
  { title: 'Scalable Architecture', desc: 'Future-proof your infrastructure with iPaaS solutions that scale effortlessly as your volume grows.', icon: Cloud },
  { title: 'Reduced Maintenance', desc: 'Eliminate brittle point-to-point scripts and centralize your integration management.', icon: Network },
  { title: 'Automated Error Handling', desc: 'Implement self-healing pipelines with automated retries and dead-letter queue management.', icon: Code },
]

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ERPIntegrationsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [scrolled, setScrolled] = useState(false)

  // Scroll detection for sticky nav
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
    <main className="bg-white selection:bg-[#E8A020] selection:text-white">

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. THE HERO SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-[100px] pb-24 overflow-hidden bg-[#E8A020]">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left: Copy (55%) */}
            <motion.div
              className="lg:w-[55%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[42px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                Seamless Enterprise Connectivity
              </h1>

              <div className="w-16 h-1 bg-white/50 mb-8" />

              <p className="text-[18px] text-white/90 leading-relaxed mb-10 max-w-2xl font-light">
                Break down data silos and accelerate operations. We engineer robust, bidirectional data pipelines bridging NetSuite, Coupa, Salesforce, and Workday using enterprise iPaaS platforms.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#141736] text-white font-bold text-[15px] hover:bg-[#0B0D1F] transition-colors border border-transparent shadow-lg">
                  Architect Your Pipeline
                </Link>
                <button onClick={() => scrollToSection('features')} className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-transparent text-white font-bold text-[15px] border border-white/50 hover:bg-white hover:text-[#E8A020] transition-colors">
                  Explore Architecture
                </button>
              </div>
            </motion.div>

            {/* Right: Graphic (45%) */}
            <div className="lg:w-[45%] relative h-[400px] lg:h-[500px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[450px] aspect-square">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                    className="absolute top-0 right-10 w-64 h-64 rounded-full bg-[#141736]/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <Network className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-[#B47B14]/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <ArrowLeftRight className="w-16 h-16 text-[#141736] opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
                    className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#7A84F2]/90 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <Database className="w-12 h-12 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. STICKY SECONDARY NAV
          ───────────────────────────────────────────────────────────────────────────── */}
      <div className={cn(
        "sticky top-[90px] z-40 bg-white border-b border-slate-200 transition-all duration-300 shadow-sm",
        scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center gap-8 overflow-x-auto hide-scrollbar">
          {['Overview', 'Benefits', 'Features', 'Methodology'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="py-5 text-[14px] font-bold text-slate-600 hover:text-[#E8A020] whitespace-nowrap border-b-[3px] border-transparent hover:border-[#E8A020] transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex items-center py-2">
            <Link href="/contact" className="px-6 py-2.5 text-[13px] font-bold bg-[#141736] text-white rounded-[4px] hover:bg-[#E8A020] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. BENEFITS SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="mb-16 text-center">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Why Integrate With Flowtaris?
            </h2>
            <div className="w-16 h-1 bg-[#E8A020] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 rounded-[8px] hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF9F0] flex items-center justify-center mb-6 text-[#E8A020] rounded-[4px] group-hover:bg-[#E8A020] group-hover:text-white transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-bold text-[#141736] mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. INTERACTIVE FEATURES TABS
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 relative overflow-hidden bg-gradient-to-br from-[#E8A020] to-[#B47B14]">
        {/* Premium Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)] -translate-y-1/3 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(20,23,54,0.15),transparent_60%)] translate-y-1/3 -translate-x-1/4 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-[36px] md:text-[46px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Mastering the Enterprise Data Flow
            </h2>
            <div className="w-16 h-1 bg-white/50 mx-auto mb-6" />
            <p className="text-[18px] text-white/90 max-w-3xl mx-auto font-light">Explore the architectural components that power world-class system connectivity.</p>
          </div>

          {/* Tabbed Layout Container */}
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

            <div className="w-full lg:w-[70%] bg-white rounded-[12px] shadow-[0_20px_60px_rgba(232,160,32,0.15)] relative z-10 mt-6 lg:mt-0 min-h-[500px] border border-[#E8A020]/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-10 lg:p-14 flex flex-col lg:flex-row gap-12 h-full"
                >
                  {/* Content Left */}
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
                      <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#E8A020] text-white font-bold text-[15px] hover:bg-[#141736] transition-colors border border-transparent shadow-[0_10px_20px_rgba(232,160,32,0.2)]">
                        Explore Capability
                      </Link>
                    </div>
                  </div>

                  {/* Content Right: UI Mockup */}
                  <div className="lg:w-1/2 flex items-center justify-center">
                    <div className="w-full bg-[#FFF9F0] rounded-[8px] p-6 border border-[#E8A020]/20 shadow-inner relative aspect-[4/3] flex flex-col overflow-hidden">
                      <div className="flex items-center gap-2 mb-4 border-b border-[#E8A020]/10 pb-4">
                        <div className="w-3 h-3 rounded-full bg-[#E8A020]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#E8A020]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#E8A020]/40" />
                      </div>
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/3 h-20 bg-white rounded shadow-sm border border-[#E8A020]/10 flex flex-col justify-center items-center gap-2">
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
                      <div className="w-full flex-1 bg-white rounded shadow-sm border border-[#E8A020]/10 p-5 flex flex-col gap-3">
                        <div className="w-full h-3 bg-[#E8A020]/10 rounded" />
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

      {/* ─────────────────────────────────────────────────────────────────────────────
          5. METHODOLOGY
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="methodology" className="py-28 bg-[#FFF9F0] border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="mb-20">
            <h2 className="text-[36px] md:text-[46px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Engineering Pipeline Reliability
            </h2>
            <div className="w-16 h-1 bg-[#E8A020] mb-8" />
            <p className="text-slate-600 text-[18px] leading-relaxed max-w-3xl">
              We approach integrations not as point-to-point scripts, but as an enterprise-grade architectural layer. We ensure resilience, observability, and scale.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                phase: '01',
                title: 'Data Mapping & Architecture',
                desc: 'We map objects across disparate systems, defining source of truth, sync frequency, and edge-case conflict resolutions.',
                features: ['Entity Relationship Design', 'Conflict Resolution Strategy', 'Payload Optimization'],
                color: 'bg-[#E8A020]'
              },
              {
                phase: '02',
                title: 'Middleware Configuration',
                desc: 'Deploying iPaaS solutions (Celigo, Boomi) or serverless architectures to handle authentication, routing, and transformation.',
                features: ['OAuth 2.0 Auth', 'Data Transformation', 'API Gateway Setup'],
                color: 'bg-[#141736]'
              },
              {
                phase: '03',
                title: 'Error Handling & Retries',
                desc: 'Building robust dead-letter queues and automated retry mechanisms to ensure zero data loss during endpoint outages.',
                features: ['Dead-Letter Queues', 'Exponential Backoff', 'Alerting Config'],
                color: 'bg-[#B47B14]'
              },
              {
                phase: '04',
                title: 'Testing & Go-Live',
                desc: 'Rigorous end-to-end testing of data payloads across Sandbox environments before executing a seamless cutover.',
                features: ['UAT Scripts', 'Load Testing', 'Zero-Downtime Deploy'],
                color: 'bg-[#E8A020]'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-[12px] shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300">
                <div className={cn("md:w-32 flex flex-col items-center justify-center p-8 text-white", step.color)}>
                  <span className="text-[40px] font-black tracking-tighter opacity-80" style={{ fontFamily: 'var(--font-sora)' }}>{step.phase}</span>
                </div>
                <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
                  <h3 className="text-[24px] font-bold text-[#141736] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>{step.title}</h3>
                  <p className="text-slate-600 text-[16px] leading-relaxed mb-8 max-w-4xl">{step.desc}</p>
                  <div className="flex flex-wrap gap-4">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#FFF9F0] border border-slate-200 rounded-[4px] px-4 py-2">
                        <Code className="w-4 h-4 text-[#E8A020]" />
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
