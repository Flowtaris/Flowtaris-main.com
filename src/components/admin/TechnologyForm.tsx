'use client'

import { useState } from 'react'
import { addTechnology } from '@/app/actions/extra-actions'
import { createClient } from '@/lib/supabase/client'

export function TechnologyForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const file = formData.get('logo_file') as File
    
    try {
      let logo_url = ''
      
      if (file && file.size > 0) {
        const supabase = createClient()
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `technologies/${fileName}`
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file)
          
        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)
        
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
        logo_url = publicUrl
      } else {
        throw new Error('Please select an image file.')
      }

      const data = {
        logo_url,
        priority: 0,
      }

      await addTechnology(data)
      setMessage('Technology added successfully!')
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
        <label htmlFor="logo_file" className="block text-sm font-medium text-navy-900 mb-1">
          Upload Logo Image *
        </label>
        <input
          type="file"
          name="logo_file"
          id="logo_file"
          accept="image/*"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>



      <div className="flex items-center gap-4">
        <button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          {isPending ? 'Adding...' : 'Add Technology'}
        </button>
        {message && <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</span>}
      </div>
    </form>
  )
}
