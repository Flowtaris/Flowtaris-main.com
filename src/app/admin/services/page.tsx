import { createClient } from '@/lib/supabase/server'
import { ServicesList } from '@/components/admin/services/ServicesList'

export const revalidate = 0

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('priority', { ascending: false })

  return <ServicesList initialServices={services ?? []} />
}
