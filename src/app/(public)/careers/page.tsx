import { createClient } from '@/lib/supabase/server'
import CareersListClient from './CareersListClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers  Flowtaris',
  description: 'Join the Flowtaris team. View our open job positions and apply today.',
}

export default async function CareersPage() {
  const supabase = await createClient(['careers'])
  const { data: careers, error } = await supabase
    .from('careers')
    .select('*')
    .eq('status', 'Active')
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching careers:', error)

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#E8A020] selection:text-white">
      <CareersListClient initialCareers={careers || []} />
    </main>
  )
}
