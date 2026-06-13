import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Flowtaris — Enterprise ERP & Integration Consulting',
    template: '%s | Flowtaris',
  },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Navigation />
      
      {/* Offset for fixed nav */}
      <div className="h-[72px] flex-shrink-0" aria-hidden="true" />
      
      {/* Main content */}
      <main className="flex-1 w-full" id="main-content">
        {children}
      </main>

      {/* Footer in normal document flow */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
