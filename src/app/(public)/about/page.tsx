import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin } from 'react-icons/fa'
import { CTASection } from '@/components/sections/CTASection'

const LEADERSHIP = [
  {
    name: "Alexander Thorne",
    title: "Co-founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    linkedin: "#"
  },
  {
    name: "Sarah Jenkins",
    title: "Co-founder & CTO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    linkedin: "#"
  },
  {
    name: "David Chen",
    title: "Co-founder & CPO",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    linkedin: "#"
  }
]

export default function AboutPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800 selection:bg-[#E8A020] selection:text-white pb-0">
      
      {/* ── Section 1: Cinematic Hero (50/50 Split) ── */}
      <section className="pt-32 md:pt-48 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Typography */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-[#0A1628] tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              Enterprise ERP will not be run by disjointed tools. It will be run by integrated architecture.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              Flowtaris is the specialized consulting workforce that architects your NetSuite, Coupa, and Workday systems into a single, seamless pipeline—eliminating manual finance bottlenecks forever.
            </p>
          </div>
          {/* Right: Team Photo */}
          <div className="w-full aspect-[4/3] lg:aspect-square relative rounded-[2rem] overflow-hidden shadow-sm">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Flowtaris Team" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Philosophy (50/50 Split) ── */}
      <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] tracking-tight leading-tight sticky top-32" style={{ fontFamily: 'var(--font-sora)' }}>
              Software organized the enterprise. Precision engineering connects it.
            </h2>
          </div>
          <div className="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
            <p>
              For the last decade, organizations have purchased point solutions to solve individual problems. They bought NetSuite for finance, Coupa for procurement, and Workday for HR.
            </p>
            <p>
              But solving individual problems created a massive collective problem: data silos. Finance teams are now spending thousands of hours manually reconciling journal entries across isolated platforms.
            </p>
            <p>
              At Flowtaris, we believe the next era of enterprise agility is not about buying more software. It’s about building automated, SOX-compliant data pipelines between the software you already own. We architect systems where data flows autonomously.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Founders & Story (50/50 Split) ── */}
      <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Founder Cards Stack */}
          <div className="space-y-4">
            {LEADERSHIP.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 pr-6 bg-[#F0F2F5] rounded-2xl border border-slate-200">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-[12px] overflow-hidden bg-blue-100 shrink-0">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>{member.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{member.title}</p>
                  </div>
                </div>
                <Link href={member.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </Link>
              </div>
            ))}
          </div>

          {/* Right: Story Narrative */}
          <div className="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
            <p>
              Flowtaris was founded in 2021 by a team of former Big 4 ERP implementation leaders who witnessed the same failure patterns repeating across Fortune 500 deployments.
            </p>
            <p>
              Time and time again, massive consulting firms would deploy core ERPs, only to leave behind fragile, manual integration points that required armies of administrators to maintain.
            </p>
            <p>
              We realized that standard implementation wasn't enough. Organizations needed deep, technical specialists who understood both the functional business requirements and the complex API architectures necessary to make systems talk natively.
            </p>
            <p>
              Today, Flowtaris is the premier boutique consultancy exclusively focused on the NetSuite, Coupa, and Workday ecosystem—managing billions of dollars in transaction flows for the world's most innovative companies.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Investor / Client Trust ── */}
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center border-t border-slate-200 mt-20">
        <h2 className="text-2xl font-bold text-[#0A1628] tracking-tight mb-16" style={{ fontFamily: 'var(--font-sora)' }}>
          Trusted to architect the backbone of industry leaders.
        </h2>
        
        {/* Minimalist Logo Cloud */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">ACUMATICA</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">THOUGHTSPOT</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">WHATFIX</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">MARRIOTT</div>
          <div className="text-xl font-bold font-mono tracking-widest text-slate-400">TURO</div>
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
