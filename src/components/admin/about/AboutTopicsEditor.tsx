'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, X } from 'lucide-react'
import { 
  addAboutTopic,
  updateAboutTopic,
  deleteAboutTopic
} from '@/app/actions/admin-actions'
import { AboutTopic } from '@/types/database'

export function AboutTopicsEditor({ initialTopics }: { initialTopics: AboutTopic[] }) {
  const [topics, setTopics] = useState(initialTopics)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [editingTopic, setEditingTopic] = useState<AboutTopic | null>(null)
  
  // Array of descriptions for the form
  const [descriptions, setDescriptions] = useState<string[]>([''])

  function handleOpenModal(topic: AboutTopic | null) {
    setEditingTopic(topic)
    if (topic && topic.descriptions && topic.descriptions.length > 0) {
      setDescriptions([...topic.descriptions])
    } else {
      setDescriptions([''])
    }
    setIsModalOpen(true)
  }

  function handleAddDescription() {
    setDescriptions([...descriptions, ''])
  }

  function handleRemoveDescription(index: number) {
    setDescriptions(descriptions.filter((_, i) => i !== index))
  }

  function handleDescriptionChange(index: number, value: string) {
    const newDesc = [...descriptions]
    newDesc[index] = value
    setDescriptions(newDesc)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    // Filter out completely empty descriptions
    const validDescriptions = descriptions.filter(d => d.trim() !== '')

    const data = {
      topic: formData.get('topic') as string,
      descriptions: validDescriptions,
    }

    try {
      if (editingTopic) {
        await updateAboutTopic(editingTopic.id, data)
        setTopics(topics.map(t => t.id === editingTopic.id ? { ...t, ...data } as any : t))
      } else {
        await addAboutTopic(data as any)
        window.location.reload()
      }
      setIsModalOpen(false)
      setEditingTopic(null)
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this topic?')) return
    try {
      await deleteAboutTopic(id)
      setTopics(topics.filter(t => t.id !== id))
    } catch (error: any) {
      alert(`Error deleting: ${error.message}`)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-navy-900">Topics & Descriptions</h3>
          <button
            onClick={() => handleOpenModal(null)}
            className="inline-flex items-center gap-1.5 bg-navy-900 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-navy-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Topic
          </button>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex items-start gap-4 justify-between">
              <div>
                <div className="font-semibold text-navy-900 text-sm mb-2">{topic.topic}</div>
                <div className="space-y-2">
                  {topic.descriptions?.map((desc, idx) => (
                    <div key={idx} className="text-xs text-slate-500 whitespace-pre-wrap leading-relaxed">
                      {desc}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleOpenModal(topic)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(topic.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {topics.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
              No topics added yet.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-navy-900">
                {editingTopic ? 'Edit Topic' : 'Add Topic'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="topic-form" onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Topic *</label>
                  <input
                    type="text"
                    name="topic"
                    required
                    defaultValue={editingTopic?.topic || ''}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-navy-900">Descriptions</label>
                  </div>
                  
                  <div className="space-y-3">
                    {descriptions.map((desc, idx) => (
                      <div key={idx} className="flex gap-2">
                        <textarea
                          rows={3}
                          value={desc}
                          onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Description paragraph ${idx + 1}`}
                        />
                        {descriptions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDescription(idx)}
                            className="p-2 h-fit text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddDescription}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Another Description
                  </button>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 mt-auto">
              {message && <span className="text-sm text-red-600 mr-auto">{message}</span>}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                form="topic-form"
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isPending ? 'Saving...' : 'Save Topic'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
