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
  title: 'Flowtaris \u2014 Enterprise ERP & Integration Consulting',
  description:
    'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
  openGraph: {
    title: 'Flowtaris \u2014 Enterprise ERP & Integration Consulting',
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

      <SchemaInjector schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Flowtaris?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Flowtaris is a boutique, enterprise-grade ERP consulting firm. We specialise in architecting, implementing, and optimising complex business systems without the bureaucracy of large system integrators."
            }
          },
          {
            "@type": "Question",
            "name": "Which ERP platforms do you implement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide end-to-end consulting for NetSuite, Coupa, SAP (including S/4HANA), and Workday. Our expertise covers both platform-specific implementation and complex cross-system integrations."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a typical ERP implementation take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Implementation timelines vary based on scope, but a standard mid-market NetSuite or Coupa deployment typically ranges from 4 to 9 months. We accelerate time-to-value through strategic, phased rollouts."
            }
          },
          {
            "@type": "Question",
            "name": "What industries does Flowtaris serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We primarily serve mid-market to enterprise organisations spanning manufacturing, fintech, healthcare, professional services, and retail sectors globally."
            }
          },
          {
            "@type": "Question",
            "name": "How is your pricing structured?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Flowtaris operates on a value-based, fixed-fee model for well-defined implementations to ensure budget certainty. For ongoing health audits and complex integrations, we utilise retained advisory models."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Flowtaris different from Big 4 consulting partners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike large integrators, Flowtaris guarantees direct access to senior, certified architects rather than junior staff. We offer higher agility, focused engineering excellence, and zero bureaucratic overhead."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer post-go-live managed support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We provide dedicated hypercare immediately following go-live to ensure stability. Subsequently, we offer flexible managed support retainers to continuously optimise your system."
            }
          },
          {
            "@type": "Question",
            "name": "What is the first step to engage Flowtaris?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The first step is scheduling a discovery call through our contact page. Within 48 hours, you will speak directly with a senior architect to begin rigorous project scoping."
            }
          }
        ]
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

      <section id="geo-faq" className="py-24 bg-[#FAFAFA] px-6 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-[#FFD166] mt-4" />
          </div>
          <div className="lg:col-span-2">
            <Accordion 
              items={[
                { 
                  question: 'What makes Flowtaris different from large ERP consultancies?', 
                  answer: 'Unlike massive global systems integrators that rely on junior resources and standardized templates, Flowtaris operates as a specialized boutique consultancy. Our teams consist strictly of senior architects with Big 4 backgrounds and active certifications in NetSuite, Coupa, and Workday. This allows us to deliver highly customized, complex iPaaS integrations and ERP optimizations faster and with a significantly lower failure rate than traditional large-scale consulting firms.' 
                },
                { 
                  question: 'How quickly can Flowtaris start an ERP implementation or integration project?', 
                  answer: 'Flowtaris typically deploys a dedicated ERP architect and integration team within two to four weeks of a signed Statement of Work. Because we specialize exclusively in the NetSuite, Coupa, SAP, and Workday ecosystem, we avoid the lengthy resource-pooling delays common at larger firms. During this immediate onboarding phase, we conduct technical discovery and establish the foundation for your SOX-compliant data pipelines.' 
                },
                { 
                  question: 'Which ERP platforms and software does Flowtaris specialize in?', 
                  answer: 'Flowtaris exclusively specializes in architecting and integrating Oracle NetSuite, Coupa Business Spend Management (BSM), SAP S/4HANA, and Workday HCM. We do not dilute our expertise across dozens of platforms; instead, we focus entirely on building autonomous, high-volume financial data pipelines and SuiteScript 2.x customizations connecting these four enterprise leaders via modern iPaaS solutions.' 
                }
              ]} 
            />
          </div>
        </div>
      </section>

      <FinanceCTA />


    </>
  )
}
