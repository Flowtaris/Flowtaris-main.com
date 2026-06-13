import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  dark?: boolean
}

export function Breadcrumb({ items, className, dark = false }: BreadcrumbProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol className="flex items-center flex-wrap gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1

          return (
            <li
              key={index}
              className="flex items-center gap-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index === 0 ? (
                <Link
                  href="/"
                  className={cn(
                    'flex items-center transition-colors duration-150',
                    dark
                      ? 'text-navy-400 hover:text-white'
                      : 'text-slate-400 hover:text-navy-700'
                  )}
                  itemProp="item"
                >
                  <Home className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only" itemProp="name">Home</span>
                </Link>
              ) : isLast ? (
                <span
                  className={cn(
                    'text-xs font-medium',
                    dark ? 'text-white' : 'text-navy-800'
                  )}
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    'text-xs transition-colors duration-150',
                    dark
                      ? 'text-navy-400 hover:text-white'
                      : 'text-slate-400 hover:text-navy-700'
                  )}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}

              {!isLast && (
                <ChevronRight
                  className={cn(
                    'w-3 h-3 shrink-0',
                    dark ? 'text-navy-600' : 'text-slate-300'
                  )}
                  aria-hidden="true"
                />
              )}

              <meta itemProp="position" content={String(index + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
