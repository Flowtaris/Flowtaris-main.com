import type { Metadata } from 'next'
import { ServiceScrollStack } from '@/components/sections/ServiceScrollStack'
import { Accordion } from '@/components/ui/Accordion'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
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
  title: {
    absolute: 'Flowtaris — Enterprise ERP & Integration Consulting',
  },
  description:
    'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
  alternates: {
    canonical: 'https://www.flowtaris.com',
  },
  openGraph: {
    title: 'Flowtaris — Enterprise ERP & Integration Consulting',
    description:
      'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
    url: 'https://www.flowtaris.com',
    type: 'website',
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: heroData },
    { data: technologies },
    { data: wcuSectors },
    { data: wcuCards },
    { data: rawServices },
    { data: testimonials }
  ] = await Promise.all([
    supabase.from('global_hero').select('*').limit(1).maybeSingle(),
    supabase.from('modern_technologies').select('*').order('priority', { ascending: false }),
    supabase.from('why_choose_us_sectors').select('*').order('priority', { ascending: false }),
    supabase.from('why_choose_us_cards').select('*').order('priority', { ascending: false }),
    supabase.from('services').select('id, name, slug, priority, services_hero(color, normal_description)').order('priority', { ascending: false }),
    supabase.from('testimonials').select('*').order('priority', { ascending: false })
  ])

  // Fetch hero images sequentially since it depends on heroData.id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://www.flowtaris.com/#organization",
        "name": "Flowtaris",
        "legalName": "Flowtaris Private Limited",
        "alternateName": [
          "Flowtaris",
          "Flowtaris Private Limited",
          "Flowtaris ERP"
        ],
        "url": "https://www.flowtaris.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.flowtaris.com/images/logo.png",
          "width": 512,
          "height": 512
        },
        "description": "Flowtaris is a  enterprise-grade ERP consulting firm specializing in NetSuite, Coupa, SAP, and Workday implementations, integrations, and managed support.",
        "foundingDate": "2026",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 10,
          "maxValue": 50
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@flowtaris.com",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.linkedin.com/company/flowtaris-private-limited",
          "https://www.instagram.com/flowtaris_official?igsh=d2N5a2FzZDlqZ2F5&utm_source=qr",
          "https://www.youtube.com/@Flowtaris",
          "https://www.x.com/flowtaris",
          "https://www.facebook.com/1148842388302429"
        ],
        "areaServed": "Worldwide",
        "serviceType": "ERP Consulting",
        "slogan": "The Science of Business Flow",
        "knowsAbout": [
          "Enterprise Resource Planning (ERP)",
          "NetSuite Implementation",
          "Coupa Business Spend Management",
          "SAP S/4HANA",
          "Workday HCM",
          "ERP Integration",
          "SuiteScript Development",
          "AP Automation",
          "ERP Health Audit",
          "Change Management",
          "Financial Systems Architecture",
          "iPaaS Middleware"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "ERP Consulting Services",
          "url": "https://www.flowtaris.com/services"
        }
      }} />

      <SchemaInjector schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.flowtaris.com/#webpage",
        "url": "https://www.flowtaris.com",
        "name": "Flowtaris | Enterprise ERP Consulting Firm",
        "description": "Flowtaris is a  ERP consulting firm architecting enterprise-grade NetSuite, Coupa, SAP, and Workday implementations.",
        "isPartOf": {
          "@id": "https://www.flowtaris.com/#website"
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
          "url": "https://www.flowtaris.com/hero-image.jpg"
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
      {testimonials && testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
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
