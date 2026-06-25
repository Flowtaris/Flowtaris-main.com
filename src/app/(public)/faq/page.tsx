import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import SchemaInjector from '@/components/SchemaInjector'
import { FinanceCTA } from '@/components/sections/FinanceCTA'
import { FAQAccordion } from '@/components/ui/FAQAccordion'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Flowtaris',
  description: "Find answers to common questions about Flowtaris' enterprise ERP consulting, integration strategies, and implementation methodologies.",
  alternates: {
    canonical: 'https://www.flowtaris.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Flowtaris',
    description: "Find answers to common questions about Flowtaris' enterprise ERP consulting, integration strategies, and implementation methodologies.",
    url: 'https://www.flowtaris.com/faq',
    type: 'website',
  },
}

const FALLBACK_FAQS = [
  {
    question: 'What makes Flowtaris different from large ERP consultancies?',
    answer: 'Unlike massive global systems integrators that rely on junior resources and standardized templates, Flowtaris operates as a specialized  consultancy. Our teams consist strictly of senior architects with Big 4 backgrounds and active certifications in NetSuite, Coupa, and Workday. This allows us to deliver highly customized, complex iPaaS integrations and ERP optimizations faster and with a significantly lower failure rate than traditional large-scale consulting firms.',
  },
  {
    question: 'Which ERP platforms does Flowtaris support?',
    answer: 'Flowtaris specializes in Oracle NetSuite, Coupa BSM, SAP S/4HANA, and Workday HCM. We also provide integration services for adjacent platforms including Ironclad, Zylo, MuleSoft, Boomi, and other iPaaS solutions commonly found in enterprise technology stacks.',
  },
  {
    question: 'How long does a typical ERP implementation take?',
    answer: 'Implementation timelines vary based on scope and complexity. A focused NetSuite module deployment typically takes 8–14 weeks. Full multi-subsidiary ERP implementations or complex cross-platform integrations can range from 4 to 12 months. We provide detailed project plans during the scoping phase.',
  },
  {
    question: 'Does Flowtaris provide post-go-live support?',
    answer: 'Yes. We offer tiered Managed Support packages that cover ongoing system administration, incident resolution, enhancement development, and proactive health monitoring. Our support teams are staffed by the same senior architects who handle implementations.',
  },
  {
    question: 'How does Flowtaris ensure data security during integrations?',
    answer: 'All integration architectures we design are built with SOX compliance, ISO 27001 alignment, and principle of least privilege in mind. We enforce encrypted data-in-transit, audit-trail logging, and role-based access controls across every pipeline. We conduct security reviews at each project milestone.',
  },
]

export default async function FAQPage() {
  const supabase = await createClient()

  const { data: faqsData } = await supabase
    .from('faqs')
    .select('*')
    .eq('status', 'Active')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })

  const faqs =
    faqsData && faqsData.length > 0
      ? faqsData.map((faq) => ({ question: faq.question, answer: faq.answer }))
      : FALLBACK_FAQS

  const { breadcrumbSchema } = await import('@/lib/schema')
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ])

  return (
    <main className="bg-white min-h-screen font-sans text-slate-800 selection:bg-[#E8A020] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {/* Schema Injection */}
      {faqsData && faqsData.length > 0 && (
        <SchemaInjector
          schema={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqsData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }}
        />
      )}

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-16 max-w-5xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E8A020] mb-4">
          Support
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold text-[#0A1628] tracking-tight leading-tight mb-6"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Find answers to common questions about our ERP consulting, integration methodologies, and managed support services.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-32 px-6 lg:px-16 max-w-5xl mx-auto">
        <FAQAccordion items={faqs} sectionLabel="General" />
      </section>

      <FinanceCTA />
    </main>
  )
}
