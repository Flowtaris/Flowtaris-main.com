import { cn } from '@/lib/utils'

type BadgeVariant = 'navy' | 'gold' | 'green' | 'slate' | 'red' | 'blue'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  navy:  'badge-navy',
  gold:  'badge-gold',
  green: 'badge-green',
  slate: 'badge-slate',
  red:   'badge bg-red-50 text-red-700 border-red-200',
  blue:  'badge bg-blue-50 text-blue-700 border-blue-200',
}

export function Badge({ variant = 'slate', children, className, dot }: BadgeProps) {
  return (
    <span className={cn(variantClasses[variant], className)}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            variant === 'green' && 'bg-emerald-500',
            variant === 'gold' && 'bg-gold-500',
            variant === 'navy' && 'bg-navy-500',
            variant === 'red' && 'bg-red-500',
            variant === 'slate' && 'bg-slate-400',
            variant === 'blue' && 'bg-blue-500',
          )}
        />
      )}
      {children}
    </span>
  )
}
