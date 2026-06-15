'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, X } from 'lucide-react'
import { 
  updateIntegrationSecurityMain,
  addIntegrationSecurityCard,
  updateIntegrationSecurityCard,
  deleteIntegrationSecurityCard 
} from '@/app/actions/admin-actions'
import { 
  IntegrationsSecurityPrecisionMain, 
  IntegrationsSecurityPrecisionCard 
} from '@/types/database'

interface Props {
  integrationId: string
  initialMain: IntegrationsSecurityPrecisionMain | null
  initialCards: IntegrationsSecurityPrecisionCard[]
}

export function IntegrationsSecurityPrecisionEditor({ integrationId, initialMain, initialCards }: Props) {
  const [cards, setCards] = useState(initialCards)
  
  // Main form state
  const [isMainPending, setIsMainPending] = useState(false)
  const [mainMessage, setMainMessage] = useState('')

  // Card form state
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isCardPending, setIsCardPending] = useState(false)
  const [cardMessage, setCardMessage] = useState('')
  const [editingCard, setEditingCard] = useState<IntegrationsSecurityPrecisionCard | null>(null)

  async function onMainSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsMainPending(true)
    setMainMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      integration_id: integrationId,
      description: formData.get('description') as string || null,
    }

    try {
      await updateIntegrationSecurityMain(initialMain?.id || 'new', data)
      setMainMessage('Description updated successfully!')
    } catch (error: any) {
      setMainMessage(`Error: ${error.message}`)
    } finally {
      setIsMainPending(false)
    }
  }

  async function onCardSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsCardPending(true)
    setCardMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      integration_id: integrationId,
      svg: formData.get('svg') as string || null,
      title: formData.get('title') as string,
      description: formData.get('description') as string || null,
    }

    try {
      if (editingCard) {
        await updateIntegrationSecurityCard(editingCard.id, data)
        setCards(cards.map(c => c.id === editingCard.id ? { ...c, ...data } as any : c))
      } else {
        // Optimistic add (doesn't have real ID until reload, but good enough for UI)
        await addIntegrationSecurityCard(data as any)
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
    if (!confirm('Are you sure you want to delete this feature card?')) return
    try {
      await deleteIntegrationSecurityCard(id)
      setCards(cards.filter(c => c.id !== id))
    } catch (error: any) {
      alert(`Error deleting: ${error.message}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Main Description */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-navy-900 mb-4">Main Description</h3>
        <form onSubmit={onMainSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">
              Short Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={initialMain?.description || ''}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Stop manually managing users..."
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isMainPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isMainPending ? 'Saving...' : 'Save Description'}
            </button>
            {mainMessage && (
              <span className={`text-sm ${mainMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {mainMessage}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Cards List */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-navy-900">Feature Cards</h3>
          <button
            onClick={() => { setEditingCard(null); setIsCardModalOpen(true) }}
            className="inline-flex items-center gap-1.5 bg-navy-900 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-navy-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Card
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => (
            <div key={card.id} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="font-semibold text-navy-900 text-sm mb-1">{card.title}</div>
                <div className="text-xs text-slate-500 line-clamp-3 mb-3">{card.description}</div>
                {card.svg && <div className="text-xs text-slate-400 font-mono truncate mb-2">SVG Present</div>}
              </div>
              <div className="flex gap-2 justify-end border-t border-slate-100 pt-3 mt-2">
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
              No feature cards added yet.
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
                {editingCard ? 'Edit Feature Card' : 'Add Feature Card'}
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
                  <label className="block text-sm font-medium text-navy-900 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingCard?.title || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingCard?.description || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">SVG Icon Code</label>
                  <textarea
                    name="svg"
                    rows={4}
                    defaultValue={editingCard?.svg || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="<svg>...</svg>"
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
                {isCardPending ? 'Saving...' : 'Save Card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
