import { createClient } from '@/lib/supabase/server'
import { HeroForm } from '@/components/admin/HeroForm'
import { HeroImagesSection } from '@/components/admin/HeroImagesSection'

export const revalidate = 0;

export default async function AdminHeroPage() {
  const supabase = await createClient()
  
  const { data: heroes, error } = await supabase
    .from('global_hero')
    .select('*')
    .limit(1)

  const hero = heroes?.[0] || null

  const { data: heroImages } = await supabase
    .from('global_hero_images')
    .select('*')
    .order('created_at', { ascending: true })

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

      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            Hero Carousel Cards
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Manage the animated image cards shown in the hero section.
          </p>
        </div>
        
        {hero ? (
          <HeroImagesSection heroId={hero.id} initialImages={heroImages || []} />
        ) : (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-lg text-sm">
            Please create a Global Hero first to add cards.
          </div>
        )}
      </div>
    </div>
  )
}
