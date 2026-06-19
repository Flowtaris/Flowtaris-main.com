import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { TarixChatWidget } from '@/components/chat/TarixChatWidget'

import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: {
    default: 'Flowtaris — Enterprise ERP & Integration Consulting',
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

  const settingsMap = (settingsData || []).reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

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
        <Footer settings={settingsMap} socialLinks={socialLinks || []} />
      </div>

      <TarixChatWidget whatsappNumber={settingsMap['whatsapp_number'] || settingsMap['phone_number'] || '919391274394'} />
    </div>
  )
}
