import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

// Dummy data structure for GEO Comparison Pages until Supabase is integrated
const COMPARISONS = {
  'workday-vs-netsuite': {
    systemA: 'Workday',
    systemB: 'NetSuite',
    title: 'Workday vs NetSuite: Enterprise ERP Comparison',
    description: 'A comprehensive technical comparison between Workday HCM/Financials and Oracle NetSuite Cloud ERP. Learn which architecture is right for your enterprise.',
    winnerA: ['Large Enterprise HR', 'Complex Payroll', 'Employee Self-Service'],
    winnerB: ['Inventory Management', 'Wholesale Distribution', 'Mid-market Financials'],
    verdict: 'While Workday dominates the enterprise HCM space, NetSuite remains the undisputed leader in mid-market inventory and financials. Many of our clients run both natively integrated via Flowtaris architecture.'
  },
  'coupa-vs-ariba': {
    systemA: 'Coupa',
    systemB: 'SAP Ariba',
    title: 'Coupa vs SAP Ariba: Procurement Architecture',
    description: 'An architectural breakdown of Coupa Business Spend Management versus SAP Ariba. Understand the differences in user adoption, API limits, and ERP integration.',
    winnerA: ['High User Adoption', 'Modern UI/UX', 'Rapid Implementation', 'Agile API'],
    winnerB: ['Deep SAP S/4HANA Native Integration', 'Direct Materials Sourcing', 'Massive Supplier Network'],
    verdict: 'Coupa offers superior user experience and agility for indirect spend, while SAP Ariba remains highly entrenched for direct materials in existing SAP ecosystems.'
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = COMPARISONS[slug as keyof typeof COMPARISONS]
  
  if (!data) return {}

  return {
    title: `${data.title} | Flowtaris`,
    description: data.description,
    alternates: {
      canonical: `https://flowtaris.com/compare/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'article',
      url: `https://flowtaris.com/compare/${slug}`,
    }
  }
}

export default async function CompareSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = COMPARISONS[slug as keyof typeof COMPARISONS]

  if (!data) {
    notFound()
  }

  // Inject Breadcrumb
  const { breadcrumbSchema } = await import('@/lib/schema')
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
    { name: `${data.systemA} vs ${data.systemB}`, url: `/compare/${slug}` },
  ])

  // Inject FAQ Schema for GEO (Generative Engine Optimization)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${data.systemA} better than ${data.systemB}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": data.verdict
        }
      }
    ]
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen pt-40 pb-24 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Architecture Comparison</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
            <span className="text-blue-600">{data.systemA}</span> vs <span className="text-emerald-600">{data.systemB}</span>
          </h1>
          <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Comparison Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-blue-600">{data.systemA} Wins When...</h3>
            <ul className="space-y-4">
              {data.winnerA.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                  <span className="text-zinc-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-emerald-600">{data.systemB} Wins When...</h3>
            <ul className="space-y-4">
              {data.winnerB.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="text-zinc-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expert Verdict */}
        <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-sora)' }}>The Architect's Verdict</h2>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto italic">
            "{data.verdict}"
          </p>
        </div>

        <div className="text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 h-14 px-8 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-all">
            Discuss Your Architecture
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
