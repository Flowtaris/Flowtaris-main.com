import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Privacy Policy | Flowtaris',
  description: 'Flowtaris Privacy Policy — how we collect, use and protect your personal information.',
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        size="sm"
      />
      <section className="section bg-white">
        <div className="container-content max-w-3xl">
          <AnimatedSection className="prose-flowtaris">
            <p className="text-slate-500 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>

            <h2>Information We Collect</h2>
            <p>
              Flowtaris collects information you provide through our contact forms, including your
              name, company name, work email address, and project details. We use this information
              solely to respond to your inquiries and provide our consulting services.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use your information to respond to consultation requests, provide proposals, and
              communicate about services relevant to your inquiry. We do not sell or share your
              personal information with third parties for marketing purposes.
            </p>

            <h2>Data Security</h2>
            <p>
              Your information is stored securely using enterprise-grade infrastructure. We implement
              appropriate technical and organizational measures to protect your personal data.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal
              information. Contact us at info@flowtaris.com for any data-related requests.
            </p>

            <h2>Cookies</h2>
            <p>
              We use analytics cookies to understand how visitors use our website. See our{' '}
              <a href="/cookie-policy">Cookie Policy</a> for details. You can manage your cookie
              preferences at any time.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We use the following third-party services to operate our website and business:
              Supabase (data storage), Vercel (hosting), PostHog (analytics), Resend (email),
              and hCaptcha (spam prevention). Each service processes data according to their
              respective privacy policies.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy-related questions, contact us at{' '}
              <a href="mailto:info@flowtaris.com">info@flowtaris.com</a>.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
