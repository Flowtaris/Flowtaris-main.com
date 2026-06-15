'use client'

import { useState } from 'react'
import { updateIntegrationHero } from '@/app/actions/admin-actions'
import { IntegrationsHero } from '@/types/database'

interface IntegrationsHeroEditorProps {
  integrationId: string
  initialData: IntegrationsHero | null
}

export function IntegrationsHeroEditor({ integrationId, initialData }: IntegrationsHeroEditorProps) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      integration_id: integrationId,
      title: formData.get('title') as string,
      description: formData.get('description') as string || null,
    }

    try {
      await updateIntegrationHero(initialData?.id || 'new', data)
      setMessage('Hero updated successfully!')
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
      <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">
            H1 Title *
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title || ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Govern SaaS."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description || ''}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="A short descriptive paragraph..."
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Hero'}
          </button>
          {message && (
            <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
