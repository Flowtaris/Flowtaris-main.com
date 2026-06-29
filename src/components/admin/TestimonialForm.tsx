'use client'

import { useState } from 'react'
import { addTestimonial } from '@/app/actions/testimonial-actions'
import { ImageUpload } from '@/components/admin/ImageUpload'

export function TestimonialForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      client_name: formData.get('client_name') as string,
      client_role: formData.get('client_role') as string || null,
      client_company: formData.get('client_company') as string || null,
      content: formData.get('content') as string,
      rating: parseInt(formData.get('rating') as string) || 5,
      image_url: imageUrl || null,
      priority: 0,
    }

    try {
      await addTestimonial(data)
      setMessage('Testimonial added successfully!')
      ;(e.target as HTMLFormElement).reset()
      setImageUrl('')
    } catch (error: unknown) {
      const err = error as Error;
      setMessage(`Error: ${err.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4 max-w-xl">
      <div>
        <label htmlFor="client_name" className="block text-sm font-medium text-navy-900 mb-1">
          Client Name *
        </label>
        <input
          type="text"
          name="client_name"
          id="client_name"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="client_role" className="block text-sm font-medium text-navy-900 mb-1">
            Client Role
          </label>
          <input
            type="text"
            name="client_role"
            id="client_role"
            placeholder="e.g. CEO"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="client_company" className="block text-sm font-medium text-navy-900 mb-1">
            Company
          </label>
          <input
            type="text"
            name="client_company"
            id="client_company"
            placeholder="e.g. Acme Corp"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-navy-900 mb-1">
          Testimonial Content *
        </label>
        <textarea
          name="content"
          id="content"
          required
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-navy-900 mb-1">
          Rating (1-5)
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          min="1"
          max="5"
          defaultValue="5"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <ImageUpload
          label="Client Photo / Company Logo"
          value={imageUrl}
          onChange={setImageUrl}
        />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          {isPending ? 'Adding...' : 'Add Testimonial'}
        </button>
        {message && <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</span>}
      </div>
    </form>
  )
}
