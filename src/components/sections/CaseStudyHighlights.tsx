import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

export async function CaseStudyHighlights() {
  const caseStudies = [
    {
      slug: 'global-retailer-netsuite-migration',
      title: 'Global Retailer Achieves 40% Faster Financial Close with NetSuite',
      platforms: ['NetSuite', 'Celigo'],
      outcome_summary: 'Seamlessly migrated legacy financial data to NetSuite, implementing automated reconciliation pipelines.',
      metrics: [{ label: 'Reduction in Close Time', value: '40', unit: '%' }]
    },
    {
      slug: 'fintech-sap-integration',
      title: 'FinTech Unicorn Scales Operations with SAP & Workday Integration',
      platforms: ['SAP', 'Workday'],
      outcome_summary: 'Architected a bi-directional, event-driven integration ensuring sub-second data consistency across global teams.',
      metrics: [{ label: 'Data Accuracy Improved', value: '99.9', unit: '%' }]
    },
    {
      slug: 'manufacturing-coupa-deployment',
      title: 'Enterprise Manufacturing Streamlines Procurement via Coupa',
      platforms: ['Coupa', 'Oracle ERP'],
      outcome_summary: 'Deployed a comprehensive Procure-to-Pay solution with automated approval workflows and spend analytics.',
      metrics: [{ label: 'Cost Savings Identified', value: '$12', unit: 'M' }]
    }
  ]

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <section className="section bg-surface">
      <div className="container-content">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-px w-6 bg-gold-500" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}>
                Proven Outcomes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 max-w-xl"
                style={{ fontFamily: 'var(--font-sora)' }}>
              Real Results from Real Enterprise Transformations
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="flex items-center gap-2 text-sm font-semibold text-gold-600
                       hover:text-gold-500 transition-colors duration-150 whitespace-nowrap group"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => {
            let primaryMetric: { label: string; value: string; unit: string } | null = null
            if (cs.metrics && Array.isArray(cs.metrics) && cs.metrics.length > 0) {
              const m = cs.metrics[0] as { label?: string; value?: string; unit?: string }
              if (m?.value && m?.label) {
                primaryMetric = {
                  label: m.label,
                  value: m.value,
                  unit: m.unit ?? '',
                }
              }
            }

            return (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group card flex flex-col overflow-hidden"
              >
                <div className="h-1 w-full bg-gradient-to-r from-navy-900 to-navy-700
                                group-hover:from-gold-500 group-hover:to-gold-400
                                transition-all duration-300" />

                <div className="p-6 flex flex-col flex-1">
                  {cs.platforms && cs.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cs.platforms.slice(0, 3).map((p: string) => (
                        <Badge key={p} variant="navy">{p}</Badge>
                      ))}
                    </div>
                  )}

                  <h3 className="text-base font-bold text-navy-900 mb-3 leading-snug
                                 group-hover:text-navy-700 transition-colors"
                      style={{ fontFamily: 'var(--font-sora)' }}>
                    {cs.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5 line-clamp-3">
                    {cs.outcome_summary}
                  </p>

                  {primaryMetric && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gold-50 border border-gold-100 mb-5">
                      <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-navy-900">
                          {primaryMetric.value}{primaryMetric.unit}
                        </div>
                        <div className="text-xs text-slate-500">{primaryMetric.label}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gold-500
                                  group-hover:gap-2.5 transition-all duration-200"
                       style={{ fontFamily: 'var(--font-sora)' }}>
                    Read Case Study
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </StaggeredGrid>
      </div>
    </section>
  )
}
