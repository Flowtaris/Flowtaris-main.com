'use client'

import { useState } from 'react'
import { addWhyChooseUsSector } from '@/app/actions/extra-actions'

export function WhyChooseUsSectorForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      priority: 0,
    }

    try {
      await addWhyChooseUsSector(data)
      setMessage('Sector added successfully!')
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
          Sector Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="e.g. Manufacturers"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          {isPending ? 'Adding...' : 'Add Sector'}
        </button>
        {message && <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</span>}
      </div>
    </form>
  )
}
