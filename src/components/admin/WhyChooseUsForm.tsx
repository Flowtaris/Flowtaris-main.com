'use client'

import { useState } from 'react'
import { addWhyChooseUs } from '@/app/actions/extra-actions'

export function WhyChooseUsForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      description: formData.get('description') as string,
      small_description: formData.get('small_description') as string || null,
      image_url: formData.get('image_url') as string || null,
    }

    try {
      await addWhyChooseUs(data)
      setMessage('Card added successfully!')
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
        <label htmlFor="description" className="block text-sm font-medium text-navy-900 mb-1">
          Main Description (Card Title) *
        </label>
        <input
          type="text"
          name="description"
          id="description"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="small_description" className="block text-sm font-medium text-navy-900 mb-1">
          Small Description
        </label>
        <textarea
          name="small_description"
          id="small_description"
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-navy-900 mb-1">
          Image URL
        </label>
        <input
          type="text"
          name="image_url"
          id="image_url"
          placeholder="https://..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          {isPending ? 'Adding...' : 'Add Card'}
        </button>
        {message && <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</span>}
      </div>
    </form>
  )
}
