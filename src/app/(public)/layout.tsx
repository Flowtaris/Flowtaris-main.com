import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ChatWrapper } from '@/components/chat/ChatWrapper'

import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: {
    default: 'Flowtaris',
    template: '%s | Flowtaris',
  },
}

import { unstable_cache } from 'next/cache'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const getLayoutData = unstable_cache(
  async () => {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const [
      { data: dynamicServices },
      { data: settingsData },
      { data: socialLinks }
    ] = await Promise.all([
      supabase.from('services').select('id, name, slug, priority, services_hero(color, normal_description)').order('priority', { ascending: false }),
      supabase.from('site_settings').select('*'),
      supabase.from('social_links').select('*').order('priority', { ascending: false })
    ])

    return { dynamicServices, settingsData, socialLinks }
  },
  ['layout-data-cache'],
  { revalidate: 60, tags: ['layout-data'] }
)

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { dynamicServices, settingsData, socialLinks } = await getLayoutData()
  let aiConfig = null
  try {
    const { getSiteConfig } = await import('@/lib/supabase')
    aiConfig = await getSiteConfig()
  } catch (err) {
    console.error('Failed to fetch AI site config:', err)
  }

  const settingsMap = (settingsData || []).reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  // Override with AI Config so changes in /admin/ai/site-config reflect here
  let finalSocialLinks = socialLinks || []

  if (aiConfig) {
    if (aiConfig.site_name) settingsMap.company_name = aiConfig.site_name
    if (aiConfig.logo_url) settingsMap.logo_url = aiConfig.logo_url
    
    // Override Social Links
    if (aiConfig.social_links_config && Array.isArray(aiConfig.social_links_config)) {
      finalSocialLinks = aiConfig.social_links_config
        .filter((l: any) => l.isActive)
        .map((l: any) => ({
          id: l.id,
          platform_name: l.platform,
          url: l.url,
          icon_svg: null,
          is_active: l.isActive
        }))
    }
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Navigation dynamicServices={dynamicServices || []} settings={settingsMap} />

      {/* Offset for fixed nav */}
      <div className="h-[72px] flex-shrink-0" aria-hidden="true" />

      {/* Main content */}
      <main className="flex-1 w-full" id="main-content">
        {children}
      </main>

      {/* Footer in normal document flow */}
      <div className="w-full">
        <Footer settings={settingsMap} socialLinks={finalSocialLinks} />
      </div>

      <ChatWrapper whatsappNumber={settingsMap['whatsapp_number'] || settingsMap['phone_number'] || '919391274394'} />
    </div>
  )
}
