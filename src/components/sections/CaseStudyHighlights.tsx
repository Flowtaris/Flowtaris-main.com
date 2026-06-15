'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CaseStudyHighlights() {
  const caseStudies = [
    {
      slug: 'global-retailer-netsuite-migration',
      title: 'Global Retailer Achieves 40% Faster Financial Close with NetSuite',
      platforms: ['NetSuite', 'Celigo'],
      outcome_summary: 'Seamlessly migrated legacy financial data to NetSuite, implementing automated reconciliation pipelines. This massive transformation led to a 40% reduction in close time, completely revamping their financial operations and saving thousands of hours annually.',
      metrics: [{ label: 'Reduction in Close Time', value: '40', unit: '%' }],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
    },
    {
      slug: 'fintech-sap-integration',
      title: 'FinTech Unicorn Scales Operations with SAP & Workday Integration',
      platforms: ['SAP', 'Workday'],
      outcome_summary: 'Architected a bi-directional, event-driven integration ensuring sub-second data consistency across global teams. By bridging SAP and Workday, data accuracy improved to 99.9%, eliminating manual entry and scaling their HR and finance systems.',
      metrics: [{ label: 'Data Accuracy Improved', value: '99.9', unit: '%' }],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    },
    {
      slug: 'manufacturing-coupa-deployment',
      title: 'Enterprise Manufacturing Streamlines Procurement via Coupa',
      platforms: ['Coupa', 'Oracle ERP'],
      outcome_summary: 'Deployed a comprehensive Procure-to-Pay solution with automated approval workflows and spend analytics. The implementation identified $12M in immediate cost savings and provided unprecedented visibility into global enterprise spending.',
      metrics: [{ label: 'Cost Savings Identified', value: '$12', unit: 'M' }],
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop'
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <section className="section bg-white overflow-hidden py-24">
      <div className="container-content">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#0A1628] leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Case Studies
            </h1>
          </div>
          <h2 className="text-slate-500 max-w-sm text-sm leading-relaxed lg:pb-3 font-light">
            Real Results from Real Enterprise Transformations. We turn complex requirements into flawless execution.
          </h2>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Sticky Dynamic Image */}
          <AnimatedSection className="w-full lg:w-7/12 order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-navy-900/10 bg-slate-100">
              {caseStudies.map((cs, idx) => (
                <div
                  key={cs.slug}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover transition-transform duration-[2000ms]"
                    style={{ transform: activeIndex === idx ? 'scale(1)' : 'scale(1.05)' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Interactive Case Studies List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 order-1 lg:order-2">
            {caseStudies.map((cs, idx) => {
              const isActive = activeIndex === idx

              return (
                <div
                  key={cs.slug}
                  className={`group flex flex-col cursor-pointer transition-all duration-500 border-l-4 pl-6 md:pl-8 py-2
                             ${isActive ? 'border-gold-500 opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="text-gold-500 font-mono text-xs md:text-sm tracking-[0.15em] uppercase mb-3 block" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                    0{idx + 1} &mdash; {cs.platforms ? cs.platforms.join(' / ') : 'Case Study'}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-bold text-navy-900 transition-colors leading-[1.2]
                                 ${isActive ? 'text-navy-900 mb-4' : 'text-navy-900/60 mb-0'}`}
                    style={{ fontFamily: 'var(--font-sora)' }}>
                    {cs.title}
                  </h3>

                  {/* Expandable description */}
                  <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-6">
                        {cs.outcome_summary}
                      </p>
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-2 text-base font-bold text-navy-900 hover:text-gold-500 transition-colors"
                        style={{ fontFamily: 'var(--font-sora)' }}
                      >
                        <span className="border-b border-navy-900/20 group-hover:border-gold-500 transition-colors pb-0.5">
                          Read Case Study
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-navy-900 rounded-full hover:bg-gold-500 transition-colors duration-300 shadow-xl shadow-navy-900/10 hover:shadow-gold-500/20 hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  )
}
