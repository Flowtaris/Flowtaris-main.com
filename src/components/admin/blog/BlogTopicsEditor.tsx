'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check, Image as ImageIcon } from 'lucide-react'
import {
  addBlogTopic,
  updateBlogTopic,
  deleteBlogTopic,
} from '@/app/actions/blog-actions'
import { BlogTopic } from '@/types/database'
import { createClient } from '@/lib/supabase/client'

function TopicRow({ topic, onDeleted }: { topic: BlogTopic; onDeleted: () => void }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(topic.title)
  const [descriptions, setDescriptions] = useState<string[]>(topic.description ? topic.description.split('\n\n') : [])
  const [subDescriptions, setSubDescriptions] = useState<string[]>(topic.sub_descriptions ?? [])
  const [sortOrder, setSortOrder] = useState(topic.sort_order.toString())
  const [imageUrl, setImageUrl] = useState(topic.image_url ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')

  function addDescription() {
    setDescriptions([...descriptions, ''])
  }

  function updateDescription(index: number, value: string) {
    const newDescs = [...descriptions]
    newDescs[index] = value
    setDescriptions(newDescs)
  }

  function removeDescription(index: number) {
    const newDescs = descriptions.filter((_, i) => i !== index)
    setDescriptions(newDescs)
  }

  function addSubDescription() {
    setSubDescriptions([...subDescriptions, ''])
  }

  function updateSubDescription(index: number, value: string) {
    const newSubs = [...subDescriptions]
    newSubs[index] = value
    setSubDescriptions(newSubs)
  }

  function removeSubDescription(index: number) {
    const newSubs = subDescriptions.filter((_, i) => i !== index)
    setSubDescriptions(newSubs)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setSaving(true)
    setMsg('Uploading image...')
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `blog-topics/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)
        
      if (uploadError) throw new Error(uploadError.message)
      
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
      setImageUrl(publicUrl)
      setMsg('Image uploaded successfully.')
    } catch (err: any) {
      setMsg(`Upload failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      const descArray = descriptions.map(s => s.trim()).filter(Boolean)
      const subDescArray = subDescriptions.map(s => s.trim()).filter(Boolean)
      await updateBlogTopic(topic.id, {
        title,
        description: descArray.length > 0 ? descArray.join('\n\n') : null,
        sub_descriptions: subDescArray.length > 0 ? subDescArray : null,
        image_url: imageUrl || null,
        sort_order: parseInt(sortOrder) || 0,
      } as any)
      setDescriptions(descArray)
      setSubDescriptions(subDescArray)
      setMsg('Saved!')
      setEditing(false)
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!confirm('Delete this topic?')) return
    setDeleting(true)
    try {
      await deleteBlogTopic(topic.id)
      onDeleted()
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setDeleting(false)
    }
  }

  if (editing) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">Descriptions</label>
          <div className="space-y-2 mb-2">
            {descriptions.map((desc, i) => (
              <div key={i} className="flex items-start gap-2">
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => updateDescription(i, e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Description ${i + 1}...`}
                />
                <button
                  type="button"
                  onClick={() => removeDescription(i)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5 border border-transparent hover:border-red-100 bg-white"
                  title="Remove description"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addDescription}
            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Description
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">Sub-descriptions</label>
          <div className="space-y-2 mb-2">
            {subDescriptions.map((sub, i) => (
              <div key={i} className="flex items-start gap-2">
                <textarea
                  rows={2}
                  value={sub}
                  onChange={(e) => updateSubDescription(i, e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Sub-description ${i + 1}...`}
                />
                <button
                  type="button"
                  onClick={() => removeSubDescription(i)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5 border border-transparent hover:border-red-100 bg-white"
                  title="Remove sub-description"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubDescription}
            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Sub-description
          </button>
        </div>

        <div className="border-t border-blue-100 pt-4 mt-2">
          <label className="block text-xs font-semibold text-slate-600 mb-2">Topic Image</label>
          <div className="flex items-center gap-4">
            {imageUrl && (
              <img src={imageUrl} alt="Topic" className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
            )}
            <div className="flex-1">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-600 font-medium w-fit">
                <ImageIcon className="w-4 h-4 text-slate-400" />
                {imageUrl ? 'Change Image' : 'Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={saving} />
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setTitle(topic.title);
              setDescriptions(topic.description ? topic.description.split('\n\n') : []);
              setSubDescriptions(topic.sub_descriptions ?? []);
              setImageUrl(topic.image_url ?? '');
              setSortOrder(topic.sort_order.toString());
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 bg-white"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          {msg && <span className={`text-xs ${msg.startsWith('Error') || msg.startsWith('Upload failed') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
        </div>
      </div>
    )
  }

  const descArray = topic.description ? topic.description.split('\n\n') : [];

  return (
    <div className="p-4 border border-slate-100 bg-white rounded-xl flex gap-4 items-start group hover:border-slate-200 hover:shadow-sm transition-all">
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-xs font-bold text-slate-400">
        {topic.sort_order}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 mb-1">{topic.title}</p>
        
        {topic.image_url && (
          <div className="mb-3">
            <img src={topic.image_url} alt="Topic" className="h-24 w-auto object-cover rounded-lg border border-slate-200" />
          </div>
        )}

        {descArray.length > 0 && (
          <div className="space-y-2 mb-2">
            {descArray.map((desc, i) => (
              <p key={i} className="text-xs text-slate-500">{desc}</p>
            ))}
          </div>
        )}
        {(topic.sub_descriptions ?? []).length > 0 && (
          <ul className="list-disc pl-4 mt-2 space-y-1">
            {(topic.sub_descriptions ?? []).map((sub, i) => (
              <li key={i} className="text-xs text-slate-500">{sub}</li>
            ))}
          </ul>
        )}
        {msg && <span className={`text-xs mt-1 block ${msg.startsWith('Error') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
          title="Edit"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={remove}
          disabled={deleting}
          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function AddTopicForm({ blogId, onAdded }: { blogId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [subDescriptions, setSubDescriptions] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState('0')
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function addDescription() {
    setDescriptions([...descriptions, ''])
  }

  function updateDescription(index: number, value: string) {
    const newDescs = [...descriptions]
    newDescs[index] = value
    setDescriptions(newDescs)
  }

  function removeDescription(index: number) {
    const newDescs = descriptions.filter((_, i) => i !== index)
    setDescriptions(newDescs)
  }

  function addSubDescription() {
    setSubDescriptions([...subDescriptions, ''])
  }

  function updateSubDescription(index: number, value: string) {
    const newSubs = [...subDescriptions]
    newSubs[index] = value
    setSubDescriptions(newSubs)
  }

  function removeSubDescription(index: number) {
    const newSubs = subDescriptions.filter((_, i) => i !== index)
    setSubDescriptions(newSubs)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setSaving(true)
    setMsg('Uploading image...')
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `blog-topics/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)
        
      if (uploadError) throw new Error(uploadError.message)
      
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
      setImageUrl(publicUrl)
      setMsg('Image uploaded successfully.')
    } catch (err: any) {
      setMsg(`Upload failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const descArray = descriptions.map(s => s.trim()).filter(Boolean)
      const subDescArray = subDescriptions.map(s => s.trim()).filter(Boolean)
      await addBlogTopic(blogId, {
        title,
        description: descArray.length > 0 ? descArray.join('\n\n') : null,
        sub_descriptions: subDescArray.length > 0 ? subDescArray : null,
        image_url: imageUrl || null,
        sort_order: parseInt(sortOrder) || 0,
      } as any)
      setMsg('Topic added!')
      setTitle('')
      setDescriptions([])
      setSubDescriptions([])
      setImageUrl('')
      setSortOrder('0')
      setOpen(false)
      onAdded()
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors bg-white shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add New Topic
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="p-5 border border-blue-200 bg-blue-50 rounded-xl space-y-4">
      <h4 className="text-sm font-bold text-slate-800">New Topic</h4>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Setting Up Integrations"
        />
      </div>
      
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2">Descriptions</label>
        <div className="space-y-2 mb-2">
          {descriptions.map((desc, i) => (
            <div key={i} className="flex items-start gap-2">
              <textarea
                rows={2}
                value={desc}
                onChange={(e) => updateDescription(i, e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Description ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeDescription(i)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5 border border-transparent hover:border-red-100 bg-white"
                title="Remove description"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addDescription}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Description
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2">Sub-descriptions</label>
        <div className="space-y-2 mb-2">
          {subDescriptions.map((sub, i) => (
            <div key={i} className="flex items-start gap-2">
              <textarea
                rows={2}
                value={sub}
                onChange={(e) => updateSubDescription(i, e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Sub-description ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeSubDescription(i)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-0.5 border border-transparent hover:border-red-100 bg-white"
                title="Remove sub-description"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSubDescription}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Sub-description
        </button>
      </div>

      <div className="border-t border-blue-100 pt-4 mt-2">
        <label className="block text-xs font-semibold text-slate-600 mb-2">Topic Image</label>
        <div className="flex items-center gap-4">
          {imageUrl && (
            <img src={imageUrl} alt="Topic" className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
          )}
          <div className="flex-1">
            <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-600 font-medium w-fit">
              <ImageIcon className="w-4 h-4 text-slate-400" />
              {imageUrl ? 'Change Image' : 'Upload Image'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={saving} />
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="mt-2 text-xs text-red-500 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Sort Order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          <Check className="w-3.5 h-3.5" />
          {saving ? 'Adding…' : 'Save Topic'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 bg-white"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
        {msg && <span className={`text-xs ${msg.startsWith('Error') || msg.startsWith('Upload failed') ? 'text-red-600' : 'text-emerald-600'}`}>{msg}</span>}
      </div>
    </form>
  )
}

export function BlogTopicsEditor({ blogId, initialTopics }: { blogId: string; initialTopics: BlogTopic[] }) {
  const [topics, setTopics] = useState(initialTopics)

  function removeTopic(id: string) {
    setTopics((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {topics.length === 0 && (
          <p className="text-sm text-slate-400 py-4 text-center">No topics yet. Add one below.</p>
        )}
        {topics.map((topic) => (
          <TopicRow key={topic.id} topic={topic} onDeleted={() => removeTopic(topic.id)} />
        ))}
      </div>
      <AddTopicForm blogId={blogId} onAdded={() => {}} />
    </div>
  )
}
