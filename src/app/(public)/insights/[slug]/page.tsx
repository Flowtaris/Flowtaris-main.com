import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { CTASection } from '@/components/sections/CTASection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_title, meta_description, og_image_url, excerpt, published_at, topic_cluster')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) return { title: 'Insight | Flowtaris' }
  return {
    title: post.meta_title ?? `${post.title} | Flowtaris`,
    description: post.meta_description ?? post.excerpt ?? '',
    alternates: {
      canonical: `https://flowtaris.com/insights/${slug}`,
    },
    openGraph: {
      title: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt ?? '',
      images: [{
        url:    `/api/og?title=${encodeURIComponent(post.title)}&label=${encodeURIComponent(post.topic_cluster ?? 'Insights')}&type=blog`,
        width:  1200,
        height: 630,
      }],
      type: 'article',
    },
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  const article = articleSchema({
    title:         post.title,
    description:   post.excerpt ?? '',
    datePublished: post.published_at ?? post.created_at,
    dateModified:  post.updated_at ?? post.published_at ?? post.created_at,
    url:           `/insights/${post.slug}`,
    imageUrl:      post.og_image_url ?? undefined,
  })

  const breadcrumb = breadcrumbSchema([
    { name: 'Home',     url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: post.title, url: `/insights/${post.slug}` },
  ])

  // Related posts (same cluster, exclude current)
  const { data: related } = await supabase
    .from('blog_posts')
    .select('slug, title, topic_cluster, read_time_minutes')
    .eq('status', 'published')
    .eq('topic_cluster', post.topic_cluster ?? '')
    .neq('slug', post.slug)
    .limit(3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Article header — dark */}
      <div className="bg-grid-navy pt-10 pb-14">
        <div className="container-content">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-navy-400 hover:text-white
                       text-sm transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Insights
          </Link>

          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              {post.topic_cluster && <Badge variant="gold">{post.topic_cluster}</Badge>}
              {post.read_time_minutes && (
                <span className="flex items-center gap-1.5 text-xs text-navy-400">
                  <Clock className="w-3.5 h-3.5" />
                  {post.read_time_minutes} min read
                </span>
              )}
              {post.published_at && (
                <span className="flex items-center gap-1.5 text-xs text-navy-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.published_at)}
                </span>
              )}
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-navy-200 leading-relaxed">{post.excerpt}</p>
            )}
          </AnimatedSection>
        </div>
      </div>

      {/* Article body */}
      <section className="section bg-white">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Content */}
            <article className="lg:col-span-2">
              {post.content ? (
                <ContentRenderer content={post.content} />
              ) : (
                <p className="text-slate-500 italic">Content coming soon.</p>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author */}
              <div className="card p-5">
                <p
                  className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500 mb-3"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  Published by
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-gold-500 font-bold text-sm flex-shrink-0">
                    F
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold text-navy-900"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      Flowtaris Team
                    </div>
                    <div className="text-xs text-slate-500">Enterprise ERP Consultants</div>
                  </div>
                </div>
              </div>

              {/* Related */}
              {related && related.length > 0 && (
                <div className="card p-5">
                  <p
                    className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500 mb-4"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    Related Articles
                  </p>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/insights/${r.slug}`}
                        className="block group"
                      >
                        <p
                          className="text-sm font-medium text-navy-800 group-hover:text-navy-600
                                     transition-colors leading-snug mb-1"
                          style={{ fontFamily: 'var(--font-sora)' }}
                        >
                          {r.title}
                        </p>
                        {r.read_time_minutes && (
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {r.read_time_minutes} min
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl border border-gold-200 bg-gold-50/50 p-5">
                <p
                  className="text-sm font-bold text-navy-900 mb-2"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  Need expert ERP guidance?
                </p>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Talk to a Flowtaris consultant about your specific situation.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                             bg-gold-500 hover:bg-gold-400 text-white text-sm font-semibold
                             transition-colors"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

/** Server-side markdown renderer — no 'use client' needed */
async function ContentRenderer({ content }: { content: string }) {
  const { marked } = await import('marked')
  const DOMPurify = (await import('isomorphic-dompurify')).default
  const html = await marked(content, { gfm: true, breaks: true })
  return (
    <div
      className="prose-flowtaris"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html as string) }}
    />
  )
}
