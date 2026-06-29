'use client'

import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { Testimonial } from '@/types/database'
import { updateTestimonialPriorities, deleteTestimonial, updateTestimonial } from '@/app/actions/testimonial-actions'
import { Loader2, GripVertical, Trash2, Pencil, Check, X, Star } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'

function TestimonialRow({ item, onDeleted }: { item: Testimonial, onDeleted: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [clientName, setClientName] = useState(item.client_name)
  const [clientRole, setClientRole] = useState(item.client_role || '')
  const [clientCompany, setClientCompany] = useState(item.client_company || '')
  const [content, setContent] = useState(item.content)
  const [rating, setRating] = useState(item.rating || 5)
  const [imageUrl, setImageUrl] = useState(item.image_url || '')
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    try {
      await updateTestimonial(item.id, {
        client_name: clientName,
        client_role: clientRole || null,
        client_company: clientCompany || null,
        content: content,
        rating: rating,
        image_url: imageUrl || null,
      })
      setIsEditing(false)
    } catch (e: unknown) {
      const err = e as Error;
      alert(`Failed to update: ${err.message}`)
    } finally {
      setIsPending(false)
    }
  }

  if (isEditing) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-xl shadow-sm space-y-4 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Client Name</label>
            <input 
              type="text" 
              value={clientName} 
              onChange={e => setClientName(e.target.value)} 
              className="w-full text-sm rounded border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Rating</label>
            <input 
              type="number" 
              min="1" max="5"
              value={rating} 
              onChange={e => setRating(parseInt(e.target.value) || 5)} 
              className="w-full text-sm rounded border-slate-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Client Role</label>
            <input 
              type="text" 
              value={clientRole} 
              onChange={e => setClientRole(e.target.value)} 
              className="w-full text-sm rounded border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Company</label>
            <input 
              type="text" 
              value={clientCompany} 
              onChange={e => setClientCompany(e.target.value)} 
              className="w-full text-sm rounded border-slate-300 px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Content</label>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            rows={3}
            className="w-full text-sm rounded border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <ImageUpload
            label="Client Photo / Company Logo"
            value={imageUrl}
            onChange={setImageUrl}
          />
        </div>

        <div className="flex gap-2 pt-2 border-t border-blue-100">
          <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded text-sm disabled:opacity-50 transition-colors">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
          </button>
          <button onClick={() => setIsEditing(false)} disabled={isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded text-sm disabled:opacity-50 transition-colors">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white border border-slate-100 rounded-xl p-4 flex items-center hover:border-slate-200 hover:shadow-md transition-all duration-200 gap-4">
      <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-1 shrink-0">
        <GripVertical className="w-5 h-5" />
      </div>
      
      {item.image_url && (
        <div className="w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
          <img src={item.image_url} alt="Client Image" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">
          {item.client_name} {item.client_company ? <span className="text-slate-400 font-normal">@ {item.client_company}</span> : null}
        </h3>
        <p className="text-xs text-slate-500 truncate">{item.content}</p>
        <div className="flex items-center mt-1">
           {Array.from({length: item.rating || 5}).map((_, i) => (
             <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
           ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors shrink-0"
          title="Edit Testimonial"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDeleted(item.id)}
          disabled={isPending}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors shrink-0"
          title="Delete Testimonial"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export function TestimonialList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [items, setItems] = useState(initialTestimonials)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(initialTestimonials)
  }, [initialTestimonials])

  const handleReorder = async (newOrder: Testimonial[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateTestimonialPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    setDeletingId(id)
    try {
      await deleteTestimonial(id)
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500 text-sm border border-dashed border-slate-200 rounded-lg">
        No testimonials found. Add one above!
      </div>
    )
  }

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute top-0 right-0 -mt-8 flex items-center text-sm text-navy-500">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving order...
        </div>
      )}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item} className="relative z-0">
            <TestimonialRow item={item} onDeleted={handleDelete} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
