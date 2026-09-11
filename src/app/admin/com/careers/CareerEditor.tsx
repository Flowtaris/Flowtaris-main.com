'use client'

import { Career } from '@/types/database'
import { createCareer, updateCareer } from '@/app/actions/career-actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CareerEditor({ initialData }: { initialData?: Career }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!initialData

  const [formData, setFormData] = useState({
    position_name: initialData?.position_name || '',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || '',
    responsibilities: initialData?.responsibilities || '',
    requirements: initialData?.requirements || '',
    category: initialData?.category || 'Engineering',
    location: initialData?.location || '',
    employment_type: initialData?.employment_type || 'Full-Time',
    status: initialData?.status || 'Active'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (isEditing) {
        await updateCareer(initialData.id, formData)
        toast.success('Job updated successfully')
      } else {
        await createCareer(formData)
        toast.success('Job created successfully')
      }
      router.push('/admin/careers')
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Failed to save job')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = ['Engineering', 'Design', 'Marketing', 'Sales', 'Operations', 'HR', 'Finance', 'Other']

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/careers" className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>
              {isEditing ? 'Edit Job Opening' : 'New Job Opening'}
            </h1>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#0A1628] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#E8A020] transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? 'Saving...' : 'Save Job'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Position Name</label>
            <input
              type="text"
              name="position_name"
              required
              value={formData.position_name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Remote, New York, London"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Employment Type</label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
          <textarea
            name="short_description"
            required
            rows={2}
            value={formData.short_description}
            onChange={handleChange}
            placeholder="2-3 lines for the job card..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Full Description</label>
          <textarea
            name="full_description"
            required
            rows={5}
            value={formData.full_description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Responsibilities (Optional)</label>
          <textarea
            name="responsibilities"
            rows={5}
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Use bullet points or plain text..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Requirements (Optional)</label>
          <textarea
            name="requirements"
            rows={5}
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Use bullet points or plain text..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
          />
        </div>
      </div>
    </form>
  )
}
