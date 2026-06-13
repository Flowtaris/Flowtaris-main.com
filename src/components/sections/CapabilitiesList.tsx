import { CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'

interface CapabilitiesListProps {
  label?: string
  title: string
  capabilities: string[]
  columns?: 2 | 3
}

export function CapabilitiesList({
  label = 'What We Deliver',
  title,
  capabilities,
  columns = 2,
}: CapabilitiesListProps) {
  return (
    <section className="section bg-white">
      <div className="container-content">
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-px w-6 bg-gold-500" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}>
              {label}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 max-w-2xl"
              style={{ fontFamily: 'var(--font-sora)' }}>
            {title}
          </h2>
        </AnimatedSection>

        <StaggeredGrid className={`grid grid-cols-1 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-3`}>
          {capabilities.map((capability) => (
            <div
              key={capability}
              className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-slate-100
                         hover:border-gold-200 hover:bg-gold-50/30 transition-colors duration-150"
            >
              <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 leading-snug">{capability}</span>
            </div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  )
}
