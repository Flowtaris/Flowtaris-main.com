'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Database, ShieldCheck, Activity, Zap, Server, CheckCircle, ChevronRight, Lock, Code2, Network } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProcurementToGLPage() {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-cycle timeline
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="bg-[#FAFAFA] min-h-screen text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans overflow-hidden">

      {/* ── ULTRA-REFINED HERO ── */}
      <section className="relative pt-40 pb-32 border-b border-zinc-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,0,0,0.03)_0%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-6xl md:text-8xl font-medium tracking-[-0.04em] text-zinc-900 leading-[0.95] mb-8"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              Bridge the gap.<br />
              <span className="text-zinc-400">Zero exceptions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Architected for scale, our Procurement-to-GL integration creates a mathematically perfect synchronization layer between Coupa and NetSuite.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button className="h-12 px-6 bg-zinc-900 text-white rounded-lg font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2 group">
                Deploy Integration
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="h-12 px-6 bg-white text-zinc-900 border border-zinc-200 rounded-lg font-medium text-sm hover:border-zinc-300 hover:bg-zinc-50 transition-colors shadow-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-400" />
                API Specs
              </button>
            </motion.div>
          </div>

          {/* High-Fidelity Data Pipeline Viz */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-24 relative"
          >
            <div className="w-full h-[400px] bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative p-8 flex flex-col justify-between hidden md:flex">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #e4e4e7 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="flex justify-between items-center relative z-10">
                {/* Source Node */}
                <div className="w-[280px] bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-md bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Coupa Procurement</div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">SOURCE_SYSTEM</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Purchase Orders', 'Invoices', 'Receipts'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs font-mono py-1.5 px-2 bg-zinc-50 rounded text-zinc-600 border border-zinc-100">
                        <span>{item}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Node */}
                <div className="w-[280px] bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">NetSuite ERP</div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">TARGET_LEDGER</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Journal Entries', 'Vendor Bills', 'Accruals'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs font-mono py-1.5 px-2 bg-zinc-50 rounded text-zinc-600 border border-zinc-100">
                        <span>{item}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Pipeline SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <path
                  d="M 320 200 C 500 200, 700 200, 880 200"
                  fill="none"
                  stroke="#e4e4e7"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Data Packets flowing */}
                <motion.circle
                  r="3"
                  fill="#2563eb"
                  animate={{
                    cx: [320, 880],
                    cy: [200, 200]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.circle
                  r="3"
                  fill="#ea580c"
                  animate={{
                    cx: [320, 880],
                    cy: [200, 200]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1.5
                  }}
                />
              </svg>

              {/* Central Transform Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-white/80 backdrop-blur-md border border-zinc-200 rounded-xl p-4 shadow-lg z-20">
                <div className="text-[10px] font-mono text-zinc-400 mb-3 uppercase tracking-wider text-center">Transformation Layer</div>
                <div className="space-y-1.5">
                  <div className="h-6 flex items-center justify-between px-2 bg-zinc-100 rounded text-[10px] font-mono text-zinc-600">
                    <span>COA_MAP</span>
                    <span>100%</span>
                  </div>
                  <div className="h-6 flex items-center justify-between px-2 bg-zinc-100 rounded text-[10px] font-mono text-zinc-600">
                    <span>SEG_VALIDATE</span>
                    <span>PASS</span>
                  </div>
                  <div className="h-6 flex items-center justify-between px-2 bg-blue-50 border border-blue-100 rounded text-[10px] font-mono text-blue-600">
                    <span>PAYLOAD_TRANSFORM</span>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >ACTV</motion.span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SIMPLE GRID FEATURES ── */}
      <section className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight text-zinc-900 mb-4" style={{ fontFamily: 'var(--font-sora)' }}>
              Engineering precision.
            </h2>
            <p className="text-lg text-zinc-500">
              We bypass brittle point-to-point connections, utilizing robust middleware patterns to guarantee data fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 text-zinc-700">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">Dynamic Segment Mapping</h3>
              <p className="text-zinc-500 leading-relaxed">
                Complex translation logic dynamically maps Coupa custom fields into deeply nested NetSuite GL segments and custom records.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 text-zinc-700">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">SOX Compliant</h3>
              <p className="text-zinc-500 leading-relaxed">
                Immutable logging ensures every transaction is fully traceable for compliance audits.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 text-zinc-700">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">Idempotent Execution</h3>
              <p className="text-zinc-500 leading-relaxed">
                Retry mechanisms and idempotency keys ensure no duplicate entries ever reach the ledger.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 text-zinc-700">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">Bidirectional Master Sync</h3>
              <p className="text-zinc-500 leading-relaxed">
                Keep vendor masters, chart of accounts, and custom segments perfectly synced between NetSuite and Coupa in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGH-FIDELITY LIFECYCLE ── */}
      <section className="py-32 bg-white border-t border-zinc-200 relative">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900 mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Execution trace.
            </h2>
            <p className="text-lg text-zinc-500">
              A transparent view into the exact lifecycle of a transaction—from procurement initiation to ledger settlement.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row bg-[#FAFAFA] rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">

            {/* Left: Timeline List */}
            <div className="lg:w-2/5 border-b lg:border-b-0 lg:border-r border-zinc-200 p-8">
              <div className="space-y-2">
                {[
                  { id: 'REQ_CREATE', title: 'Requisition & Approval', sys: 'Coupa' },
                  { id: 'PO_GENERATE', title: 'PO Generation', sys: 'Middleware' },
                  { id: 'RECEIPT_SYNC', title: 'Goods Receipt', sys: 'NetSuite' },
                  { id: 'INV_MATCH', title: 'Invoice Match & Settle', sys: 'Coupa' }
                ].map((step, i) => (
                  <button
                    key={i}
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
                        activeStep === i ? "border-blue-500 bg-white" : "border-zinc-300"
                      )}>
                        {activeStep === i && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </div>
                    </div>
                    <div>
                      <div className={cn(
                        "font-semibold mb-1 transition-colors",
                        activeStep === i ? "text-zinc-900" : "text-zinc-600"
                      )}>
                        {step.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="text-zinc-400">ID: {step.id}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className={activeStep === i ? "text-blue-600 font-semibold" : "text-zinc-400"}>{step.sys}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Technical Inspector */}
            <div className="lg:w-3/5 bg-white p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-mono font-medium text-zinc-900 px-2 py-1 bg-zinc-100 rounded border border-zinc-200">
                    inspector_view
                  </div>
                  <div className="text-xs font-mono text-zinc-500 hidden sm:block">
                    {activeStep === 0 ? '/api/coupa/req' : activeStep === 1 ? '/sys/transform/po' : activeStep === 2 ? '/api/netsuite/receipt' : '/sys/settle'}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-400">latency:</span>
                  <span className="text-green-600 font-semibold">{42 + activeStep * 15}ms</span>
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
                    {activeStep === 0 && (
                      <pre className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 overflow-x-auto text-[11px]">
                        {`{
  "event": "requisition_approved",
  "payload": {
    "id": "REQ-8992",
    "status": "approved",
    "total_amount": 14500.00,
    "currency": "USD",
    "lines": [
      {
        "line_num": 1,
        "description": "Server Rack Q3",
        "account": "6040-IT-HW",
        "amount": 14500.00
      }
    ]
  },
  "timestamp": "2026-06-13T10:24:00Z"
}`}
                      </pre>
                    )}
                    {activeStep === 1 && (
                      <div className="space-y-4">
                        <div className="p-3 bg-zinc-50 rounded border border-zinc-100">
                          <span className="text-zinc-400">[SYSTEM]</span> Mapping Coupa account '6040-IT-HW' to NetSuite internal ID...
                        </div>
                        <div className="p-3 bg-zinc-50 rounded border border-zinc-100 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Mapped successfully: NS_ACC_ID: 1045 (Fixed Assets - IT)</span>
                        </div>
                        <div className="p-3 bg-blue-50/50 rounded border border-blue-100/50 flex gap-2">
                          <span className="text-blue-600 font-semibold">{"->"}</span> Dispatching construct to NetSuite API.
                        </div>
                      </div>
                    )}
                    {activeStep === 2 && (
                      <pre className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 overflow-x-auto text-[11px]">
                        {`HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "record_type": "itemreceipt",
  "internal_id": "884921",
  "gl_impact": [
    { "account": 1045, "debit": 14500.00, "credit": 0.00 },
    { "account": 2010, "debit": 0.00, "credit": 14500.00 }
  ],
  "audit_trail": "req_src_coupa"
}`}
                      </pre>
                    )}
                    {activeStep === 3 && (
                      <div className="h-full flex flex-col justify-center py-8">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="h-px bg-zinc-200 flex-1" />
                          <div className="px-4 py-1 bg-green-50 text-green-600 text-[10px] sm:text-xs font-mono font-semibold rounded-full border border-green-200">
                            TRANSACTION_SETTLED
                          </div>
                          <div className="h-px bg-zinc-200 flex-1" />
                        </div>
                        <div className="text-center">
                          <div className="text-zinc-400 mb-2">Final GL Journal ID</div>
                          <div className="text-xl sm:text-2xl font-mono text-zinc-900 tracking-tight">JE-2026-06-1349</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-medium tracking-tight text-zinc-900 mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
            Ready to unify your financial stack?
          </h2>
          <p className="text-lg text-zinc-500 mb-10">
            Consult with our integration architects to design a bulletproof data pipeline tailored to your specific ERP schema.
          </p>
          <button className="h-14 px-8 bg-zinc-900 text-white rounded-xl font-medium text-[15px] hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200 flex items-center gap-2 mx-auto">
            Schedule Architecture Review
          </button>
        </div>
      </section>

    </main>
  )
}

