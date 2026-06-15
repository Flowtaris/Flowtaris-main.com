'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import {
  addDeepModuleCard,
  updateDeepModuleCard,
  deleteDeepModuleCard,
} from '@/app/actions/services-actions'
import { ServicesDeepModule } from '@/types/database'

// ─── Card row ─────────────────────────────────────────────────────────
function CardRow({ card, onDeleted }: { card: ServicesDeepModule; onDeleted: () => void }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [smallDesc, setSmallDesc] = useState(card.small_description ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      await updateDeepModuleCard(card.id, { title, small_description: smallDesc || null })
      setMsg('Saved!')
      setEditing(false)
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!confirm('Delete this Deep Module card?')) return
    setDeleting(true)
    try {
      await deleteDeepModuleCard(card.id)
      onDeleted()
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setDeleting(false)
    }
  }

  if (editing) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Card Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Small Description</label>
          <textarea
            rows={3}
            value={smallDesc}
            onChange={(e) => setSmallDesc(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50">
            <Check className="w-3.5 h-3.5" />
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={() => { setEditing(false); setTitle(card.title); setSmallDesc(card.small_description ?? '') }} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          {msg && <span className={`text-xs ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 border border-slate-100 bg-white rounded-xl flex gap-4 items-start group hover:border-slate-200 hover:shadow-sm transition-all">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 mb-1">{card.title}</p>
        {card.small_description && (
          <p className="text-xs text-slate-500 line-clamp-2">{card.small_description}</p>
        )}
        {msg && <span className={`text-xs mt-1 block ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={remove} disabled={deleting} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50" title="Delete">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── Add card form ─────────────────────────────────────────────────────
function AddCardForm({ serviceId, onAdded }: { serviceId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [smallDesc, setSmallDesc] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await addDeepModuleCard(serviceId, { title, small_description: smallDesc || null })
      setMsg('Added!')
      setTitle(''); setSmallDesc('')
      setOpen(false)
      onAdded()
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
        <Plus className="w-4 h-4" />
        Add New Module Card
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
      <h4 className="text-sm font-bold text-slate-700">New Deep Module Card</h4>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Card Title *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. General Ledger & Financial Close" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Small Description</label>
        <textarea rows={3} value={smallDesc} onChange={(e) => setSmallDesc(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief description of this module expertise..." />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50">
          <Plus className="w-3.5 h-3.5" />
          {saving ? 'Adding…' : 'Add Card'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
        {msg && <span className={`text-xs ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
    </form>
  )
}

// ─── Main export ──────────────────────────────────────────────────────
export function ServicesDeepModuleEditor({ serviceId, initialCards }: { serviceId: string; initialCards: ServicesDeepModule[] }) {
  const [cards, setCards] = useState(initialCards)

  function removeCard(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {cards.length === 0 && (
          <p className="text-sm text-slate-400 py-4 text-center">No cards yet. Add one below.</p>
        )}
        {cards.map((card) => (
          <CardRow key={card.id} card={card} onDeleted={() => removeCard(card.id)} />
        ))}
      </div>
      <AddCardForm serviceId={serviceId} onAdded={() => {}} />
    </div>
  )
}
