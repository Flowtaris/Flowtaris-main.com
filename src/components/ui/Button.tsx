'use client'

import { forwardRef, cloneElement, isValidElement } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghost-white' | 'navy' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  /**
   * When true, merges button styles onto the single child element.
   * Useful for wrapping Next.js <Link> with button styling.
   */
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:       'btn-primary',
  secondary:     'btn-secondary',
  ghost:         'btn-ghost',
  'ghost-white': 'btn-ghost-white',
  navy:          'btn-navy',
  danger:        'btn bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'btn',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      className
    )

    // asChild: clone the single child element and merge button classes onto it
    if (asChild && isValidElement(children)) {
      return cloneElement(
        children as React.ReactElement<{ className?: string }>,
        {
          className: cn(classes, (children as React.ReactElement<{ className?: string }>).props.className),
        }
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
