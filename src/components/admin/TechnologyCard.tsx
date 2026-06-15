'use client'

import { deleteTechnology, updateTechnology } from '@/app/actions/extra-actions'
import { ModernTechnology } from '@/types/database'
import { Trash2, GripVertical, Pencil, X, Check } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function TechnologyCard({ tech }: { tech: ModernTechnology }) {
  const [isPending, setIsPending] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(tech.name || '')
  const [editFile, setEditFile] = useState<File | null>(null)

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

  const handleSave = async () => {
    setIsPending(true)
    try {
      let logo_url = tech.logo_url
      
      if (editFile) {
        const supabase = createClient()
        const fileExt = editFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `technologies/${fileName}`
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, editFile)
          
        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)
        
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
        logo_url = publicUrl
      }

      await updateTechnology(tech.id, { name: editName, logo_url })
      setIsEditing(false)
    } catch (error: any) {
      console.error(error)
      alert(`Failed to update: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  if (isEditing) {
    return (
      <div className="p-3 border border-blue-200 bg-blue-50/50 rounded-lg flex items-center shadow-sm gap-4">
        <div className="flex-1 space-y-3 pl-2">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
            <input 
              type="text" 
              value={editName} 
              onChange={e => setEditName(e.target.value)} 
              className="w-full text-sm rounded border-slate-300 px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">New Logo (Optional)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setEditFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={handleSave} disabled={isPending} className="p-2 text-green-600 hover:bg-green-100 rounded disabled:opacity-50 transition-colors" title="Save">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => setIsEditing(false)} disabled={isPending} className="p-2 text-slate-400 hover:bg-slate-200 rounded disabled:opacity-50 transition-colors" title="Cancel">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
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
        {tech.name ? (
          <p className="text-sm font-semibold text-navy-900 truncate" title={tech.name}>{tech.name}</p>
        ) : (
          <p className="text-sm font-semibold text-slate-400 italic">Unnamed Technology</p>
        )}
        <p className="text-xs text-slate-400 truncate mt-0.5" title={tech.logo_url}>{tech.logo_url}</p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50 transition-colors"
          title="Edit Technology"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
          title="Delete Technology"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
