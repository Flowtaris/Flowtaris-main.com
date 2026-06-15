'use client'

import { useState } from 'react'
import { upsertServicesHero } from '@/app/actions/services-actions'
import { ServicesHero } from '@/types/database'

interface Props {
  serviceId: string
  initialData: ServicesHero | null
}

export function ServicesHeroEditor({ serviceId, initialData }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [heroDesc, setHeroDesc] = useState(initialData?.hero_description ?? '')
  const [normalDesc, setNormalDesc] = useState(initialData?.normal_description ?? '')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    try {
      await upsertServicesHero(serviceId, initialData?.id ?? null, {
        hero_description: heroDesc,
        normal_description: normalDesc || null,
      })
      setMessage('Saved successfully!')
    } catch (err: unknown) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Hero Description <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-2">The large headline text displayed in the hero section.</p>
        <textarea
          required
          rows={3}
          value={heroDesc}
          onChange={(e) => setHeroDesc(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="e.g. Enterprise ERP Solutions Built for Scale..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Normal Description
        </label>
        <p className="text-xs text-slate-400 mb-2">The supporting paragraph text below the hero headline.</p>
        <textarea
          rows={4}
          value={normalDesc}
          onChange={(e) => setNormalDesc(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="e.g. We architect and deploy mission-critical ERP systems..."
        />
      </div>

      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Hero' : 'Create Hero'}
        </button>
        {message && (
          <span className={`text-sm font-medium ${message.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
