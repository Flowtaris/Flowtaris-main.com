'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { adminSignIn } from '@/app/actions/auth-actions'
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

type LoginFormValues = z.infer<typeof loginSchema>

export function AdminLoginForm() {
  const [showPwd, setShowPwd] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    setServerError('')

    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)

      const res = await adminSignIn(formData)
      if (res?.error) {
        setServerError(res.error)
      } else if (res?.success) {
        window.location.assign('/admin') // Use window.location.assign for a full reload to ensure server components fetch the new session cookie properly
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.warn('Login failed:', errorMessage)
      setServerError('A server error occurred. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy-200 mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="admin@flowtaris.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-navy-800 border text-white text-sm placeholder:text-navy-500 transition-all duration-150 focus:outline-none focus:ring-2",
              errors.email 
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                : "border-navy-600 focus:border-gold-500 focus:ring-gold-500/20",
              isSubmitting && "opacity-60 cursor-not-allowed"
            )}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-navy-200 mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPwd ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder=""
            disabled={isSubmitting}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={cn(
              "w-full px-4 py-3 pr-11 rounded-lg bg-navy-800 border text-white text-sm placeholder:text-navy-500 transition-all duration-150 focus:outline-none focus:ring-2",
              errors.password 
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                : "border-navy-600 focus:border-gold-500 focus:ring-gold-500/20",
              isSubmitting && "opacity-60 cursor-not-allowed"
            )}
            {...register('password')}
          />
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
            aria-pressed={showPwd}
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.password.message}
          </p>
        )}
      </div>

      {serverError && (
        <div 
          role="alert" 
          className="flex items-start gap-2.5 p-3 rounded-lg bg-red-900/20 border border-red-800/40 text-sm text-red-400 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg
                   bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-900 focus:ring-gold-500
                   disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-sora)' }}
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> 
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>
    </form>
  )
}
