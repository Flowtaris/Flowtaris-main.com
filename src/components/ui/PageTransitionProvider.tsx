'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export interface TransitionContextType {
  isTransitioning: boolean
  navigate: (href: string) => void
}

export const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function useTransitionContext() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransitionContext must be used within a PageTransitionProvider')
  }
  return context
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  const navigate = (href: string) => {
    if (
      href.startsWith('http') ||
      href.startsWith('#') ||
      href.includes('mailto:') ||
      href.includes('tel:') ||
      href.startsWith('javascript:')
    ) {
      window.location.href = href
      return
    }

    if (pathname === href) {
      return
    }

    if (href.startsWith('/admin') || pathname.startsWith('/admin')) {
      router.push(href)
      return
    }

    setPendingPath(href)
    setIsTransitioning(true)
  }

  useEffect(() => {
    if (isTransitioning && pendingPath) {
      const timer = setTimeout(() => {
        router.push(pendingPath)
      }, 750)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isTransitioning, pendingPath, router])

  useEffect(() => {
    setIsTransitioning(false)
    setPendingPath(null)
  }, [pathname])

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }

      if (!target || !(target instanceof HTMLAnchorElement)) return

      const href = target.getAttribute('href')
      if (!href) return

      if (target.getAttribute('target') === '_blank') return

      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.includes('mailto:') ||
        href.includes('tel:') ||
        href.startsWith('javascript:')
      ) {
        return
      }

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
        return
      }

      if (href.startsWith('/admin') || window.location.pathname.startsWith('/admin')) {
        return
      }

      const currentPath = window.location.pathname
      if (currentPath === href) {
        return
      }

      e.preventDefault()
      navigate(href)
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigate }}>
      {children}
    </TransitionContext.Provider>
  )
}
