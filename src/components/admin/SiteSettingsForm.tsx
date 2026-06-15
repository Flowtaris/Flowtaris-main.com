'use client'

import { useState } from 'react'
import { upsertSiteSetting } from '@/app/actions/settings-actions'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { Loader2, CheckCircle } from 'lucide-react'

export function SiteSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [companyName, setCompanyName] = useState(initialSettings['company_name'] || 'Flowtaris')
  const [logoUrl, setLogoUrl] = useState(initialSettings['logo_url'] || '/images/logo.png')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = async () => {
    setLoading(true)
    setStatus('idle')

    const res1 = await upsertSiteSetting('company_name', companyName)
    const res2 = await upsertSiteSetting('logo_url', logoUrl)

    if (res1.success && res2.success) {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
        <p className="text-xs text-slate-500 mb-2">The global company name displayed in the header and footer.</p>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <ImageUpload
          label="Site Logo"
          value={logoUrl}
          onChange={setLogoUrl}
        />
        <p className="text-xs text-slate-500 mt-2">Upload a transparent PNG or SVG for best results.</p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Settings
        </button>
        {status === 'success' && (
          <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <CheckCircle className="h-4 w-4" /> Saved Successfully!
          </span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-600 font-medium">
            Error saving settings.
          </span>
        )}
      </div>
    </div>
  )
}
