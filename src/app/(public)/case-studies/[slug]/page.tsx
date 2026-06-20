import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CTASection } from '@/components/sections/CTASection'
import { FALLBACK_STUDIES } from '@/lib/data/case-studies-fallback'
import { CaseStudyHero } from './components/CaseStudyHero'
import { CaseStudyBody } from './components/CaseStudyBody'
import { RelatedCaseStudies } from './components/RelatedCaseStudies'

export const revalidate = 3600

// ─── Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('case_studies')
    .select('title, meta_title, meta_description, outcome_summary')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  const fallback = FALLBACK_STUDIES.find((f) => f.slug === slug)
  const cs = data ?? fallback

  if (!cs) return { title: 'Case Study | Flowtaris' }

  return {
    title: (cs as typeof cs & { meta_title?: string }).meta_title ?? `${cs.title} | Flowtaris Case Study`,
    description: (cs as typeof cs & { meta_description?: string }).meta_description ?? cs.outcome_summary,
    alternates: {
      canonical: `https://flowtaris.com/case-studies/${slug}`,
    },
    openGraph: {
      title: (cs as typeof cs & { meta_title?: string }).meta_title ?? `${cs.title} | Flowtaris Case Study`,
      description: (cs as typeof cs & { meta_description?: string }).meta_description ?? cs.outcome_summary,
      url: `https://flowtaris.com/case-studies/${slug}`,
      type: 'article',
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  const cs = data ?? FALLBACK_STUDIES.find((f) => f.slug === slug)
  if (!cs) notFound()

  const metrics = Array.isArray(cs.metrics) ? cs.metrics as Array<{ label: string; value: string; unit?: string }> : []
  const platforms = Array.isArray(cs.platforms) ? cs.platforms as string[] : []
  const services = Array.isArray(cs.services) ? cs.services as string[] : []
  const industries = Array.isArray(cs.industries) ? cs.industries as string[] : []

  // Fetch other case studies for "more" section
  const { data: moreCases } = await supabase
    .from('case_studies')
    .select('slug, title, platforms, outcome_summary, metrics')
    .eq('status', 'published')
    .neq('slug', slug)
    .limit(2)

  const displayMore = (moreCases && moreCases.length > 0)
    ? moreCases
    : FALLBACK_STUDIES.filter((f) => f.slug !== slug).slice(0, 2)

  const heroImage = cs.cover_image_url || "/images/cs_hero_cover.png"

  return (
    <>
      <CaseStudyHero
        title={cs.title}
        outcomeSummary={cs.outcome_summary}
        metrics={metrics}
        coverImage={heroImage}
      />

      <CaseStudyBody
        clientSituation={cs.client_situation}
        solutionApproach={cs.solution_approach}
        outcomeSummary={cs.outcome_summary}
        platforms={platforms}
        services={services}
        industries={industries}
      />

      <RelatedCaseStudies displayMore={displayMore} />

      <CTASection
        title="Ready to Build Your Success Story?"
        description="Let Flowtaris architect a transformation that delivers measurable results for your enterprise."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'View All Case Studies', href: '/case-studies' }}
      />
    </>
  )
}
