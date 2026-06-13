'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import { Loader2, Save } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SettingsEditor({ settings, userId }: { settings: any[]; userId: string }) {
  // Convert settings array { key, value } to an object map for the editor
  const initialMap: Record<string, string> = {}
  settings.forEach((s) => {
    initialMap[s.key] = typeof s.value === 'string' ? s.value : JSON.stringify(s.value)
  })

  const [formData, setFormData] = useState({
    contact_email:      initialMap['contact_email'] ?? 'hello@flowtaris.com',
    support_phone:      initialMap['support_phone'] ?? '+1 (800) 555-0199',
    office_address:     initialMap['office_address'] ?? 'San Francisco, CA',
    linkedin_url:       initialMap['linkedin_url'] ?? 'https://linkedin.com/company/flowtaris',
    twitter_url:        initialMap['twitter_url'] ?? '',
    default_og_image:   initialMap['default_og_image'] ?? '',
    site_description:   initialMap['site_description'] ?? 'Enterprise ERP Consulting',
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router    = useRouter()

  const handleSave = () => {
    startTransition(async () => {
      const supabase = createClient()
      
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
        updated_by: userId
      }))

      const { error } = await supabase.from('site_settings').upsert(updates, { onConflict: 'key' })

      if (error) {
        toast('error', 'Failed to save settings', error.message)
      } else {
        toast('success', 'Settings saved successfully')
        router.refresh()
      }
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Contact Email</label>
          <input
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label">Support Phone</label>
          <input
            type="text"
            value={formData.support_phone}
            onChange={(e) => setFormData({ ...formData, support_phone: e.target.value })}
            className="input"
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Office Address</label>
          <input
            type="text"
            value={formData.office_address}
            onChange={(e) => setFormData({ ...formData, office_address: e.target.value })}
            className="input"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin_url}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label">Twitter/X URL</label>
          <input
            type="url"
            value={formData.twitter_url}
            onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
            className="input"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 space-y-4">
        <div>
          <label className="label">Global Default OG Image URL</label>
          <input
            type="url"
            value={formData.default_og_image}
            onChange={(e) => setFormData({ ...formData, default_og_image: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label">Global Default Site Description</label>
          <textarea
            value={formData.site_description}
            onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
            rows={3}
            className="input resize-none"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg
                     bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                     transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>
    </div>
  )
}
