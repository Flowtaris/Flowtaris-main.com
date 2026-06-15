import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { CTASection } from '@/components/sections/CTASection'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Case Studies | Enterprise ERP Results — Flowtaris',
  description:
    'Real-world ERP transformation results. See how Flowtaris helped enterprises achieve measurable outcomes with NetSuite, Coupa, SAP, Workday and custom integrations.',
  openGraph: {
    title: 'Case Studies | Enterprise ERP Results — Flowtaris',
    description:
      'Real-world ERP transformation results. See how Flowtaris helped enterprises achieve measurable outcomes across NetSuite, Coupa, SAP and Workday.',
    url: 'https://flowtaris.com/case-studies',
    type: 'website',
  },
}

export const revalidate = 3600

// Platform color map
const PLATFORM_COLORS: Record<string, string> = {
  NetSuite: '#4F46E5',
  Coupa:    '#E11D48',
  SAP:      '#0284C7',
  Workday:  '#7C3AED',
  Oracle:   '#EA580C',
  Celigo:   '#059669',
  MuleSoft: '#E8A020',
  Boomi:    '#0891B2',
}

function getPlatformColor(platform: string) {
  return PLATFORM_COLORS[platform] ?? '#64748B'
}

export default async function CaseStudiesPage() {
  const supabase = await createClient()

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select(
      'slug, title, outcome_summary, platforms, services, industries, metrics, is_featured, cover_image_url, published_at'
    )
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })

  const featured = caseStudies?.filter((cs) => cs.is_featured) ?? []
  const rest = caseStudies?.filter((cs) => !cs.is_featured) ?? []

  // Static fallback cards for when DB is empty (matches CaseStudyHighlights data)
  const fallbackCards = [
    {
      slug: 'global-retailer-netsuite-migration',
      title: 'Global Retailer Achieves 40% Faster Financial Close with NetSuite',
      platforms: ['NetSuite', 'Celigo'],
      outcome_summary:
        'Seamlessly migrated legacy financial data to NetSuite, implementing automated reconciliation pipelines that cut close time by 40%.',
      metrics: [{ label: 'Reduction in Close Time', value: '40', unit: '%' }],
      is_featured: true,
      cover_image_url: null,
      published_at: null,
      services: ['NetSuite Consulting'],
      industries: ['Retail'],
    },
    {
      slug: 'fintech-sap-integration',
      title: 'FinTech Unicorn Scales Operations with SAP & Workday Integration',
      platforms: ['SAP', 'Workday'],
      outcome_summary:
        'Architected a bi-directional, event-driven integration ensuring sub-second data consistency across global teams.',
      metrics: [{ label: 'Data Accuracy Improved', value: '99.9', unit: '%' }],
      is_featured: true,
      cover_image_url: null,
      published_at: null,
      services: ['ERP Integrations'],
      industries: ['Financial Services'],
    },
    {
      slug: 'manufacturing-coupa-deployment',
      title: 'Enterprise Manufacturing Streamlines Procurement via Coupa',
      platforms: ['Coupa', 'Oracle ERP'],
      outcome_summary:
        'Deployed a comprehensive Procure-to-Pay solution with automated approval workflows and spend analytics.',
      metrics: [{ label: 'Cost Savings Identified', value: '$12', unit: 'M' }],
      is_featured: false,
      cover_image_url: null,
      published_at: null,
      services: ['Coupa Consulting'],
      industries: ['Manufacturing'],
    },
  ]

  const displayFeatured = featured.length > 0 ? featured : fallbackCards.filter((c) => c.is_featured)
  const displayRest = rest.length > 0 ? rest : fallbackCards.filter((c) => !c.is_featured)
  const allCards = [...displayFeatured, ...displayRest]

  return (
    <>
      {/* Stats row */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-content py-10">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Enterprise Projects', icon: Award },
              { value: '99%', label: 'Client Retention Rate', icon: TrendingUp },
              { value: '$200M+', label: 'In Process Savings', icon: CheckCircle },
              { value: '6', label: 'Industry Verticals', icon: Award },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center md:items-start gap-1">
                <span
                  className="text-3xl font-bold text-navy-900"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {value}
                </span>
                <span className="text-sm text-slate-500 text-center md:text-left">{label}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Case study grid */}
      <section className="section bg-surface">
        <div className="container-content space-y-16">

          {/* Featured */}
          {displayFeatured.length > 0 && (
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="h-px w-6 bg-gold-500" />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    Featured Engagements
                  </span>
                </div>
              </AnimatedSection>
              <StaggeredGrid className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayFeatured.map((cs) => {
                  const metric = Array.isArray(cs.metrics) && cs.metrics.length > 0
                    ? (cs.metrics[0] as { label?: string; value?: string; unit?: string })
                    : null

                  return (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group card flex flex-col overflow-hidden"
                    >
                      {/* Visual header */}
                      <div className="h-48 bg-gradient-to-br from-navy-950 to-navy-800 relative overflow-hidden flex items-end p-6">
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, rgba(232,160,32,0.4) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                          }}
                          aria-hidden="true"
                        />
                        {/* Accent orb */}
                        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-gold-500/10 group-hover:bg-gold-500/20 transition-all duration-700 pointer-events-none" />
                        <div className="relative z-10 flex flex-wrap gap-1.5">
                          {(cs.platforms as string[])?.slice(0, 3).map((p) => (
                            <span
                              key={p}
                              className="text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded border"
                              style={{
                                color: getPlatformColor(p),
                                borderColor: `${getPlatformColor(p)}40`,
                                backgroundColor: `${getPlatformColor(p)}10`,
                                fontFamily: 'var(--font-jetbrains)',
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-2">
                          <Badge variant="gold">Featured</Badge>
                        </div>
                        <h2
                          className="text-lg font-bold text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          {cs.title}
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5 line-clamp-3">
                          {cs.outcome_summary}
                        </p>

                        {metric?.value && metric?.label && (
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-gold-50 border border-gold-100 mb-5">
                            <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-navy-900">
                                {metric.value}{metric.unit}
                              </div>
                              <div className="text-xs text-slate-500">{metric.label}</div>
                            </div>
                          </div>
                        )}

                        <div
                          className="flex items-center gap-1.5 text-sm font-semibold text-gold-500 group-hover:gap-2.5 transition-all duration-200"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          Read Case Study <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </StaggeredGrid>
            </div>
          )}

          {/* All other */}
          {displayRest.length > 0 && (
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="h-px w-6 bg-slate-300" />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    All Engagements
                  </span>
                </div>
              </AnimatedSection>
              <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayRest.map((cs) => {
                  const metric = Array.isArray(cs.metrics) && cs.metrics.length > 0
                    ? (cs.metrics[0] as { label?: string; value?: string; unit?: string })
                    : null

                  return (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group card flex flex-col overflow-hidden"
                    >
                      <div className="h-1 w-full bg-gradient-to-r from-navy-900 to-navy-700 group-hover:from-gold-500 group-hover:to-gold-400 transition-all duration-300" />

                      <div className="p-6 flex flex-col flex-1">
                        {(cs.platforms as string[])?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {(cs.platforms as string[]).slice(0, 3).map((p) => (
                              <Badge key={p} variant="navy">{p}</Badge>
                            ))}
                          </div>
                        )}
                        <h3
                          className="text-base font-bold text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          {cs.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5 line-clamp-3">
                          {cs.outcome_summary}
                        </p>

                        {metric?.value && metric?.label && (
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-gold-50 border border-gold-100 mb-5">
                            <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-navy-900">
                                {metric.value}{metric.unit}
                              </div>
                              <div className="text-xs text-slate-500">{metric.label}</div>
                            </div>
                          </div>
                        )}

                        <div
                          className="flex items-center gap-1.5 text-sm font-semibold text-gold-500 group-hover:gap-2.5 transition-all duration-200"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          Read Case Study <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </StaggeredGrid>
            </div>
          )}

          {/* Empty state */}
          {allCards.length === 0 && (
            <AnimatedSection className="text-center py-24">
              <p className="text-slate-400 mb-4">Case studies coming soon.</p>
              <Link
                href="/contact"
                className="text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors"
              >
                Discuss your project →
              </Link>
            </AnimatedSection>
          )}
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Transformation?"
        description="Join the enterprises that trust Flowtaris to architect, deploy and optimise their mission-critical ERP systems."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Services', href: '/services' }}
      />
    </>
  )
}
