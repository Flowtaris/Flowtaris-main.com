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



      <section className="section bg-slate-50 py-24 min-h-[80vh] flex items-center justify-center">
        <div className="container-content w-full max-w-3xl">
          <AnimatedSection>
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-400">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
