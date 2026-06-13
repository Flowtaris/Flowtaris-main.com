'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { CheckCircle, Loader2, AlertCircle, Calendar, FileText, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  form_type:          z.enum(['consultation', 'proposal', 'inquiry']),
  name:               z.string().min(2, 'Name must be at least 2 characters'),
  company:            z.string().min(2, 'Company is required').optional().or(z.literal('')),
  work_email:         z.string().email('Please enter a valid work email'),
  platform:           z.string().optional(),
  service_needed:     z.string().optional(),
  project_timeline:   z.string().optional(),
  team_size:          z.string().optional(),
  business_challenge: z.string().optional(),
  current_challenge:  z.string().optional(),
  desired_outcome:    z.string().optional(),
  question:           z.string().optional(),
  preferred_contact:  z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const formTypes = [
  { value: 'consultation', label: 'Book a Consultation', icon: Calendar },
  { value: 'proposal',     label: 'Request a Proposal',  icon: FileText },
  { value: 'inquiry',      label: 'General Inquiry',     icon: MessageSquare },
] as const

const platformOptions = [
  { value: 'NetSuite',  label: 'NetSuite' },
  { value: 'Coupa',     label: 'Coupa' },
  { value: 'SAP',       label: 'SAP' },
  { value: 'Workday',   label: 'Workday' },
  { value: 'Ironclad',  label: 'Ironclad' },
  { value: 'Multiple',  label: 'Multiple Platforms' },
  { value: 'Other',     label: 'Other / Not Sure' },
]

const timelineOptions = [
  { value: 'ASAP',       label: 'As soon as possible' },
  { value: '1-3months',  label: 'Within 1–3 months' },
  { value: '3-6months',  label: 'Within 3–6 months' },
  { value: 'Exploring',  label: 'Just exploring' },
]

const teamSizeOptions = [
  { value: '1-50',     label: '1 - 50 employees' },
  { value: '51-200',   label: '51 - 200 employees' },
  { value: '201-1000', label: '201 - 1,000 employees' },
  { value: '1000+',    label: '1,000+ employees' },
]

const contactOptions = [
  { value: 'email', label: 'Email' },
  { value: 'call',  label: 'Phone call' },
  { value: 'video', label: 'Video call' },
]

export function ContactForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const captchaRef = useRef<HCaptcha>(null)
  const searchParams = useSearchParams()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver:      zodResolver(formSchema),
    defaultValues: { form_type: 'consultation' },
    mode:          'onBlur',
  })

  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam === 'proposal' || typeParam === 'inquiry' || typeParam === 'consultation') {
      setValue('form_type', typeParam)
    }
  }, [searchParams, setValue])

  const selectedType = watch('form_type')

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
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, hcaptcha_token: captchaToken }),
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
      <div className="flex flex-col items-center text-center py-12 px-6 rounded-2xl
                      bg-emerald-50 border border-emerald-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200
                        flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2
          className="text-xl font-bold text-navy-900 mb-3"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          Message Received
        </h2>
        <p className="text-slate-600 leading-relaxed max-w-sm">
          Thank you for reaching out. A Flowtaris consultant will respond to your inquiry
          within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

      {/* Form type selector */}
      <div>
        <p
          className="text-xs font-mono uppercase tracking-[0.14em] text-slate-400 mb-3"
          style={{ fontFamily: 'var(--font-jetbrains)' }}
        >
          How can we help?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {formTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.value
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue('form_type', type.value)}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center',
                  'transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'bg-navy-900 border-navy-700 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-navy-300 hover:bg-navy-50'
                )}
              >
                <Icon className={cn('w-4 h-4', isSelected ? 'text-gold-400' : 'text-slate-400')} />
                <span
                  className="text-xs font-medium leading-tight hidden sm:block"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {type.label}
                </span>
                <span
                  className="text-[10px] font-medium leading-tight sm:hidden"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {type.value === 'consultation' ? 'Consultation' : type.value === 'proposal' ? 'Proposal' : 'Inquiry'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Name + Company (Always present) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="label label-required">Full Name</label>
          <input
            id="contact-name"
            {...register('name')}
            placeholder="Jane Smith"
            className={cn('input', errors.name && 'input-error')}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-company" className={cn("label", selectedType === 'proposal' && "label-required")}>Company</label>
          <input
            id="contact-company"
            {...register('company')}
            placeholder="Acme Corp"
            className={cn('input', errors.company && 'input-error')}
          />
          {errors.company && <p className="error-message">{errors.company.message}</p>}
        </div>
      </div>

      {/* Email (Always present) */}
      <div>
        <label htmlFor="contact-email" className="label label-required">Work Email</label>
        <input
          id="contact-email"
          {...register('work_email')}
          type="email"
          placeholder="jane@company.com"
          className={cn('input', errors.work_email && 'input-error')}
        />
        {errors.work_email && <p className="error-message">{errors.work_email.message}</p>}
      </div>

      {/* INQUIRY ONLY */}
      {selectedType === 'inquiry' && (
        <div>
          <label htmlFor="contact-question" className="label label-required">Your Question</label>
          <textarea
            id="contact-question"
            {...register('question')}
            placeholder="How can we help you today?"
            rows={4}
            className="input resize-none leading-relaxed"
          />
        </div>
      )}

      {/* CONSULTATION OR PROPOSAL */}
      {(selectedType === 'consultation' || selectedType === 'proposal') && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-platform" className="label">Platform of Interest</label>
              <select id="contact-platform" {...register('platform')} className="input appearance-none cursor-pointer">
                <option value="">Select a platform</option>
                {platformOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-timeline" className="label">Project Timeline</label>
              <select id="contact-timeline" {...register('project_timeline')} className="input appearance-none cursor-pointer">
                <option value="">Select timeline</option>
                {timelineOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {/* PROPOSAL ONLY */}
      {selectedType === 'proposal' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-service" className="label">Service Needed</label>
              <input
                id="contact-service"
                {...register('service_needed')}
                placeholder="e.g. NetSuite implementation..."
                className="input"
              />
            </div>
            <div>
              <label htmlFor="contact-teamsize" className="label">Company Size</label>
              <select id="contact-teamsize" {...register('team_size')} className="input appearance-none cursor-pointer">
                <option value="">Select size</option>
                {teamSizeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-current-challenge" className="label">Current Challenge</label>
            <textarea
              id="contact-current-challenge"
              {...register('current_challenge')}
              placeholder="What problems are you facing right now?"
              rows={3}
              className="input resize-none leading-relaxed"
            />
          </div>

          <div>
            <label htmlFor="contact-desired-outcome" className="label">Desired Outcome</label>
            <textarea
              id="contact-desired-outcome"
              {...register('desired_outcome')}
              placeholder="What does success look like for this project?"
              rows={3}
              className="input resize-none leading-relaxed"
            />
          </div>
        </>
      )}

      {/* CONSULTATION ONLY */}
      {selectedType === 'consultation' && (
        <div>
          <label htmlFor="contact-challenge" className="label">Business Challenge</label>
          <textarea
            id="contact-challenge"
            {...register('business_challenge')}
            placeholder="Briefly describe your current challenges or what you are looking to achieve..."
            rows={4}
            className="input resize-none leading-relaxed"
          />
        </div>
      )}

      {/* PREFERRED CONTACT (CONSULTATION & PROPOSAL) */}
      {(selectedType === 'consultation' || selectedType === 'proposal') && (
        <div>
          <label htmlFor="contact-preferred" className="label">Preferred Contact Method</label>
          <select id="contact-preferred" {...register('preferred_contact')} className="input appearance-none cursor-pointer">
            <option value="">Select preference</option>
            {contactOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* hCaptcha */}
      {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY && (
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onVerify={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken(null)}
        />
      )}

      {/* Error message */}
      {status === 'error' && errorMessage && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl
                   bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                   transition-all duration-150 hover:scale-[1.01]
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                   shadow-[0_2px_8px_rgba(232,160,32,0.30)]"
        style={{ fontFamily: 'var(--font-sora)' }}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            {selectedType === 'consultation' && <><Calendar className="w-4 h-4" /> Book a Consultation</>}
            {selectedType === 'proposal'     && <><FileText className="w-4 h-4" /> Request a Proposal</>}
            {selectedType === 'inquiry'      && <><MessageSquare className="w-4 h-4" /> Send Inquiry</>}
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-400">
        By submitting this form you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</a>.
        We will never share your information.
      </p>
    </form>
  )
}
