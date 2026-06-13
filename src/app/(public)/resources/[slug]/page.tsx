import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PageHero } from '@/components/sections/PageHero'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { ResourceGateForm } from '@/components/forms/ResourceGateForm'
import { Download, FileText } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/schema'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: resource } = await supabase
    .from('resources')
    .select('title, meta_title, meta_description, description')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!resource) return { title: 'Resource | Flowtaris' }
  return {
    title: resource.meta_title ?? `${resource.title} | Flowtaris`,
    description: resource.meta_description ?? resource.description ?? '',
  }
}

export const revalidate = 3600

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: resource } = await supabase
    .from('resources')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!resource) notFound()

  const breadcrumb = breadcrumbSchema([
    { name: 'Home',      url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: resource.title, url: `/resources/${resource.slug}` },
  ])

  const typeLabel = resource.resource_type
    ? resource.resource_type.replace(/_/g, ' ')
    : 'Resource'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        label="Resource"
        title={resource.title}
        breadcrumbs={[
          { label: 'Resources', href: '/resources' },
          { label: resource.title },
        ]}
        size="sm"
      />

      <section className="section bg-white">
        <div className="container-content max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100
                                flex items-center justify-center">
                  <FileText className="w-6 h-6 text-navy-400" />
                </div>
                <div>
                  <h2
                    className="text-lg font-bold text-navy-900"
                    style={{ fontFamily: 'var(--font-sora)' }}
                  >
                    {resource.title}
                  </h2>
                  <Badge variant="navy" className="mt-1">
                    {typeLabel}
                  </Badge>
                </div>
              </div>

              {resource.description && (
                <p className="text-slate-600 leading-relaxed mb-8">{resource.description}</p>
              )}

              {resource.is_gated ? (
                <ResourceGateForm resourceId={resource.id} resourceSlug={resource.slug} />
              ) : (
                <a
                  href={resource.file_url ?? '#'}
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                             bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                             transition-colors duration-150"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  <Download className="w-4 h-4" />
                  Download Now
                </a>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
