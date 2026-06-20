import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { DynamicServiceClient } from './DynamicServiceClient'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const supabase = await createClient()

  const { data: service } = await supabase
    .from('services')
    .select('name, slug, services_hero(normal_description, color)')
    .eq('slug', slug)
    .single()

  if (!service) return { title: 'Service | Flowtaris' }

  const heroData = (service as any).services_hero?.[0] || (service as any).services_hero
  const description = heroData?.normal_description || `${service.name} — Enterprise implementation, consulting, and managed support by Flowtaris.`

  return {
    title: `${service.name} | Flowtaris — Enterprise ERP Consulting`,
    description,
    alternates: {
      canonical: `https://flowtaris.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} | Flowtaris`,
      description,
      url: `https://flowtaris.com/services/${slug}`,
      type: 'website',
    },
  }
}

export default async function ServiceSlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const supabase = await createClient()

  // 1. Find the service
  const { data: service } = await supabase
    .from('services')
    .select('id, name, slug')
    .eq('slug', slug)
    .single()

  if (!service) {
    notFound()
  }

  // 2. Fetch all related data
  const [
    { data: hero },
    { data: whyChoose },
    { data: businessMain },
    { data: businessItems },
    { data: erpMain },
    { data: erpCards },
    { data: deepModules }
  ] = await Promise.all([
    supabase.from('services_hero').select('*').eq('service_id', service.id).maybeSingle(),
    supabase.from('services_why_choose').select('*').eq('service_id', service.id),
    supabase.from('services_business_suite_main').select('*').eq('service_id', service.id).maybeSingle(),
    supabase.from('services_business_suite_items').select('*').eq('service_id', service.id),
    supabase.from('services_erp_architecture_main').select('*').eq('service_id', service.id).maybeSingle(),
    supabase.from('services_erp_architecture_cards').select('*').eq('service_id', service.id).order('priority', { ascending: false }),
    supabase.from('services_deep_module').select('*').eq('service_id', service.id)
  ])

  let faqContent = null;
  let faqJsonLd = null;

  if (slug === 'netsuite-consulting') {
    const questions = [
      { q: "How long does a typical NetSuite implementation take?", a: "A standard NetSuite Cloud ERP implementation with Flowtaris typically takes between 3 to 6 months. Timelines vary based on the complexity of your chart of accounts, the number of subsidiaries, and the volume of required SuiteScript 2.x customizations or third-party API integrations." },
      { q: "How much does a NetSuite implementation cost?", a: "Implementation costs depend entirely on project scope, data migration complexity, and required iPaaS integrations. Flowtaris provides a fixed-fee Statement of Work after our initial deep-dive technical discovery, ensuring transparent pricing with no hidden change orders." },
      { q: "What is SuiteScript and when do we need it?", a: "SuiteScript is NetSuite's proprietary JavaScript-based API utilized for deep system customization. You need our certified SuiteScript developers when standard point-and-click workflows cannot accommodate your unique financial routing, custom record creation, or complex automated billing requirements." },
      { q: "How does Flowtaris handle bi-annual NetSuite upgrades?", a: "NetSuite pushes two major upgrades annually. Our managed support team conducts rigorous regression testing in your Release Preview account prior to the update, ensuring that all custom SuiteScripts, workflows, and integrations continue functioning seamlessly." },
      { q: "Can you integrate NetSuite with our existing legacy systems?", a: "Yes. Flowtaris specializes in cross-platform ERP integrations. We build robust, SOX-compliant data pipelines using iPaaS platforms (like Boomi or Celigo) or native RESTlet/SOAP Web Services to connect NetSuite with legacy on-premise systems, CRM platforms, and proprietary databases." }
    ]
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": { "@type": "Answer", "text": q.a }
      }))
    }
    faqContent = questions
  } else if (slug === 'coupa-consulting') {
    const questions = [
      { q: "How does Coupa compare to other procurement alternatives?", a: "Coupa Business Spend Management (BSM) is widely considered the industry leader due to its unparalleled user adoption rates and comprehensive procure-to-pay functionality. Unlike legacy ERP procurement modules which are often clunky, Coupa delivers an intuitive, e-commerce-like experience that guarantees high employee compliance and superior spend visibility." },
      { q: "How complex is a Coupa BSM deployment?", a: "While the Coupa platform itself is highly intuitive, the deployment complexity lies in the backend ERP integration and the supplier enablement phase. Our former Big 4 architects manage this complexity by establishing secure data flows and comprehensive change management protocols." },
      { q: "Can Coupa integrate natively with our existing ERP?", a: "Absolutely. Coupa is designed to sit on top of your existing financial architecture. Flowtaris engineers secure, bidirectional integrations between Coupa and core ERPs like NetSuite, SAP S/4HANA, and Workday, ensuring purchase orders, invoices, and payment data sync flawlessly." },
      { q: "How do you handle supplier enablement during a Coupa implementation?", a: "Supplier enablement is critical to Coupa's success. We manage the entire onboarding campaign, utilizing the Coupa Supplier Portal (CSP) and cXML/EDI integrations to transition your vendors efficiently, ensuring you achieve maximum touchless invoice processing rates from day one." },
      { q: "Do you provide ongoing managed support for Coupa?", a: "Yes. Following the go-live phase, Flowtaris provides dedicated managed support. We handle continuous supplier enablement, new module rollouts (like Coupa Pay or Sourcing), and ongoing integration monitoring to ensure your spend management ecosystem remains fully optimized." }
    ]
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": { "@type": "Answer", "text": q.a }
      }))
    }
    faqContent = questions
  }

  return (
    <>
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <DynamicServiceClient 
        service={service}
        hero={hero}
        whyChoose={whyChoose || []}
        businessMain={businessMain}
        businessItems={businessItems || []}
        erpMain={erpMain}
        erpCards={erpCards || []}
        deepModules={deepModules || []}
      />
      {faqContent && (
        <section className="py-24 bg-[#FAFAFA] border-t border-slate-200">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-12 text-center" style={{ fontFamily: 'var(--font-sora)' }}>Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqContent.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-[#0A1628] mb-3">{item.q}</h3>
                  <p className="text-slate-600 leading-relaxed font-light">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
