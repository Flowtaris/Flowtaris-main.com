'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export function CaseStudyBody({
  clientSituation,
  solutionApproach,
  outcomeSummary,
  platforms,
  services,
  industries,
}: {
  clientSituation?: string | null
  solutionApproach?: string | null
  outcomeSummary?: string | null
  platforms: string[]
  services: string[]
  industries: string[]
}) {
  return (
    <section className="bg-[#FAFAFA] pb-32 px-4 md:px-8 font-sans relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative items-start">
          
          {/* Left Column: Sticky Metadata Sidebar */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 space-y-12 bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-200/60">
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Industry</h3>
              <div className="flex flex-wrap gap-2">
                {industries.map(i => (
                  <span key={i} className="text-[13px] font-bold text-gray-700 bg-gray-100/80 border border-gray-200/60 px-4 py-2 rounded-lg">{i}</span>
                ))}
                {industries.length === 0 && <span className="text-sm text-gray-400">—</span>}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5">Solutions Delivered</h3>
              <ul className="space-y-4">
                {services.map(s => (
                  <li key={s} className="text-[14px] font-semibold text-gray-800 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-black ring-4 ring-gray-100 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
                {services.length === 0 && <span className="text-sm text-gray-400">—</span>}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map(p => (
                  <span key={p} className="text-[13px] font-bold text-gray-700 bg-white border border-gray-200/80 px-4 py-2 rounded-lg shadow-sm">
                    {p}
                  </span>
                ))}
                {platforms.length === 0 && <span className="text-sm text-gray-400">—</span>}
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-100">
               <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
                 Ready to achieve similar results for your enterprise?
               </p>
               <a href="/contact" className="inline-flex w-full items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                 Book a Consultation
               </a>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="col-span-1 lg:col-span-8 space-y-24">
            
            {clientSituation && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 text-gray-400 font-bold text-lg bg-white shadow-sm">
                    1
                  </div>
                  <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
                    The Challenge
                  </h2>
                </div>
                <div className="prose prose-lg md:prose-xl prose-gray max-w-none prose-p:leading-[1.8] prose-p:text-gray-500 prose-p:font-normal">
                  <p>{clientSituation}</p>
                </div>
              </motion.div>
            )}

            {solutionApproach && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-black text-white font-bold text-lg shadow-md shadow-gray-200">
                    2
                  </div>
                  <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
                    Our Architecture
                  </h2>
                </div>
                <div className="prose prose-lg md:prose-xl prose-gray max-w-none prose-p:leading-[1.8] prose-p:text-gray-500 prose-p:font-normal">
                  <p>{solutionApproach}</p>
                </div>
              </motion.div>
            )}

            {outcomeSummary && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-12 md:p-16 bg-slate-900 rounded-[2.5rem] text-center overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group border border-slate-800"
              >
                {/* Decorative Premium Noise Background */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('/assets/noise.png')] mix-blend-overlay" />
                
                {/* Subtle Ambient Lighting */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 transition-transform duration-1000 group-hover:translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 transition-transform duration-1000 group-hover:-translate-x-1/4" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-8 bg-slate-700" />
                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      The Outcome
                    </h2>
                    <div className="h-px w-8 bg-slate-700" />
                  </div>
                  
                  <div className="text-2xl md:text-3xl text-white leading-[1.7] font-medium max-w-2xl mx-auto tracking-tight">
                    &ldquo;{outcomeSummary}&rdquo;
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
