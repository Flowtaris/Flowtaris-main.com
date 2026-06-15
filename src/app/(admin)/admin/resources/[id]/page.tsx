import { requireRole } from '@/lib/admin/requireAuth'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ResourceEditor } from '@/components/admin/ResourceEditor'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ResourceEditPage({ params }: Props) {
  await requireRole(['super_admin', 'content_manager'])
  const supabase = await createClient()
  const { id } = await params

  let resource = null

  if (id !== 'new') {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single()

    if (!data) notFound()
    resource = data
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          {resource ? 'Edit Resource' : 'New Resource'}
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {resource ? `Editing: ${resource.title}` : 'Create a new downloadable resource'}
        </p>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <ResourceEditor resource={resource} />
      </div>
    </div>
  )
}
