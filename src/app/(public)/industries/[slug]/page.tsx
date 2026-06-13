import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { INDUSTRIES } from '@/lib/constants/industries'
import { breadcrumbSchema } from '@/lib/schema'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({ slug: ind.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) return {}
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
  }
}

export const revalidate = 3600

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  if (!industry) notFound()

  const breadcrumb = breadcrumbSchema([
    { name: 'Home',       url: '/' },
    { name: 'Industries', url: '/industries' },
    { name: industry.name, url: `/industries/${industry.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        label={industry.label}
        title={industry.title}
        titleHighlight={industry.titleHighlight}
        description={industry.description}
        breadcrumbs={[
          { label: 'Industries', href: '/industries' },
          { label: industry.name },
        ]}
        size="lg"
      />

      {/* Answer paragraph */}
      <section className="section bg-white">
        <div className="container-content max-w-3xl">
          <AnimatedSection>
            <p className="text-lg text-slate-600 leading-relaxed">
              {industry.answerParagraph}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Challenges + How we help — side by side */}
      <section className="section bg-surface">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Challenges */}
            <AnimatedSection delay={0}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-px w-6 bg-gold-500" />
                <span
                  className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  Common Challenges
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-navy-900 mb-6"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                What {industry.name} Organizations Face
              </h2>
              <ul className="space-y-3">
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-navy-100 border border-navy-200
                                    flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-navy-500" />
                    </div>
                    <span className="text-sm text-slate-600 leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* How we help */}
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-px w-6 bg-gold-500" />
                <span
                  className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  How Flowtaris Helps
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-navy-900 mb-6"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                What We Deliver for {industry.name} Clients
              </h2>
              <ul className="space-y-3">
                {industry.howWeHelp.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-14 bg-navy-900">
        <div className="container-content">
          <AnimatedSection className="flex flex-col md:flex-row md:items-center gap-6">
            <p
              className="text-sm font-medium text-navy-300 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Platforms we use for {industry.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {industry.platforms.map((platform) => (
                <span
                  key={platform}
                  className="text-xs font-mono font-semibold text-white
                             bg-navy-800 border border-navy-700
                             px-3 py-1.5 rounded-lg"
                >
                  {platform}
                </span>
              ))}
            </div>
            <div className="md:ml-auto">
              <Link
                href="/services"
                className="flex items-center gap-1.5 text-sm text-gold-400
                           hover:text-gold-300 transition-colors font-medium"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        title={`Ready to Optimize Your ${industry.name} ERP Environment?`}
        description="Talk to a Flowtaris consultant about your specific requirements. We have delivered enterprise ERP and integration projects across this industry."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Services', href: '/services' }}
      />
    </>
  )
}
