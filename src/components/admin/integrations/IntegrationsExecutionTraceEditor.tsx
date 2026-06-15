'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, X } from 'lucide-react'
import { 
  addIntegrationExecutionTrace,
  updateIntegrationExecutionTrace,
  deleteIntegrationExecutionTrace 
} from '@/app/actions/admin-actions'
import { IntegrationsExecutionTrace } from '@/types/database'

interface Props {
  integrationId: string
  initialCards: IntegrationsExecutionTrace[]
}

export function IntegrationsExecutionTraceEditor({ integrationId, initialCards }: Props) {
  const [cards, setCards] = useState(initialCards)
  
  // Card form state
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isCardPending, setIsCardPending] = useState(false)
  const [cardMessage, setCardMessage] = useState('')
  const [editingCard, setEditingCard] = useState<IntegrationsExecutionTrace | null>(null)

  async function onCardSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsCardPending(true)
    setCardMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      integration_id: integrationId,
      card_title: formData.get('card_title') as string || null,
      description: formData.get('description') as string || null,
      code_snippet: formData.get('code_snippet') as string || null,
    }

    try {
      if (editingCard) {
        await updateIntegrationExecutionTrace(editingCard.id, data)
        setCards(cards.map(c => c.id === editingCard.id ? { ...c, ...data } as any : c))
      } else {
        await addIntegrationExecutionTrace(data as any)
        window.location.reload()
      }
      setIsCardModalOpen(false)
      setEditingCard(null)
    } catch (error: any) {
      setCardMessage(`Error: ${error.message}`)
    } finally {
      setIsCardPending(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this trace step?')) return
    try {
      await deleteIntegrationExecutionTrace(id)
      setCards(cards.filter(c => c.id !== id))
    } catch (error: any) {
      alert(`Error deleting: ${error.message}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Trace Steps List */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-navy-900">Trace Steps</h3>
          <button
            onClick={() => { setEditingCard(null); setIsCardModalOpen(true) }}
            className="inline-flex items-center gap-1.5 bg-navy-900 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-navy-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Step
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {cards.map((card, i) => (
            <div key={card.id} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium text-sm shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-navy-900 text-sm mb-1">{card.card_title || 'Untitled Step'}</div>
                <div className="text-xs text-slate-500 mb-3">{card.description}</div>
                {card.code_snippet && (
                  <pre className="text-[10px] bg-slate-900 text-slate-300 p-2 rounded-md overflow-x-auto font-mono">
                    {card.code_snippet}
                  </pre>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => { setEditingCard(card); setIsCardModalOpen(true) }}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {cards.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
              No trace steps added yet.
            </div>
          )}
        </div>
      </div>

      {/* Card Modal */}
      {isCardModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-navy-900">
                {editingCard ? 'Edit Trace Step' : 'Add Trace Step'}
              </h3>
              <button 
                onClick={() => setIsCardModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="card-form" onSubmit={onCardSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Card Title</label>
                  <input
                    type="text"
                    name="card_title"
                    defaultValue={editingCard?.card_title || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. USER_PROVISIONED"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Short Description</label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={editingCard?.description || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Code Snippet (JSON, HTTP, etc.)</label>
                  <textarea
                    name="code_snippet"
                    rows={6}
                    defaultValue={editingCard?.code_snippet || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 mt-auto">
              {cardMessage && <span className="text-sm text-red-600 mr-auto">{cardMessage}</span>}
              <button
                type="button"
                onClick={() => setIsCardModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                form="card-form"
                type="submit"
                disabled={isCardPending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isCardPending ? 'Saving...' : 'Save Step'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
