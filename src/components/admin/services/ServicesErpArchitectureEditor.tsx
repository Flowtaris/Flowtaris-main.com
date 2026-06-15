'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check, ArrowUp, ArrowDown } from 'lucide-react'
import {
  upsertErpArchitectureMain,
  addErpArchitectureCard,
  updateErpArchitectureCard,
  deleteErpArchitectureCard,
} from '@/app/actions/services-actions'
import { ServicesErpArchitectureMain, ServicesErpArchitectureCard } from '@/types/database'

// ─── Section description editor ──────────────────────────────────────
function ErpMainEditor({ serviceId, initialData }: { serviceId: string; initialData: ServicesErpArchitectureMain | null }) {
  const [smallDesc, setSmallDesc] = useState(initialData?.small_description ?? '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await upsertErpArchitectureMain(serviceId, initialData?.id ?? null, { small_description: smallDesc || null })
      setMsg('Saved!')
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Section Small Description</label>
        <p className="text-xs text-slate-400 mb-2">The subtitle text beneath the &ldquo;Engineering the ERP Architecture&rdquo; heading.</p>
        <textarea
          rows={3}
          value={smallDesc}
          onChange={(e) => setSmallDesc(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="e.g. Our architectural frameworks are engineered..."
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
          {saving ? 'Saving...' : 'Save Description'}
        </button>
        {msg && <span className={`text-sm font-medium ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
    </form>
  )
}

// ─── Tags input ───────────────────────────────────────────────────────
function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('')

  function addTag() {
    const trimmed = input.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setInput('')
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">Tags</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type tag and press Enter or Add"
        />
        <button type="button" onClick={addTag} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg font-medium transition-colors">
          Add
        </button>
      </div>
    </div>
  )
}

// ─── Card row ─────────────────────────────────────────────────────────
function CardRow({
  card,
  onDeleted,
  onPriorityChange,
}: {
  card: ServicesErpArchitectureCard
  onDeleted: () => void
  onPriorityChange: (id: string, newPriority: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? '')
  const [tags, setTags] = useState<string[]>(card.tags ?? [])
  const [priority, setPriority] = useState(card.priority)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      await updateErpArchitectureCard(card.id, { title, description: description || null, tags, priority })
      setMsg('Saved!')
      setEditing(false)
      onPriorityChange(card.id, priority)
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!confirm('Delete this ERP card?')) return
    setDeleting(true)
    try {
      await deleteErpArchitectureCard(card.id)
      onDeleted()
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setDeleting(false)
    }
  }

  if (editing) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Card Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Priority (higher = first)</label>
            <input type="number" value={priority} onChange={(e) => setPriority(parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Card Description</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <TagsInput value={tags} onChange={setTags} />
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50">
            <Check className="w-3.5 h-3.5" />
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={() => { setEditing(false); setTitle(card.title); setDescription(card.description ?? ''); setTags(card.tags ?? []); setPriority(card.priority) }} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
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
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span className="text-xs font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded border border-slate-100">#{priority}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 mb-1">{card.title}</p>
        {card.description && <p className="text-xs text-slate-500 line-clamp-2 mb-2">{card.description}</p>}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium border border-blue-100">{tag}</span>
            ))}
          </div>
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

// ─── Add card form ────────────────────────────────────────────────────
function AddCardForm({ serviceId, onAdded }: { serviceId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [priority, setPriority] = useState(0)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await addErpArchitectureCard(serviceId, { title, description: description || null, tags, priority })
      setMsg('Added!')
      setTitle(''); setDescription(''); setTags([]); setPriority(0)
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
        Add New ERP Card
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
      <h4 className="text-sm font-bold text-slate-700">New ERP Card</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Card Title *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Integration Layer" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Priority (higher = first)</label>
          <input type="number" value={priority} onChange={(e) => setPriority(parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Card Description</label>
        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe this architectural component..." />
      </div>
      <TagsInput value={tags} onChange={setTags} />
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
export function ServicesErpArchitectureEditor({
  serviceId,
  initialMain,
  initialCards,
}: {
  serviceId: string
  initialMain: ServicesErpArchitectureMain | null
  initialCards: ServicesErpArchitectureCard[]
}) {
  const [cards, setCards] = useState(
    [...initialCards].sort((a, b) => b.priority - a.priority)
  )

  function removeCard(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id))
  }

  function handlePriorityChange(id: string, newPriority: number) {
    setCards((prev) =>
      [...prev.map((c) => (c.id === id ? { ...c, priority: newPriority } : c))].sort(
        (a, b) => b.priority - a.priority
      )
    )
  }

  return (
    <div className="space-y-8">
      {/* Section description */}
      <div className="p-5 border border-slate-100 bg-white rounded-xl shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded text-[10px] flex items-center justify-center font-bold">S</span>
          Section Small Description
        </h3>
        <ErpMainEditor serviceId={serviceId} initialData={initialMain} />
      </div>

      {/* Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded text-[10px] flex items-center justify-center font-bold">C</span>
            ERP Architecture Cards
            <span className="ml-1 text-xs text-slate-400 font-normal">(sorted by priority, high → low)</span>
          </h3>
        </div>
        <div className="space-y-3">
          {cards.length === 0 && (
            <p className="text-sm text-slate-400 py-4 text-center">No cards yet. Add one below.</p>
          )}
          {cards.map((card) => (
            <CardRow
              key={card.id}
              card={card}
              onDeleted={() => removeCard(card.id)}
              onPriorityChange={handlePriorityChange}
            />
          ))}
        </div>
        <div className="mt-3">
          <AddCardForm serviceId={serviceId} onAdded={() => {}} />
        </div>
      </div>
    </div>
  )
}
