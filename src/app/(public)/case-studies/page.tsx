import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Award, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageHero } from '@/components/sections/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Case Studies | Proven Enterprise ERP Transformation Results — Flowtaris',
  description:
    'Explore 6 in-depth enterprise ERP case studies. See measurable results from Flowtaris NetSuite, Coupa, SAP, and Workday implementations — real outcomes, real numbers, real businesses.',
  keywords: [
    'ERP case studies', 'NetSuite implementation results', 'Coupa deployment success',
    'SAP S4HANA transformation', 'Workday integration case study', 'enterprise ERP consulting outcomes',
    'Flowtaris case studies', 'ERP ROI examples', 'cloud ERP success stories',
  ],
  openGraph: {
    title: 'Enterprise ERP Case Studies — Proven Results | Flowtaris',
    description:
      'Real-world ERP transformation results. See how Flowtaris delivered measurable outcomes across NetSuite, Coupa, SAP, Workday, and Boomi for leading enterprises worldwide.',
    url: 'https://flowtaris.com/case-studies',
    type: 'website',
    images: [{ url: 'https://flowtaris.com/og-case-studies.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://flowtaris.com/case-studies' },
}

export const revalidate = 3600

const PLATFORM_COLORS: Record<string, string> = {
  NetSuite: '#4F46E5',
  Coupa:    '#E11D48',
  SAP:      '#0284C7',
  Workday:  '#7C3AED',
  Oracle:   '#EA580C',
  Celigo:   '#059669',
  MuleSoft: '#E8A020',
  Boomi:    '#0891B2',
  Epic:     '#0F766E',
  IoT:      '#6366F1',
  EDI:      '#64748B',
}

function getPlatformColor(platform: string) {
  return PLATFORM_COLORS[platform] ?? '#64748B'
}

const INDUSTRY_ICONS: Record<string, string> = {
  'Retail & E-commerce': '🛍️',
  'Financial Services': '🏦',
  'Manufacturing': '🏭',
  'Healthcare & Life Sciences': '🏥',
  'Logistics & Supply Chain': '🚢',
  'Energy & Utilities': '⚡',
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

  const allCards = caseStudies ?? []
  const featured = allCards.filter((cs) => cs.is_featured)
  const rest = allCards.filter((cs) => !cs.is_featured)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Flowtaris Enterprise ERP Case Studies',
    description: 'In-depth case studies of enterprise ERP implementations delivered by Flowtaris.',
    url: 'https://flowtaris.com/case-studies',
    numberOfItems: allCards.length,
    itemListElement: allCards.map((cs, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://flowtaris.com/case-studies/${cs.slug}`,
      name: cs.title,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label="Client Success Stories"
        title="Transformations That"
        titleHighlight="Deliver Measurable Impact."
        description="Every case study here represents a high-stakes enterprise engagement — complex systems, demanding timelines, and real business outcomes. These are not estimates. These are results."
        size="lg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]}
      />

      {/* Trust bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-content py-10">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Enterprise Projects Delivered', icon: Award },
              { value: '99%', label: 'Client Retention Rate', icon: Users },
              { value: '$200M+', label: 'In Documented Process Savings', icon: TrendingUp },
              { value: '6', label: 'Industry Verticals Served', icon: CheckCircle },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-gold-500" />
                </div>
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

      <section className="section bg-surface">
        <div className="container-content space-y-16">

          {/* Featured — large 2-col grid */}
          {featured.length > 0 && (
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
                {featured.map((cs) => {
                  const metrics = Array.isArray(cs.metrics) ? cs.metrics as Array<{ label: string; value: string; unit?: string }> : []
                  const industry = Array.isArray(cs.industries) && cs.industries.length > 0 ? (cs.industries as string[])[0] : null
                  const icon = industry ? (INDUSTRY_ICONS[industry] ?? '🏢') : '🏢'

                  return (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group card flex flex-col overflow-hidden"
                    >
                      {/* Cover image */}
                      <div className="h-52 relative overflow-hidden bg-navy-950">
                        {cs.cover_image_url ? (
                          <>
                            <Image
                              src={cs.cover_image_url}
                              alt={cs.title}
                              fill
                              className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/50 to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 to-navy-800">
                            <div
                              className="absolute inset-0 opacity-10"
                              style={{
                                backgroundImage: 'radial-gradient(circle, rgba(232,160,32,0.4) 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                              }}
                            />
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-1.5">
                          {(cs.platforms as string[])?.slice(0, 3).map((p) => (
                            <span
                              key={p}
                              className="text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded border backdrop-blur-sm"
                              style={{
                                color: getPlatformColor(p),
                                borderColor: `${getPlatformColor(p)}60`,
                                backgroundColor: `${getPlatformColor(p)}20`,
                                fontFamily: 'var(--font-jetbrains)',
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="gold">Featured</Badge>
                          {industry && (
                            <span className="text-xs text-slate-400">{icon} {industry}</span>
                          )}
                        </div>
                        <h2
                          className="text-lg font-bold text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          {cs.title}
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5 line-clamp-2">
                          {cs.outcome_summary}
                        </p>

                        {/* All metrics */}
                        {metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            {metrics.map((m) => (
                              <div key={m.label} className="text-center">
                                <div className="text-sm font-bold text-navy-900">{m.value}{m.unit}</div>
                                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div
                          className="flex items-center gap-1.5 text-sm font-semibold text-gold-500 group-hover:gap-2.5 transition-all duration-200"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          Read Full Case Study <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </StaggeredGrid>
            </div>
          )}

          {/* All other engagements */}
          {rest.length > 0 && (
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
                {rest.map((cs) => {
                  const metrics = Array.isArray(cs.metrics) ? cs.metrics as Array<{ label: string; value: string; unit?: string }> : []
                  const industry = Array.isArray(cs.industries) && cs.industries.length > 0 ? (cs.industries as string[])[0] : null
                  const icon = industry ? (INDUSTRY_ICONS[industry] ?? '🏢') : '🏢'

                  return (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group card flex flex-col overflow-hidden"
                    >
                      {/* Cover image */}
                      <div className="h-40 relative overflow-hidden bg-navy-950">
                        {cs.cover_image_url ? (
                          <>
                            <Image
                              src={cs.cover_image_url}
                              alt={cs.title}
                              fill
                              className="object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 to-navy-800" />
                        )}
                        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1">
                          {(cs.platforms as string[])?.slice(0, 2).map((p) => (
                            <span
                              key={p}
                              className="text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded border backdrop-blur-sm"
                              style={{
                                color: getPlatformColor(p),
                                borderColor: `${getPlatformColor(p)}50`,
                                backgroundColor: `${getPlatformColor(p)}15`,
                                fontFamily: 'var(--font-jetbrains)',
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        {industry && (
                          <span className="text-xs text-slate-400 mb-2">{icon} {industry}</span>
                        )}
                        <h3
                          className="text-base font-bold text-navy-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          {cs.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-2">
                          {cs.outcome_summary}
                        </p>

                        {/* Key metric highlight */}
                        {metrics.length > 0 && (
                          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gold-50 border border-gold-100 mb-4">
                            <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-bold text-navy-900">{metrics[0]?.value}{metrics[0]?.unit}</div>
                              <div className="text-[10px] text-slate-400">{metrics[0]?.label}</div>
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
        title="Ready to Write Your Own Success Story?"
        description="Join the enterprises that trust Flowtaris to architect, deploy and optimise their mission-critical ERP ecosystems. Every engagement begins with a strategic consultation."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'Explore Our Services', href: '/services' }}
      />
    </>
  )
}
