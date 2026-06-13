'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SeoEditor({ overrides, userId }: { overrides: any[]; userId: string }) {
  const [selectedSlug, setSelectedSlug] = useState<string>(overrides[0]?.page_slug ?? '')
  const [isCreating, setIsCreating]     = useState(false)
  const [newSlug, setNewSlug]           = useState('')
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(overrides[0] ?? null)

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router    = useRouter()

  const handleSelect = (slug: string) => {
    setIsCreating(false)
    setSelectedSlug(slug)
    setFormData(overrides.find(o => o.page_slug === slug) ?? null)
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setSelectedSlug('')
    setFormData({
      page_slug: '',
      meta_title: '',
      meta_description: '',
      canonical_url: '',
      no_index: false,
      og_title: '',
      og_description: '',
      og_image_url: '',
      structured_data: null
    })
  }

  const handleSave = () => {
    startTransition(async () => {
      const supabase = createClient()
      
      const payload = {
        ...formData,
        page_slug: isCreating ? newSlug : formData.page_slug,
        updated_at: new Date().toISOString(),
        updated_by: userId
      }

      let res
      if (isCreating) {
        res = await supabase.from('seo_overrides').insert(payload)
      } else {
        res = await supabase.from('seo_overrides').update(payload).eq('id', formData.id)
      }

      if (res.error) {
        toast('error', 'Failed to save SEO override', res.error.message)
      } else {
        toast('success', 'SEO override saved successfully')
        setIsCreating(false)
        router.refresh()
      }
    })
  }

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this override? The page will fall back to default SEO.')) return
    
    startTransition(async () => {
      const supabase = createClient()
      const res = await supabase.from('seo_overrides').delete().eq('id', formData.id)
      if (res.error) {
        toast('error', 'Failed to delete', res.error.message)
      } else {
        toast('success', 'Override deleted')
        setFormData(null)
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar list */}
      <div className="w-full md:w-64 border-r border-slate-100 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-navy-900">Routes</h3>
          <button onClick={handleCreateNew} className="text-gold-500 hover:text-gold-600">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {overrides.map((o) => (
            <button
              key={o.id}
              onClick={() => handleSelect(o.page_slug)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono truncate transition-colors ${
                !isCreating && selectedSlug === o.page_slug
                  ? 'bg-navy-900 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              /{o.page_slug}
            </button>
          ))}
          {overrides.length === 0 && !isCreating && (
            <p className="text-xs text-slate-400 p-2 text-center">No overrides yet.</p>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        {formData ? (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
                  {isCreating ? 'New Override' : `Editing /${formData.page_slug}`}
                </h2>
                <p className="text-sm text-slate-400">Leaves fields empty to use site defaults.</p>
              </div>
              {!isCreating && (
                <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {isCreating && (
              <div>
                <label className="label">Route Path (Slug)</label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-sm">flowtaris.com/</span>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="input font-mono text-sm flex-1"
                    placeholder="services/netsuite-consulting"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <label className="label">Meta Title</label>
                <input
                  type="text"
                  value={formData.meta_title ?? ''}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  className="input text-sm"
                  placeholder="Primary SEO title..."
                />
              </div>

              <div>
                <label className="label">Meta Description</label>
                <textarea
                  value={formData.meta_description ?? ''}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={3}
                  className="input text-sm resize-none"
                />
              </div>

              <div>
                <label className="label">Canonical URL Override</label>
                <input
                  type="text"
                  value={formData.canonical_url ?? ''}
                  onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                  className="input font-mono text-sm"
                  placeholder="https://flowtaris.com/..."
                />
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="noindex"
                  checked={formData.no_index}
                  onChange={(e) => setFormData({ ...formData, no_index: e.target.checked })}
                  className="rounded border-slate-300 text-red-500 focus:ring-red-500"
                />
                <label htmlFor="noindex" className="text-sm font-medium text-red-600">No Index (Hide from search engines)</label>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-semibold text-navy-900">Open Graph (Social) Overrides</h3>
              <div>
                <label className="label text-xs">OG Title</label>
                <input
                  type="text"
                  value={formData.og_title ?? ''}
                  onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">OG Description</label>
                <textarea
                  value={formData.og_description ?? ''}
                  onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                  rows={2}
                  className="input text-sm resize-none"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                disabled={isPending || (isCreating && !newSlug)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg
                           bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                           transition-colors disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Overrides
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            Select a route from the sidebar or create a new override.
          </div>
        )}
      </div>
    </div>
  )
}
