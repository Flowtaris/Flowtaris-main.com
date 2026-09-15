import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { getSiteConfig } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Terms of Use | Flowtaris',
  description: 'Flowtaris Terms of Use  the terms and conditions governing your use of the Flowtaris website.',
  robots: { index: false, follow: false },
}

export const revalidate = 0;


export default async function TermsOfUsePage() {
  const siteConfig = await getSiteConfig()
  const termsConfig = (siteConfig as any)?.terms_config || {}

  // Fallback to static text if not configured
  const title = termsConfig?.title || 'Terms of Use'
  const badgeText = termsConfig?.badgeText || 'Legal'
  const rawSections = termsConfig?.sections || []
  const effectiveDate = termsConfig?.effectiveDate

  // Pre-render HTML on the server before passing to Client Component
  const { marked } = await import('marked')
  const DOMPurify = (await import('isomorphic-dompurify')).default
  const sections = await Promise.all(
    rawSections.map(async (section: any) => ({
      ...section,
      html: DOMPurify.sanitize(await marked(section.content || '', { gfm: true, breaks: true }) as string)
    }))
  )

  return (
    <>
      <PageHero
        label={badgeText}
        title={title}
        breadcrumbs={[{ label: title }]}
        size="sm"
      />
      <section className="section bg-white">
        <div className="container-content max-w-3xl">
          <AnimatedSection className="prose-flowtaris">
            {effectiveDate && (
              <p className="text-slate-500 text-sm mb-8">Effective Date: {effectiveDate}</p>
            )}

            {sections.length > 0 ? (
              sections.map((section: any, index: number) => (
                <div key={index} className="mb-10">
                  <h2>{section.heading}</h2>
                  <div
                    className="prose-flowtaris"
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                </div>
              ))
            ) : (
              <>
                <p className="text-slate-500 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>

                <h2>Acceptance of Terms</h2>
                <p>
                  By accessing and using the Flowtaris website (flowtaris.com), you agree to be bound
                  by these Terms of Use. If you do not agree to these terms, please do not use our
                  website.
                </p>

                <h2>Use of Website</h2>
                <p>
                  The content on this website is provided for general informational purposes about
                  Flowtaris consulting services. You may not use this website for any unlawful purpose
                  or in a way that could damage, disable, or impair the site.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  All content on this website  including text, graphics, logos, images, and software 
                  is the property of Flowtaris and is protected by intellectual property laws. You may
                  not reproduce, distribute, or create derivative works without written permission.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  Flowtaris provides this website and its content on an &quot;as is&quot; basis.
                  We make no warranties, expressed or implied, regarding the accuracy, completeness,
                  or suitability of the information provided. Flowtaris shall not be liable for any
                  damages arising from the use of this website.
                </p>

                <h2>Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. These links are provided
                  for convenience only and do not constitute an endorsement. Flowtaris is not
                  responsible for the content or practices of linked websites.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with applicable laws.
                  Any disputes arising from these terms shall be resolved through appropriate legal
                  channels.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  Flowtaris reserves the right to modify these Terms of Use at any time. Changes
                  will be effective immediately upon posting. Continued use of the website after
                  changes constitutes acceptance of the updated terms.
                </p>

                <h2>Contact</h2>
                <p>
                  For questions about these terms, contact us at{' '}
                  <a href="mailto:info@flowtaris.com">info@flowtaris.com</a>.
                </p>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
