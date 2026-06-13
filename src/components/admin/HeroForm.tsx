'use client'

import { useState } from 'react'
import { updateGlobalHero, createGlobalHero } from '@/app/actions/admin-actions'
import { GlobalHero } from '@/types/database'

export function HeroForm({ initialData }: { initialData: GlobalHero | null }) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      main_description: formData.get('main_description') as string,
      small_description: formData.get('small_description') as string || null,
    }

    try {
      if (initialData?.id) {
        await updateGlobalHero(initialData.id, data)
        setMessage('Hero updated successfully!')
      } else {
        await createGlobalHero(data)
        setMessage('Hero created successfully!')
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="main_description" className="block text-sm font-medium text-navy-900 mb-1">
          Main Description (H1/Hero Text) *
        </label>
        <textarea
          name="main_description"
          id="main_description"
          required
          rows={3}
          defaultValue={initialData?.main_description || ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Architecting Institutional-Grade Enterprise Solutions..."
        />
      </div>

      <div>
        <label htmlFor="small_description" className="block text-sm font-medium text-navy-900 mb-1">
          Small Description (Sub-text)
        </label>
        <textarea
          name="small_description"
          id="small_description"
          rows={3}
          defaultValue={initialData?.small_description || ''}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Elevate your operations with our elite engineering..."
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Hero' : 'Create Hero'}
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
