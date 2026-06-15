'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check, ImageIcon } from 'lucide-react'
import {
  upsertBusinessSuiteMain,
  addBusinessSuiteItem,
  updateBusinessSuiteItem,
  deleteBusinessSuiteItem,
} from '@/app/actions/services-actions'
import { ServicesBusinessSuiteMain, ServicesBusinessSuiteItem } from '@/types/database'

// ─── Section description editor ─────────────────────────────────────
function SuiteMainEditor({ serviceId, initialData }: { serviceId: string; initialData: ServicesBusinessSuiteMain | null }) {
  const [smallDesc, setSmallDesc] = useState(initialData?.small_description ?? '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await upsertBusinessSuiteMain(serviceId, initialData?.id ?? null, { small_description: smallDesc || null })
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
        <p className="text-xs text-slate-400 mb-2">The subtitle text beneath the &ldquo;A Complete Business Management Suite&rdquo; heading.</p>
        <textarea
          rows={3}
          value={smallDesc}
          onChange={(e) => setSmallDesc(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Supporting description for this section..."
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {saving ? 'Saving...' : 'Save Description'}
        </button>
        {msg && (
          <span className={`text-sm font-medium ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>
        )}
      </div>
    </form>
  )
}

// ─── Sub-section item row ────────────────────────────────────────────
function ItemRow({ item, onDeleted }: { item: ServicesBusinessSuiteItem; onDeleted: () => void }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description ?? '')
  const [imageUrl, setImageUrl] = useState(item.image_url ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      await updateBusinessSuiteItem(item.id, {
        title,
        description: description || null,
        image_url: imageUrl || null,
      })
      setMsg('Saved!')
      setEditing(false)
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!confirm('Delete this sub-section?')) return
    setDeleting(true)
    try {
      await deleteBusinessSuiteItem(item.id)
      onDeleted()
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setDeleting(false)
    }
  }

  if (editing) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50">
            <Check className="w-3.5 h-3.5" />
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={() => { setEditing(false); setTitle(item.title); setDescription(item.description ?? ''); setImageUrl(item.image_url ?? '') }} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
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
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-slate-100" />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
          <ImageIcon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 mb-1">{item.title}</p>
        {item.description && <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>}
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

// ─── Add item form ───────────────────────────────────────────────────
function AddItemForm({ serviceId, onAdded }: { serviceId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await addBusinessSuiteItem(serviceId, { title, description: description || null, image_url: imageUrl || null })
      setMsg('Added!')
      setTitle(''); setDescription(''); setImageUrl('')
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
        Add Sub-Section
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
      <h4 className="text-sm font-bold text-slate-700">New Sub-Section</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Financial Management" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe this sub-section..." />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50">
          <Plus className="w-3.5 h-3.5" />
          {saving ? 'Adding…' : 'Add Sub-Section'}
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

// ─── Main export ─────────────────────────────────────────────────────
export function ServicesBusinessSuiteEditor({
  serviceId,
  initialMain,
  initialItems,
}: {
  serviceId: string
  initialMain: ServicesBusinessSuiteMain | null
  initialItems: ServicesBusinessSuiteItem[]
}) {
  const [items, setItems] = useState(initialItems)

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Section description */}
      <div className="p-5 border border-slate-100 bg-white rounded-xl shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded text-[10px] flex items-center justify-center font-bold">S</span>
          Section Small Description
        </h3>
        <SuiteMainEditor serviceId={serviceId} initialData={initialMain} />
      </div>

      {/* Sub-sections */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded text-[10px] flex items-center justify-center font-bold">I</span>
          Sub-Sections (Title, Description &amp; Image)
        </h3>
        <div className="space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-slate-400 py-4 text-center">No sub-sections yet. Add one below.</p>
          )}
          {items.map((item) => (
            <ItemRow key={item.id} item={item} onDeleted={() => removeItem(item.id)} />
          ))}
        </div>
        <div className="mt-3">
          <AddItemForm serviceId={serviceId} onAdded={() => {}} />
        </div>
      </div>
    </div>
  )
}
