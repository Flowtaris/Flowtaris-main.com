import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import ClientPage from './ClientPage'

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data } = await supabase.from('integrations').select('meta_title, meta_description').eq('slug', 'procurement-to-GL').single()
  
  if (!data) return {}
  return {
    title: data.meta_title,
    description: data.meta_description,
    alternates: {
      canonical: 'https://flowtaris.com/integrations/procurement-to-GL',
    },
    openGraph: {
      title: data.meta_title,
      description: data.meta_description,
      url: 'https://flowtaris.com/integrations/procurement-to-GL',
      type: 'website',
    },
  }
}

export default async function IntegrationSlugPage() {
  const supabase = await createClient()
  const { data: integration } = await supabase.from('integrations').select('*').eq('slug', 'procurement-to-GL').single()

  if (!integration) {
    notFound()
  }

  return <ClientPage integration={integration} />
}
