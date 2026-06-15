'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addCaseStudyTopic, updateCaseStudyTopic, deleteCaseStudyTopic } from '@/app/actions/case-studies-actions'
import { CaseStudiesTopic } from '@/types/database'
import { Loader2, Plus, Trash2, Edit2, Check, X } from 'lucide-react'

export function CaseStudyTopicsEditor({
  caseStudyId,
  items,
}: {
  caseStudyId: string
  items: CaseStudiesTopic[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  // Add state
  const [isAdding, setIsAdding] = useState(false)
  const [newTopic, setNewTopic] = useState('')
  const [newDesc, setNewDesc] = useState('')

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [editDesc, setEditDesc] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await addCaseStudyTopic(caseStudyId, newTopic, newDesc)
        setNewTopic('')
        setNewDesc('')
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
        await updateCaseStudyTopic(editingId, editTopic, editDesc)
        setEditingId(null)
        setEditTopic('')
        setEditDesc('')
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Edit failed')
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this topic?')) return
    setError('')
    startTransition(async () => {
      try {
        await deleteCaseStudyTopic(id)
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Delete failed')
      }
    })
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* List */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border border-slate-200 p-4 rounded-xl bg-slate-50">
            {editingId === item.id ? (
              <div className="space-y-3">
                <input
                  value={editTopic}
                  onChange={(e) => setEditTopic(e.target.value)}
                  placeholder="Topic title..."
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                  autoFocus
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Topic description..."
                  rows={3}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingId(null)} disabled={isPending} className="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200 rounded-md">
                    Cancel
                  </button>
                  <button onClick={handleSaveEdit} disabled={isPending} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-md text-sm font-semibold">
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.topic}</h4>
                  {item.description && <p className="text-sm text-slate-600 whitespace-pre-wrap">{item.description}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    onClick={() => { setEditingId(item.id); setEditTopic(item.topic); setEditDesc(item.description || '') }}
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
                </div>
              </div>
            )}
          </li>
        ))}
        {items.length === 0 && !isAdding && (
          <li className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-xl">
            No topics added yet.
          </li>
        )}
      </ul>

      {/* Add Form */}
      {isAdding ? (
        <form onSubmit={handleAdd} className="space-y-3 p-4 bg-white border border-slate-200 rounded-xl">
          <h4 className="text-sm font-bold text-slate-800 mb-2">New Topic</h4>
          <input
            required
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Topic title..."
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            autoFocus
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Topic description..."
            rows={3}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={isPending || !newTopic} className="bg-navy-950 text-white px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50 flex items-center gap-1.5">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Topic
            </button>
            <button type="button" onClick={() => setIsAdding(false)} disabled={isPending} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2"
        >
          <Plus className="w-4 h-4" /> Add Topic
        </button>
      )}
    </div>
  )
}
