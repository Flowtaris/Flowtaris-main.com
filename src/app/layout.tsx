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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://flowtaris.com'),
  title: {
    default: 'Flowtaris — Enterprise ERP & Integration Consulting',
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
  authors: [{ name: 'Flowtaris', url: 'https://flowtaris.com' }],
  creator: 'Flowtaris',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowtaris.com',
    siteName: 'Flowtaris',
    title: 'Flowtaris — Enterprise ERP & Integration Consulting',
    description:
      'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
    images: [
      {
        url: 'https://flowtaris.com/og-default.png',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <Analytics />
          <CookieConsent />
          <ServiceWorkerRegistration />
          
          <SchemaInjector schema={{
            "@context": "https://schema.org",
            "@type": ["Organization", "ProfessionalService"],
            "@id": "https://flowtaris.com/#organization",
            "name": "Flowtaris",
            "url": "https://flowtaris.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://flowtaris.com/logo.png",
              "width": 512,
              "height": 512
            },
            "description": "Flowtaris is a boutique, enterprise-grade ERP consulting firm specialising in NetSuite, Coupa, SAP, and Workday implementations and optimisation.",
            "foundingDate": "2020-01-01",
            "numberOfEmployees": {
              "@type": "QuantitativeValue",
              "minValue": 10,
              "maxValue": 50
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Level 1, 333 George Street",
              "addressLocality": "Sydney",
              "addressRegion": "NSW",
              "postalCode": "2000",
              "addressCountry": "Australia"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+61-2-1234-5678",
              "contactType": "customer service",
              "email": "contact@flowtaris.com",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/flowtaris",
              "https://twitter.com/flowtaris",
              "https://www.crunchbase.com/organization/flowtaris"
            ],
            "areaServed": "Worldwide",
            "serviceType": "ERP Consulting",
            "knowsAbout": [
              "Enterprise Resource Planning (ERP)",
              "NetSuite Implementation",
              "Coupa Business Spend Management",
              "SAP S/4HANA",
              "Workday HCM",
              "ERP Integration",
              "SuiteScript Development",
              "AP Automation",
              "ERP Health Audit",
              "Change Management",
              "Financial Systems Architecture",
              "iPaaS Middleware"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "ERP Consulting Services",
              "url": "https://flowtaris.com/services"
            }
          }} />

          <SchemaInjector schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://flowtaris.com/#website",
            "url": "https://flowtaris.com",
            "name": "Flowtaris",
            "description": "Boutique ERP Consulting Firm",
            "publisher": {
              "@id": "https://flowtaris.com/#organization"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://flowtaris.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }} />

          <SchemaInjector schema={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": "https://flowtaris.com/",
            "name": "Flowtaris",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [
                ".hero-tagline",
                ".service-description-card",
                ".faq-answer-block",
                ".contact-info-footer"
              ]
            }
          }} />
        </PageTransitionProvider>
      </body>
    </html>
  )
}
