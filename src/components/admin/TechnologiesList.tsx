'use client'

import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { ModernTechnology } from '@/types/database'
import { TechnologyCard } from './TechnologyCard'
import { updateTechnologyPriorities } from '@/app/actions/extra-actions'
import { Loader2 } from 'lucide-react'

export function TechnologiesList({ initialTechnologies }: { initialTechnologies: ModernTechnology[] }) {
  const [items, setItems] = useState(initialTechnologies)
  const [isSaving, setIsSaving] = useState(false)

  const handleReorder = async (newOrder: ModernTechnology[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    // Calculate new priorities: highest index = lowest priority, or vice versa
    // We sort descending in the server (`order('priority', { ascending: false })`)
    // Therefore, the first item in the list should have the highest priority number.
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateTechnologyPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500 text-sm border border-dashed border-slate-200 rounded-lg">
        No technologies found. Add one above!
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
            <TechnologyCard tech={item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
