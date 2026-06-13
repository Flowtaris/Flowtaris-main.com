'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import { Loader2, Save } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FaqEditor({ faq }: { faq: any }) {
  const [formData, setFormData] = useState({
    page_slug:         faq?.page_slug ?? 'home',
    question:          faq?.question ?? '',
    answer:            faq?.answer ?? '',
    display_order:     faq?.display_order ?? 0,
    is_published:      faq?.is_published ?? true,
    include_in_schema: faq?.include_in_schema ?? true,
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router    = useRouter()

  const handleSave = () => {
    startTransition(async () => {
      const supabase = createClient()
      
      const payload = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      let res
      if (faq) {
        res = await supabase.from('faqs').update(payload).eq('id', faq.id)
      } else {
        res = await supabase.from('faqs').insert(payload)
      }

      if (res.error) {
        toast('error', 'Failed to save FAQ', res.error.message)
      } else {
        toast('success', 'FAQ saved successfully')
        router.push('/admin/faqs')
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="label">Page Slug</label>
        <p className="text-xs text-slate-400 mb-2">Which page should this FAQ appear on? (e.g. &quot;home&quot;, &quot;services/netsuite-consulting&quot;)</p>
        <input
          type="text"
          value={formData.page_slug}
          onChange={(e) => setFormData({ ...formData, page_slug: e.target.value })}
          className="input font-mono text-sm"
          placeholder="home"
        />
      </div>
      
      <div>
        <label className="label">Question</label>
        <input
          type="text"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="input font-semibold"
          placeholder="E.g. How long does a NetSuite implementation take?"
        />
      </div>

      <div>
        <label className="label">Answer (Supports Markdown)</label>
        <textarea
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          rows={6}
          className="input font-mono text-sm"
          placeholder="Write the answer here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div>
          <label className="label">Display Order</label>
          <input
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
            className="input"
          />
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="rounded border-slate-300 text-gold-500 focus:ring-gold-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-navy-900">Published</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="schema"
              checked={formData.include_in_schema}
              onChange={(e) => setFormData({ ...formData, include_in_schema: e.target.checked })}
              className="rounded border-slate-300 text-gold-500 focus:ring-gold-500"
            />
            <label htmlFor="schema" className="text-sm font-medium text-navy-900">Include in FAQ Schema (AEO)</label>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={handleSave}
          disabled={isPending || !formData.question || !formData.answer || !formData.page_slug}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg
                     bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                     transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save FAQ
        </button>
      </div>
    </div>
  )
}
