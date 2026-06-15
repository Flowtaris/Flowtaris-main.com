import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CaseStudyMetrics({
  metrics,
}: {
  metrics: Array<{ label: string; value: string; unit?: string }>
}) {
  if (!metrics || metrics.length === 0) return null

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="container-content py-10">
        <AnimatedSection
          className={`grid gap-8 ${
            metrics.length === 1 ? 'grid-cols-1 max-w-xs' : metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span
                className="text-3xl md:text-4xl font-bold text-navy-900"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                {m.value}
                {m.unit}
              </span>
              <span className="text-sm text-slate-500">{m.label}</span>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
