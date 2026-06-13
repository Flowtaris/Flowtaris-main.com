'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Globe, ShieldCheck, Zap, Database, ArrowUpRight, Check, Code, CreditCard, ShoppingCart, FileText, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'procurement',
    title: 'Procurement',
    desc: 'Empower your employees to get everything they need to do their jobs while maximizing compliance and savings with an intuitive, consumer-like shopping experience.',
    icon: ShoppingCart,
    imageBg: 'from-[#E5458D]/20 to-[#FFD166]/20',
    primaryColor: 'text-[#E5458D]',
    primaryBg: 'bg-[#E5458D]',
  },
  {
    id: 'invoicing',
    title: 'Invoicing & AP Automation',
    desc: 'Eliminate manual data entry, reduce paper, and accelerate invoice processing times with intelligent AP automation and touchless electronic invoicing.',
    icon: FileText,
    imageBg: 'from-[#FFD166]/20 to-[#F8B030]/20',
    primaryColor: 'text-[#FFD166]',
    primaryBg: 'bg-[#FFD166]',
  },
  {
    id: 'expenses',
    title: 'Expense Management',
    desc: 'Streamline expense reporting with a mobile-first experience that automatically captures receipts, matches them to corporate cards, and enforces policy limits.',
    icon: CreditCard,
    imageBg: 'from-[#7A84F2]/20 to-[#5A65D8]/20',
    primaryColor: 'text-[#7A84F2]',
    primaryBg: 'bg-[#7A84F2]',
  },
  {
    id: 'analytics',
    title: 'Spend Analytics',
    desc: 'Gain 100% visibility into your organizational spend. Harness AI-driven insights to uncover savings opportunities, consolidate suppliers, and negotiate better terms.',
    icon: PieChart,
    imageBg: 'from-[#E5458D]/20 to-[#141736]/20',
    primaryColor: 'text-[#E5458D]',
    primaryBg: 'bg-[#E5458D]',
  }
]

const BENEFITS = [
  { title: '100% Spend Visibility', desc: 'Shatter data silos and gain a unified, real-time view of all organizational spend across procurement, expenses, and AP.', icon: Database },
  { title: 'Consumer-Like UX', desc: 'Drive unparalleled user adoption with an intuitive, intuitive shopping experience that employees actually enjoy using.', icon: ShoppingCart },
  { title: 'AI-Driven Insights', desc: 'Leverage Community.ai to benchmark against peers, identify supply chain risks, and prescribe savings opportunities.', icon: BarChart3 },
  { title: 'Touchless Automation', desc: 'Eliminate manual bottlenecks from source-to-pay with intelligent workflows and touchless invoice processing.', icon: Zap },
  { title: 'Continuous Compliance', desc: 'Embed policies directly into the purchasing process, ensuring compliance before spend even happens.', icon: ShieldCheck },
  { title: 'Seamless ERP Integration', desc: 'Connect Coupa flawlessly with NetSuite, SAP, Workday, and other legacy ERP systems.', icon: ArrowUpRight },
]

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default function CoupaConsultingPage() {
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
    <main className="bg-white selection:bg-[#E5458D] selection:text-white">

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. THE HERO SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-[100px] pb-24 overflow-hidden bg-[#E5458D]">
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
                Master Your Spend. Maximize Your Value.
              </h1>

              <div className="w-16 h-1 bg-[#FFD166] mb-8" />

              <p className="text-[18px] text-white/90 leading-relaxed mb-10 max-w-2xl font-light">
                Unlock total visibility and control with our world-class Coupa consulting. We architect intelligent Business Spend Management (BSM) solutions that optimize procurement, automate AP, and drive bottom-line impact.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#141736] text-white font-bold text-[15px] hover:bg-[#0B0D1F] transition-colors border border-transparent shadow-lg">
                  Schedule Consultation
                </Link>
                <button onClick={() => scrollToSection('features')} className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-transparent text-white font-bold text-[15px] border border-white/50 hover:bg-white hover:text-[#E5458D] transition-colors">
                  Explore Platform
                </button>
              </div>
            </motion.div>

            {/* Right: Graphic (45%) */}
            <div className="lg:w-[45%] relative h-[400px] lg:h-[500px] w-full hidden md:block">
              {/* Abstract interlocking circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[450px] aspect-square">
                  {/* Circle 1 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                    className="absolute top-0 right-10 w-64 h-64 rounded-full bg-[#141736]/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <PieChart className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                  </motion.div>

                  {/* Circle 2 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-[#FFD166]/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <ShoppingCart className="w-16 h-16 text-[#141736] opacity-90" strokeWidth={1} />
                  </motion.div>

                  {/* Circle 3 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
                    className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#C22B70]/90 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  >
                    <ShieldCheck className="w-12 h-12 text-white opacity-90" strokeWidth={1} />
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
              className="py-5 text-[14px] font-bold text-slate-600 hover:text-[#E5458D] whitespace-nowrap border-b-[3px] border-transparent hover:border-[#E5458D] transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex items-center py-2">
            <Link href="/contact" className="px-6 py-2.5 text-[13px] font-bold bg-[#141736] text-white rounded-[4px] hover:bg-[#E5458D] transition-colors">
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
              Why Choose Coupa BSM?
            </h2>
            <div className="w-16 h-1 bg-[#FFD166] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 rounded-[8px] hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FDF2F7] flex items-center justify-center mb-6 text-[#E5458D] rounded-[4px] group-hover:bg-[#E5458D] group-hover:text-white transition-colors">
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
      <section id="features" className="py-28 relative overflow-hidden bg-gradient-to-br from-[#E5458D] to-[#C22B70]">
        {/* Premium Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] -translate-y-1/3 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,209,102,0.1),transparent_60%)] translate-y-1/3 -translate-x-1/4 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-[36px] md:text-[46px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              A Unified BSM Platform
            </h2>
            <div className="w-16 h-1 bg-[#FFD166] mx-auto mb-6" />
            <p className="text-[18px] text-white/90 max-w-3xl mx-auto font-light">Explore the comprehensive capabilities that redefine how your enterprise spends.</p>
          </div>

          {/* Tabbed Layout Container */}
          <div className="flex flex-col lg:flex-row relative mt-16">

            {/* Left: Tab List */}
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

            {/* Right: Tab Content */}
            <div className="w-full lg:w-[70%] bg-white rounded-[12px] shadow-[0_20px_60px_rgba(229,69,141,0.15)] relative z-10 mt-6 lg:mt-0 min-h-[500px] border border-[#E5458D]/10">
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
                      <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#E5458D] text-white font-bold text-[15px] hover:bg-[#141736] transition-colors border border-transparent shadow-[0_10px_20px_rgba(229,69,141,0.2)]">
                        Explore Capability
                      </Link>
                    </div>
                  </div>

                  {/* Content Right: UI Mockup */}
                  <div className="lg:w-1/2 flex items-center justify-center">
                    <div className="w-full bg-[#FDF2F7] rounded-[8px] p-6 border border-[#E5458D]/20 shadow-inner relative aspect-[4/3] flex flex-col overflow-hidden">
                      {/* Fake Dashboard Header */}
                      <div className="flex items-center gap-2 mb-4 border-b border-[#E5458D]/10 pb-4">
                        <div className="w-3 h-3 rounded-full bg-[#E5458D]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#E5458D]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#E5458D]/40" />
                      </div>
                      {/* Fake Dashboard Content */}
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/3 h-20 bg-white rounded shadow-sm border border-[#E5458D]/10 flex flex-col justify-center items-center gap-2">
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
                      <div className="w-full flex-1 bg-white rounded shadow-sm border border-[#E5458D]/10 p-5 flex flex-col gap-3">
                        <div className="w-full h-3 bg-[#E5458D]/10 rounded" />
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
          5. DEEP DIVE: HOW WE WORK WITH COUPA
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="methodology" className="py-28 bg-[#FDF2F7] border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          
          <div className="mb-20">
            <h2 className="text-[36px] md:text-[46px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Engineering BSM Excellence
            </h2>
            <div className="w-16 h-1 bg-[#FFD166] mb-8" />
            <p className="text-slate-600 text-[18px] leading-relaxed max-w-3xl">
              We approach Coupa implementations as a strategic business transformation, not just an IT project. Flowtaris orchestrates complex P2P processes, ensuring maximum user adoption and immediate ROI.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                phase: '01',
                title: 'Spend & Process Blueprinting',
                desc: 'We analyze your current Source-to-Pay landscape, identifying bottlenecks and savings leakages. We then design an optimized Coupa architecture tailored to your unique procurement needs.',
                features: ['Spend Taxonomy Design', 'P2P Process Mapping', 'Approval Workflow Strategy'],
                color: 'bg-[#E5458D]'
              },
              {
                phase: '02',
                title: 'Agile Configuration & Build',
                desc: 'Leveraging Coupa best practices, our experts configure your environment. We set up supplier enablement, punchout catalogs, custom fields, and sophisticated routing rules.',
                features: ['cXML Punchout Catalogs', 'Smart Routing Rules', 'Supplier Enablement'],
                color: 'bg-[#141736]'
              },
              {
                phase: '03',
                title: 'Seamless ERP Integration',
                desc: 'We build robust middleware connections to your core ERP, ensuring synchronized master data, PO dispatches, and seamless GL posting of invoices and expenses.',
                features: ['NetSuite / SAP Connectors', 'Master Data Sync', 'Automated PO Dispatch'],
                color: 'bg-[#FFD166]'
              },
              {
                phase: '04',
                title: 'Change Management & Go-Live',
                desc: 'User adoption is paramount. We drive change management, provide tailored training, and support a smooth go-live, ensuring your team embraces the new platform from day one.',
                features: ['Targeted Training Paths', 'Hypercare Support', 'Adoption Analytics'],
                color: 'bg-[#E5458D]'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-[12px] shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300">
                {/* Number/Color Bar */}
                <div className={cn("md:w-32 flex flex-col items-center justify-center p-8", step.color === 'bg-[#FFD166]' ? 'text-[#141736]' : 'text-white', step.color)}>
                  <span className="text-[40px] font-black tracking-tighter opacity-80" style={{ fontFamily: 'var(--font-sora)' }}>{step.phase}</span>
                </div>
                
                {/* Content */}
                <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
                  <h3 className="text-[24px] font-bold text-[#141736] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-[16px] leading-relaxed mb-8 max-w-4xl">
                    {step.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#FDF2F7] border border-slate-200 rounded-[4px] px-4 py-2">
                        <Check className="w-4 h-4 text-[#E5458D]" />
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

      {/* ─────────────────────────────────────────────────────────────────────────────
          6. DEEP MODULE EXPERTISE
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-20">
            <h2 className="text-[36px] md:text-[46px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Holistic BSM Expertise
            </h2>
            <div className="w-16 h-1 bg-[#FFD166] mx-auto mb-6" />
            <p className="text-slate-600 text-[18px] leading-relaxed max-w-3xl mx-auto">
              From source to settle, we implement the entire Coupa suite to unify your organization's spend strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Procure-to-Pay (P2P)',
                desc: 'Optimize the complete purchasing cycle, from req creation and approvals to PO generation and receiving.',
                icon: ShoppingCart,
              },
              {
                title: 'AP Automation',
                desc: 'Leverage AI and machine learning for intelligent invoice parsing, matching, and touchless approvals.',
                icon: FileText,
              },
              {
                title: 'Coupa Pay',
                desc: 'Streamline payments natively within the platform, utilizing virtual cards and automated wire transfers.',
                icon: CreditCard,
              },
              {
                title: 'Source-to-Contract',
                desc: 'Drive strategic sourcing events, manage supplier risk, and author contracts with total visibility.',
                icon: Globe,
              }
            ].map((module, idx) => (
              <div key={idx} className="bg-[#FDF2F7] p-10 border border-slate-200 rounded-[8px] hover:border-[#E5458D] transition-colors group">
                <module.icon className="w-10 h-10 text-[#E5458D] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[18px] font-bold text-[#141736] mb-4">{module.title}</h3>
                <p className="text-slate-600 text-[14px] leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <h3 className="text-[28px] font-bold text-[#141736] mb-8" style={{ fontFamily: 'var(--font-sora)' }}>
              Ready to master your spend?
            </h3>
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-[4px] bg-[#141736] text-white font-bold text-[15px] hover:bg-[#E5458D] transition-colors border border-transparent">
              Schedule a BSM Review
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
