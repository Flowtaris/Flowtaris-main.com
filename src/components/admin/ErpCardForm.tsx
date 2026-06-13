'use client'

import { useState } from 'react'
import { addErpCard } from '@/app/actions/admin-actions'

export function ErpCardForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean)

    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || null,
      tags: tagsArray,
      priority: parseInt(formData.get('priority') as string) || 0,
    }

    try {
      await addErpCard(data)
      setMessage('Card added successfully!')
      ;(e.target as HTMLFormElement).reset()
      setTags('')
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4 max-w-xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-navy-900 mb-1">
          Card Title *
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-navy-900 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-navy-900 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. Cloud, API, Security"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-navy-900 mb-1">
          Priority (higher number = appears first)
        </label>
        <input
          type="number"
          name="priority"
          id="priority"
          defaultValue={0}
          className="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add ERP Card'}
        </button>
        {message && (
          <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
