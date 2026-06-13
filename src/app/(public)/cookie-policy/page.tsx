import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Cookie Policy | Flowtaris',
  description: 'Flowtaris Cookie Policy — how we use cookies and similar technologies on our website.',
  robots: { index: false, follow: false },
}

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Cookie Policy"
        breadcrumbs={[{ label: 'Cookie Policy' }]}
        size="sm"
      />
      <section className="section bg-white">
        <div className="container-content max-w-3xl">
          <AnimatedSection className="prose-flowtaris">
            <p className="text-slate-500 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>

            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              help the website remember your preferences and understand how you interact with
              the site.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              Flowtaris uses cookies for the following purposes:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function properly, including session management and security features.</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website through PostHog analytics. These cookies collect anonymized usage data.</li>
              <li><strong>Preference cookies:</strong> Remember your choices such as cookie consent preferences and theme settings.</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              We use PostHog for website analytics. PostHog may set cookies to track
              anonymous usage patterns. No personally identifiable information is collected
              through analytics cookies without your consent.
            </p>

            <h2>Managing Cookies</h2>
            <p>
              You can manage your cookie preferences through our cookie consent banner when
              you first visit the site. You can also control cookies through your browser
              settings. Note that disabling certain cookies may affect the functionality of
              our website.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about our cookie practices, contact us at{' '}
              <a href="mailto:info@flowtaris.com">info@flowtaris.com</a>.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
