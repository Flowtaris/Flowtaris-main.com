'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import {
  addBlogFaq,
  updateBlogFaq,
  deleteBlogFaq,
} from '@/app/actions/blog-actions'
import { BlogFaq } from '@/types/database'

function FaqRow({ faq, onDeleted }: { faq: BlogFaq; onDeleted: () => void }) {
  const [editing, setEditing] = useState(false)
  const [question, setQuestion] = useState(faq.question)
  const [answer, setAnswer] = useState(faq.answer)
  const [sortOrder, setSortOrder] = useState(faq.sort_order.toString())
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      await updateBlogFaq(faq.id, {
        question,
        answer,
        sort_order: parseInt(sortOrder) || 0,
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
    if (!confirm('Delete this FAQ?')) return
    setDeleting(true)
    try {
      await deleteBlogFaq(faq.id)
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
          <label className="block text-xs font-semibold text-slate-600 mb-1">Question *</label>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Answer *</label>
          <textarea
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setQuestion(faq.question);
              setAnswer(faq.answer);
              setSortOrder(faq.sort_order.toString());
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
          >
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
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-xs font-bold text-slate-400">
        {faq.sort_order}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 mb-1">{faq.question}</p>
        <p className="text-xs text-slate-500 line-clamp-3">{faq.answer}</p>
        {msg && <span className={`text-xs mt-1 block ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
          title="Edit"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={remove}
          disabled={deleting}
          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function AddFaqForm({ blogId, onAdded }: { blogId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [sortOrder, setSortOrder] = useState('0')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await addBlogFaq(blogId, {
        question,
        answer,
        sort_order: parseInt(sortOrder) || 0,
      })
      setMsg('FAQ added!')
      setQuestion('')
      setAnswer('')
      setSortOrder('0')
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
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add New FAQ
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-3">
      <h4 className="text-sm font-bold text-slate-700">New FAQ</h4>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Question *</label>
        <input
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. How does this work?"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Answer *</label>
        <textarea
          required
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Detailed answer..."
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Sort Order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          {saving ? 'Adding…' : 'Add FAQ'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
        {msg && <span className={`text-xs ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
    </form>
  )
}

export function BlogFaqsEditor({ blogId, initialFaqs }: { blogId: string; initialFaqs: BlogFaq[] }) {
  const [faqs, setFaqs] = useState(initialFaqs)

  function removeFaq(id: string) {
    setFaqs((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {faqs.length === 0 && (
          <p className="text-sm text-slate-400 py-4 text-center">No FAQs yet. Add one below.</p>
        )}
        {faqs.map((faq) => (
          <FaqRow key={faq.id} faq={faq} onDeleted={() => removeFaq(faq.id)} />
        ))}
      </div>
      <AddFaqForm blogId={blogId} onAdded={() => {}} />
    </div>
  )
}
