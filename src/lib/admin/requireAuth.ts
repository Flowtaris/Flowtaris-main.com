import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) redirect('/admin/login')

  return { user, profile }
}

export async function requireRole(allowedRoles: string[]) {
  const { user, profile } = await requireAuth()
  if (!allowedRoles.includes(profile.role)) redirect('/admin')
  return { user, profile }
}
