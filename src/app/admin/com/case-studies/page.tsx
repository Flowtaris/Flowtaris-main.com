import { createClient } from '@/lib/supabase/server'
import { CaseStudiesList } from '@/components/admin/case-studies/CaseStudiesList'

export const revalidate = 0

export default async function AdminCaseStudiesPage() {
  const supabase = await createClient()
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: true })

  return <CaseStudiesList initialCaseStudies={caseStudies ?? []} />
}
