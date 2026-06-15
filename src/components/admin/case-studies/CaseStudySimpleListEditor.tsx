'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2, Edit2, Check, X } from 'lucide-react'

interface Item {
  id: string
  name: string
}

export function CaseStudySimpleListEditor({
  caseStudyId,
  items,
  addAction,
  updateAction,
  deleteAction,
  itemName = 'Item',
}: {
  caseStudyId: string
  items: Item[]
  addAction: (caseStudyId: string, name: string) => Promise<void>
  updateAction: (id: string, name: string) => Promise<void>
  deleteAction: (id: string) => Promise<void>
  itemName?: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  // Add state
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await addAction(caseStudyId, newName)
        setNewName('')
        setIsAdding(false)
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Add failed')
      }
    })
  }

  function handleSaveEdit() {
    if (!editingId) return
    setError('')
    startTransition(async () => {
      try {
        await updateAction(editingId, editName)
        setEditingId(null)
        setEditName('')
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Edit failed')
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return
    setError('')
    startTransition(async () => {
      try {
        await deleteAction(id)
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Delete failed')
      }
    })
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* List */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between border border-slate-200 p-3 rounded-lg bg-slate-50">
            {editingId === item.id ? (
              <div className="flex-1 flex items-center gap-2 mr-4">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            ) : (
              <span className="text-sm font-medium text-slate-800">{item.name}</span>
            )}

            <div className="flex items-center gap-1 shrink-0">
              {editingId === item.id ? (
                <>
                  <button onClick={handleSaveEdit} disabled={isPending} className="p-1.5 text-green-600 hover:bg-green-100 rounded-md">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingId(null)} disabled={isPending} className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-md">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setEditingId(item.id); setEditName(item.name) }}
                    disabled={isPending}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
        {items.length === 0 && !isAdding && (
          <li className="text-xs text-slate-400 text-center py-4 border border-dashed border-slate-200 rounded-lg">
            No {itemName.toLowerCase()}s added yet.
          </li>
        )}
      </ul>

      {/* Add Form */}
      {isAdding ? (
        <form onSubmit={handleAdd} className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg">
          <input
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={`${itemName} name...`}
            className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button type="submit" disabled={isPending || !newName} className="bg-navy-950 text-white px-3 py-2 rounded-md text-sm font-semibold disabled:opacity-50 flex items-center gap-1">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Save
          </button>
          <button type="button" onClick={() => setIsAdding(false)} disabled={isPending} className="px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-md">
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" /> Add {itemName}
        </button>
      )}
    </div>
  )
}
