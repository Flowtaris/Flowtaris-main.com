import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface CTASectionProps {
  title?: string
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  variant?: 'navy' | 'gold' | 'white'
}

export function CTASection({
  title = 'Ready to Optimize Your Enterprise Operations?',
  description = 'Schedule a consultation with a Flowtaris ERP specialist. We will assess your current environment, identify opportunities, and outline a clear path forward.',
  primaryCTA = { label: 'Book a Consultation', href: '/contact' },
  secondaryCTA = { label: 'Request a Proposal', href: '/contact?type=proposal' },
  variant = 'navy',
}: CTASectionProps) {
  if (variant === 'white') {
    return (
      <section className="section bg-white border-t border-slate-100">
        <div className="container-content text-center">
          <AnimatedSection>
            <h2 className="text-display-md text-navy-900 mb-4 max-w-2xl mx-auto">
              {title}
            </h2>
            <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={primaryCTA.href}>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<Calendar className="w-4 h-4" />}
                >
                  {primaryCTA.label}
                </Button>
              </Link>
              <Link href={secondaryCTA.href}>
                <Button variant="secondary" size="lg">
                  {secondaryCTA.label}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    )
  }

  return (
    <section className="section bg-grid-navy relative overflow-hidden">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="container-content">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <span className="section-label mb-6 justify-center">
            Start a Conversation
          </span>
          <h2 className="text-display-md text-white mb-5">
            {title}
          </h2>
          <p className="text-navy-200 text-lg mb-10 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCTA.href}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<Calendar className="w-4 h-4" />}
              >
                {primaryCTA.label}
              </Button>
            </Link>
            <Link href={secondaryCTA.href}>
              <Button
                variant="ghost-white"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {secondaryCTA.label}
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </section>
  )
}
