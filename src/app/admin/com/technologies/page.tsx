import { createClient } from '@/lib/supabase/server'
import { TechnologyForm } from '@/components/admin/TechnologyForm'
import { TechnologiesList } from '@/components/admin/TechnologiesList'

export const revalidate = 0;

export default async function AdminTechnologiesPage() {
  const supabase = await createClient()
  
  const { data: technologies, error } = await supabase
    .from('modern_technologies')
    .select('*')
    .order('priority', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          Modern Technologies
        </h1>
        <p className="text-slate-500 mt-1">
          Manage the technology logos and their priorities.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-navy-900">Add New Technology</h2>
          <TechnologyForm />
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Technologies</h2>
          <TechnologiesList initialTechnologies={technologies || []} />
        </div>
      </div>
    </div>
  )
}
