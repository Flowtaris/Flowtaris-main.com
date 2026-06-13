'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/Toast'
import { MarkdownEditor } from './MarkdownEditor'
import { Loader2, Save, Eye } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  meta_title: string | null
  meta_description: string | null
  status: string
  topic_cluster: string | null
  cover_image_url: string | null
}

export function BlogEditor({ post, userId }: { post: Post | null; userId: string }) {
  const [formData, setFormData] = useState({
    title:            post?.title ?? '',
    slug:             post?.slug ?? '',
    content:          post?.content ?? '',
    excerpt:          post?.excerpt ?? '',
    meta_title:       post?.meta_title ?? '',
    meta_description: post?.meta_description ?? '',
    status:           post?.status ?? 'draft',
    topic_cluster:    post?.topic_cluster ?? '',
    cover_image_url:  post?.cover_image_url ?? '',
  })

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router    = useRouter()

  const generateSlug = (title: string) => {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData((prev) => ({ ...prev, slug: s }))
  }

  const handleSave = () => {
    startTransition(async () => {
      const supabase = createClient()
      
      const payload = {
        ...formData,
        author_id: userId,
        published_at: formData.status === 'published' && (!post || post.status !== 'published') ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString()
      }

      let res
      if (post) {
        res = await supabase.from('blog_posts').update(payload).eq('id', post.id)
      } else {
        res = await supabase.from('blog_posts').insert(payload)
      }

      if (res.error) {
        toast('error', 'Failed to save post', res.error.message)
      } else {
        toast('success', 'Post saved successfully')
        router.push('/admin/blog')
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-0 h-[calc(100vh-180px)]">
      {/* Editor area */}
      <div className="flex-1 flex flex-col border-r border-slate-100 overflow-y-auto p-6">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          onBlur={(e) => { if (!formData.slug && !post) generateSlug(e.target.value) }}
          placeholder="Post Title"
          className="text-3xl font-display font-bold text-navy-900 border-none outline-none focus:ring-0 px-0 placeholder:text-slate-300 w-full mb-6"
        />
        <MarkdownEditor
          value={formData.content}
          onChange={(v) => setFormData({ ...formData, content: v })}
          placeholder="Start writing your post here..."
        />
      </div>

      {/* Settings sidebar */}
      <div className="w-full md:w-80 bg-slate-50/50 p-6 overflow-y-auto space-y-6">
        <div>
          <label className="label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="input py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="label">URL Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="input py-2 font-mono text-xs"
          />
        </div>

        <div>
          <label className="label">Topic Cluster</label>
          <input
            type="text"
            value={formData.topic_cluster}
            onChange={(e) => setFormData({ ...formData, topic_cluster: e.target.value })}
            placeholder="e.g. ERP Implementation"
            className="input py-2 text-sm"
          />
        </div>

        <div>
          <label className="label">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="input py-2 text-sm resize-none"
            placeholder="Brief summary for listings..."
          />
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-navy-900 mb-4" style={{ fontFamily: 'var(--font-sora)' }}>SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="label text-xs">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                className="input py-2 text-sm"
                placeholder="Defaults to post title"
              />
            </div>
            <div>
              <label className="label text-xs">Meta Description</label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                rows={3}
                className="input py-2 text-sm resize-none"
                placeholder="Defaults to excerpt"
              />
            </div>
            <div>
              <label className="label text-xs">Cover Image URL</label>
              <input
                type="text"
                value={formData.cover_image_url}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                className="input py-2 text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <button
            onClick={handleSave}
            disabled={isPending || !formData.title || !formData.slug}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                       bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                       transition-colors disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Post
          </button>
          
          {post && (
            <a
              href={`/insights/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                         bg-white border border-slate-200 text-slate-700 font-semibold text-sm
                         hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-4 h-4" /> Preview Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
