'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  badge?: string
}

interface BlogSectionTabsProps {
  tabs: Tab[]
  children: React.ReactNode[]
}

export function BlogSectionTabs({ tabs, children }: BlogSectionTabsProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-0">
      {/* Tab bar */}
      <div className="border-b border-slate-100 bg-white rounded-t-xl overflow-x-auto">
        <nav className="flex min-w-max px-1 pt-1" aria-label="Blog sections">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className={cn(
                'relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-150',
                'border-b-2 -mb-px focus:outline-none',
                active === i
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'
              )}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-1.5 text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-medium">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab panel */}
      <div className="bg-white border border-t-0 border-slate-100 rounded-b-xl shadow-sm p-6">
        {children[active]}
      </div>
    </div>
  )
}
