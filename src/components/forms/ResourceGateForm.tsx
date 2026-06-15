'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Download, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  resourceId: string
  resourceSlug: string
}

export function ResourceGateForm({ resourceId }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'resource_gate',
          name: data.name,
          work_email: data.email,
          company: data.company,
          service_needed: `Resource download: ${resourceId}`,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      // In production, the API would return a signed URL from Supabase Storage
      setDownloadUrl('#')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6 space-y-4">
        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
        <p
          className="font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          Your download is ready
        </p>
        <p className="text-sm text-slate-500">
          Thank you for your interest. Check your email for the download link.
        </p>
        {downloadUrl && downloadUrl !== '#' && (
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                       bg-gold-500 text-white font-semibold text-sm
                       hover:bg-gold-400 transition-colors"
          >
            <Download className="w-4 h-4" /> Download Now
          </a>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-slate-500 mb-5">
        Enter your details below to access this resource.
      </p>
      <div>
        <label htmlFor="gate-name" className="label label-required">Full Name</label>
        <input
          id="gate-name"
          {...register('name')}
          className={cn('input', errors.name && 'input-error')}
          placeholder="Jane Smith"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="gate-email" className="label label-required">Work Email</label>
        <input
          id="gate-email"
          {...register('email')}
          type="email"
          className={cn('input', errors.email && 'input-error')}
          placeholder="Email Address"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="gate-company" className="label">Company</label>
        <input
          id="gate-company"
          {...register('company')}
          className="input"
          placeholder="Acme Corp"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                   bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                   transition-colors disabled:opacity-60"
        style={{ fontFamily: 'var(--font-sora)' }}
      >
        {status === 'loading'
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          : <><Download className="w-4 h-4" /> Get Access</>
        }
      </button>
    </form>
  )
}
