import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, XCircle, Zap, Shield, Database, LayoutGrid, Activity, Cpu } from 'lucide-react'

// Premium B2B Content Structure
const COMPARISONS = {
  'workday-vs-netsuite': {
    systemA: 'Workday',
    systemB: 'NetSuite',
    themeA: 'text-blue-600',
    bgA: 'bg-blue-600',
    themeB: 'text-emerald-600',
    bgB: 'bg-emerald-600',
    title: 'Workday vs NetSuite: Enterprise Architecture Analysis',
    description: 'A deep-dive technical comparison between Workday HCM/Financials and Oracle NetSuite Cloud ERP. Discover which platform aligns with your scaling trajectory.',
    executiveSummary: 'Workday is the undisputed sovereign of enterprise Human Capital Management (HCM) with robust financials for service-based giants. Conversely, Oracle NetSuite reigns supreme in the mid-market and enterprise manufacturing, wholesale distribution, and inventory-heavy sectors. The decision rarely hinges on "which is better," but rather on your organization\'s operational epicenter: people vs. products.',
    winnerA: ['Global Enterprise HCM', 'Complex Matrix Organizations', 'Service-Based Financials', 'Native Advanced Analytics (Prism)'],
    winnerB: ['Complex Inventory Management', 'Wholesale & Distribution', 'Mid-market Financials', 'SuiteScript Customization Agility'],
    architecture: {
      systemA: 'Object-oriented, pure multi-tenant cloud natively built for continuous innovation. Single line of code across all customers.',
      systemB: 'Relational database driven, acquired by Oracle. Highly customizable via SuiteScript with distinct database schemas per tenant.',
    },
    features: [
      { category: 'Human Capital Management', systemA: 'Industry standard. Seamless global payroll, talent management, and recruiting.', systemB: 'Basic SuitePeople functionality. Often requires integration with specialized HCMs.', winner: 'A' },
      { category: 'Supply Chain & Inventory', systemA: 'Basic procurement and inventory. Primarily designed for internal consumption.', systemB: 'Deep, granular inventory control, demand planning, and multi-location fulfillment.', winner: 'B' },
      { category: 'Financial Accounting', systemA: 'Powerful continuous accounting, highly rigid to ensure compliance for Fortune 500s.', systemB: 'Extremely flexible chart of accounts, rapid close, superior for multi-subsidiary mid-market.', winner: 'Tie' },
    ],
    integration: {
      apiSystemA: 'REST/SOAP APIs with Workday Studio. Highly structured, requires specialized certification to architect properly.',
      apiSystemB: 'SuiteTalk REST/SOAP and RESTlets. Exceptionally developer-friendly, allowing rapid JavaScript (SuiteScript) API deployments.',
      flowtarisPitch: 'You do not have to compromise. Many Fortune 500 companies run Workday for HCM and NetSuite for Financials. Flowtaris specializes in building secure, real-time data pipelines between both systems using iPaaS architectures like Boomi or Celigo. We map the employee records to vendor/employee entities flawlessly.'
    },
    tco: {
      timelineA: '9 to 18+ Months',
      timelineB: '4 to 8 Months',
      costProfileA: 'Premium Enterprise Pricing. High implementation costs driven by change management.',
      costProfileB: 'Mid-Market to Enterprise Tier. Predictable licensing, modular expansion.',
    },
    verdict: 'Choose Workday if your primary asset is a massive global workforce and you are a service-centric enterprise. Choose NetSuite if you deal with complex inventory, manufacturing, or need rapid, flexible financial consolidation across multiple global subsidiaries.'
  },
  'coupa-vs-ariba': {
    systemA: 'Coupa',
    systemB: 'SAP Ariba',
    themeA: 'text-indigo-600',
    bgA: 'bg-indigo-600',
    themeB: 'text-[#F5A623]',
    bgB: 'bg-[#F5A623]',
    title: 'Coupa vs SAP Ariba: Procurement Platform Comparison',
    description: 'An architectural breakdown of Coupa Business Spend Management versus SAP Ariba. Understand the differences in user adoption, API limits, and ERP integration.',
    executiveSummary: 'Coupa has disrupted the procurement space by prioritizing consumer-grade user experience, driving near 100% employee adoption for indirect spend. SAP Ariba remains the monolithic giant, deeply entrenched in direct materials sourcing and native SAP S/4HANA ecosystems. The choice is a battle between agile spend visibility and legacy supply chain depth.',
    winnerA: ['Unmatched User Adoption', 'Agile Implementation', 'Modern Cloud Native API', 'Indirect Spend Management'],
    winnerB: ['Direct Materials Sourcing', 'Native SAP Ecosystem Integration', 'Massive Legacy Supplier Network', 'Complex Supply Chain Manufacturing'],
    architecture: {
      systemA: 'Ruby-on-Rails, pure multi-tenant cloud. Agile release cycles (3x per year) with zero disruption.',
      systemB: 'Legacy architecture modernized for cloud. Heavy, monolithic structure that excels in handling massive data volume.',
    },
    features: [
      { category: 'User Interface & Adoption', systemA: 'E-commerce like experience. Minimal training required, driving total spend on-contract.', systemB: 'Complex, dense UI. High learning curve, often leading to rogue spend outside the system.', winner: 'A' },
      { category: 'Supplier Onboarding', systemA: 'Free supplier portal (CSP). Frictionless onboarding via email, driving high touchless invoice rates.', systemB: 'Ariba Network fees can frustrate smaller suppliers, though it remains the largest global network.', winner: 'A' },
      { category: 'ERP Integration', systemA: 'Agnostic. Integrates cleanly with NetSuite, Workday, and SAP via modern REST APIs.', systemB: 'Unrivaled native integration with SAP ECC and S/4HANA via Cloud Integration Gateway (CIG).', winner: 'Tie' },
    ],
    integration: {
      apiSystemA: 'Modern RESTful APIs. Highly documented, supporting rapid bidirectional syncs for POs, Invoices, and Payments.',
      apiSystemB: 'Complex integration landscape relying heavily on cXML and proprietary SAP middleware.',
      flowtarisPitch: 'Whether you choose Coupa\'s agility or Ariba\'s depth, the critical failure point is always the ERP integration. Flowtaris engineers bulletproof, SOX-compliant pipelines syncing Master Data, Purchase Orders, and Invoice Receipts between your Procurement platform and your core Financial ERP.'
    },
    tco: {
      timelineA: '3 to 6 Months',
      timelineB: '9 to 18+ Months',
      costProfileA: 'Value-based pricing. Rapid ROI through immediate spend visibility and user adoption.',
      costProfileB: 'Enterprise premium. Heavy upfront implementation costs and long time-to-value.',
    },
    verdict: 'If your goal is to rapidly control indirect spend with a system your employees will actually enjoy using, Coupa is the definitive choice. If you are a massive manufacturing enterprise deeply embedded in SAP and heavily reliant on direct materials sourcing, SAP Ariba is the necessary standard.'
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = COMPARISONS[slug as keyof typeof COMPARISONS]
  if (!data) return {}

  return {
    title: `${data.title} | Flowtaris`,
    description: data.description,
    alternates: { canonical: `https://flowtaris.com/compare/${slug}` },
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

  if (!data) notFound()

  const { breadcrumbSchema } = await import('@/lib/schema')
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
    { name: `${data.systemA} vs ${data.systemB}`, url: `/compare/${slug}` },
  ])

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${data.systemA} better than ${data.systemB}?`,
        "acceptedAnswer": { "@type": "Answer", "text": data.verdict }
      }
    ]
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 text-zinc-900 selection:bg-zinc-900 selection:text-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-12 pb-20 border-b border-zinc-200/60 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,0,0,0.02)_0%,transparent_100%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <Activity className="w-3 h-3" /> Architecture Comparison
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-sora)' }}>
            <span className={`font-bold ${data.themeA}`}>{data.systemA}</span> 
            <span className="text-zinc-300 mx-4 font-light">vs</span> 
            <span className={`font-bold ${data.themeB}`}>{data.systemB}</span>
          </h1>
          <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mx-auto font-light">
            {data.description}
          </p>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY ── */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Executive Summary</h2>
            <p className="text-xl md:text-2xl text-zinc-800 leading-relaxed font-light" style={{ fontFamily: 'var(--font-sora)' }}>
              {data.executiveSummary}
            </p>
          </div>
        </div>
      </section>

      {/* ── WHEN TO CHOOSE MATRIX ── */}
      <section className="py-8">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System A Card */}
          <div className="bg-white p-10 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className={`text-3xl font-bold mb-8 ${data.themeA}`} style={{ fontFamily: 'var(--font-sora)' }}>{data.systemA} Wins When...</h3>
            <ul className="space-y-5">
              {data.winnerA.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className={`mt-1 p-1 rounded-full bg-zinc-50 border border-zinc-100`}>
                    <CheckCircle2 className={`w-5 h-5 ${data.themeA}`} />
                  </div>
                  <span className="text-zinc-700 font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* System B Card */}
          <div className="bg-white p-10 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className={`text-3xl font-bold mb-8 ${data.themeB}`} style={{ fontFamily: 'var(--font-sora)' }}>{data.systemB} Wins When...</h3>
            <ul className="space-y-5">
              {data.winnerB.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className={`mt-1 p-1 rounded-full bg-zinc-50 border border-zinc-100`}>
                    <CheckCircle2 className={`w-5 h-5 ${data.themeB}`} />
                  </div>
                  <span className="text-zinc-700 font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE & TCO GRID ── */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6 space-y-6">
          <div className="bg-zinc-900 rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl font-medium mb-8 flex items-center gap-3" style={{ fontFamily: 'var(--font-sora)' }}><Database className="w-6 h-6 text-zinc-400" /> Core Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest ${data.themeA} mb-3`}>{data.systemA}</div>
                <p className="text-zinc-300 leading-relaxed font-light">{data.architecture.systemA}</p>
              </div>
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest ${data.themeB} mb-3`}>{data.systemB}</div>
                <p className="text-zinc-300 leading-relaxed font-light">{data.architecture.systemB}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-[2rem] p-10 shadow-sm">
            <h3 className="text-2xl font-medium text-zinc-900 mb-8 flex items-center gap-3" style={{ fontFamily: 'var(--font-sora)' }}><Cpu className="w-6 h-6 text-zinc-400" /> Time to Value & TCO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="text-sm font-bold text-zinc-900 mb-1">{data.systemA}</div>
                <div className={`text-2xl font-black mb-4 ${data.themeA}`}>{data.tco.timelineA}</div>
                <p className="text-sm text-zinc-500 leading-relaxed">{data.tco.costProfileA}</p>
              </div>
              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="text-sm font-bold text-zinc-900 mb-1">{data.systemB}</div>
                <div className={`text-2xl font-black mb-4 ${data.themeB}`}>{data.tco.timelineB}</div>
                <p className="text-sm text-zinc-500 leading-relaxed">{data.tco.costProfileB}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BATTLE GRID (FEATURE BY FEATURE) ── */}
      <section className="py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <h3 className="text-3xl font-medium text-center text-zinc-900 mb-12" style={{ fontFamily: 'var(--font-sora)' }}>Feature by Feature</h3>
          <div className="space-y-4">
            {data.features.map((feat, idx) => (
              <div key={idx} className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="md:w-1/4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Module</div>
                  <div className="font-semibold text-zinc-900 text-lg">{feat.category}</div>
                </div>
                <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-100 hidden md:block" />
                  <div className="md:pr-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-zinc-900">{data.systemA}</span>
                      {feat.winner === 'A' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-600 border border-blue-100">Winner</span>}
                      {feat.winner === 'Tie' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-500 border border-zinc-200">Tie</span>}
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feat.systemA}</p>
                  </div>
                  <div className="md:pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-zinc-900">{data.systemB}</span>
                      {feat.winner === 'B' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Winner</span>}
                      {feat.winner === 'Tie' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-500 border border-zinc-200">Tie</span>}
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feat.systemB}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE INTEGRATION FACTOR ── */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-[#0A1628] rounded-[2rem] p-10 md:p-16 border border-zinc-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000')] opacity-5 mix-blend-screen group-hover:opacity-10 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628]/95 to-[#E8A020]/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-medium text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-sora)' }}>
                <Zap className="w-8 h-8 text-[#E8A020]" /> The Integration Factor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-white/10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">{data.systemA} API</div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{data.integration.apiSystemA}</p>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">{data.systemB} API</div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{data.integration.apiSystemB}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Why Choose? Integrate Both.</h3>
              <p className="text-lg text-zinc-300 leading-relaxed font-light mb-10">
                {data.integration.flowtarisPitch}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-3 h-14 px-8 bg-[#E8A020] text-[#0A1628] rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors">
                Discuss Architecture Design <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE VERDICT ── */}
      <section className="py-8">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-zinc-900" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-zinc-900" style={{ fontFamily: 'var(--font-sora)' }}>The Architect's Verdict</h2>
          <p className="text-xl text-zinc-600 leading-relaxed font-light italic">
            "{data.verdict}"
          </p>
        </div>
      </section>

    </main>
  )
}
