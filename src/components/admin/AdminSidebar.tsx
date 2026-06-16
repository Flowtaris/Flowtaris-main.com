'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, FileText, BookOpen,
  FolderOpen, HelpCircle, Search, ImageIcon,
  Settings, Shield, LogOut, Star, Database, Cpu, Link2, Info,
  type LucideIcon
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface NavItem {
  label:  string
  href:   string
  icon:   LucideIcon
  roles:  string[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',    href: '/admin',              icon: LayoutDashboard, roles: ['super_admin', 'content_manager', 'seo_manager', 'lead_manager'] },
  { label: 'Hero Section', href: '/admin/hero',         icon: Star,            roles: ['super_admin', 'content_manager'] },
  { label: 'Technologies', href: '/admin/technologies', icon: Cpu,             roles: ['super_admin', 'content_manager'] },
  { label: 'Services',     href: '/admin/services',     icon: Database,        roles: ['super_admin', 'content_manager'] },
  { label: 'Why Choose Us',href: '/admin/why-choose-us',icon: Users,           roles: ['super_admin', 'content_manager'] },
  { label: 'Integrations', href: '/admin/integrations', icon: Link2,           roles: ['super_admin', 'content_manager'] },
  { label: 'About',        href: '/admin/about',        icon: Info,            roles: ['super_admin', 'content_manager'] },
  { label: 'Contact Forms',href: '/admin/leads',        icon: Users,           roles: ['super_admin', 'lead_manager'] },
  { label: 'Blog',         href: '/admin/blog',         icon: BookOpen,        roles: ['super_admin', 'content_manager'] },
  { label: 'Case Studies', href: '/admin/case-studies',  icon: Star,            roles: ['super_admin', 'content_manager'] },
  { label: 'Resources',    href: '/admin/resources',    icon: FolderOpen,      roles: ['super_admin', 'content_manager'] },
  { label: 'FAQs',         href: '/admin/faqs',         icon: HelpCircle,      roles: ['super_admin', 'content_manager', 'seo_manager'] },
  { label: 'SEO',          href: '/admin/seo',          icon: Search,          roles: ['super_admin', 'seo_manager'] },
  { label: 'Media',        href: '/admin/media',        icon: ImageIcon,       roles: ['super_admin', 'content_manager'] },
  { label: 'Settings',     href: '/admin/settings',     icon: Settings,        roles: ['super_admin'] },
  { label: 'Users',        href: '/admin/users',        icon: Shield,          roles: ['super_admin'] },
  { label: 'Audit Log',    href: '/admin/audit-log',    icon: FileText,        roles: ['super_admin'] },
]

import { adminSignOut } from '@/app/actions/auth-actions'

export function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname()

  const filteredNav = NAV_ITEMS.filter((item) => item.roles.includes(role))

  const signOut = async () => {
    try {
      const res = await adminSignOut()
      if (res?.success) {
        window.location.href = '/admin/login'
      }
    } catch (err: any) {
      console.warn('Failed to sign out:', err?.message || err)
    }
  }

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(href)

  return (
    <aside className="w-64 flex-shrink-0 bg-navy-950 flex-col h-full border-r border-navy-800 hidden lg:flex">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-navy-800 flex items-center gap-2.5">
        <Image
          src="/images/logo.png"
          alt="Flowtaris"
          width={40}
          height={40}
          className="w-8 h-8 object-contain"
        />
        <div>
          <div className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'var(--font-sora)' }}>FLOWTARIS</div>
          <div className="text-[9px] text-navy-500 tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-jetbrains)' }}>Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5" aria-label="Admin navigation">
        {filteredNav.map((item) => {
          const Icon   = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                'transition-all duration-150',
                active
                  ? 'bg-navy-800 text-white border border-navy-700'
                  : 'text-navy-400 hover:bg-navy-900 hover:text-navy-100'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-gold-400' : 'text-navy-500')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-navy-800">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm
                     text-navy-400 hover:bg-navy-900 hover:text-red-400
                     transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
