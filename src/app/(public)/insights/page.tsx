import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageHero } from '@/components/sections/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { formatDateShort } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'ERP Insights & Blog | NetSuite, Coupa, SAP & Integration Expertise',
  description: 'Expert insights on NetSuite, Coupa, ERP integrations, procurement automation and enterprise transformation from the Flowtaris consulting team.',
}

export const revalidate = 3600

const TOPIC_CLUSTERS = ['All', 'NetSuite', 'Coupa', 'Integrations', 'Automation', 'Governance', 'Strategy'] as const

export default async function InsightsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, topic_cluster, read_time_minutes, published_at, cover_image_url')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(12)

  const featured = posts?.[0] ?? null
  const rest     = posts?.slice(1) ?? []

  return (
    <>
      <PageHero
        title="Enterprise ERP Insights &"
        titleHighlight="Expert Perspectives."
        description="Practical thinking on NetSuite, Coupa, ERP integrations, procurement automation and enterprise transformation."
        size="md"
      />

      {/* Topic cluster strip */}
      <section className="border-b border-slate-100 bg-white sticky top-[72px] z-30">
        <div className="container-content py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {TOPIC_CLUSTERS.map((cluster, idx) => (
              <span
                key={cluster}
                className={`text-xs font-mono uppercase tracking-[0.12em] px-3.5 py-2
                           rounded-lg cursor-default whitespace-nowrap transition-colors duration-150
                           ${idx === 0
                             ? 'bg-navy-900 text-white'
                             : 'bg-transparent text-slate-500 border border-slate-200 hover:border-navy-300 hover:text-navy-700'
                           }`}
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                {cluster}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-content space-y-12">

          {/* Featured post */}
          {featured && (
            <AnimatedSection>
              <Link
                href={`/insights/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-5 gap-8 card p-8 overflow-hidden"
              >
                {/* Featured visual placeholder — gold gradient panel */}
                <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700
                                min-h-[200px] flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(232,160,32,0.3) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                    aria-hidden="true"
                  />
                  {featured.topic_cluster && (
                    <span
                      className="relative z-10 text-gold-400 font-mono text-xs uppercase tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-jetbrains)' }}
                    >
                      {featured.topic_cluster}
                    </span>
                  )}
                </div>

                <div className="lg:col-span-3 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="gold">Featured</Badge>
                    {featured.topic_cluster && (
                      <Badge variant="navy">{featured.topic_cluster}</Badge>
                    )}
                  </div>
                  <h2
                    className="text-2xl font-bold text-navy-900 mb-3 leading-snug
                               group-hover:text-navy-700 transition-colors"
                    style={{ fontFamily: 'var(--font-sora)' }}
                  >
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-slate-500 leading-relaxed mb-5 line-clamp-2">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      {featured.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDateShort(featured.published_at)}
                        </span>
                      )}
                      {featured.read_time_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.read_time_minutes} min read
                        </span>
                      )}
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-sm font-semibold text-gold-500
                                 group-hover:gap-2.5 transition-all"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group card flex flex-col overflow-hidden"
                >
                  {/* Visual header */}
                  <div className="h-32 bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(232,160,32,0.3) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                      aria-hidden="true"
                    />
                    {post.topic_cluster && (
                      <span
                        className="relative text-gold-400 font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                      >
                        {post.topic_cluster}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3
                      className="text-sm font-bold text-navy-900 mb-3 leading-snug flex-1
                                 group-hover:text-navy-700 transition-colors"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        {post.read_time_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.read_time_minutes} min
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-1 text-xs font-semibold text-gold-500
                                   group-hover:gap-2 transition-all"
                        style={{ fontFamily: 'var(--font-sora)' }}
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggeredGrid>
          )}

          {/* Empty state */}
          {(!posts || posts.length === 0) && (
            <AnimatedSection className="text-center py-24">
              <p className="text-slate-400 mb-4">Insights coming soon.</p>
              <Link
                href="/contact"
                className="text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors"
              >
                Subscribe for updates →
              </Link>
            </AnimatedSection>
          )}
        </div>
      </section>

      <CTASection />
    </>
  )
}
