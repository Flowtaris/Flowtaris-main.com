import type { Metadata } from 'next'
import { ServiceScrollStack } from '@/components/sections/ServiceScrollStack'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { CapabilitiesBanner } from '@/components/sections/CapabilitiesBanner'

import { CaseStudyHighlights } from '@/components/sections/CaseStudyHighlights'
import { IntegrationShowcase } from '@/components/sections/IntegrationShowcase'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'

import { FinanceCTA } from '@/components/sections/FinanceCTA'
import { organizationSchema } from '@/lib/schema'
import { Suspense } from 'react'
import { SkeletonCard } from '@/components/ui/Skeleton'

import { HeroSection } from '@/components/sections/HeroSection'

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

export default function HomePage() {
  const schema = organizationSchema()

  return (
    <>
      {/* Organization schema - global */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <HeroSection />
      <ServiceScrollStack />
      <WhyChooseUsSection />
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
