import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ChatWrapper } from '@/components/chat/ChatWrapper'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export default async function NotFound() {
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

  const settingsMap = (settingsData || []).reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation dynamicServices={dynamicServices || []} settings={settingsMap} />
      <div className="h-[72px]" aria-hidden="true" />
      <main className="flex-1 flex items-center justify-center px-4 bg-grid-navy">
        <div className="text-center max-w-lg">
          <div className="text-[120px] font-bold text-navy-800 leading-none mb-4 select-none"
               style={{ fontFamily: 'var(--font-sora)' }}>
            404
          </div>
          <div className="w-16 h-px bg-gold-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-sora)' }}>
            Page Not Found
          </h1>
          <p className="text-navy-300 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-400
                         text-white font-semibold text-sm transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-navy-700 text-navy-300
                         hover:border-navy-500 hover:text-white text-sm font-medium
                         transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer settings={settingsMap} socialLinks={socialLinks || []} />
      <ChatWrapper whatsappNumber={settingsMap['whatsapp_number'] || settingsMap['phone_number'] || '919391274394'} />
    </div>
  )
}
