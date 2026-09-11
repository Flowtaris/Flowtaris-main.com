import { createClient } from '@/lib/supabase/server'
import { ServicesSectionTabs } from '@/components/admin/services/ServicesSectionTabs'
import { AboutHeroEditor } from '@/components/admin/about/AboutHeroEditor'
import { AboutTopicsEditor } from '@/components/admin/about/AboutTopicsEditor'
import { AboutTrustedEditor } from '@/components/admin/about/AboutTrustedEditor'

export const revalidate = 0

export default async function AdminAboutPage() {
  const supabase = await createClient()

  const [
    { data: heroData },
    { data: topicsData },
    { data: settingsData },
  ] = await Promise.all([
    supabase.from('about_hero').select('*').limit(1).maybeSingle(),
    supabase.from('about_topics').select('*').order('created_at', { ascending: true }),
    supabase.from('site_settings').select('key, value').in('key', ['about_trusted_heading', 'about_trusted_partners'])
  ])

  const settingsMap = (settingsData || []).reduce((acc: any, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  const trustedHeading = settingsMap['about_trusted_heading'] || 'Trusted to architect the backbone of industry leaders.'
  let trustedPartners = []
  try {
    if (settingsMap['about_trusted_partners']) {
      trustedPartners = JSON.parse(settingsMap['about_trusted_partners'])
    } else {
      trustedPartners = [
        { id: '1', name: 'NetSuite', label: 'Solution Provider' },
        { id: '2', name: 'Coupa', label: 'Certified Partner' },
        { id: '3', name: 'SAP', label: 'Silver Partner' }
      ]
    }
  } catch (e) {
    console.error('Failed to parse trusted partners', e)
  }

  const tabs = [
    { id: 'hero',   label: 'Hero' },
    { id: 'topics', label: 'Topics', badge: String(topicsData?.length ?? 0) },
    { id: 'trusted', label: 'Trusted' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          About Page
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Manage the content sections of the About page.
        </p>
      </div>

      <ServicesSectionTabs tabs={tabs}>
        {/* ── 1. HERO ───────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Hero Section</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit the H1 tag, description, and image URL for the About page hero.
            </p>
          </div>
          <AboutHeroEditor initialData={heroData ?? null} />
        </div>

        {/* ── 2. TOPICS ─────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Topics</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add multiple topics with their descriptions to display on the About page.
            </p>
          </div>
          <AboutTopicsEditor initialTopics={topicsData ?? []} />
        </div>

        {/* ── 3. TRUSTED ────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Trusted Partners</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage the trusted partners section.
            </p>
          </div>
          <AboutTrustedEditor initialHeading={trustedHeading} initialPartners={trustedPartners} />
        </div>
      </ServicesSectionTabs>
    </div>
  )
}
