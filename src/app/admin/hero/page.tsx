import { createClient } from '@/lib/supabase/server'
import { HeroForm } from '@/components/admin/HeroForm'

export const revalidate = 0;

export default async function AdminHeroPage() {
  const supabase = await createClient()
  
  const { data: heroes, error } = await supabase
    .from('global_hero')
    .select('*')
    .limit(1)

  const hero = heroes?.[0] || null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            Global Hero Section
          </h1>
          <p className="text-slate-500 mt-1">
            Manage the main text and descriptions for the homepage hero.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden p-6">
        {error ? (
           <div className="bg-amber-50 text-amber-800 p-4 rounded-lg text-sm">
             Could not load hero data from Supabase. Did you run the SQL schema? ({error.message})
           </div>
        ) : (
          <HeroForm initialData={hero} />
        )}
      </div>
    </div>
  )
}
