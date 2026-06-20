import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { InteractiveCaseList } from '@/components/sections/InteractiveCaseList'
import { FeaturedShowcase } from '@/components/sections/FeaturedShowcase'

export const metadata: Metadata = {
  title: 'Client Case Studies — Flowtaris ERP Solutions',
  description: 'Read how Flowtaris engineers complex NetSuite, Coupa, and Workday architectures for high-growth enterprises.',
  alternates: {
    canonical: 'https://flowtaris.com/case-studies',
  },
  openGraph: {
    title: 'Client Case Studies — Flowtaris ERP Solutions',
    description: 'Read how Flowtaris engineers complex NetSuite, Coupa, and Workday architectures for high-growth enterprises.',
    url: 'https://flowtaris.com/case-studies',
    type: 'website',
  },
}

export default async function CaseStudiesPage() {
  const supabase = await createClient()
  const { data: caseStudies } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false })

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Flowtaris Case Studies",
    "mainEntity": (caseStudies || []).map(cs => ({
      "@type": "Article",
      "headline": cs.title,
      "url": `https://flowtaris.com/case-studies/${cs.slug}`
    }))
  }

  const featured = caseStudies?.slice(0, 3) || []
  const rest = caseStudies?.slice(3) || []

  return (
    <main className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Minimal Header */}
      <div className="pt-32 pb-8 px-6 md:px-12 max-w-[1440px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-light text-[#0A1628] tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
          Case Studies
        </h1>
      </div>

      {featured.length > 0 && <FeaturedShowcase featured={featured} />}

      <div className="relative z-10 bg-[#FAFAFA]">
        {rest.length > 0 && <InteractiveCaseList cases={rest} title="More Engagements" />}
        
        {(!caseStudies || caseStudies.length === 0) && (
          <div className="py-24 text-center text-slate-500 font-light">
            No case studies published yet.
          </div>
        )}
      </div>
    </main>
  )
}
