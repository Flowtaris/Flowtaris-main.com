import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { organizationSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: "About Flowtaris — Enterprise ERP Consulting Experts",
  description: "Flowtaris architects your NetSuite, Coupa, and Workday systems into a single, seamless pipeline—eliminating manual finance bottlenecks.",
  openGraph: {
    title: "About Flowtaris — Enterprise ERP Consulting Experts",
    description: "Flowtaris architects your NetSuite, Coupa, and Workday systems into a single, seamless pipeline—eliminating manual finance bottlenecks.",
    url: "https://flowtaris.com/about",
    type: "website"
  }
}

export default async function AboutPage() {
  const supabase = await createClient()

  // Fetch Hero, Topics and Site Settings from Supabase
  const [
    { data: heroData },
    { data: topicsData },
    { data: settingsData }
  ] = await Promise.all([
    supabase.from('about_hero').select('*').limit(1).maybeSingle(),
    supabase.from('about_topics').select('*').order('created_at', { ascending: true }),
    supabase.from('site_settings').select('key, value').in('key', ['about_trusted_heading', 'about_trusted_partners'])
  ])

  // Fallbacks if data is not yet set
  const heroTitle = heroData?.title || "Enterprise ERP will not be run by disjointed tools. It will be run by integrated architecture."
  const heroDescription = heroData?.description || "Flowtaris is the specialized consulting workforce that architects your NetSuite, Coupa, and Workday systems into a single, seamless pipeline—eliminating manual finance bottlenecks forever."
  const heroImage = heroData?.image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"

  const topics = topicsData && topicsData.length > 0 ? topicsData : []

  const settingsMap = (settingsData || []).reduce((acc: any, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  const trustedHeading = settingsMap['about_trusted_heading'] || 'Trusted to architect the backbone of industry leaders.'
  let trustedPartners = []
  try {
    if (settingsMap['about_trusted_partners']) {
      trustedPartners = JSON.parse(settingsMap['about_trusted_partners'])
    } else {
      trustedPartners = [
        { id: '1', name: 'NetSuite', label: 'Solution Provider' },
        { id: '2', name: 'Coupa', label: 'Certified Partner' },
        { id: '3', name: 'SAP', label: 'Silver Partner' }
      ]
    }
  } catch (e) {
    console.error('Failed to parse trusted partners', e)
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800 selection:bg-[#E8A020] selection:text-white pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              organizationSchema(),
              {
                "@type": "AboutPage",
                "@id": "https://flowtaris.com/about/#webpage",
                "url": "https://flowtaris.com/about",
                "name": "About Flowtaris — Enterprise ERP Consulting Experts",
                "description": "Flowtaris architects your NetSuite, Coupa, and Workday systems into a single, seamless pipeline—eliminating manual finance bottlenecks."
              }
            ]
          })
        }}
      />

      {/* ── Section 1: Cinematic Hero (50/50 Split) ── */}
      <section className="min-h-[80vh] flex flex-col justify-center pt-24 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Typography */}
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              {heroTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-10 leading-relaxed">
              {heroDescription}
            </p>
          </div>
          {/* Right: Team Photo / Logo Card */}
          <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden border border-slate-100 bg-white shadow-sm flex items-center justify-center p-8 md:p-16">
            <div className="relative w-full h-full">
              <Image
                src={heroImage}
                alt="Flowtaris Team"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamic Topics Sections ── */}
      {topics.map((topic, index) => (
        <section key={topic.id} className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] tracking-tight leading-tight sticky top-32" style={{ fontFamily: 'var(--font-sora)' }}>
                {topic.topic}
              </h2>
            </div>
            <div className="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
              {topic.descriptions?.map((desc: string, idx: number) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Fallback Static Sections if DB is empty */}
      {topics.length === 0 && (
        <>
          <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] tracking-tight leading-tight sticky top-32" style={{ fontFamily: 'var(--font-sora)' }}>
                  Software organized the enterprise. Precision engineering connects it.
                </h2>
              </div>
              <div className="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
                <p>For the last decade, mid-market and enterprise organizations across North America and Europe have purchased isolated point solutions. While deploying Oracle NetSuite Cloud ERP for financials, Coupa BSM for procurement, and Workday HCM for human resources solved immediate departmental needs, it created fragmented architectures.</p>
                <p>These disconnected data silos mean finance and accounting teams spend thousands of hours manually reconciling journal entries, AP/AR ledgers, and multi-subsidiary consolidations across platforms. Missing SuiteScript 2.x customizations or failing iPaaS integrations severely delay month-end close.</p>
                <p>At Flowtaris, our certified NetSuite and Coupa architects believe true enterprise agility requires automated, SOX-compliant data pipelines. Serving the technology, SaaS, manufacturing, and healthcare sectors, our boutique consultancy engineers systems where financial data flows autonomously between core platforms.</p>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-4">
                {/* Left column intentionally blank */}
              </div>
              <div className="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
                <p>Flowtaris was founded in 2021 in London by a specialized team of former Big 4 ERP implementation leaders. We witnessed the same failure patterns repeating across complex Fortune 500 deployments: poorly mapped charts of accounts, hardcoded integration logic, and ignored change management.</p>
                <p>Massive systems integrators consistently deployed core ERPs like SAP S/4HANA or NetSuite OneWorld, only to leave behind fragile, manual CSV uploads and broken REST APIs that required armies of administrators to maintain.</p>
                <p>Standard deployment isn't enough for high-growth companies (50-2000 employees). Organizations need deep, technical ERP specialists holding active NetSuite ERP Consultant and Coupa Platform certifications who understand complex API limits, SuiteTalk, and native Web Services.</p>
                <p>Today, Flowtaris operates globally as the premier boutique systems integration consultancy exclusively focused on the NetSuite, Coupa, SAP, and Workday ecosystem—engineering highly secure architectures managing billions in transaction flows for innovative B2B enterprises.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Section 4: Investor / Client Trust ── */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center border-t border-slate-200 mt-20">
        <h2 className="text-2xl font-bold text-[#0A1628] tracking-tight mb-16" style={{ fontFamily: 'var(--font-sora)' }}>
          {trustedHeading}
        </h2>

        {/* Partner Certifications */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-8 place-items-center">
          {trustedPartners.map((partner: any) => (
            <div key={partner.id} className="flex flex-col items-center group w-full">
              <div className="h-20 md:h-28 w-full max-w-[14rem] flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
                {partner.image_url ? (
                  <Image src={partner.image_url} alt={partner.name} fill className="object-contain" />
                ) : (
                  <span className="font-bold text-slate-700 text-2xl text-center">{partner.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: Bottom CTA ── */}
      <section className="py-32 bg-white text-center rounded-t-[40px] border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-10 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
            Software organized the work.<br />Flowtaris automates it.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#0A1628] text-white rounded-full font-bold text-lg hover:bg-black transition-colors"
          >
            Initiate Project
          </Link>
        </div>
      </section>

    </main>
  )
}
