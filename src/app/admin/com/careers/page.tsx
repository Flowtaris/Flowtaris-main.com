import { createClient } from '@/lib/supabase/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import CareersAdminList from './CareersAdminList'

export default async function AdminCareersPage() {
  const supabase = await createClient(['careers'])

  const { data: careers, error } = await supabase
    .from('careers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching careers:', error)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: 'var(--font-sora)' }}>
            Careers Management
          </h1>
          <p className="text-slate-500">Manage job openings and review applications.</p>
        </div>
        <Link 
          href="/admin/careers/new"
          className="flex items-center gap-2 bg-[#E8A020] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#d69018] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Job Opening
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <CareersAdminList initialCareers={careers || []} />
      </div>
    </div>
  )
}
