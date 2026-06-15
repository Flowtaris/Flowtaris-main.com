import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { CTASection } from '@/components/sections/CTASection'
import { CaseStudiesHero } from '@/components/sections/CaseStudiesHero'
import { FeaturedShowcase } from '@/components/sections/FeaturedShowcase'
import { InteractiveCaseList } from '@/components/sections/InteractiveCaseList'

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
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CaseStudiesHero />
      <FeaturedShowcase featured={featured} />
      <InteractiveCaseList cases={rest} />

      {allCards.length === 0 && (
        <section className="bg-slate-50 py-24 text-center">
          <p className="text-slate-500 mb-4">Case studies coming soon.</p>
        </section>
      )}

      {/* Wrapping CTA in a dark context if needed, but CTA is usually its own section */}
      <CTASection
        title="Ready to Write Your Own Success Story?"
        description="Join the enterprises that trust Flowtaris to architect, deploy and optimise their mission-critical ERP ecosystems. Every engagement begins with a strategic consultation."
        primaryCTA={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCTA={{ label: 'Explore Our Services', href: '/services' }}
      />
    </main>
  )
}
