import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

export function CaseStudySidebar({
  platforms,
  services,
  industries,
}: {
  platforms: string[]
  services: string[]
  industries: string[]
}) {
  return (
    <div className="space-y-6">
      <AnimatedSection>
        {/* Platforms */}
        {platforms.length > 0 && (
          <div className="card p-5">
            <h3
              className="text-xs font-mono uppercase tracking-[0.14em] text-slate-400 mb-3"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-navy-50 text-navy-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {services.length > 0 && (
          <div className="card p-5 mt-4">
            <h3
              className="text-xs font-mono uppercase tracking-[0.14em] text-slate-400 mb-3"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              Services Delivered
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                  <TrendingUp className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Industries */}
        {industries.length > 0 && (
          <div className="card p-5 mt-4">
            <h3
              className="text-xs font-mono uppercase tracking-[0.14em] text-slate-400 mb-3"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              Industry
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {industries.map((i) => (
                <Badge key={i} variant="gold">{i}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="card p-5 mt-4 bg-navy-950 border-navy-800">
          <h3
            className="text-sm font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Facing a similar challenge?
          </h3>
          <p className="text-navy-300 text-xs mb-4 leading-relaxed">
            Talk to a Flowtaris specialist and get a clear path forward for your enterprise.
          </p>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
          >
            Book a consultation <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
