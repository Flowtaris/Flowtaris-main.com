import { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { IntegrationShowcase } from '@/components/sections/IntegrationShowcase'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Enterprise Integrations | Flowtaris',
  description: 'Seamlessly connect your mission-critical enterprise systems. We architect secure, high-performance data pipelines bridging Coupa, NetSuite, SAP, Workday, and more.',
}

export default function IntegrationsPage() {
  return (
    <main>
      <PageHero
        label="Ecosystem Connectivity"
        title="Enterprise"
        titleHighlight="Integrations"
        description="We architect secure, bidirectional data pipelines that eliminate manual reconciliation and unify your corporate technology stack."
        align="center"
        size="lg"
        dark={true}
      />

      <IntegrationShowcase hideViewAll={true} />

      <CTASection
        title="Ready to automate your workflows?"
        description="Let's build a reliable integration architecture that scales with your enterprise."
        primaryAction={{ label: 'Discuss Your Stack', href: '/contact' }}
        secondaryAction={{ label: 'Explore Case Studies', href: '/case-studies' }}
      />
    </main>
  )
}
