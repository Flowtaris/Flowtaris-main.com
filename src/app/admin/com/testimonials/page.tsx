import { createClient } from '@/lib/supabase/server'
import { TestimonialForm } from '@/components/admin/TestimonialForm'
import { TestimonialList } from '@/components/admin/TestimonialList'

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const supabase = await createClient()
  
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('priority', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          Testimonials
        </h1>
        <p className="text-slate-500 mt-1">
          Manage client testimonials to display on the Home Page.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-navy-900">Add New Testimonial</h2>
          <TestimonialForm />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Existing Testimonials</h2>
          <TestimonialList initialTestimonials={testimonials || []} />
        </div>
      </div>
    </div>
  )
}
