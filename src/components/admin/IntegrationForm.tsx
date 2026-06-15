'use client'

import { useState } from 'react'
import { addIntegration } from '@/app/actions/admin-actions'

export function IntegrationForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const slug = (formData.get('slug') as string) || 
                 name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const data = {
      name,
      slug,
      svg_slot_1: formData.get('svg_slot_1') as string || null,
      svg_slot_2: formData.get('svg_slot_2') as string || null,
    }

    try {
      await addIntegration(data)
      setMessage('Integration added successfully!')
      ;(e.target as HTMLFormElement).reset()
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-1">
          Integration Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. SAP ERP"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-navy-900 mb-1">
          Slug (Optional)
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. sap-erp (auto-generated if left blank)"
        />
      </div>

      <div>
        <label htmlFor="svg_slot_1" className="block text-sm font-medium text-navy-900 mb-1">
          SVG Code (Slot 1)
        </label>
        <textarea
          name="svg_slot_1"
          id="svg_slot_1"
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="<svg>...</svg>"
        />
      </div>

      <div>
        <label htmlFor="svg_slot_2" className="block text-sm font-medium text-navy-900 mb-1">
          SVG Code (Slot 2)
        </label>
        <textarea
          name="svg_slot_2"
          id="svg_slot_2"
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="<svg>...</svg>"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add Integration'}
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
