import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { formatDateShort } from '@/lib/utils'

export async function InsightsPreview() {
  const posts = [
    {
      slug: 'sox-compliance',
      title: 'Automating SOX Compliance in Your Procure-to-Pay Pipeline',
      excerpt: 'Manual audits are prone to error. Learn how cryptographic hashing and immutable ledger posts can guarantee strict compliance without the overhead.',
      topic_cluster: 'Security',
      read_time_minutes: 6,
      published_at: '2026-06-05T00:00:00Z'
    },
    {
      slug: 'netsuite-suiteql',
      title: 'Advanced SuiteQL: Unlocking Real-time Financial Telemetry',
      excerpt: 'Move beyond traditional saved searches. A deep dive into utilizing SuiteQL via RESTlets for high-performance, real-time data extraction.',
      topic_cluster: 'Technical',
      read_time_minutes: 12,
      published_at: '2026-05-28T00:00:00Z'
    },
    {
      slug: 'workday-hcm',
      title: 'Idempotency Patterns in Workday Payroll Integrations',
      excerpt: 'Handling network failures gracefully. How to design idempotent payloads to ensure high-value journal entries are never duplicated.',
      topic_cluster: 'Engineering',
      read_time_minutes: 9,
      published_at: '2026-05-15T00:00:00Z'
    }
  ]

  if (!posts || posts.length === 0) return null

  return (
    <section className="section bg-white">
      <div className="container-content">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-px w-6 bg-gold-500" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}>
                Enterprise Insights
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 max-w-xl"
                style={{ fontFamily: 'var(--font-sora)' }}>
              Thinking That Drives Better ERP Decisions
            </h2>
          </div>
          <Link
            href="/insights"
            className="flex items-center gap-2 text-sm font-semibold text-gold-600
                       hover:text-gold-500 transition-colors whitespace-nowrap group"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            All Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group card flex flex-col overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-navy-900 to-navy-800
                              group-hover:from-gold-500 group-hover:to-gold-400
                              transition-all duration-300" />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  {post.topic_cluster && (
                    <Badge variant="navy">{post.topic_cluster}</Badge>
                  )}
                  {post.read_time_minutes && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {post.read_time_minutes} min read
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-navy-900 mb-3 leading-snug flex-1
                               group-hover:text-navy-700 transition-colors"
                    style={{ fontFamily: 'var(--font-sora)' }}>
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto">
                  {post.published_at && (
                    <span className="text-xs text-slate-400">
                      {formatDateShort(post.published_at)}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gold-500
                                  group-hover:gap-2 transition-all"
                       style={{ fontFamily: 'var(--font-sora)' }}>
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  )
}
