'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { updateApplicationStatus, getResumeUrl, deleteApplication } from '@/app/actions/career-actions'
import { FileText, Mail, Phone, Calendar, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

type ApplicationWithJob = {
  id: string
  career_id: string | null
  name: string
  email: string
  phone: string | null
  message: string | null
  resume_url: string | null
  status: string
  created_at: string
  position_name: string
}

export default function ApplicationsListClient({ initialApplications }: { initialApplications: ApplicationWithJob[] }) {
  const [applications, setApplications] = useState(initialApplications)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    try {
      await updateApplicationStatus(id, newStatus)
      setApplications(apps => apps.map(a => a.id === id ? { ...a, status: newStatus } : a))
      toast.success('Status updated successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    setUpdatingId(id)
    try {
      await deleteApplication(id)
      setApplications(apps => apps.filter(a => a.id !== id))
      toast.success('Application deleted successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete application')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDownload = async (path: string) => {
    try {
      const url = await getResumeUrl(path)
      window.open(url, '_blank')
    } catch (error) {
      console.error(error)
      toast.error('Failed to get resume link')
    }
  }

  if (applications.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        No applications received yet.
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-100">
      {applications.map(app => (
        <div key={app.id} className="p-6 hover:bg-slate-50/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-[#0A1628]">{app.name}</h3>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                  Applied for: {app.position_name}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4" /> {app.email}
                </a>
                {app.phone && (
                  <a href={`tel:${app.phone}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <Phone className="w-4 h-4" /> {app.phone}
                  </a>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {format(new Date(app.created_at), 'MMM d, yyyy')}
                </div>
              </div>

              {app.message && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-600 mb-4">
                  <p className="font-semibold text-slate-800 mb-1">Cover Letter / Message:</p>
                  <p className="whitespace-pre-wrap">{app.message}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-3 min-w-[200px]">
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                disabled={updatingId === app.id}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 transition-all ${
                  app.status === 'New' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                  app.status === 'Reviewed' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                  app.status === 'Hired' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                  'bg-rose-50 border-rose-200 text-rose-700'
                }`}
              >
                <option value="New">New</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="flex items-center gap-4 mt-2">
                {app.resume_url && (
                  <button
                    onClick={() => handleDownload(app.resume_url!)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#0A1628] hover:text-[#E8A020] transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    View Resume
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(app.id)}
                  disabled={updatingId === app.id}
                  className="flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-700 transition-colors disabled:opacity-50"
                  title="Delete Application"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}
