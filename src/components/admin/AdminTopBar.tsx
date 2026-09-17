import { User } from 'lucide-react'

interface Props { userName: string; role: string }

const roleLabels: Record<string, string> = {
  admin:           'Admin',
  super_admin:     'Super Admin',
  content_manager: 'Content Manager',
  seo_manager:     'SEO Manager',
  lead_manager:    'Lead Manager',
}

export function AdminTopBar({ userName, role }: Props) {
  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-6 flex-shrink-0 gap-4">
      <div className="flex-1">
        {/* Left side empty or reserved for other items */}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-navy-900 leading-none" style={{ fontFamily: 'var(--font-sora)' }}>
            {userName}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{roleLabels[role] ?? role}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
          <User className="w-4 h-4 text-gold-400" />
        </div>
      </div>
    </header>
  )
}
