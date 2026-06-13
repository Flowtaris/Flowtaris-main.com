import { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Enterprise Services | Flowtaris',
  description: 'Comprehensive enterprise consulting, implementation, and managed support for NetSuite, Coupa, SAP, and Workday.',
}

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <PageHero
        label="Our Capabilities"
        title="Enterprise"
        titleHighlight="Services"
        description="We deliver end-to-end consulting, implementation, integration, and managed support for the world's leading enterprise platforms. Scaling your operations with uncompromising quality."
        align="center"
        size="lg"
        dark={true}
      />

      {/* 2. Primary Capabilities Grid */}
      <div className="relative -mt-8 z-10">
        <ServicesGrid />
      </div>



      {/* 4. CTA Section */}
      <CTASection
        title="Ready to transform your enterprise architecture?"
        description="Let's build a scalable foundation that accelerates your business growth. Speak with our principal architects today."
        primaryCTA={{ label: 'Discuss Your Project', href: '/contact' }}
        secondaryCTA={{ label: 'Explore Our Methodology', href: '/about' }}
      />
    </main>
  )
}
