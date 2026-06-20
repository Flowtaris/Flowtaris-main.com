import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Mail, Clock, Calendar, FileText, MessageSquare } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ContactForm } from '@/components/forms/ContactForm'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact Flowtaris — Book an ERP Consultation',
  description: 'Book a consultation, request a proposal or get in touch with the Flowtaris enterprise ERP and integration consulting team.',
  alternates: {
    canonical: 'https://flowtaris.com/contact',
  },
  openGraph: {
    title: 'Contact Flowtaris — Book an ERP Consultation',
    description: 'Book a consultation, request a proposal or get in touch with the Flowtaris enterprise ERP and integration consulting team.',
    url: 'https://flowtaris.com/contact',
    type: 'website',
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          breadcrumb,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the typical engagement process with Flowtaris?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our engagement process starts with a 30-45 minute initial consultation to understand your ERP challenges. Following this, we conduct a deep-dive technical discovery session. Within a week, we provide a structured Statement of Work (SOW) outlining project scope, timeline, and deliverables before assigning your dedicated architecture team."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly do you respond to consultation requests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We pride ourselves on rapid communication. Any consultation request or project inquiry submitted through our contact form receives a response from a senior consultant within one business day."
                }
              },
              {
                "@type": "Question",
                "name": "Does Flowtaris have minimum project size requirements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Because we deploy senior-level talent, we typically engage in complex, enterprise-level implementations and integrations. However, we are open to discussing targeted architectural audits and optimization projects. Please reach out to discuss your specific requirements."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer managed support after an implementation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Following a successful implementation or integration, we offer scalable managed support contracts to ensure your NetSuite, Coupa, or Workday environments continue running autonomously and stay compliant with updates."
                }
              },
              {
                "@type": "Question",
                "name": "Will I be working with offshore teams or junior developers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Flowtaris operates differently from large systems integrators. You will work directly with specialized, certified senior architects based in primary global markets, ensuring high-quality, transparent delivery without junior resourcing."
                }
              }
            ]
          }
        ]) }}
      />



      <section className="section bg-slate-50 py-24 min-h-[80vh] flex items-center justify-center">
        <div className="container-content w-full max-w-3xl">
          <AnimatedSection>
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactOptions.map((opt, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0A1628] text-white flex items-center justify-center rounded-full mb-6">
                  <opt.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-3">{opt.title}</h3>
                <p className="text-slate-600 font-light">{opt.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-slate-600">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon size={20} className="text-[#E8A020]" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-6 border-t border-slate-200">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold text-[#0A1628] mb-12 text-center" style={{ fontFamily: 'var(--font-sora)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#0A1628] mb-3">What is the typical engagement process with Flowtaris?</h3>
              <p className="text-slate-600 leading-relaxed font-light">Our engagement process starts with a 30-45 minute initial consultation to understand your ERP challenges. Following this, we conduct a deep-dive technical discovery session. Within a week, we provide a structured Statement of Work (SOW) outlining project scope, timeline, and deliverables before assigning your dedicated architecture team.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#0A1628] mb-3">How quickly do you respond to consultation requests?</h3>
              <p className="text-slate-600 leading-relaxed font-light">We pride ourselves on rapid communication. Any consultation request or project inquiry submitted through our contact form receives a response from a senior consultant within one business day.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#0A1628] mb-3">Does Flowtaris have minimum project size requirements?</h3>
              <p className="text-slate-600 leading-relaxed font-light">Because we deploy senior-level talent, we typically engage in complex, enterprise-level implementations and integrations. However, we are open to discussing targeted architectural audits and optimization projects. Please reach out to discuss your specific requirements.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#0A1628] mb-3">Do you offer managed support after an implementation?</h3>
              <p className="text-slate-600 leading-relaxed font-light">Yes. Following a successful implementation or integration, we offer scalable managed support contracts to ensure your NetSuite, Coupa, or Workday environments continue running autonomously and stay compliant with updates.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-[#0A1628] mb-3">Will I be working with offshore teams or junior developers?</h3>
              <p className="text-slate-600 leading-relaxed font-light">No. Flowtaris operates differently from large systems integrators. You will work directly with specialized, certified senior architects based in primary global markets, ensuring high-quality, transparent delivery without junior resourcing.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
