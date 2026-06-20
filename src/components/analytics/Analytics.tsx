'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    posthog?: {
      init: (key: string, options: object) => void
      capture: (event: string, properties?: object) => void
      opt_in_capturing: () => void
    }
  }
}

const GA4_ID     = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com'

export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams)
    }
    if (window.posthog) {
      window.posthog.capture(eventName, eventParams)
    }
  }
}

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Listen for consent event from CookieConsent component
    const handleConsent = () => {
      // Initialize GA4
      if (GA4_ID && !window.gtag) {
        window.dataLayer = window.dataLayer || []
        window.gtag = function (...args: unknown[]) {
          window.dataLayer?.push(args)
        }
        window.gtag('js', new Date())
        window.gtag('config', GA4_ID, { anonymize_ip: true })
      }

      // Initialize PostHog
      if (POSTHOG_KEY && !window.posthog) {
        import('posthog-js').then(({ default: posthog }) => {
          posthog.init(POSTHOG_KEY, {
            api_host:              POSTHOG_HOST,
            capture_pageview:      false, // Manual tracking
            persistence:           'localStorage',
            respect_dnt:           true,
            session_recording: {
              maskAllInputs:       true,  // Privacy: mask form inputs
              maskInputFn:         (text) => text.replace(/./g, '*'),
            },
          })
        })
      }
    }

    window.addEventListener('consent:analytics', handleConsent)
    return () => window.removeEventListener('consent:analytics', handleConsent)
  }, [])

  // Track page views on route change
  useEffect(() => {
    if (window.gtag && GA4_ID) {
      window.gtag('event', 'page_view', { page_path: pathname })
    }
    if (window.posthog) {
      window.posthog.capture('$pageview', { $current_url: window.location.href })
    }
  }, [pathname])

  // Load GA4 script ONLY if already consented (returning visitors)
  return (
    <>
      <ConsentAwareScripts />
    </>
  )
}

function ConsentAwareScripts() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('flowtaris_consent')
      if (!stored) return
      const consent = JSON.parse(stored)
      if (consent?.analytics) {
        window.dispatchEvent(new CustomEvent('consent:analytics'))
      }
    } catch {}
  }, [])

  if (!GA4_ID) return null

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      strategy="lazyOnload"
    />
  )
}
