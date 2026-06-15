import { requireRole } from '@/lib/admin/requireAuth'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { FaqEditor } from '@/components/admin/FaqEditor'

interface Props {
  params: Promise<{ id: string }>
}

export default async function FaqEditPage({ params }: Props) {
  await requireRole(['super_admin', 'content_manager', 'seo_manager'])
  const supabase = await createClient()
  const { id } = await params

  let faq = null

  if (id !== 'new') {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single()

    if (!data) notFound()
    faq = data
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          {faq ? 'Edit FAQ' : 'New FAQ'}
        </h1>
      </div>

      <div className="admin-card">
        <FaqEditor faq={faq} />
      </div>
    </div>
  )
}
