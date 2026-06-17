'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faq-actions'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

type Faq = {
  id: string
  question: string
  answer: string
  priority: number
  status: string
}

export default function FaqAdminClient({ initialFaqs }: { initialFaqs: Faq[] }) {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openModal = (faq?: Faq) => {
    if (faq) {
      setEditingFaq(faq)
    } else {
      setEditingFaq({ id: '', question: '', answer: '', priority: 0, status: 'Active' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingFaq(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingFaq) return
    
    setIsSubmitting(true)
    try {
      const data = {
        question: editingFaq.question,
        answer: editingFaq.answer,
        priority: Number(editingFaq.priority),
        status: editingFaq.status
      }

      if (editingFaq.id) {
        await updateFaq(editingFaq.id, data)
        setFaqs(faqs.map(f => f.id === editingFaq.id ? { ...editingFaq, ...data } : f))
        toast.success('FAQ updated successfully')
      } else {
        // Optimistic add (requires refresh for true ID, but good enough for UI flow if we reload)
        await createFaq(data)
        toast.success('FAQ created successfully')
        // Force reload to get the new ID from DB
        window.location.reload()
      }
      closeModal()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save FAQ')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return
    try {
      await deleteFaq(id)
      setFaqs(faqs.filter(f => f.id !== id))
      toast.success('FAQ deleted successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete FAQ')
    }
  }

  return (
    <div>
      <div className="p-6 border-b border-slate-200 flex justify-end">
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#0A1628] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#E8A020] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No FAQs found.</div>
        ) : (
          faqs.map(faq => (
            <div key={faq.id} className="p-6 hover:bg-slate-50/50 transition-colors flex justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#0A1628]">{faq.question}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    faq.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {faq.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    Pri: {faq.priority}
                  </span>
                </div>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(faq)}
                  className="p-2 text-slate-400 hover:text-[#0A1628] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-[#0A1628]">
                {editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Question</label>
                  <input
                    type="text"
                    required
                    value={editingFaq.question}
                    onChange={e => setEditingFaq({ ...editingFaq, question: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Answer</label>
                  <textarea
                    required
                    rows={5}
                    value={editingFaq.answer}
                    onChange={e => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 resize-y"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Priority (Higher = First)</label>
                    <input
                      type="number"
                      value={editingFaq.priority}
                      onChange={e => setEditingFaq({ ...editingFaq, priority: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                    <select
                      value={editingFaq.status}
                      onChange={e => setEditingFaq({ ...editingFaq, status: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#0A1628] text-white font-semibold rounded-lg hover:bg-[#E8A020] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
