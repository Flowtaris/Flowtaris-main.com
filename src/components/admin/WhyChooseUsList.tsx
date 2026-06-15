'use client'

import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { WhyChooseUsCard, WhyChooseUsSector } from '@/types/database'
import { updateWhyChooseUsPriorities, deleteWhyChooseUs } from '@/app/actions/extra-actions'
import { Loader2, GripVertical, Trash2 } from 'lucide-react'

export function WhyChooseUsList({ initialCards, sectors }: { initialCards: WhyChooseUsCard[], sectors: WhyChooseUsSector[] }) {
  const [items, setItems] = useState(initialCards)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    setItems(initialCards)
  }, [initialCards])

  const handleReorder = async (newOrder: WhyChooseUsCard[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateWhyChooseUsPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return
    setDeletingId(id)
    try {
      await deleteWhyChooseUs(id)
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
        No cards found. Add one above!
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
            <div className="group relative bg-white border border-slate-100 rounded-xl p-4 flex items-center hover:border-slate-200 hover:shadow-md transition-all duration-200 gap-4">
              <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-1 shrink-0">
                <GripVertical className="w-5 h-5" />
              </div>
              
              {item.image_url && (
                <div className="w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt="Card Image" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">
                  {item.sector_id ? <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs mr-2 font-medium">{sectors.find(s => s.id === item.sector_id)?.name || 'Unknown Sector'}</span> : null}
                  {item.description}
                </h3>
                <p className="text-xs text-slate-500 truncate">{item.small_description}</p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors shrink-0"
                title="Delete Card"
              >
                {deletingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
