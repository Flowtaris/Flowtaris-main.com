import { createClient } from '@/lib/supabase/server'
import FaqAdminClient from './FaqAdminClient'

export default async function AdminFaqsPage() {
  const supabase = await createClient()

  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching FAQs:', error)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: 'var(--font-sora)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500">Manage the FAQs displayed on the home page.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <FaqAdminClient initialFaqs={faqs || []} />
      </div>
    </div>
  )
}
