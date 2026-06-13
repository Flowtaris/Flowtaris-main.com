import { createClient } from '@/lib/supabase/server'
import { ErpCardForm } from '@/components/admin/ErpCardForm'

export const revalidate = 0;

export default async function AdminServicesPage() {
  const supabase = await createClient()
  
  const { data: cards, error } = await supabase
    .from('services_erp_architecture_cards')
    .select('*')
    .order('priority', { ascending: false })

  const safeCards = error ? [] : cards

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            Services - ERP Architecture
          </h1>
          <p className="text-slate-500 mt-1">
            Manage the cards and tags for the Engineering the ERP Architecture section.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-navy-900">Add New ERP Card</h2>
          <ErpCardForm />
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Cards</h2>
          {error && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-lg mb-4 text-sm">
              Note: Could not load cards from Supabase. Make sure you have run the SQL schema setup! 
              ({error.message})
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeCards?.map((item) => (
              <div key={item.id} className="p-4 border border-slate-100 rounded-lg flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-navy-900">{item.title}</h3>
                  <span className="text-xs bg-navy-50 text-navy-600 px-2 py-1 rounded font-medium">
                    Priority: {item.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                   <span className="text-xs text-blue-600 font-medium">Edit details (Coming soon)</span>
                </div>
              </div>
            ))}
            {(!safeCards || safeCards.length === 0) && !error && (
              <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                No cards found. Add one above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
