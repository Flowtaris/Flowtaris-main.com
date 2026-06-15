import { createClient } from '@/lib/supabase/server'
import { IntegrationForm } from '@/components/admin/IntegrationForm'
import { IntegrationsList } from '@/components/admin/IntegrationsList'

export const revalidate = 0; // Ensures it's dynamically rendered

export default async function AdminIntegrationsPage() {
  const supabase = await createClient()
  
  const { data: integrations, error } = await supabase
    .from('integrations')
    .select('*')
    .order('priority', { ascending: false })

  // If table doesn't exist yet, just mock the array so the page renders
  const safeIntegrations = error ? [] : integrations

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            Integrations
          </h1>
          <p className="text-slate-500 mt-1">
            Manage the integrations catalog and their SVG logos.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-navy-900">Add New Integration</h2>
          <IntegrationForm />
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Integrations</h2>
          {error && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-lg mb-4 text-sm">
              Note: Could not load integrations from Supabase. Make sure you have run the SQL schema setup! 
              ({error.message})
            </div>
          )}
          
          <div className="mt-4">
            <IntegrationsList initialIntegrations={safeIntegrations || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
