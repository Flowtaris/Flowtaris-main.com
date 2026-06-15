'use client'

import { deleteTechnology } from '@/app/actions/extra-actions'
import { ModernTechnology } from '@/types/database'
import { Trash2, GripVertical } from 'lucide-react'
import { useState } from 'react'

export function TechnologyCard({ tech }: { tech: ModernTechnology }) {
  const [isPending, setIsPending] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this technology?')) return
    setIsPending(true)
    try {
      await deleteTechnology(tech.id)
    } catch (error) {
      console.error(error)
      alert('Failed to delete')
      setIsPending(false)
    }
  }

  return (
    <div className="p-3 border border-slate-200 rounded-lg flex items-center bg-white shadow-sm hover:shadow-md transition-shadow group">
      <div className="cursor-grab active:cursor-grabbing p-2 text-slate-400 hover:text-slate-600">
        <GripVertical className="w-5 h-5" />
      </div>

      <div className="w-12 h-12 rounded flex items-center justify-center p-1 bg-slate-50 overflow-hidden shrink-0 mx-4 border border-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tech.logo_url} alt="Tech Logo" className="w-full h-full object-contain" />
      </div>

      <div className="flex-1 truncate mr-4">
        <p className="text-sm text-slate-500 truncate" title={tech.logo_url}>{tech.logo_url}</p>
      </div>

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
        title="Delete Technology"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
