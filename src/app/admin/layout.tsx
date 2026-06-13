import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminTopBar } from '@/components/admin/AdminTopBar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin-login')
  }
  
  // For role-based access, you might fetch from a users table
  const role = user.user_metadata?.role || 'super_admin'
  const userName = user.email || 'Admin User'

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <AdminSidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar userName={userName} role={role} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
