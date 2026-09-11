import { createClient } from '@/lib/supabase/server'
import { WhyChooseUsForm } from '@/components/admin/WhyChooseUsForm'
import { WhyChooseUsList } from '@/components/admin/WhyChooseUsList'
import { WhyChooseUsSectorForm } from '@/components/admin/WhyChooseUsSectorForm'
import { WhyChooseUsSectorsList } from '@/components/admin/WhyChooseUsSectorsList'

export const revalidate = 0;

export default async function AdminWhyChooseUsPage() {
  const supabase = await createClient()
  
  const { data: cards, error } = await supabase
    .from('why_choose_us_cards')
    .select('*')
    .order('priority', { ascending: false })

  const { data: sectors } = await supabase
    .from('why_choose_us_sectors')
    .select('*')
    .order('priority', { ascending: false })

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

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-navy-900">Add New Sector (Tab)</h2>
          <WhyChooseUsSectorForm />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Sectors</h2>
          <WhyChooseUsSectorsList initialSectors={sectors || []} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-navy-900">Add New Card</h2>
          <WhyChooseUsForm sectors={sectors || []} />
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Cards</h2>
          <WhyChooseUsList initialCards={cards || []} sectors={sectors || []} />
        </div>
      </div>
    </div>
  )
}
