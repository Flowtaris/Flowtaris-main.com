import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Download, Lock, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageHero } from '@/components/sections/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'ERP Resources, Guides & Capability Briefs | Flowtaris',
  description: 'Download ERP capability briefs, implementation guides, checklists and whitepapers from the Flowtaris consulting team.',
}

export const revalidate = 3600

const resourceTypeLabels: Record<string, string> = {
  capability_brief: 'Capability Brief',
  checklist:        'Checklist',
  guide:            'Implementation Guide',
  whitepaper:       'Whitepaper',
  faq_doc:          'FAQ Document',
}

export default async function ResourcesPage() {
  const supabase = await createClient()

  const { data: resources } = await supabase
    .from('resources')
    .select('slug, title, description, resource_type, is_gated, download_count')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <>
      <PageHero
        label="Resources"
        title="ERP Guides, Checklists &"
        titleHighlight="Capability Briefs."
        description="Practical resources from the Flowtaris team. Download implementation guides, checklists and capability briefs for NetSuite, Coupa and enterprise integrations."
        breadcrumbs={[{ label: 'Resources' }]}
        size="md"
      />

      <section className="section bg-white">
        <div className="container-content">
          {resources && resources.length > 0 ? (
            <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="group card flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="navy">
                        {resourceTypeLabels[resource.resource_type] ?? resource.resource_type}
                      </Badge>
                      {resource.is_gated ? (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Lock className="w-3 h-3" /> Gated
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-emerald-500">
                          <Download className="w-3 h-3" /> Free
                        </div>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-navy-50 border border-navy-100
                                    flex items-center justify-center mb-4">
                      <FileText className="w-5 h-5 text-navy-400" />
                    </div>
                    <h2
                      className="text-base font-bold text-navy-900 mb-3 leading-snug
                                 group-hover:text-navy-700 transition-colors flex-1"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {resource.title}
                    </h2>
                    {resource.description && (
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                    )}
                    <div
                      className="flex items-center gap-1.5 text-sm font-semibold text-gold-500
                                 group-hover:gap-2.5 transition-all mt-auto"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {resource.is_gated ? 'Download Now' : 'View Resource'}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </StaggeredGrid>
          ) : (
            <AnimatedSection className="text-center py-24">
              <p className="text-slate-400 mb-2">Resources coming soon.</p>
              <p className="text-sm text-slate-300">
                Check back shortly or{' '}
                <Link href="/contact" className="text-gold-500 hover:underline">
                  contact us
                </Link>{' '}
                to request a capability brief.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      <CTASection
        title="Looking for a Specific Capability Brief?"
        description="Contact us directly and we will send you the relevant documentation for your platforms and services."
        primaryCTA={{ label: 'Request a Capability Brief', href: '/contact' }}
        secondaryCTA={{ label: 'View All Services', href: '/services' }}
      />
    </>
  )
}
