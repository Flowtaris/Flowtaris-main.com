import { createClient } from '@/lib/supabase/server'
import { LeadsList } from '@/components/admin/leads/LeadsList'

export const revalidate = 0

export const metadata = {
  title: 'Leads Management - Admin',
}

export default async function AdminLeadsPage() {
  const supabase = await createClient()
  
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          Contact Submissions & Leads
        </h1>
        <p className="text-slate-500 mt-1">
          View and manage inquiries, consultations, and proposals from the public website.
        </p>
      </div>

      <LeadsList initialLeads={leads ?? []} />
    </div>
  )
}
