import { createClient } from '@/lib/supabase/server'
import { ManagementCapabilitiesForm } from '@/components/admin/ManagementCapabilitiesForm'
import { ManagementCapabilitiesList } from '@/components/admin/ManagementCapabilitiesList'

export const revalidate = 0; // Ensures it's dynamically rendered

export default async function AdminManagementCapabilitiesPage() {
  const supabase = await createClient()
  
  const { data: capabilities, error } = await supabase
    .from('management_capabilities')
    .select('*')
    .order('display_order', { ascending: true })

  // If table doesn't exist yet, just mock the array so the page renders
  const safeCapabilities = error ? [] : capabilities

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            Management Capabilities
          </h1>
          <p className="text-slate-500 mt-1">
            Manage the capabilities banner shown on the platform.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-navy-900">Add New Capability</h2>
          <ManagementCapabilitiesForm />
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Capabilities</h2>
          {error && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-lg mb-4 text-sm">
              Note: Could not load management capabilities from Supabase. Make sure you have run the SQL schema setup! 
              ({error.message})
            </div>
          )}
          
          <div className="mt-4">
            <ManagementCapabilitiesList initialCapabilities={safeCapabilities || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
