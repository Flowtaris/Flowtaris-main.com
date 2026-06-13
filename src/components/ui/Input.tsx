import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/* ════════════════════════════════════════════════════════
   INPUT
   ════════════════════════════════════════════════════════ */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn('label', required && 'label-required')}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn('input', error && 'input-error', className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-400">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/* ════════════════════════════════════════════════════════
   TEXTAREA
   ════════════════════════════════════════════════════════ */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).slice(2)}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn('label', required && 'label-required')}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'input min-h-[120px] resize-y leading-relaxed',
            error && 'input-error',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
        )}
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

/* ════════════════════════════════════════════════════════
   SELECT
   ════════════════════════════════════════════════════════ */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id || `select-${Math.random().toString(36).slice(2)}`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn('label', required && 'label-required')}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'input appearance-none cursor-pointer',
            error && 'input-error',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
