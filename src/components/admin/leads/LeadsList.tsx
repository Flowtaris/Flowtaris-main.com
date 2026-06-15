'use client'

import { useState } from 'react'
import { Lead } from '@/types/database'
import { formatDistanceToNow } from 'date-fns'
import { Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { deleteLead, updateLeadStatus } from '@/app/actions/lead-actions'

function LeadRow({ lead, onUpdate, onDelete }: { lead: Lead, onUpdate: () => void, onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [updating, setUpdating] = useState(false)

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUpdating(true)
    try {
      await updateLeadStatus(lead.id, e.target.value)
      onUpdate()
    } catch (err) {
      alert('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      await deleteLead(lead.id)
      onDelete()
    } catch (err) {
      alert('Failed to delete lead')
    }
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-colors">
      <div 
        className="p-4 flex items-center gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <div className="hidden sm:flex shrink-0 w-12 h-12 bg-navy-50 rounded-full items-center justify-center text-navy-900 font-bold uppercase text-lg">
            {lead.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy-900 truncate">
              {lead.name} <span className="text-slate-400 font-normal">({lead.company || 'No Company'})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">{lead.work_email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 uppercase tracking-wider">
              {lead.form_type}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">
              {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
            </p>
          </div>
          
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            <select
              value={lead.status}
              onChange={handleStatusChange}
              disabled={updating}
              className={`text-xs font-medium rounded-lg px-2.5 py-1.5 border appearance-none outline-none ${
                lead.status === 'new' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                lead.status === 'contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                lead.status === 'qualified' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed / Won</option>
              <option value="lost">Lost</option>
            </select>

            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete lead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-400">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 p-5 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Contact Details</h4>
              <p className="text-slate-600"><span className="font-medium">Name:</span> {lead.name}</p>
              <p className="text-slate-600"><span className="font-medium">Email:</span> <a href={`mailto:${lead.work_email}`} className="text-blue-600 hover:underline">{lead.work_email}</a></p>
              <p className="text-slate-600"><span className="font-medium">Company:</span> {lead.company || '—'}</p>
              <p className="text-slate-600"><span className="font-medium">Preferred Contact:</span> {lead.preferred_contact || '—'}</p>
            </div>
            
            {(lead.platform || lead.service_needed || lead.project_timeline || lead.team_size) && (
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Project Details</h4>
                {lead.platform && <p className="text-slate-600"><span className="font-medium">Platform:</span> {lead.platform}</p>}
                {lead.service_needed && <p className="text-slate-600"><span className="font-medium">Service Needed:</span> {lead.service_needed}</p>}
                {lead.project_timeline && <p className="text-slate-600"><span className="font-medium">Timeline:</span> {lead.project_timeline}</p>}
                {lead.team_size && <p className="text-slate-600"><span className="font-medium">Company Size:</span> {lead.team_size}</p>}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {lead.question && (
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Question</h4>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap">
                  {lead.question}
                </div>
              </div>
            )}
            
            {lead.business_challenge && (
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Business Challenge</h4>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap">
                  {lead.business_challenge}
                </div>
              </div>
            )}

            {lead.current_challenge && (
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Current Challenge</h4>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap">
                  {lead.current_challenge}
                </div>
              </div>
            )}

            {lead.desired_outcome && (
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Desired Outcome</h4>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap">
                  {lead.desired_outcome}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function LeadsList({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)

  if (leads.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 mt-6">
        <h3 className="text-lg font-bold text-navy-900 mb-2">No leads yet</h3>
        <p className="text-slate-500">When someone submits the contact form, it will appear here.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {leads.map((lead) => (
        <LeadRow 
          key={lead.id} 
          lead={lead} 
          onUpdate={() => {
            // Revalidation handles the refresh from server, but we can optimistically update
            // if needed. For now, trusting the server action's revalidatePath.
          }}
          onDelete={() => {
            setLeads(leads.filter(l => l.id !== lead.id))
          }}
        />
      ))}
    </div>
  )
}
