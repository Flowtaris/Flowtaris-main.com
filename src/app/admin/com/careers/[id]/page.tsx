import { createClient } from '@/lib/supabase/server'
import CareerEditor from '../CareerEditor'
import { notFound } from 'next/navigation'

export default async function EditCareerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient(['careers'])
  const { data: career } = await supabase.from('careers').select('*').eq('id', params.id).single()

  if (!career) notFound()

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <CareerEditor initialData={career} />
    </div>
  )
}
