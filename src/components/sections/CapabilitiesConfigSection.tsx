import { CheckCircle } from 'lucide-react'
import { AnimatedSection, StaggeredGrid } from '@/components/ui/AnimatedSection'

interface CapabilitiesConfigSectionProps {
  config: {
    header: {
      eyebrow: string
      headline_1: string
      headline_2: string
      description: string
      disclaimer: string
    }
    capabilities: {
      title: string
      description: string
    }[]
  }
}

export function CapabilitiesConfigSection({ config }: CapabilitiesConfigSectionProps) {
  if (!config || !config.header || !config.capabilities) return null

  return (
    <section className="section bg-white border-t border-slate-100">
      <div className="container-content">
        <AnimatedSection className="mb-12 text-center max-w-3xl mx-auto flex flex-col items-center">
          {config.header.eyebrow && (
            <div className="flex items-center gap-2.5 mb-6">
              <div className="h-px w-6 bg-gold-500" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}>
                {config.header.eyebrow}
              </span>
              <div className="h-px w-6 bg-gold-500" />
            </div>
          )}
          
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight mb-6"
              style={{ fontFamily: 'var(--font-sora)' }}>
            <span className="block">{config.header.headline_1}</span>
            <span className="block text-slate-400">{config.header.headline_2}</span>
          </h2>
          
          {config.header.description && (
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {config.header.description}
            </p>
          )}

          {config.header.disclaimer && (
            <p className="text-xs text-slate-400 font-mono italic">
              {config.header.disclaimer}
            </p>
          )}
        </AnimatedSection>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.capabilities.map((capability, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl bg-surface border border-slate-100 shadow-sm
                         hover:shadow-lg hover:border-gold-200 hover:-translate-y-1 
                         transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-50/50 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center mb-6 
                              group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-gold-500" />
                </div>
                
                <h3 className="text-xl font-bold text-navy-900 mb-3"
                    style={{ fontFamily: 'var(--font-sora)' }}>
                  {capability.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  )
}
