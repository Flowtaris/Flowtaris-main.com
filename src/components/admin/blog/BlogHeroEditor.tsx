'use client'

import { useState } from 'react'
import { upsertBlogHero } from '@/app/actions/blog-actions'
import { BlogHero } from '@/types/database'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface Props {
  blogId: string
  initialData: BlogHero | null
}

export function BlogHeroEditor({ blogId, initialData }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [imageUrl, setImageUrl] = useState(initialData?.image_url ?? '')
  const [publicationDate, setPublicationDate] = useState(initialData?.publication_date ?? '')
  const [authorName, setAuthorName] = useState(initialData?.author_name ?? '')
  const [authorDesignation, setAuthorDesignation] = useState(initialData?.author_designation ?? '')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    try {
      await upsertBlogHero(blogId, initialData?.id ?? null, {
        title,
        description: description || null,
        image_url: imageUrl || null,
        publication_date: publicationDate || null,
        author_name: authorName || null,
        author_designation: authorDesignation || null,
      })
      setMessage('Saved successfully!')
    } catch (err: unknown) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g. Navigating SaaS Procurement"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Brief description of the blog post..."
        />
      </div>

      <ImageUpload
        label="Hero Image"
        value={imageUrl}
        onChange={setImageUrl}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Publication Date</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Author Name</label>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="e.g. Name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Author Designation</label>
          <input
            value={authorDesignation}
            onChange={(e) => setAuthorDesignation(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="e.g. Lead Engineer"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isPending ? 'Saving...' : initialData ? 'Update Hero' : 'Create Hero'}
        </button>
        {message && (
          <span className={`text-sm font-medium ${message.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
