import { createClient } from '@/lib/supabase/server'
import { TechnologyForm } from '@/components/admin/TechnologyForm'

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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies?.map((item) => (
              <div key={item.id} className="p-4 border border-slate-100 rounded-lg flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center mb-3">
                   {/* In a real scenario, this would be an <img src={item.logo_url} /> */}
                   <span className="text-xs text-slate-400">Logo URL</span>
                </div>
                <div className="text-center w-full">
                  <p className="text-xs text-slate-500 truncate mb-1" title={item.logo_url}>{item.logo_url}</p>
                  <span className="text-xs bg-navy-50 text-navy-600 px-2 py-1 rounded font-medium">
                    Priority: {item.priority}
                  </span>
                </div>
              </div>
            ))}
            {(!technologies || technologies.length === 0) && (
              <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                No technologies found. Add one above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
