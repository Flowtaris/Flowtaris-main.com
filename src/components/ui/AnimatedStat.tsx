'use client'

import { useCountUp } from '@/hooks/useCountUp'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

interface AnimatedStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  dark?: boolean
  className?: string
}

export function AnimatedStat({
  value,
  suffix = '',
  prefix = '',
  label,
  dark = false,
  className,
}: AnimatedStatProps) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 })
  const count = useCountUp(value, 1500, isVisible)

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div
        className={cn(
          'text-4xl lg:text-5xl font-display font-bold tracking-tight',
          dark ? 'text-white' : 'text-navy-900'
        )}
      >
        {prefix}
        <span>{count}</span>
        {suffix && (
          <span
            className={cn(
              'text-2xl ml-1',
              dark ? 'text-gold-400' : 'text-gold-500'
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      <div
        className={cn(
          'text-sm mt-2 font-medium',
          dark ? 'text-navy-200' : 'text-slate-500'
        )}
      >
        {label}
      </div>
    </div>
  )
}
