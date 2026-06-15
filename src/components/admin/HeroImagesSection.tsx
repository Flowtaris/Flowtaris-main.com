'use client'

import { useState } from 'react'
import { GlobalHeroImage } from '@/types/database'
import { addHeroImage, deleteHeroImage, updateHeroImage } from '@/app/actions/extra-actions'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Pencil, Check, X, Plus } from 'lucide-react'

export function HeroImagesSection({ heroId, initialImages }: { heroId: string, initialImages: GlobalHeroImage[] }) {
  const [images, setImages] = useState(initialImages)
  const [isPending, setIsPending] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  
  // New Item State
  const [newFile, setNewFile] = useState<File | null>(null)

  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFile, setEditFile] = useState<File | null>(null)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFile) return alert('Image is required.')

    setIsPending(true)
    try {
      const supabase = createClient()
      const fileExt = newFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `hero/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, newFile)
        
      if (uploadError) throw new Error(uploadError.message)
      
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
      
      const newData = {
        hero_id: heroId,
        image_url: publicUrl
      }

      await addHeroImage(newData)
      
      // Reset form
      setNewFile(null)
      setIsAdding(false)
      
      // For immediate local feedback, you might want to refresh the page or rely on revalidatePath
      // But revalidatePath works on next page load, so we'll just wait for the user to refresh or we can mutate local state.
      // Easiest is window.location.reload() or we just trust Server Actions for next load.
      window.location.reload()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return
    setIsPending(true)
    try {
      await deleteHeroImage(id)
      setImages(images.filter(img => img.id !== id))
    } catch (error: any) {
      alert(`Failed to delete: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  const startEdit = (img: GlobalHeroImage) => {
    setEditingId(img.id)
    setEditFile(null)
  }

  const handleUpdate = async (id: string, currentUrl: string) => {
    setIsPending(true)
    try {
      let image_url = currentUrl
      if (editFile) {
        const supabase = createClient()
        const fileExt = editFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `hero/${fileName}`
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, editFile)
        if (uploadError) throw new Error(uploadError.message)
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
        image_url = publicUrl
      }

      await updateHeroImage(id, {
        image_url
      })
      
      setImages(images.map(img => img.id === id ? { ...img, image_url } : img))
      setEditingId(null)
    } catch (error: any) {
      alert(`Failed to update: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-6">
      
      {!isAdding ? (
        <button 
          onClick={() => setIsAdding(true)} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Card
        </button>
      ) : (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative">
          <h3 className="font-semibold text-navy-900 mb-4">Add Hero Card</h3>
          <form onSubmit={handleAdd} className="max-w-md">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Image *</label>
                <input required type="file" accept="image/*" onChange={e => setNewFile(e.target.files?.[0] || null)} className="w-full text-sm rounded border-slate-300 px-3 py-1.5 bg-white" />
              </div>
              <div className="pt-4 flex items-center gap-3">
                <button type="submit" disabled={isPending} className="bg-navy-900 text-white px-4 py-2 rounded-md text-sm hover:bg-navy-800 transition-colors disabled:opacity-50">
                  {isPending ? 'Saving...' : 'Save Card'}
                </button>
                <button type="button" onClick={() => setIsAdding(false)} disabled={isPending} className="text-slate-500 hover:text-slate-700 text-sm font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {images.map(img => {
          if (editingId === img.id) {
            return (
              <div key={img.id} className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">New Image</label>
                  <input type="file" accept="image/*" onChange={e => setEditFile(e.target.files?.[0] || null)} className="w-full text-xs" />
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <button onClick={() => setEditingId(null)} disabled={isPending} className="p-2 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-50"><X className="w-4 h-4" /></button>
                  <button onClick={() => handleUpdate(img.id, img.image_url)} disabled={isPending} className="p-2 text-green-600 bg-green-100 hover:bg-green-200 rounded disabled:opacity-50"><Check className="w-4 h-4" /></button>
                </div>
              </div>
            )
          }

          return (
            <div key={img.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image_url} alt="Hero Card" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-500 truncate">{img.image_url}</p>
              </div>
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => startEdit(img)} disabled={isPending} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(img.id)} disabled={isPending} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )
        })}
        {images.length === 0 && !isAdding && (
          <div className="col-span-full py-8 text-center text-slate-500 text-sm border border-dashed border-slate-200 rounded-lg">
            No cards added yet.
          </div>
        )}
      </div>
    </div>
  )
}
