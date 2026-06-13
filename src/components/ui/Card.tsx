import { cn } from '@/lib/utils'

/* ════════════════════════════════════════════════════════
   CARD — Base card component
   ════════════════════════════════════════════════════════ */

interface CardProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
  flat?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({
  children,
  className,
  dark = false,
  flat = false,
  padding = 'md',
  onClick,
}: CardProps) {
  const base = dark ? 'card-dark' : flat ? 'card-flat' : 'card'

  return (
    <div
      className={cn(base, paddingClasses[padding], onClick && 'cursor-pointer', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   STAT CARD — For displaying metrics
   ════════════════════════════════════════════════════════ */

interface StatCardProps {
  value: string
  label: string
  unit?: string
  dark?: boolean
  className?: string
}

export function StatCard({ value, label, unit, dark = false, className }: StatCardProps) {
  return (
    <div className={cn(dark ? 'card-dark p-6' : 'card p-6', className)}>
      <div
        className={cn(
          'text-3xl font-display font-bold',
          dark ? 'text-white' : 'text-navy-900'
        )}
      >
        {value}
        {unit && (
          <span className={cn('text-lg ml-1', dark ? 'text-gold-400' : 'text-gold-500')}>
            {unit}
          </span>
        )}
      </div>
      <div className={cn('text-sm mt-1', dark ? 'text-navy-200' : 'text-slate-500')}>
        {label}
      </div>
    </div>
  )
}
