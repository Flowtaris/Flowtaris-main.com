import { createClient } from '@/lib/supabase/server'
import { WhyChooseUsForm } from '@/components/admin/WhyChooseUsForm'

export const revalidate = 0;

export default async function AdminWhyChooseUsPage() {
  const supabase = await createClient()
  
  const { data: cards, error } = await supabase
    .from('why_choose_us_cards')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          Why Choose Us
        </h1>
        <p className="text-slate-500 mt-1">
          Manage the cards showing why clients should choose Flowtaris.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-navy-900">Add New Card</h2>
          <WhyChooseUsForm />
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards?.map((item) => (
              <div key={item.id} className="p-4 border border-slate-100 rounded-lg flex flex-col">
                {item.image_url && (
                   <div className="w-full h-32 bg-slate-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                      {/* Placeholder for image */}
                      <span className="text-xs text-slate-400">Image: {item.image_url}</span>
                   </div>
                )}
                <h3 className="font-semibold text-navy-900 text-sm mb-1 line-clamp-2">{item.description}</h3>
                <p className="text-xs text-slate-500 line-clamp-3 mb-4 flex-1">{item.small_description}</p>
                <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100">
                   <span className="text-xs text-blue-600 font-medium">Edit details (Coming soon)</span>
                </div>
              </div>
            ))}
            {(!cards || cards.length === 0) && (
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
