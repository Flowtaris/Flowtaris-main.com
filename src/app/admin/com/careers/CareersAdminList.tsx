'use client'

import { Career } from '@/types/database'
import { deleteCareer } from '@/app/actions/career-actions'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CareersAdminList({ initialCareers }: { initialCareers: Career[] }) {
  const [careers, setCareers] = useState(initialCareers)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening? This will also delete all associated applications.')) return
    
    setDeletingId(id)
    try {
      await deleteCareer(id)
      setCareers(careers.filter(c => c.id !== id))
      toast.success('Job deleted successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete job')
    } finally {
      setDeletingId(null)
    }
  }

  if (careers.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        No job openings found. Click "Add Job Opening" to create one.
      </div>
    )
  }

  return (
    <table className="w-full text-left text-sm text-slate-600">
      <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4">Position</th>
          <th className="px-6 py-4">Category</th>
          <th className="px-6 py-4">Location</th>
          <th className="px-6 py-4">Type</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {careers.map(career => (
          <tr key={career.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 font-semibold text-[#0A1628]">
              {career.position_name}
              <div className="text-xs text-slate-400 font-normal mt-1 line-clamp-1">
                {career.short_description}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium">
                {career.category}
              </span>
            </td>
            <td className="px-6 py-4">{career.location}</td>
            <td className="px-6 py-4">{career.employment_type}</td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                career.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {career.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <Link 
                  href={`/admin/careers/${career.id}`}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(career.id)}
                  disabled={deletingId === career.id}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
