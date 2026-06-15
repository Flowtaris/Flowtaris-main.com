'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createService, deleteService, updateServicePriorities } from '@/app/actions/services-actions'
import { Service } from '@/types/database'
import { Plus, ArrowRight, Trash2, Globe, Loader2, GripVertical } from 'lucide-react'
import Link from 'next/link'
import { Reorder } from 'framer-motion'

// ─── Add Service Form ────────────────────────────────────────────────
function AddServiceForm({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  // Auto-generate slug from name
  function handleNameChange(v: string) {
    setName(v)
    setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await createService({ name, slug, priority: 0 })
        setName(''); setSlug('')
        setOpen(false)
        onAdded()
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to create service')
      }
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-navy-950 hover:bg-navy-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add Service
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 border border-blue-200 bg-blue-50 rounded-xl space-y-4 max-w-lg mb-6">
      <h3 className="text-sm font-bold text-slate-800">New Service</h3>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Service Name *</label>
        <input
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. NetSuite Consulting"
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">URL Slug *</label>
        <div className="flex items-center gap-0 rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <span className="text-xs text-slate-400 px-3 py-2.5 bg-slate-50 border-r border-slate-200 shrink-0 font-mono">/services/</span>
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="netsuite-consulting"
            className="flex-1 px-3 py-2.5 text-sm font-mono focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending || !name || !slug}
          className="flex items-center gap-1.5 bg-navy-950 hover:bg-navy-800 text-white text-sm px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          {isPending ? 'Creating…' : 'Create Service'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setName(''); setSlug(''); setError('') }}
          className="text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// ─── Service Card ────────────────────────────────────────────────────
function ServiceCard({ service, onDeleted }: { service: Service; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Delete "${service.name}" and all its content? This cannot be undone.`)) return
    setDeleting(true)
    try {
      await deleteService(service.id)
      onDeleted()
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed')
      setDeleting(false)
    }
  }

  return (
    <div className="group relative bg-white border border-slate-100 rounded-xl p-4 flex items-center hover:border-slate-200 hover:shadow-md transition-all duration-200 gap-4">
      <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-1">
        <GripVertical className="w-5 h-5" />
      </div>

      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-navy-50 group-hover:border-navy-100 transition-colors">
        <Globe className="w-4.5 h-4.5 text-slate-400 group-hover:text-navy-600 transition-colors" style={{ width: '18px', height: '18px' }} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-800 mb-0.5 truncate">{service.name}</h3>
        <p className="text-xs text-slate-400 font-mono truncate">/services/{service.slug}</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/admin/services/${service.slug}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-navy-950 hover:bg-navy-800 px-3 py-2 rounded-lg transition-colors"
        >
          Manage
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-100 transition-colors disabled:opacity-40"
          title="Delete service"
        >
          {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────
export function ServicesList({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setServices(initialServices)
  }, [initialServices])

  function removeService(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const handleReorder = async (newOrder: Service[]) => {
    setServices(newOrder)
    setIsSaving(true)
    
    // Calculate new priorities: highest index = lowest priority
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateServicePriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            Services
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Create and manage individual service pages. Click a service to edit its content sections.
          </p>
        </div>
        <AddServiceForm onAdded={() => router.refresh()} />
      </div>

      <div className="relative">
        {isSaving && (
          <div className="absolute top-0 right-0 -mt-6 flex items-center text-sm text-navy-500 z-10">
            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving order...
          </div>
        )}
        
        {services.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <Globe className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-400 mb-1">No services yet</p>
            <p className="text-xs text-slate-400">Click &quot;Add Service&quot; to create your first service page.</p>
          </div>
        ) : (
          <Reorder.Group axis="y" values={services} onReorder={handleReorder} className="space-y-3">
            {services.map((service) => (
              <Reorder.Item key={service.id} value={service} className="relative z-0">
                <ServiceCard
                  service={service}
                  onDeleted={() => removeService(service.id)}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  )
}
