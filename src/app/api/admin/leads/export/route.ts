import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseAuth = await createClient()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAuth
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!['super_admin', 'lead_manager'].includes(profile?.role ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (!leads) return NextResponse.json({ error: 'No data' }, { status: 500 })

  const headers = ['Name', 'Company', 'Email', 'Type', 'Platform', 'Service', 'Timeline', 'Challenge', 'Status', 'Source', 'Country', 'Date']
  const rows = leads.map((l) => [
    l.name,
    l.company ?? '',
    l.work_email,
    l.form_type,
    Array.isArray(l.platform) ? l.platform.join(' | ') : '',
    l.service_needed ?? '',
    l.project_timeline ?? '',
    (l.business_challenge ?? '').replace(/,/g, ';'),
    l.status,
    l.source ?? '',
    l.ip_country ?? '',
    new Date(l.created_at).toISOString().slice(0, 10),
  ])

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  })
}
