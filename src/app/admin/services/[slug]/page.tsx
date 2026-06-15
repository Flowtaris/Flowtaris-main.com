import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ServicesSectionTabs } from '@/components/admin/services/ServicesSectionTabs'
import { ServicesHeroEditor } from '@/components/admin/services/ServicesHeroEditor'
import { ServicesWhyChooseEditor } from '@/components/admin/services/ServicesWhyChooseEditor'
import { ServicesBusinessSuiteEditor } from '@/components/admin/services/ServicesBusinessSuiteEditor'
import { ServicesErpArchitectureEditor } from '@/components/admin/services/ServicesErpArchitectureEditor'
import { ServicesDeepModuleEditor } from '@/components/admin/services/ServicesDeepModuleEditor'

export const revalidate = 0

export default async function AdminServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the parent service record
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!service) notFound()

  const serviceId = service.id

  // Fetch all content scoped to this service
  const [
    { data: heroData },
    { data: whyChooseData },
    { data: suiteMainData },
    { data: suiteItemsData },
    { data: erpMainData },
    { data: erpCardsData },
    { data: deepModuleData },
  ] = await Promise.all([
    supabase.from('services_hero').select('*').eq('service_id', serviceId).limit(1).maybeSingle(),
    supabase.from('services_why_choose').select('*').eq('service_id', serviceId).order('created_at', { ascending: true }),
    supabase.from('services_business_suite_main').select('*').eq('service_id', serviceId).limit(1).maybeSingle(),
    supabase.from('services_business_suite_items').select('*').eq('service_id', serviceId).order('created_at', { ascending: true }),
    supabase.from('services_erp_architecture_main').select('*').eq('service_id', serviceId).limit(1).maybeSingle(),
    supabase.from('services_erp_architecture_cards').select('*').eq('service_id', serviceId).order('priority', { ascending: false }),
    supabase.from('services_deep_module').select('*').eq('service_id', serviceId).order('created_at', { ascending: true }),
  ])

  const tabs = [
    { id: 'hero',           label: 'Hero' },
    { id: 'why-choose',     label: 'Why Choose Service',       badge: String(whyChooseData?.length ?? 0) },
    { id: 'business-suite', label: 'Business Management Suite', badge: String(suiteItemsData?.length ?? 0) },
    { id: 'erp-arch',       label: 'ERP Architecture',          badge: String(erpCardsData?.length ?? 0) },
    { id: 'deep-module',    label: 'Deep Module Expertise',     badge: String(deepModuleData?.length ?? 0) },
  ]

  return (
    <div className="space-y-6">
      {/* Back + Page header */}
      <div>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Services
        </Link>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          {service.name}
        </h1>
        <p className="text-slate-400 mt-0.5 text-xs font-mono">/services/{service.slug}</p>
        <p className="text-slate-500 mt-1 text-sm">
          Manage the 5 content sections of this service page.
        </p>
      </div>

      {/* Tabbed sections */}
      <ServicesSectionTabs tabs={tabs}>
        {/* ── 1. HERO ───────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Hero Section</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the hero headline and supporting description shown at the top of the service page.
            </p>
          </div>
          <ServicesHeroEditor serviceId={serviceId} initialData={heroData ?? null} />
        </div>

        {/* ── 2. WHY CHOOSE SERVICE ─────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Why Choose Service</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add, edit or delete cards. Each card has a main description and a small description.
            </p>
          </div>
          <ServicesWhyChooseEditor serviceId={serviceId} initialCards={whyChooseData ?? []} />
        </div>

        {/* ── 3. BUSINESS MANAGEMENT SUITE ──────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">A Complete Business Management Suite</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the section small description and manage sub-sections (title, description, and image).
            </p>
          </div>
          <ServicesBusinessSuiteEditor
            serviceId={serviceId}
            initialMain={suiteMainData ?? null}
            initialItems={suiteItemsData ?? []}
          />
        </div>

        {/* ── 4. ERP ARCHITECTURE ───────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Engineering the ERP Architecture</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the section description and manage architecture cards with title, description, tags, and priority ordering.
            </p>
          </div>
          <ServicesErpArchitectureEditor
            serviceId={serviceId}
            initialMain={erpMainData ?? null}
            initialCards={erpCardsData ?? []}
          />
        </div>

        {/* ── 5. DEEP MODULE EXPERTISE ──────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Deep Module Expertise</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add, edit or delete module expertise cards. Each card has a title and small description.
            </p>
          </div>
          <ServicesDeepModuleEditor serviceId={serviceId} initialCards={deepModuleData ?? []} />
        </div>
      </ServicesSectionTabs>
    </div>
  )
}
