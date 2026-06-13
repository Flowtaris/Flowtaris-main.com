'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import { MarkdownEditor } from './MarkdownEditor'
import { Loader2, Save, Eye } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CaseStudyEditor({ caseStudy }: { caseStudy: any }) {
  const [formData, setFormData] = useState({
    title:             caseStudy?.title ?? '',
    slug:              caseStudy?.slug ?? '',
    client_situation:  caseStudy?.client_situation ?? '',
    solution_approach: caseStudy?.solution_approach ?? '',
    outcome_summary:   caseStudy?.outcome_summary ?? '',
    status:            caseStudy?.status ?? 'draft',
    is_featured:       caseStudy?.is_featured ?? false,
    services:          caseStudy?.services ?? [],
    industries:        caseStudy?.industries ?? [],
    platforms:         caseStudy?.platforms ?? [],
    metrics:           caseStudy?.metrics ?? [], // array of {label, value}
    meta_title:        caseStudy?.meta_title ?? '',
    meta_description:  caseStudy?.meta_description ?? '',
    cover_image_url:   caseStudy?.cover_image_url ?? '',
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router    = useRouter()

  const handleSave = () => {
    startTransition(async () => {
      const supabase = createClient()
      
      const payload = {
        ...formData,
        published_at: formData.status === 'published' && (!caseStudy || caseStudy.status !== 'published') ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString()
      }

      let res
      if (caseStudy) {
        res = await supabase.from('case_studies').update(payload).eq('id', caseStudy.id)
      } else {
        res = await supabase.from('case_studies').insert(payload)
      }

      if (res.error) {
        toast('error', 'Failed to save case study', res.error.message)
      } else {
        toast('success', 'Case study saved successfully')
        router.push('/admin/case-studies')
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-0 h-[calc(100vh-180px)]">
      <div className="flex-1 flex flex-col border-r border-slate-100 overflow-y-auto p-6 space-y-6">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Client Name / Project Title"
          className="text-3xl font-display font-bold text-navy-900 border-none outline-none focus:ring-0 px-0 placeholder:text-slate-300 w-full"
        />
        
        <div>
          <label className="label">Client Situation (The Challenge)</label>
          <MarkdownEditor
            value={formData.client_situation}
            onChange={(v) => setFormData({ ...formData, client_situation: v })}
          />
        </div>

        <div>
          <label className="label">Solution & Approach</label>
          <MarkdownEditor
            value={formData.solution_approach}
            onChange={(v) => setFormData({ ...formData, solution_approach: v })}
          />
        </div>

        <div>
          <label className="label">Outcome Summary</label>
          <MarkdownEditor
            value={formData.outcome_summary}
            onChange={(v) => setFormData({ ...formData, outcome_summary: v })}
          />
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-50/50 p-6 overflow-y-auto space-y-6">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.is_featured}
            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            className="rounded border-slate-300 text-gold-500 focus:ring-gold-500"
          />
          <label htmlFor="featured" className="text-sm font-medium text-navy-900">Featured Case Study</label>
        </div>

        <div>
          <label className="label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="input py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label className="label">URL Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="input py-2 font-mono text-xs"
          />
        </div>

        {/* Arrays for tags could be full tag inputs, keeping simple text entry for now */}
        <div>
          <label className="label text-xs">Services (comma separated)</label>
          <input
            type="text"
            value={formData.services.join(', ')}
            onChange={(e) => setFormData({ ...formData, services: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })}
            className="input py-2 text-sm"
          />
        </div>
        <div>
          <label className="label text-xs">Industries (comma separated)</label>
          <input
            type="text"
            value={formData.industries.join(', ')}
            onChange={(e) => setFormData({ ...formData, industries: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })}
            className="input py-2 text-sm"
          />
        </div>
        <div>
          <label className="label text-xs">Platforms (comma separated)</label>
          <input
            type="text"
            value={formData.platforms.join(', ')}
            onChange={(e) => setFormData({ ...formData, platforms: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })}
            className="input py-2 text-sm"
          />
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-navy-900 mb-4" style={{ fontFamily: 'var(--font-sora)' }}>SEO & Media</h3>
          <div className="space-y-4">
            <div>
              <label className="label text-xs">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                className="input py-2 text-sm"
              />
            </div>
            <div>
              <label className="label text-xs">Cover Image URL</label>
              <input
                type="text"
                value={formData.cover_image_url}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                className="input py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 space-y-3">
          <button
            onClick={handleSave}
            disabled={isPending || !formData.title || !formData.slug}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                       bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                       transition-colors disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Case Study
          </button>
          
          {caseStudy && (
            <a
              href={`/case-studies/${caseStudy.slug}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                         bg-white border border-slate-200 text-slate-700 font-semibold text-sm
                         hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-4 h-4" /> Preview Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
