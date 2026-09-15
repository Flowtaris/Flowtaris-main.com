// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { ViewLiveButton } from '@/app/admin/ai/components/ViewLiveButton'
import { FloatingSaveBar } from '@/app/admin/ai/components/FloatingSaveBar'
import { CheckCircle2, AlertCircle, Share2, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Mail, MapPin, Globe } from 'lucide-react'

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

// --- Platform Icons Map for UI preview ---

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  email: Mail,
  linkedin: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  x: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  facebook: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  youtube: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  map: MapPin,
  whatsapp: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.532 5.862L0 24l6.272-1.506A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.032-1.388l-.36-.214-3.726.895.928-3.625-.235-.372A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
}

const getPlatformIcon = (platform: string) => {
  const Icon = PLATFORM_ICONS[platform.toLowerCase()] || Globe
  return <Icon className="w-5 h-5" />
}

const DEFAULT_SOCIALS = [
  { platform: 'email', url: 'mailto:hello@flowtaris.com' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/flowtaris-private-limited/' },
  { platform: 'twitter', url: 'https://x.com/flowtaris' },
  { platform: 'facebook', url: 'https://www.facebook.com/people/Flowtaris/61588772333370/#' },
  { platform: 'youtube', url: 'https://www.youtube.com/@Flowtaris' },
  { platform: 'map', url: 'https://www.google.com/maps' },
  { platform: 'whatsapp', url: 'https://api.whatsapp.com/' },
  { platform: 'instagram', url: 'https://www.instagram.com/flowtaris_official' }
]

export default function SocialLinksConfigPage() {
  const [links, setLinks] = useState(DEFAULT_SOCIALS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    fetch('/api/ai/site-config')
      .then(res => res.json())
      .then(config => {
        if (config.social_links_config && Array.isArray(config.social_links_config) && config.social_links_config.length > 0) {
          setLinks(config.social_links_config)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateLink = (index: number, field: string, value: string) => {
    setLinks(prev => {
      const newLinks = [...prev]
      newLinks[index] = { ...newLinks[index], [field]: value }
      return newLinks
    })
    setHasChanges(true)
  }

  const addLink = () => {
    setLinks(prev => [...prev, { platform: 'globe', url: 'https://' }])
    setHasChanges(true)
  }

  const removeLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index))
    setHasChanges(true)
  }

  const moveLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === links.length - 1) return

    setLinks(prev => {
      const newLinks = [...prev]
      const temp = newLinks[index]
      newLinks[index] = newLinks[index + (direction === 'up' ? -1 : 1)]
      newLinks[index + (direction === 'up' ? -1 : 1)] = temp
      return newLinks
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
        body: JSON.stringify({ social_links_config: links })
      })
      if (!res.ok) throw new Error('Failed to save')
      setMessage({ type: 'success', text: 'Social links configuration saved successfully.' })
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Social Links Configuration</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage the social media icons and links displayed in the site footer.
          </p>
        </div>
        <ViewLiveButton href="/" />
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
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Footer Social Links</h3>
            <button
              onClick={addLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Link
            </button>
          </div>

          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm relative group">
                
                {/* Drag Handle & Delete */}
                <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveLink(index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveLink(index, 'down')} disabled={index === links.length - 1} className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                  <button onClick={() => removeLink(index)} className="p-1.5 text-red-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 cursor-grab text-gray-300 dark:text-gray-600">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {getPlatformIcon(link.platform)}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 pr-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Platform Icon" hint="Supported: email, linkedin, twitter, x, facebook, youtube, map, whatsapp, instagram">
                        <TextInput 
                          value={link.platform} 
                          onChange={v => updateLink(index, 'platform', v)} 
                          placeholder="e.g. linkedin" 
                        />
                      </Field>
                      
                      <Field label="URL / Link">
                        <TextInput 
                          value={link.url} 
                          onChange={v => updateLink(index, 'url', v)} 
                          placeholder="https://..." 
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {links.length === 0 && (
              <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No social links added yet.</p>
                <button
                  onClick={addLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add First Link
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
              if (config.social_links_config) setLinks(config.social_links_config)
              else setLinks(DEFAULT_SOCIALS)
              setLoading(false)
              setHasChanges(false)
            })
        }}
      />
    </div>
  )
}


