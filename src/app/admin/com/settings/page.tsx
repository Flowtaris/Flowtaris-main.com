import { createClient } from '@/lib/supabase/server'
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm'
import { SocialLinksForm } from '@/components/admin/SocialLinksForm'
import { SiteSetting, SocialLink } from '@/types/database'

export default async function SettingsAdminPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('site_settings')
    .select('*')

  const settingsMap = (data as SiteSetting[])?.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>) || {}

  const { data: socialLinks } = await supabase
    .from('social_links')
    .select('*')
    .order('priority', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold mb-4">Global Branding</h2>
        <SiteSettingsForm initialSettings={settingsMap} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold mb-4">Social Links (Footer)</h2>
        <SocialLinksForm initialLinks={(socialLinks as SocialLink[]) || []} />
      </div>
    </div>
  )
}
