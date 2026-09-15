// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ViewLiveButton } from '@/app/admin/ai/components/ViewLiveButton'
import { FloatingSaveBar } from '@/app/admin/ai/components/FloatingSaveBar'
import {
  CheckCircle2, AlertCircle, ChevronDown, ChevronUp,
  ArrowLeft, Plus, Trash2, GripVertical
} from 'lucide-react'
import Link from 'next/link'
import { STATIC_FALLBACKS } from './fallbackData'

// --- Shared UI Primitives ---

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
    {children}
  </label>
)

const TextInput = ({ value, onChange, placeholder, disabled = false }: { value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) => (
  <input
    type="text"
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-3.5 py-2.5 text-sm
      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50
      focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400
      placeholder-gray-400 transition-all"
  />
)

const Textarea = ({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) => (
  <textarea
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-3.5 py-2.5 text-sm
      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y
      focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400
      placeholder-gray-400 transition-all"
  />
)

// --- Collapsible Section Wrapper ---

function Section({
  title, description, defaultOpen = false, children,
}: {
  title: string
  description?: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
          {children}
        </div>
      )}
    </div>
  )
}

export default function CapabilityDetailConfig() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Entire site_config so we can preserve other keys
  const [fullConfig, setFullConfig] = useState<any>({})
  
  // The specific capability detail object
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/ai/site-config')
      .then(res => res.json())
      .then(config => {
        setFullConfig(config)
        const detailsDict = config.capability_details_config || {}
        
        // If it exists in DB, use it. Otherwise, initialize from fallback data.
        if (detailsDict[slug]) {
          setData(detailsDict[slug])
        } else if (STATIC_FALLBACKS[slug]) {
          setData(STATIC_FALLBACKS[slug])
        } else {
          setData({
            slug,
            category: 'Category',
            title: 'New Capability',
            accent_color: '#3b82f6',
            headline: '',
            subheadline: '',
            maturity: 'production',
            problem_eyebrow: '',
            problem_headline: '',
            problem_body: '',
            problem_stat_value: '',
            problem_stat_label: '',
            stats: [],
            steps: [],
            integrations_headline: '',
            integrations_body: '',
            integration_logos: [],
            quote_text: '',
            quote_author: '',
            quote_role: '',
            quote_company: '',
            features: [],
            faq_items: [],
            cta_headline: '',
            cta_body: '',
            cta_primary_label: '',
            cta_primary_href: '',
            cta_secondary_label: '',
            cta_secondary_href: '',
            related_slugs: [],
            seo_title: '',
            seo_description: '',
            seo_keywords: '',
            is_published: true,
          })
        }
        setLoading(false)
      })
  }, [slug])

  const handleUpdate = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })
    
    // Update the specific slug within the dictionary
    const updatedDetailsConfig = {
      ...(fullConfig.capability_details_config || {}),
      [slug]: data
    }

    try {
      const res = await fetch('/api/ai/site-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ capability_details_config: updatedDetailsConfig }),
      })
      if (!res.ok) throw new Error('Failed to save')
      
      setFullConfig((prev: any) => ({ ...prev, capability_details_config: updatedDetailsConfig }))
      setHasChanges(false)
      setMessage({ type: 'success', text: 'Details saved successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    }
  }

  if (loading || !data) return (
    <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/ai/capabilities-config" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Capabilities Overview
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Edit Capability: {data.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-mono bg-gray-100 dark:bg-gray-800 inline-block px-2 py-1 rounded">
            /{slug}
          </p>
        </div>
        <ViewLiveButton href={`https://flowtaris.ai/capabilities/${slug}`} />
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 
          'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <Section title="Header & Hero" description="The top section of the detail page" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Title</Label>
            <TextInput value={data.title} onChange={v => handleUpdate('title', v)} />
          </div>
          <div>
            <Label>Category</Label>
            <TextInput value={data.category} onChange={v => handleUpdate('category', v)} />
          </div>
          <div className="md:col-span-2">
            <Label>Headline</Label>
            <Textarea value={data.headline} onChange={v => handleUpdate('headline', v)} rows={2} />
          </div>
          <div className="md:col-span-2">
            <Label>Subheadline</Label>
            <Textarea value={data.subheadline} onChange={v => handleUpdate('subheadline', v)} rows={3} />
          </div>
          <div>
            <Label>Accent Color (Hex)</Label>
            <TextInput value={data.accent_color} onChange={v => handleUpdate('accent_color', v)} />
          </div>
          <div>
            <Label>Maturity Label</Label>
            <select
              value={data.maturity || 'production'}
              onChange={e => handleUpdate('maturity', e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-3.5 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="production">Production</option>
              <option value="beta">Beta</option>
              <option value="alpha">Alpha</option>
            </select>
          </div>
        </div>
      </Section>

      <Section title="The Problem" description="The core problem this capability solves">
        <div className="space-y-6">
          <div>
            <Label>Problem Eyebrow</Label>
            <TextInput value={data.problem_eyebrow} onChange={v => handleUpdate('problem_eyebrow', v)} />
          </div>
          <div>
            <Label>Problem Headline</Label>
            <Textarea value={data.problem_headline} onChange={v => handleUpdate('problem_headline', v)} rows={2} />
          </div>
          <div>
            <Label>Problem Body Paragraphs</Label>
            <Textarea value={data.problem_body} onChange={v => handleUpdate('problem_body', v)} rows={6} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div>
              <Label>Key Stat Value (e.g., "4.2 days")</Label>
              <TextInput value={data.problem_stat_value} onChange={v => handleUpdate('problem_stat_value', v)} />
            </div>
            <div>
              <Label>Key Stat Label</Label>
              <TextInput value={data.problem_stat_label} onChange={v => handleUpdate('problem_stat_label', v)} />
            </div>
          </div>
        </div>
      </Section>
      
      <Section title="Metrics & Stats" description="The 4 key metrics highlighted below the problem">
        <div className="space-y-4">
          {(data.stats || []).map((stat: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Value</Label>
                    <TextInput value={stat.value} onChange={v => {
                      const newStats = [...data.stats]; newStats[index].value = v; handleUpdate('stats', newStats)
                    }} />
                  </div>
                  <div>
                    <Label>Label</Label>
                    <TextInput value={stat.label} onChange={v => {
                      const newStats = [...data.stats]; newStats[index].label = v; handleUpdate('stats', newStats)
                    }} />
                  </div>
                </div>
                <div>
                  <Label>Context</Label>
                  <TextInput value={stat.context} onChange={v => {
                    const newStats = [...data.stats]; newStats[index].context = v; handleUpdate('stats', newStats)
                  }} />
                </div>
              </div>
              <button onClick={() => {
                const newStats = data.stats.filter((_: any, i: number) => i !== index); handleUpdate('stats', newStats)
              }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg h-fit">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button onClick={() => handleUpdate('stats', [...(data.stats || []), { value: '', label: '', context: '' }])} className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Add Stat
          </button>
        </div>
      </Section>

      <Section title="SEO & Settings" description="Metadata and publish status">
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <input type="checkbox" id="published" checked={data.is_published} onChange={e => handleUpdate('is_published', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="published" className="text-sm font-bold text-gray-900 dark:text-white">Page is Published and Accessible</label>
          </div>
          <div>
            <Label>SEO Title</Label>
            <TextInput value={data.seo_title} onChange={v => handleUpdate('seo_title', v)} />
          </div>
          <div>
            <Label>SEO Description</Label>
            <Textarea value={data.seo_description} onChange={v => handleUpdate('seo_description', v)} rows={2} />
          </div>
        </div>
      </Section>

      <FloatingSaveBar hasChanges={hasChanges} saving={saving} onSave={handleSave} />
    </div>
  )
}

