import type { Metadata } from 'next'
import { ServiceScrollStack } from '@/components/sections/ServiceScrollStack'
import { Accordion } from '@/components/ui/Accordion'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { CapabilitiesBanner } from '@/components/sections/CapabilitiesBanner'

import { CaseStudyHighlights } from '@/components/sections/CaseStudyHighlights'
import { IntegrationShowcase } from '@/components/sections/IntegrationShowcase'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'

import { FinanceCTA } from '@/components/sections/FinanceCTA'
import { Suspense } from 'react'
import { SkeletonCard } from '@/components/ui/Skeleton'
import SchemaInjector from '@/components/SchemaInjector'

import { HeroSection } from '@/components/sections/HeroSection'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Flowtaris — Enterprise ERP & Integration Consulting',
  description:
    'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
  alternates: {
    canonical: 'https://flowtaris.com',
  },
  openGraph: {
    title: 'Flowtaris — Enterprise ERP & Integration Consulting',
    description:
      'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
    url: 'https://flowtaris.com',
    type: 'website',
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch independent data in parallel
  const [
    { data: heroData },
    { data: technologies },
    { data: wcuSectors },
    { data: wcuCards },
    { data: rawServices }
  ] = await Promise.all([
    supabase.from('global_hero').select('*').limit(1).maybeSingle(),
    supabase.from('modern_technologies').select('*').order('priority', { ascending: false }),
    supabase.from('why_choose_us_sectors').select('*').order('priority', { ascending: false }),
    supabase.from('why_choose_us_cards').select('*').order('priority', { ascending: false }),
    supabase.from('services').select('id, name, slug, priority, services_hero(color, normal_description)').order('priority', { ascending: false })
  ])

  // Fetch hero images sequentially since it depends on heroData.id
  let heroImages: any[] = []
  if (heroData?.id) {
    const { data: images } = await supabase
      .from('global_hero_images')
      .select('*')
      .eq('hero_id', heroData.id)
      .order('created_at', { ascending: true })
    if (images) heroImages = images
  }

  return (
    <>
      {/* Homepage specific schemas */}
      <SchemaInjector schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://flowtaris.com/#webpage",
        "url": "https://flowtaris.com",
        "name": "Flowtaris | Enterprise ERP Consulting Firm",
        "description": "Flowtaris is a boutique ERP consulting firm architecting enterprise-grade NetSuite, Coupa, SAP, and Workday implementations.",
        "isPartOf": {
          "@id": "https://flowtaris.com/#website"
        },
        "about": [
          { "@type": "Thing", "name": "NetSuite" },
          { "@type": "Thing", "name": "Coupa" },
          { "@type": "Thing", "name": "SAP" },
          { "@type": "Thing", "name": "Workday" },
          { "@type": "Thing", "name": "ERP" }
        ],
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://flowtaris.com/hero-image.jpg"
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".hero-heading", ".hero-description"]
        }
      }} />



      <HeroSection 
        title={heroData?.main_description} 
        description={heroData?.small_description ?? undefined} 
        technologies={technologies || []}
        heroImages={heroImages}
      />
      <ServiceScrollStack dynamicServices={rawServices || []} />
      <WhyChooseUsSection sectors={wcuSectors || []} cards={wcuCards || []} />
      <CapabilitiesBanner />

      <Suspense fallback={
        <section className="section bg-surface">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </section>
      }>
        <CaseStudyHighlights />
      </Suspense>
      <IntegrationShowcase />
      <HowWeWorkSection />



      <FinanceCTA />


    </>
  )
}
