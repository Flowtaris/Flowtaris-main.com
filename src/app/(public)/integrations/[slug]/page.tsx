import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import DynamicIntegrationClient from './DynamicIntegrationClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('integrations')
    .select('meta_title, meta_description, name')
    .eq('slug', slug)
    .single()

  if (!data) return {}
  return {
    title: data.meta_title || data.name,
    description: data.meta_description,
    alternates: {
      canonical: `https://flowtaris.com/integrations/${slug}`,
    },
    openGraph: {
      title: data.meta_title || data.name,
      description: data.meta_description,
      url: `https://flowtaris.com/integrations/${slug}`,
      type: 'website',
    },
  }
}

export default async function IntegrationSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the parent integration record
  const { data: integration } = await supabase
    .from('integrations')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!integration) {
    notFound()
  }

  const integrationId = integration.id

  // Fetch all content sections scoped to this integration
  const [
    { data: heroData },
    { data: securityMainData },
    { data: securityCardsData },
    { data: traceData },
  ] = await Promise.all([
    supabase.from('integrations_hero').select('*').eq('integration_id', integrationId).limit(1).maybeSingle(),
    supabase.from('integrations_security_precision_main').select('*').eq('integration_id', integrationId).limit(1).maybeSingle(),
    supabase.from('integrations_security_precision_cards').select('*').eq('integration_id', integrationId).order('created_at', { ascending: true }),
    supabase.from('integrations_execution_trace').select('*').eq('integration_id', integrationId).order('created_at', { ascending: true }),
  ])

  return (
    <DynamicIntegrationClient
      integration={integration}
      hero={heroData ?? null}
      securityMain={securityMainData ?? null}
      securityCards={securityCardsData ?? []}
      traceSteps={traceData ?? []}
    />
  )
}
