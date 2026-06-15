import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AboutPage() {
  const supabase = await createClient()

  // Fetch Hero and Topics from Supabase
  const [
    { data: heroData },
    { data: topicsData },
  ] = await Promise.all([
    supabase.from('about_hero').select('*').limit(1).maybeSingle(),
    supabase.from('about_topics').select('*').order('created_at', { ascending: true })
  ])

  // Fallbacks if data is not yet set
  const heroTitle = heroData?.title || "Enterprise ERP will not be run by disjointed tools. It will be run by integrated architecture."
  const heroDescription = heroData?.description || "Flowtaris is the specialized consulting workforce that architects your NetSuite, Coupa, and Workday systems into a single, seamless pipeline—eliminating manual finance bottlenecks forever."
  const heroImage = heroData?.image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
  
  const topics = topicsData && topicsData.length > 0 ? topicsData : []

  return (
    <main className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800 selection:bg-[#E8A020] selection:text-white pb-0">
      
      {/* ── Section 1: Cinematic Hero (50/50 Split) ── */}
      <section className="pt-32 md:pt-48 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Typography */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-[#0A1628] tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              {heroTitle}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              {heroDescription}
            </p>
          </div>
          {/* Right: Team Photo */}
          <div className="w-full aspect-[4/3] lg:aspect-square relative rounded-[2rem] overflow-hidden shadow-sm">
            <Image 
              src={heroImage} 
              alt="Flowtaris Team" 
              fill 
              className="object-cover"
              priority
            />
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
                <p>For the last decade, organizations have purchased point solutions to solve individual problems. They bought NetSuite for finance, Coupa for procurement, and Workday for HR.</p>
                <p>But solving individual problems created a massive collective problem: data silos. Finance teams are now spending thousands of hours manually reconciling journal entries across isolated platforms.</p>
                <p>At Flowtaris, we believe the next era of enterprise agility is not about buying more software. It’s about building automated, SOX-compliant data pipelines between the software you already own. We architect systems where data flows autonomously.</p>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-4">
                {/* Left column intentionally blank */}
              </div>
              <div className="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
                <p>Flowtaris was founded in 2021 by a team of former Big 4 ERP implementation leaders who witnessed the same failure patterns repeating across Fortune 500 deployments.</p>
                <p>Time and time again, massive consulting firms would deploy core ERPs, only to leave behind fragile, manual integration points that required armies of administrators to maintain.</p>
                <p>We realized that standard implementation wasn't enough. Organizations needed deep, technical specialists who understood both the functional business requirements and the complex API architectures necessary to make systems talk natively.</p>
                <p>Today, Flowtaris is the premier boutique consultancy exclusively focused on the NetSuite, Coupa, and Workday ecosystem—managing billions of dollars in transaction flows for the world's most innovative companies.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Section 4: Investor / Client Trust ── */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center border-t border-slate-200 mt-20">
        <h2 className="text-2xl font-bold text-[#0A1628] tracking-tight mb-16" style={{ fontFamily: 'var(--font-sora)' }}>
          Trusted to architect the backbone of industry leaders.
        </h2>
        
        {/* Minimalist Logo Cloud */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">NETSUITE</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">COUPA</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">SAP</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">WORKDAY</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">BOOMI</div>
        </div>
      </section>

      {/* ── Section 5: Bottom CTA ── */}
      <section className="py-32 bg-white text-center rounded-t-[40px] border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-10 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
            Software organized the work.<br/>Flowtaris automates it.
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
