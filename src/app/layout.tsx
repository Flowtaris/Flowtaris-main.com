import type { Metadata } from 'next'
import { Sora, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { ToastProvider } from '@/components/ui/Toast'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PageTransition } from '@/components/ui/PageTransition'
import { PageTransitionProvider } from '@/components/ui/PageTransitionProvider'
import { Analytics } from '@/components/analytics/Analytics'
import { CookieConsent } from '@/components/analytics/CookieConsent'
import { ServiceWorkerRegistration } from '@/app/sw'
import SchemaInjector from '@/components/SchemaInjector'
import { Toaster } from 'sonner'
import '@/styles/globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flowtaris.com'),
  title: {
    default: 'Flowtaris',
    template: '%s | Flowtaris',
  },
  description:
    'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
  keywords: [
    'ERP consulting',
    'NetSuite consulting',
    'Coupa consulting',
    'ERP integrations',
    'enterprise automation',
    'SAP consulting',
    'Workday integrations',
    'managed ERP support',
  ],
  authors: [{ name: 'Flowtaris', url: 'https://www.flowtaris.com' }],
  creator: 'Flowtaris',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.flowtaris.com',
    siteName: 'Flowtaris',
    title: 'Flowtaris',
    description:
      'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
    images: [
      {
        url: 'https://www.flowtaris.com/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Flowtaris — Enterprise ERP Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flowtaris',
    creator: '@flowtaris',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { headers } from 'next/headers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = await headers()
  const nonce = headerList.get('x-nonce') || undefined

  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        <PageTransitionProvider>
          <CustomCursor />
          <PageTransition />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                       focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg
                       focus:bg-gold-500 focus:text-white focus:font-semibold
                       focus:text-sm focus:shadow-lg"
          >
            Skip to main content
          </a>
          <ToastProvider>
            {children}
          </ToastProvider>
          <Toaster position="top-center" richColors />
          <Analytics />
          <CookieConsent />
          <ServiceWorkerRegistration />

          <SchemaInjector schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.flowtaris.com/#website",
            "url": "https://www.flowtaris.com",
            "name": "Flowtaris",
            "description": " ERP Consulting Firm",
            "publisher": {
              "@id": "https://www.flowtaris.com/#organization"
            }
          }} />
        </PageTransitionProvider>
      </body>
    </html>
  )
}
