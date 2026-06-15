'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { CheckCircle, Loader2, AlertCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional().or(z.literal('')),
  work_email: z.string().email('Please enter a valid email'),
  phone: z.string().optional().or(z.literal('')),
  question: z.string().min(10, 'Please provide a bit more context'),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const captchaRef = useRef<HCaptcha>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: FormData) => {
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY
    if (siteKey && !captchaToken) {
      setErrorMessage('Please complete the CAPTCHA.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, form_type: 'inquiry', hcaptcha_token: captchaToken || undefined }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error ?? 'Submission failed. Please try again.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-20 px-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#0A1628] mb-3" style={{ fontFamily: 'var(--font-sora)' }}>
          Inquiry Received
        </h2>
        <p className="text-slate-500 leading-relaxed max-w-sm mb-8">
          Thank you for reaching out. A Flowtaris consultant will review your request and contact you within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setCaptchaToken(null)
            captchaRef.current?.resetCaptcha()
            reset()
          }}
          className="px-6 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0A1628] font-semibold text-sm transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 md:p-14 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 relative">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-[#0A1628] tracking-tight mb-3" style={{ fontFamily: 'var(--font-sora)' }}>
          Start a <span className="font-semibold">Conversation.</span>
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          Connect with our implementation specialists to discuss your architecture, migration, or integration requirements.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">Full Name <span className="text-red-500">*</span></label>
            <input
              id="contact-name"
              {...register('name')}
              placeholder="Name"
              className={cn(
                "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-[#0A1628] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1628] focus:border-transparent transition-all",
                errors.name && "border-red-300 focus:ring-red-500"
              )}
            />
            {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">Work Email <span className="text-red-500">*</span></label>
            <input
              id="contact-email"
              {...register('work_email')}
              type="email"
              placeholder="Email Address"
              className={cn(
                "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-[#0A1628] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1628] focus:border-transparent transition-all",
                errors.work_email && "border-red-300 focus:ring-red-500"
              )}
            />
            {errors.work_email && <p className="text-xs text-red-500 pl-1">{errors.work_email.message}</p>}
          </div>
        </div>

        {/* Company & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-company" className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">Company Name</label>
            <input
              id="contact-company"
              {...register('company')}
              placeholder="Enterprise Corp"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-[#0A1628] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1628] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-phone" className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">Phone Number</label>
            <input
              id="contact-phone"
              {...register('phone')}
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-[#0A1628] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1628] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Message Row */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-question" className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">Project Details <span className="text-red-500">*</span></label>
          <textarea
            id="contact-question"
            {...register('question')}
            placeholder="Briefly describe your requirements, challenges, or the systems involved..."
            rows={4}
            className={cn(
              "w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-[#0A1628] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1628] focus:border-transparent transition-all resize-none",
              errors.question && "border-red-300 focus:ring-red-500"
            )}
          />
          {errors.question && <p className="text-xs text-red-500 pl-1">{errors.question.message}</p>}
        </div>

        {/* hCaptcha */}
        {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY && (
          <div className="flex justify-start">
            <HCaptcha
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
            />
          </div>
        )}

        {/* Error message */}
        {status === 'error' && errorMessage && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full mt-4 py-4 rounded-lg bg-[#0A1628] hover:bg-[#E8A020] text-white font-bold text-sm uppercase tracking-wider
                     transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Submit Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-400 mt-4">
          By submitting, you agree to our <a href="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</a>.
        </p>
      </form>
    </div>
  )
}
