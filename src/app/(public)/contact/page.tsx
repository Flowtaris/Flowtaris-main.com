import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Mail, Clock, Calendar, FileText, MessageSquare } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ContactForm } from '@/components/forms/ContactForm'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact Flowtaris — Book an ERP Consultation',
  description: 'Book a consultation, request a proposal or get in touch with the Flowtaris enterprise ERP and integration consulting team.',
}

const contactOptions = [
  {
    icon:        Calendar,
    title:       'Book a Consultation',
    description: 'Schedule a 30–45 minute call with a certified ERP consultant to discuss your requirements.',
    value:       'consultation',
  },
  {
    icon:        FileText,
    title:       'Request a Proposal',
    description: 'Share your project details and receive a structured proposal from our team.',
    value:       'proposal',
  },
  {
    icon:        MessageSquare,
    title:       'General Inquiry',
    description: 'Ask a question about our services, platforms, engagement models or anything else.',
    value:       'inquiry',
  },
]

const trustItems = [
  { icon: Clock,  text: 'Response within 1 business day' },
  { icon: Mail,   text: 'info@flowtaris.com' },
]

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home',    url: '/' },
    { name: 'Contact', url: '/contact' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Dark header */}
      <div className="bg-grid-navy py-16 md:py-20">
        <div className="container-content">
          <AnimatedSection className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-px w-6 bg-gold-500" />
              <span
                className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                Get In Touch
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              Start a Conversation with Our ERP Team.
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              Whether you need implementation support, an integration built, ongoing managed
              services or just want to explore how we can help — we respond fast and give you
              honest answers.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Form — 3/5 */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-400">Loading form...</div>}>
                  <ContactForm />
                </Suspense>
              </AnimatedSection>
            </div>

            {/* Sidebar — 2/5 */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection delay={100}>
                {/* Engagement options */}
                <div>
                  <p
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 mb-5"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    How We Can Help
                  </p>
                  <div className="space-y-3">
                    {contactOptions.map((opt) => {
                      const Icon = opt.icon
                      return (
                        <div key={opt.value} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-slate-100">
                          <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-gold-400" />
                          </div>
                          <div>
                            <p
                              className="text-sm font-semibold text-navy-900 mb-0.5"
                              style={{ fontFamily: 'var(--font-sora)' }}
                            >
                              {opt.title}
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {opt.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Direct contact */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 mb-4"
                    style={{ fontFamily: 'var(--font-jetbrains)' }}
                  >
                    Direct Contact
                  </p>
                  {trustItems.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 mb-3">
                      <Icon className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{text}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
