'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { upsertSiteSetting } from '@/app/actions/settings-actions'
import { AboutTrustedPartner } from '@/types/database'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface Props {
  initialHeading: string
  initialPartners: AboutTrustedPartner[]
}

export function AboutTrustedEditor({ initialHeading, initialPartners }: Props) {
  const [heading, setHeading] = useState(initialHeading)
  const [partners, setPartners] = useState<AboutTrustedPartner[]>(initialPartners)
  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)

  //  Heading save 
  async function saveHeading() {
    setIsPending(true)
    setMessage('')
    try {
      await upsertSiteSetting('about_trusted_heading', heading)
      setMessage('Heading saved!')
    } catch (e: any) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setIsPending(false)
    }
  }

  //  Add new partner 
  async function addPartner() {
    setIsPending(true)
    setMessage('')
    try {
      const newPartner = { id: crypto.randomUUID(), name: 'New Partner', label: 'Partner', priority: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      const newPartners = [...partners, newPartner]
      await upsertSiteSetting('about_trusted_partners', JSON.stringify(newPartners))
      setPartners(newPartners)
      setMessage('Partner added!')
    } catch (e: any) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setIsPending(false)
    }
  }

  //  Update partner field inline 
  function handlePartnerChange(id: string, field: 'name' | 'label' | 'image_url', value: string) {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  async function savePartnersList(updatedPartners: AboutTrustedPartner[]) {
    setIsPending(true)
    setMessage('')
    try {
      await upsertSiteSetting('about_trusted_partners', JSON.stringify(updatedPartners))
      setPartners(updatedPartners)
      setMessage('Partners saved!')
    } catch (e: any) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setIsPending(false)
    }
  }

  //  Delete partner 
  async function removePartner(id: string) {
    setIsPending(true)
    setMessage('')
    try {
      const newPartners = partners.filter((p) => p.id !== id)
      await upsertSiteSetting('about_trusted_partners', JSON.stringify(newPartners))
      setPartners(newPartners)
      setMessage('Partner removed.')
    } catch (e: any) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Heading editor */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Section Heading</h3>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Trusted to architect the backbone of industry leaders."
          />
          <button
            onClick={saveHeading}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {isPending ? 'Saving' : 'Save Heading'}
          </button>
        </div>
      </div>

      {/* Partner badges editor */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">Partner Badges</h3>
          <div className="flex gap-2">
            <button
              onClick={() => savePartnersList(partners)}
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
            >
              Save All Partners
            </button>
            <button
              onClick={addPartner}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Partner
            </button>
          </div>
        </div>

        {partners.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No partners yet. Add one above.</p>
        ) : (
          <div className="space-y-3">
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Name (displayed in badge)</label>
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => handlePartnerChange(partner.id, 'name', e.target.value)}
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. NetSuite"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Label (below badge)</label>
                    <input
                      type="text"
                      value={partner.label}
                      onChange={(e) => handlePartnerChange(partner.id, 'label', e.target.value)}
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Solution Provider"
                    />
                  </div>
                  <div className="col-span-2">
                    <ImageUpload 
                      label="Badge Image (optional)" 
                      value={partner.image_url || ''} 
                      onChange={(url) => handlePartnerChange(partner.id, 'image_url', url)} 
                    />
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => removePartner(partner.id)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && (
        <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
