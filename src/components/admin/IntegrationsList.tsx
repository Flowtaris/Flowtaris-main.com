'use client'

import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { Integration } from '@/types/database'
import { deleteIntegration, updateIntegrationPriorities } from '@/app/actions/admin-actions'
import { Loader2, GripVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'

export function IntegrationsList({ initialIntegrations }: { initialIntegrations: Integration[] }) {
  const [items, setItems] = useState(initialIntegrations)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    setItems(initialIntegrations)
  }, [initialIntegrations])

  const handleReorder = async (newOrder: Integration[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateIntegrationPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this integration and all its content?')) return
    setDeletingId(id)
    try {
      await deleteIntegration(id)
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
        No integrations found. Add one above!
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
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">{item.name}</h3>
                <div className="flex gap-4 mt-1 text-xs text-slate-500">
                  <span className="font-mono text-slate-400">/{item.slug}</span>
                  <span>SVG 1: {item.svg_slot_1 ? 'Provided' : 'Empty'}</span>
                  <span>SVG 2: {item.svg_slot_2 ? 'Provided' : 'Empty'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link 
                  href={`/admin/integrations/${item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded font-medium transition-colors"
                >
                  Manage Content
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded font-medium transition-colors disabled:opacity-50"
                  title="Delete Integration"
                >
                  {deletingId === item.id ? <Loader2 className="w-3 h-3 animate-spin mx-auto" /> : 'Delete'}
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
