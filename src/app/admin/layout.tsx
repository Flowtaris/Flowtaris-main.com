import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminTopBar } from '@/components/admin/AdminTopBar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // Detect if we're on the admin subdomain to redirect correctly
    const headersList = await headers()
    const host = headersList.get('host') || ''
    if (host === 'admin.flowtaris.com') {
      redirect('/login')
    } else {
      redirect('/admin/login')
    }
  }
  
  // Role from user metadata (default to 'admin' if not set, since 
  // only authenticated users reach here through Supabase auth)
  const role = user.user_metadata?.role || 'admin'
  
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

