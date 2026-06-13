import { cn } from '@/lib/utils'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  label?: string
  title: string
  titleHighlight?: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  cta?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
  dark?: boolean
}

const sizeClasses = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
}

export function PageHero({
  label,
  title,
  titleHighlight,
  description,
  breadcrumbs,
  cta,
  size = 'md',
  align = 'left',
  dark = true,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        sizeClasses[size],
        dark ? 'bg-grid-navy relative overflow-hidden' : 'bg-surface'
      )}
    >
      {/* Decorative gradient orb — dark version only */}
      {dark && (
        <>
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #E8A020 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.2), transparent)' }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="container-content relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} dark={dark} />
          </div>
        )}

        <AnimatedSection className={cn(align === 'center' && 'text-center max-w-3xl mx-auto')}>
          {label && (
            <div className="flex items-center gap-2.5 mb-4 justify-start"
                 style={align === 'center' ? { justifyContent: 'center' } : {}}>
              <div className="h-px w-6 bg-gold-500 shrink-0" />
              <span
                className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                {label}
              </span>
            </div>
          )}

          <h1
            className={cn(
              'text-4xl md:text-5xl lg:text-display-lg font-bold leading-tight mb-5',
              dark ? 'text-white' : 'text-navy-900'
            )}
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            {title}
            {titleHighlight && (
              <>
                {' '}
                <span className="text-gradient-gold">{titleHighlight}</span>
              </>
            )}
          </h1>

          {description && (
            <p
              className={cn(
                'text-lg md:text-xl leading-relaxed max-w-2xl',
                dark ? 'text-navy-200' : 'text-slate-500',
                align === 'center' && 'mx-auto'
              )}
            >
              {description}
            </p>
          )}

          {cta && <div className="mt-8">{cta}</div>}
        </AnimatedSection>
      </div>
    </section>
  )
}
