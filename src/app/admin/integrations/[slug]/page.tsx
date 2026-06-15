import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ServicesSectionTabs } from '@/components/admin/services/ServicesSectionTabs'
import { IntegrationsHeroEditor } from '@/components/admin/integrations/IntegrationsHeroEditor'
import { IntegrationsSecurityPrecisionEditor } from '@/components/admin/integrations/IntegrationsSecurityPrecisionEditor'
import { IntegrationsExecutionTraceEditor } from '@/components/admin/integrations/IntegrationsExecutionTraceEditor'

export const revalidate = 0

export default async function AdminIntegrationDetailPage({
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
    .maybeSingle()

  if (!integration) notFound()

  const integrationId = integration.id

  // Fetch all content scoped to this integration
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

  const tabs = [
    { id: 'hero',               label: 'Hero' },
    { id: 'security-precision', label: 'Security Precision', badge: String(securityCardsData?.length ?? 0) },
    { id: 'execution-trace',    label: 'Execution Trace',    badge: String(traceData?.length ?? 0) },
  ]

  return (
    <div className="space-y-6">
      {/* Back + Page header */}
      <div>
        <Link
          href="/admin/integrations"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Integrations
        </Link>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          {integration.name}
        </h1>
        <p className="text-slate-400 mt-0.5 text-xs font-mono">/integrations/{integration.slug}</p>
        <p className="text-slate-500 mt-1 text-sm">
          Manage the 3 content sections of this integration page.
        </p>
      </div>

      {/* Tabbed sections */}
      <ServicesSectionTabs tabs={tabs}>
        {/* ── 1. HERO ───────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Hero Section</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the hero H1 tag and description shown at the top of the page.
            </p>
          </div>
          <IntegrationsHeroEditor integrationId={integrationId} initialData={heroData ?? null} />
        </div>

        {/* ── 2. SECURITY PRECISION ─────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Security Precision (Grid Features)</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Provide a short description and allow adding feature cards (SVG code, title, and description).
            </p>
          </div>
          <IntegrationsSecurityPrecisionEditor 
            integrationId={integrationId} 
            initialMain={securityMainData ?? null} 
            initialCards={securityCardsData ?? []} 
          />
        </div>

        {/* ── 3. EXECUTION TRACE ────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Execution Trace</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add tracing steps with a short description, card title, and code snippet payload.
            </p>
          </div>
          <IntegrationsExecutionTraceEditor 
            integrationId={integrationId} 
            initialCards={traceData ?? []} 
          />
        </div>
      </ServicesSectionTabs>
    </div>
  )
}
