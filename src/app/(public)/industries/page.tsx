import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { StaggeredGrid } from '@/components/ui/AnimatedSection'
import { INDUSTRIES } from '@/lib/constants/industries'

export const metadata: Metadata = {
  title: 'Industries We Serve | Flowtaris ERP Consulting',
  description: 'Flowtaris delivers enterprise ERP consulting across technology, healthcare, manufacturing, financial services and professional services organizations.',
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries"
        title="Enterprise ERP Expertise Across"
        titleHighlight="Every Industry We Serve."
        description="Specialized ERP and integration consulting for technology, healthcare, manufacturing, financial services and professional services organizations."
        breadcrumbs={[{ label: 'Industries' }]}
      />

      <section className="section bg-white">
        <div className="container-content">
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group card p-6 flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="h-px w-4 bg-gold-500" />
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.14em] text-gold-500"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    {industry.label}
                  </span>
                </div>
                <h2
                  className="text-base font-bold text-navy-900 mb-3 group-hover:text-navy-700
                             transition-colors leading-snug"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {industry.name}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {industry.platforms.slice(0, 3).map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-mono text-navy-500 bg-navy-50 border border-navy-100 px-2 py-0.5 rounded"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div
                  className="flex items-center gap-1.5 text-sm font-semibold text-gold-500
                             group-hover:gap-2.5 transition-all duration-200"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </StaggeredGrid>
        </div>
      </section>

      <CTASection />
    </>
  )
}
