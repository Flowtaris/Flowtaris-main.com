import { createClient } from '@/lib/supabase/server'
import ApplicationsListClient from './ApplicationsListClient'

export default async function AdminJobApplicationsPage() {
  const supabase = await createClient(['job_applications', 'careers'])

  const { data: applications, error } = await supabase
    .from('job_applications')
    .select('*, careers(position_name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
  }

  // Format the data so we can access position_name easily
  const formattedApps = applications?.map((app: any) => ({
    ...app,
    position_name: app.careers?.position_name || 'Deleted Job'
  })) || []

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: 'var(--font-sora)' }}>
            Job Applications
          </h1>
          <p className="text-slate-500">Review and manage candidate applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <ApplicationsListClient initialApplications={formattedApps} />
      </div>
    </div>
  )
}
