'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveResource } from '@/app/actions/admin-actions'
import { useToast } from '@/components/ui/Toast'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { Loader2, Save, Eye } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResourceEditor({ resource }: { resource: any }) {
  const [formData, setFormData] = useState({
    title:            resource?.title ?? '',
    slug:             resource?.slug ?? '',
    description:      resource?.description ?? '',
    resource_type:    resource?.resource_type ?? 'whitepaper',
    status:           resource?.status ?? 'draft',
    is_gated:         resource?.is_gated ?? true,
    file_url:         resource?.file_url ?? '',
    cover_image_url:  resource?.cover_image_url ?? '',
    meta_title:       resource?.meta_title ?? '',
    meta_description: resource?.meta_description ?? '',
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router    = useRouter()

  const generateSlug = (title: string) => {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData((prev) => ({ ...prev, slug: s }))
  }

  const handleSave = () => {
    startTransition(async () => {
      const payload = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      try {
        await saveResource(resource ? resource.id : null, payload)
        toast('success', 'Resource saved successfully')
        router.push('/admin/resources')
        router.refresh()
      } catch (error: any) {
        toast('error', 'Failed to save resource', error.message)
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-0 h-[calc(100vh-180px)]">
      <div className="flex-1 flex flex-col border-r border-slate-100 overflow-y-auto p-6 space-y-6">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onBlur={(e) => { if (!formData.slug && !resource) generateSlug(e.target.value) }}
            className="input text-lg font-semibold"
            placeholder="E.g. ERP Implementation Guide 2026"
          />
        </div>
        
        <div>
          <label className="label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
            className="input"
            placeholder="Describe the resource and what the user will learn..."
          />
        </div>

        <div>
          <label className="label">File URL (PDF/ZIP)</label>
          <input
            type="text"
            value={formData.file_url}
            onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
            className="input font-mono text-sm"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-50/50 p-6 overflow-y-auto space-y-6">
        <div>
          <label className="label">Resource Type</label>
          <select
            value={formData.resource_type}
            onChange={(e) => setFormData({ ...formData, resource_type: e.target.value })}
            className="input py-2"
          >
            <option value="whitepaper">Whitepaper</option>
            <option value="checklist">Checklist</option>
            <option value="guide">Guide</option>
            <option value="case_study_pdf">Case Study PDF</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="gated"
            checked={formData.is_gated}
            onChange={(e) => setFormData({ ...formData, is_gated: e.target.checked })}
            className="rounded border-slate-300 text-gold-500 focus:ring-gold-500"
          />
          <label htmlFor="gated" className="text-sm font-medium text-navy-900">Gated (Requires Form)</label>
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
              <ImageUpload
                label="Cover Image"
                value={formData.cover_image_url}
                onChange={(url) => setFormData({ ...formData, cover_image_url: url })}
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
            Save Resource
          </button>
          
          {resource && (
            <a
              href={`/resources/${resource.slug}`}
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
