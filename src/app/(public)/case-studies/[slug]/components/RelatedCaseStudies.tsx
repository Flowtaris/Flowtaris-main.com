import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

export function RelatedCaseStudies({
  displayMore,
}: {
  displayMore: Array<{
    slug: string
    title: string
    platforms: string[] | unknown
    metrics: unknown
  }>
}) {
  if (!displayMore || displayMore.length === 0) return null

  return (
    <section className="section bg-white border-t border-slate-100">
      <div className="container-content">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            More Case Studies
          </h2>
          <Link
            href="/case-studies"
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-colors group uppercase tracking-widest"
          >
            All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayMore.map((c) => {
            const m = Array.isArray(c.metrics) && c.metrics.length > 0
              ? (c.metrics[0] as { label?: string; value?: string; unit?: string })
              : null
            return (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group flex flex-col overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div className="p-8 flex flex-col flex-1">
                  {Array.isArray(c.platforms) && (c.platforms as string[]).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(c.platforms as string[]).slice(0, 3).map((p) => (
                        <span key={p} className="text-xs font-bold px-3 py-1.5 rounded-md bg-gray-100 text-gray-700">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3
                    className="text-xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-black transition-colors flex-1"
                  >
                    {c.title}
                  </h3>
                  {m?.value && m?.label && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFAFA] border border-gray-100 mb-6">
                      <CheckCircle className="w-5 h-5 text-black shrink-0" />
                      <div>
                        <span className="text-base font-bold text-gray-900">
                          {m.value}
                          {m.unit}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">{m.label}</span>
                      </div>
                    </div>
                  )}
                  <div
                    className="flex items-center gap-2 text-sm font-bold text-black group-hover:gap-3 transition-all mt-auto uppercase tracking-wide"
                  >
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
