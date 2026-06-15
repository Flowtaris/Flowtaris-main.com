'use client'

import { useState, useTransition } from 'react'
import { upsertCaseStudyHero } from '@/app/actions/case-studies-actions'
import { CaseStudiesHero } from '@/types/database'
import { Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CaseStudyHeroEditor({
  caseStudyId,
  initialData,
}: {
  caseStudyId: string
  initialData: CaseStudiesHero | null
}) {
  const [heroTitle, setHeroTitle] = useState(initialData?.hero_title ?? '')
  const [heroDescription, setHeroDescription] = useState(initialData?.hero_description ?? '')
  const [imageUrl, setImageUrl] = useState(initialData?.image_url ?? '')

  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaved(false)
    startTransition(async () => {
      try {
        await upsertCaseStudyHero(caseStudyId, heroTitle, heroDescription, imageUrl)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Save failed')
      }
    })
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Title *</label>
        <input
          required
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
          placeholder="e.g. Scaling E-commerce Architecture"
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Description</label>
        <textarea
          rows={3}
          value={heroDescription}
          onChange={(e) => setHeroDescription(e.target.value)}
          placeholder="Detailed description of the hero section..."
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="/images/cs_hero_cover.png"
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {saved && <p className="text-xs text-green-600 font-medium">Saved successfully!</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 bg-navy-950 hover:bg-navy-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isPending ? 'Saving...' : 'Save Hero'}
        </button>
      </div>
    </form>
  )
}
