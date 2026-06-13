import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'

interface Step {
  number: string
  title: string
  description: string
}

interface MethodologyStepsProps {
  label?: string
  title: string
  steps: Step[]
}

export function MethodologySteps({
  label = 'Our Approach',
  title,
  steps,
}: MethodologyStepsProps) {
  return (
    <section className="section bg-navy-950 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(232,160,32,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="container-content relative">
        <AnimatedSection className="mb-14">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-px w-6 bg-gold-500" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}>
              {label}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white max-w-2xl"
              style={{ fontFamily: 'var(--font-sora)' }}>
            {title}
          </h2>
        </AnimatedSection>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line - hidden on last */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-5 left-[3.5rem] right-0 h-px
                             bg-gradient-to-r from-gold-500/30 to-transparent z-0"
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-navy-800 border border-gold-500/40
                                flex items-center justify-center mb-4 shrink-0">
                  <span className="text-sm font-bold text-gold-500"
                        style={{ fontFamily: 'var(--font-mono)' }}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-sora)' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-navy-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  )
}
