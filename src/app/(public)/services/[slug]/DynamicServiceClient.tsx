'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BarChart3, Database, ShieldCheck, Check, Globe, Cloud, Layout, Server, Settings, Users, ArrowRight, Zap, Code, Shield } from 'lucide-react'

const iconRegistry: Record<string, any> = {
  Database,
  BarChart3,
  ShieldCheck,
  Check,
  Globe,
  Cloud,
  Layout,
  Server,
  Settings,
  Users,
  ArrowRight,
  Zap,
  Code,
  Shield
}

import { cn } from '@/lib/utils'

export function DynamicServiceClient({
  service,
  hero,
  whyChoose,
  businessMain,
  businessItems,
  erpMain,
  erpCards,
  deepModules
}: any) {
  const [activeTab, setActiveTab] = useState(businessItems[0] || null)
  const [scrolled, setScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion
    ? { initial: false, animate: false, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }

  // Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400)
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

  // Fallback defaults
  const bgColor = hero?.color || '#7A84F2'
  const heroTitle = hero?.hero_description || service.name
  const heroDesc = hero?.normal_description || 'We engineer unified data models, automate complex financials, and deploy scalable ERP architectures.'

  return (
    <main 
      className="bg-white"
      style={{
        '--selection-bg': bgColor,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{__html: `
        main ::selection {
          background-color: var(--selection-bg);
          color: white;
        }
      `}} />

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. THE HERO SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section 
        className="relative pt-[100px] pb-24 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left: Copy */}
            <motion.div
              className="lg:w-[55%]"
              {...motionProps}
            >
              <h1 className="text-[42px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                {heroTitle}
              </h1>

              <div className="w-16 h-1 bg-[#FFD166] mb-8" />

              <p className="text-[18px] text-white/90 leading-relaxed mb-10 max-w-2xl font-light whitespace-pre-wrap">
                {heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#141736] text-white font-bold text-[15px] hover:bg-[#0B0D1F] transition-colors border border-transparent shadow-lg">
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>

            {/* Right: Graphic */}
            <div className="lg:w-[45%] relative h-[400px] lg:h-[500px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[450px] aspect-square">
                  <motion.div {...motionProps}
                    className="absolute top-0 right-10 w-64 h-64 rounded-full bg-[#141736]/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <BarChart3 className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div {...motionProps}
                    className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-[#FFD166]/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <Database className="w-16 h-16 text-[#141736] opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div {...motionProps}
                    className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <ShieldCheck className="w-12 h-12 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. BENEFITS (WHY CHOOSE)
          ───────────────────────────────────────────────────────────────────────────── */}
      {whyChoose?.length > 0 && (
        <section id="benefits" className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="mb-16 text-center">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                Why Choose {service.name}?
              </h2>
              <div className="w-16 h-1 bg-[#FFD166] mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChoose.map((benefit: any, i: number) => {
                const IconComp = iconRegistry[benefit.icon || 'Database'] || Database
                return (
                  <div 
                    key={i} 
                    className="bg-white p-8 border border-slate-200 rounded-[8px] hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 group"
                    style={{ '--hover-bg': bgColor } as React.CSSProperties}
                  >
                    <div 
                      className="w-12 h-12 flex items-center justify-center mb-6 rounded-[4px] transition-colors group-hover:!bg-[var(--hover-bg)] group-hover:!text-white"
                      style={{ 
                        backgroundColor: `${bgColor}15`,
                        color: bgColor
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#141736] mb-3">{benefit.main_description}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{benefit.small_description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. BUSINESS SUITE
          ───────────────────────────────────────────────────────────────────────────── */}
      {businessItems?.length > 0 && (
        <section 
          id="features" 
          className="py-28 relative overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: bgColor }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-[36px] md:text-[46px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                A Complete Business Suite
              </h2>
              <div className="w-16 h-1 bg-[#FFD166] mx-auto mb-6" />
              <p className="text-[18px] text-white/90 max-w-3xl mx-auto font-light">
                {businessMain?.small_description || 'Explore the modules that power the most successful high-growth organizations.'}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row relative mt-16">
              <div className="w-full lg:w-[30%] flex flex-col z-20 relative lg:-mr-4">
                {businessItems.map((tab: any) => {
                  const isActive = activeTab?.id === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "text-left px-8 py-6 transition-all duration-300 w-full rounded-l-[12px] relative",
                        isActive ? "bg-white text-[#141736] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] rounded-r-[12px] lg:rounded-r-none z-30" : "text-white hover:bg-white/10"
                      )}
                    >
                      <span className={cn("font-bold text-[18px]", isActive ? "text-[#141736]" : "text-white/80")}>
                        {tab.title}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="w-full lg:w-[70%] bg-white rounded-[12px] shadow-xl relative z-10 mt-6 lg:mt-0 min-h-[400px] border border-white/10 p-10">
                <AnimatePresence mode="wait">
                  {activeTab && (
                    <motion.div
                      key={activeTab.id}
                      {...motionProps}
                      className="flex flex-col h-full"
                    >
                      <h3 className="text-[28px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                        {activeTab.title}
                      </h3>
                      <p className="text-slate-600 text-[16px] leading-relaxed mb-10 whitespace-pre-wrap">
                        {activeTab.description}
                      </p>
                      {activeTab.image_url && (
                        <div className="mt-auto w-full aspect-video relative rounded bg-slate-100 overflow-hidden border border-slate-200">
                          <Image src={activeTab.image_url} alt={activeTab.title} width={800} height={450} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          5. ERP ARCHITECTURE / METHODOLOGY
          ───────────────────────────────────────────────────────────────────────────── */}
      {erpCards?.length > 0 && (
        <section id="methodology" className="py-28 bg-[#F8FAFC] border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            
            <div className="mb-20">
              <h2 className="text-[36px] md:text-[46px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                {erpMain?.main_description || 'Engineering Excellence'}
              </h2>
              <div className="w-16 h-1 bg-[#FFD166] mb-8" />
              <p className="text-slate-600 text-[18px] leading-relaxed max-w-3xl whitespace-pre-wrap">
                {erpMain?.small_description || 'We approach implementations as a strategic business transformation, ensuring maximum user adoption and immediate ROI.'}
              </p>
            </div>

            <div className="space-y-12">
              {erpCards.map((step: any, idx: number) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300">
                  <div 
                    className="md:w-32 flex flex-col items-center justify-center p-8 text-white transition-colors"
                    style={{ backgroundColor: bgColor }}
                  >
                    <span className="text-[40px] font-black tracking-tighter opacity-80" style={{ fontFamily: 'var(--font-sora)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
                    <h3 className="text-[24px] font-bold text-[#141736] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-[16px] leading-relaxed mb-8 max-w-4xl whitespace-pre-wrap">
                      {step.description}
                    </p>
                    
                    {step.tags && step.tags.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {step.tags.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-[4px] px-4 py-2">
                            <Check className="w-4 h-4" style={{ color: bgColor }} />
                            <span className="text-[13px] font-bold text-slate-700">{feature.trim()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          6. DEEP MODULE EXPERTISE
          ───────────────────────────────────────────────────────────────────────────── */}
      {deepModules?.length > 0 && (
        <section className="py-28 bg-white border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-20">
              <h2 className="text-[36px] md:text-[46px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                Holistic Expertise
              </h2>
              <div className="w-16 h-1 bg-[#FFD166] mx-auto mb-6" />
              <p className="text-slate-600 text-[18px] leading-relaxed max-w-3xl mx-auto">
                Comprehensive capabilities across the entire technology stack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deepModules.map((module: any, idx: number) => {
                const IconComp = iconRegistry[module.icon || 'Globe'] || Globe
                return (
                  <div 
                    key={idx} 
                    className="p-10 border border-slate-200 rounded-[8px] transition-colors group hover:shadow-sm"
                    style={{ backgroundColor: `${bgColor}08` }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = bgColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    <IconComp className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" style={{ color: bgColor }} />
                    <h3 className="text-[18px] font-bold text-[#141736] mb-4">{module.title}</h3>
                    <p className="text-slate-600 text-[14px] leading-relaxed">{module.small_description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}

