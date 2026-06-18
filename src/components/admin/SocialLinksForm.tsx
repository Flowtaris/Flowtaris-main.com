'use client'

import { useState } from 'react'
import { SocialLink } from '@/types/database'
import { upsertSocialLink, deleteSocialLink } from '@/app/actions/social-actions'
import { Loader2, Plus, Trash2 } from 'lucide-react'

export function SocialLinksForm({ initialLinks }: { initialLinks: SocialLink[] }) {
  const [links, setLinks] = useState<SocialLink[]>(initialLinks)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  
  const [newPlatform, setNewPlatform] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newIconSvg, setNewIconSvg] = useState('')
  const [adding, setAdding] = useState(false)

  const handleUpdate = async (link: SocialLink, field: keyof SocialLink, value: any) => {
    const updated = { ...link, [field]: value }
    setLinks(links.map(l => l.id === link.id ? updated : l))
    
    setLoadingId(link.id)
    await upsertSocialLink(updated)
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this social link?')) return
    setLoadingId(id)
    await deleteSocialLink(id)
    setLinks(links.filter(l => l.id !== id))
    setLoadingId(null)
  }

  const handleAdd = async () => {
    if (!newPlatform || !newUrl) return
    setAdding(true)
    const newLink = { platform_name: newPlatform, url: newUrl, priority: 0, icon_svg: newIconSvg }
    // optimistic update skipped for simplicity, just reload or rely on action
    await upsertSocialLink(newLink)
    // to avoid complex state management with missing IDs, we just refresh the page data
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {links.sort((a, b) => b.priority - a.priority).map(link => (
          <div key={link.id} className="flex flex-col gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Platform Name</label>
                <input 
                  type="text" 
                  value={link.platform_name} 
                  onChange={(e) => handleUpdate(link, 'platform_name', e.target.value)}
                  className="w-full mt-1 bg-white border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-[2]">
                <label className="text-xs font-semibold text-slate-500 uppercase">URL</label>
                <input 
                  type="text" 
                  value={link.url} 
                  onChange={(e) => handleUpdate(link, 'url', e.target.value)}
                  className="w-full mt-1 bg-white border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-24">
                <label className="text-xs font-semibold text-slate-500 uppercase">Priority</label>
                <input 
                  type="number" 
                  value={link.priority} 
                  onChange={(e) => handleUpdate(link, 'priority', parseInt(e.target.value) || 0)}
                  className="w-full mt-1 bg-white border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end pb-1 pt-6">
                <button 
                  onClick={() => handleDelete(link.id)}
                  disabled={loadingId === link.id}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {loadingId === link.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="w-full">
              <label className="text-xs font-semibold text-slate-500 uppercase">Custom SVG Icon (Optional)</label>
              <textarea 
                value={link.icon_svg || ''} 
                onChange={(e) => handleUpdate(link, 'icon_svg', e.target.value)}
                placeholder="<svg>...</svg>"
                rows={3}
                className="w-full mt-1 bg-white border border-slate-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex flex-col gap-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="text-xs font-semibold text-slate-700 uppercase">New Platform Name</label>
            <input 
              type="text" 
              placeholder="e.g. LinkedIn"
              value={newPlatform} 
              onChange={(e) => setNewPlatform(e.target.value)}
              className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-[2]">
            <label className="text-xs font-semibold text-slate-700 uppercase">New URL</label>
            <input 
              type="text" 
              placeholder="https://..."
              value={newUrl} 
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleAdd}
            disabled={adding || !newPlatform || !newUrl}
            className="flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded hover:bg-navy-800 disabled:opacity-50 text-sm font-semibold transition-colors"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add Link
          </button>
        </div>
        
        <div className="w-full">
          <label className="text-xs font-semibold text-slate-700 uppercase">Custom SVG Icon (Optional)</label>
          <textarea 
            placeholder="<svg>...</svg>"
            value={newIconSvg} 
            onChange={(e) => setNewIconSvg(e.target.value)}
            rows={3}
            className="w-full mt-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}
