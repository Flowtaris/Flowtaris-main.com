// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { ViewLiveButton } from '@/app/admin/ai/components/ViewLiveButton'
import { FloatingSaveBar } from '@/app/admin/ai/components/FloatingSaveBar'
import { CheckCircle2, AlertCircle, Shield, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react'

// --- Shared UI Primitives ---

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">
    {children}
  </label>
)

const Field = ({ label, id, children, hint }: { label: string; id?: string; children: React.ReactNode; hint?: string }) => (
  <div className="mb-4">
    <Label htmlFor={id}>{label}</Label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{hint}</p>}
  </div>
)

const TextInput = ({
  id, value, onChange, placeholder, disabled,
}: { id?: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) => (
  <input
    id={id}
    type="text"
    value={value ?? ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5
      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
      focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500
      placeholder-gray-400 disabled:opacity-50 transition-all"
  />
)

const TextArea = ({
  id, value, onChange, rows = 3, placeholder,
}: { id?: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) => (
  <textarea
    id={id}
    value={value ?? ''}
    onChange={e => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5
      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y
      focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500
      placeholder-gray-400 transition-all font-mono"
  />
)

// --- Collapsible Section Wrapper ---

function Section({
  title, description, icon: Icon, defaultOpen = true, children,
}: {
  title: string; description: string; icon: React.ElementType; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/40 dark:bg-amber-900/10 mb-6 overflow-hidden shadow-sm transition-all">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-100 dark:bg-amber-800/30">
            <Icon className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug">{title}</h2>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
          {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>
      {open && (
        <div className="p-5 pt-0 border-t border-amber-100 dark:border-amber-800/20 bg-white/40 dark:bg-gray-800/20">
          <div className="mt-5">{children}</div>
        </div>
      )}
    </div>
  )
}

const DEFAULT_PRIVACY = {
  badgeText: 'Legal & Compliance',
  title: 'Privacy Policy',
  effectiveDate: 'September 1, 2026',
  sections: [
    {
      heading: '1. Our Commitment to Enterprise Security',
      content: 'At Flowtaris AI, security and privacy are foundational. This Privacy & Data Protection Policy outlines our strict protocols for handling enterprise data, specifically concerning our AI integrations with ERP systems (NetSuite, SAP, Coupa, Workday). We operate under a **Zero-Trust Architecture** and maintain strict adherence to global privacy frameworks.'
    },
    {
      heading: '2. Enterprise Data & AI Model Training (Zero Retention)',
      content: 'Your data remains your data. Flowtaris AI guarantees that **customer data is never used to train foundational AI models**. We employ a strict Zero-Data-Retention policy for all GenAI interactions:\n\n*   **No Cross-Tenant Contamination:** Your proprietary financial data is isolated within single-tenant, dedicated vector databases.\n*   **Ephemeral Processing:** Prompts and completions processed through our LLM gateways are never logged, stored, or reviewed by humans.\n*   **Private Instances:** We utilize private, isolated instances of AI models via secure APIs (Azure OpenAI, AWS Bedrock) governed by strict BAA and DPA agreements preventing data retention.'
    }
  ]
}

export default function PrivacyConfigPage() {
  const [data, setData] = useState(DEFAULT_PRIVACY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    fetch('/api/ai/site-config')
      .then(res => res.json())
      .then(config => {
        if (config.privacy_config && config.privacy_config.sections) {
          setData(config.privacy_config)
        } else if (config.privacy_config && config.privacy_config.content) {
          // Migration from markdown string to sections
          setData({
            ...config.privacy_config,
            sections: [
              { heading: 'Privacy Policy Content', content: config.privacy_config.content }
            ]
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateField = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const updateSection = (index: number, field: string, value: string) => {
    setData(prev => {
      const newSections = [...prev.sections]
      newSections[index] = { ...newSections[index], [field]: value }
      return { ...prev, sections: newSections }
    })
    setHasChanges(true)
  }

  const addSection = () => {
    setData(prev => ({
      ...prev,
      sections: [...prev.sections, { heading: 'New Section', content: '' }]
    }))
    setHasChanges(true)
  }

  const removeSection = (index: number) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }))
    setHasChanges(true)
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === data.sections.length - 1) return

    setData(prev => {
      const newSections = [...prev.sections]
      const temp = newSections[index]
      newSections[index] = newSections[index + (direction === 'up' ? -1 : 1)]
      newSections[index + (direction === 'up' ? -1 : 1)] = temp
      return { ...prev, sections: newSections }
    })
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      const res = await fetch('/api/ai/site-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privacy_config: data })
      })
      if (!res.ok) throw new Error('Failed to save')
      setMessage({ type: 'success', text: 'Privacy Policy configuration saved successfully.' })
      setHasChanges(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy Configuration</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage the structured sections of your public Privacy Policy page.
          </p>
        </div>
        <ViewLiveButton href="/privacy" />
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

      <div className="space-y-6">
        <Section title="Page Settings" description="Main title, badge, and effective date" icon={Shield}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Field label="Page Title" hint="The main H1 title shown at the top">
              <TextInput value={data.title} onChange={v => updateField('title', v)} placeholder="Privacy Policy" />
            </Field>
            
            <Field label="Effective Date" hint="Shown right below the title">
              <TextInput value={data.effectiveDate} onChange={v => updateField('effectiveDate', v)} placeholder="September 1, 2026" />
            </Field>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Badge Text" hint="The small pill badge above the title">
              <TextInput value={data.badgeText} onChange={v => updateField('badgeText', v)} placeholder="Legal & Compliance" />
            </Field>
          </div>
        </Section>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Policy Sections</h3>
            <button
              onClick={addSection}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {data.sections.map((section, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm relative group">
                
                {/* Drag Handle & Delete */}
                <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveSection(index, 'down')} disabled={index === data.sections.length - 1} className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                  <button onClick={() => removeSection(index)} className="p-1.5 text-red-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 cursor-grab text-gray-300 dark:text-gray-600">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-4 pr-12">
                    <Field label="Section Heading">
                      <TextInput 
                        value={section.heading} 
                        onChange={v => updateSection(index, 'heading', v)} 
                        placeholder="e.g. 1. Introduction" 
                      />
                    </Field>
                    
                    <Field label="Section Content (Markdown)">
                      <TextArea 
                        value={section.content} 
                        onChange={v => updateSection(index, 'content', v)} 
                        placeholder="Content..." 
                        rows={6}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
            
            {data.sections.length === 0 && (
              <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No sections added yet.</p>
                <button
                  onClick={addSection}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add First Section
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingSaveBar 
        hasChanges={hasChanges}
        saving={saving}
        onSave={handleSave}
        onDiscard={() => {
          setLoading(true);
          fetch('/api/ai/site-config')
            .then(res => res.json())
            .then(config => {
              if (config.privacy_config && config.privacy_config.sections) setData(config.privacy_config)
              else setData(DEFAULT_PRIVACY)
              setLoading(false)
              setHasChanges(false)
            })
        }}
      />
    </div>
  )
}


