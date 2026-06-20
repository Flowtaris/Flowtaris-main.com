'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Code2, CheckCircle, ShieldCheck, Zap, Database, Lock, Network, Layers, Server, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DynamicIntegrationClientProps {
  integration: any
  hero: any | null
  securityMain: any | null
  securityCards: any[]
  traceSteps: any[]
}

export default function DynamicIntegrationClient({
  integration,
  hero,
  securityMain,
  securityCards,
  traceSteps,
}: DynamicIntegrationClientProps) {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-cycle execution trace timeline
  useEffect(() => {
    if (traceSteps.length === 0) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % traceSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [traceSteps.length])

  const heroTitle = hero?.title || integration.name || 'Integration'
  const heroDescription = hero?.description || integration.meta_description || ''

  return (
    <main className="bg-[#FAFAFA] min-h-screen text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans overflow-hidden">

      {/* ── HERO SECTION ── */}
      <section className="relative pt-40 pb-32 border-b border-zinc-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,0,0,0.03)_0%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] text-zinc-900 leading-[0.95] mb-8"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              {heroTitle}
            </motion.h1>

            {heroDescription && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-12"
              >
                {heroDescription}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/contact"
                onClick={() => {
                  import('@/components/analytics/Analytics').then(({ trackEvent }) => {
                    trackEvent('cta_click', { button_name: 'Deploy Integration', integration: integration.name || heroTitle })
                  })
                }}
                className="h-12 px-6 bg-zinc-900 text-white rounded-lg font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2 group"
              >
                Deploy Integration
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Source/Target Pipeline Visual */}
          {(integration.source_system || integration.target_system) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="mt-24 relative"
            >
              <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative p-8 hidden md:flex items-center justify-center gap-8">
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 text-center">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">Source</div>
                  <div className="text-sm font-semibold text-zinc-900">{integration.source_system}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-px w-12 bg-zinc-300" />
                  <div className="px-3 py-1.5 bg-zinc-100 border border-zinc-200 rounded-lg text-[10px] font-mono text-zinc-500 uppercase">
                    Pipeline
                  </div>
                  <div className="h-px w-12 bg-zinc-300" />
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-4 text-center">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">Target</div>
                  <div className="text-sm font-semibold text-zinc-900">{integration.target_system}</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── SECURITY / FEATURES GRID ── */}
      {securityCards.length > 0 && (
        <section className="py-24 bg-white border-t border-zinc-200">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl font-medium tracking-tight text-zinc-900 mb-4" style={{ fontFamily: 'var(--font-sora)' }}>
                {securityMain?.title || 'Security & Precision'}
              </h2>
              {securityMain?.description && (
                <p className="text-lg text-zinc-500">{securityMain.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityCards.map((card: any, idx: number) => (
                <div key={card.id || idx} className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-8">
                  {card.icon_svg ? (
                    <div
                      className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 text-zinc-700 [&>svg]:w-5 [&>svg]:h-5"
                      dangerouslySetInnerHTML={{ __html: card.icon_svg }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 text-zinc-700">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">{card.title}</h3>
                  <p className="text-zinc-500 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXECUTION TRACE ── */}
      {traceSteps.length > 0 && (
        <section className="py-32 bg-white border-t border-zinc-200 relative">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

            <div className="text-center mb-24 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900 mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                Execution trace.
              </h2>
              <p className="text-lg text-zinc-500">
                A transparent view into the exact lifecycle of a transaction.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row bg-[#FAFAFA] rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">

              {/* Left: Timeline List */}
              <div className="lg:w-2/5 border-b lg:border-b-0 lg:border-r border-zinc-200 p-8">
                <div className="space-y-2">
                  {traceSteps.map((step: any, i: number) => (
                    <button
                      key={step.id || i}
                      onClick={() => setActiveStep(i)}
                      className={cn(
                        "w-full text-left flex items-start gap-4 p-4 rounded-xl transition-all duration-300 relative",
                        activeStep === i
                          ? "bg-white shadow-sm border border-zinc-200/60"
                          : "hover:bg-zinc-100 border border-transparent"
                      )}
                    >
                      <div className="pt-1">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                          activeStep === i ? "border-purple-500 bg-white" : "border-zinc-300"
                        )}>
                          {activeStep === i && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                        </div>
                      </div>
                      <div>
                        <div className={cn(
                          "font-semibold mb-1 transition-colors",
                          activeStep === i ? "text-zinc-900" : "text-zinc-600"
                        )}>
                          {step.title}
                        </div>
                        {step.description && (
                          <div className="text-[11px] text-zinc-400 line-clamp-2">{step.description}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Code / Payload Inspector */}
              <div className="lg:w-3/5 bg-white p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono font-medium text-zinc-900 px-2 py-1 bg-zinc-100 rounded border border-zinc-200">
                      inspector_view
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-zinc-400">step:</span>
                    <span className="text-green-600 font-semibold">{activeStep + 1}/{traceSteps.length}</span>
                  </div>
                </div>

                <div className="relative min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-xs text-zinc-600 leading-relaxed"
                    >
                      {traceSteps[activeStep]?.payload ? (
                        <pre className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 overflow-x-auto text-[11px] whitespace-pre-wrap">
                          {traceSteps[activeStep].payload}
                        </pre>
                      ) : (
                        <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="font-semibold text-zinc-700">{traceSteps[activeStep]?.title}</span>
                          </div>
                          <p className="text-zinc-500">{traceSteps[activeStep]?.description || 'Step completed successfully.'}</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="py-32 bg-white relative border-t border-zinc-200">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-medium tracking-tight text-zinc-900 mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
            {integration.cta_title || 'Ready to integrate?'}
          </h2>
          <p className="text-lg text-zinc-500 mb-10">
            {integration.cta_description || 'Let\'s architect a seamless data pipeline for your enterprise.'}
          </p>
          <Link
            href="/contact"
            onClick={() => {
              import('@/components/analytics/Analytics').then(({ trackEvent }) => {
                trackEvent('cta_click', { button_name: 'Schedule Architecture Review', integration: integration.name || heroTitle })
              })
            }}
            className="inline-flex h-14 px-8 bg-zinc-900 text-white rounded-xl font-medium text-[15px] hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200 items-center gap-2"
          >
            Schedule Architecture Review
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  )
}
