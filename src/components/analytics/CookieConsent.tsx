'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type ConsentState = {
  analytics: boolean
  marketing: boolean
  decided:   boolean
}

const CONSENT_KEY = 'flowtaris_consent'

function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored ? JSON.parse(stored) : null
  } catch { return null }
}

function storeConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  } catch {}
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getStoredConsent())
  }, [])

  return consent
}

export function CookieConsent() {
  const [visible, setVisible]       = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored?.decided) {
      // Slight delay so it doesn't flash on LCP
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
    return undefined
  }, [])

  const accept = (analytics: boolean, marketing: boolean) => {
    const c: ConsentState = { analytics, marketing, decided: true }
    storeConsent(c)
    setVisible(false)

    // Fire analytics if accepted
    if (analytics) {
      window.dispatchEvent(new CustomEvent('consent:analytics'))
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md
                     z-50 bg-white rounded-2xl border border-slate-200 p-5
                     shadow-[0_8px_40px_rgba(10,22,40,0.15)]"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <p
            className="text-sm font-semibold text-navy-900 mb-1"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Cookie Preferences
          </p>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            We use cookies to improve your experience and understand how our site is used.{' '}
            <Link href="/cookie-policy" className="text-gold-600 hover:underline">
              Learn more
            </Link>
          </p>

          {showDetails && (
            <div className="mb-4 space-y-2.5 pt-3 border-t border-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-navy-800">Analytics Cookies</p>
                  <p className="text-xs text-slate-400">Help us understand site usage (GA4, PostHog)</p>
                </div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-navy-800">Essential Cookies</p>
                  <p className="text-xs text-slate-400">Required for the site to function</p>
                </div>
                <span className="text-xs text-emerald-500 font-medium flex-shrink-0">Always on</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => accept(true, true)}
              className="flex-1 py-2 rounded-lg bg-gold-500 hover:bg-gold-400
                         text-white text-xs font-semibold transition-colors"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              Accept All
            </button>
            <button
              onClick={() => accept(false, false)}
              className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600
                         text-xs font-medium hover:bg-slate-50 transition-colors"
            >
              Reject Analytics
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full py-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showDetails ? 'Hide details' : 'Manage preferences'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
