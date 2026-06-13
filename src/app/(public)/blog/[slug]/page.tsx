'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CheckCircle2, Star } from 'lucide-react'

const POSTS = [
  {
    id: 'sox-compliance',
    title: 'Automating SOX Compliance in Your Procure-to-Pay Pipeline',
    excerpt: 'Manual audits are prone to error. Learn how cryptographic hashing and immutable ledger posts can guarantee strict compliance without the overhead.',
    category: 'BUYING',
    date: 'June 5, 2026',
    readTime: '6 min read',
    author: 'Michael Chang',
    role: 'Lead Security Engineer',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'netsuite-suiteql',
    title: 'Advanced SuiteQL: Unlocking Real-time Financial Telemetry',
    excerpt: 'Move beyond traditional saved searches. A deep dive into utilizing SuiteQL via RESTlets for high-performance, real-time data extraction.',
    category: 'TECHNICAL',
    date: 'May 28, 2026',
    readTime: '12 min read',
    author: 'Elena Rodriguez',
    role: 'NetSuite Architect',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'workday-hcm',
    title: 'Idempotency Patterns in Workday Payroll Integrations',
    excerpt: 'Handling network failures gracefully. How to design idempotent payloads to ensure high-value journal entries are never duplicated.',
    category: 'ENGINEERING',
    date: 'May 15, 2026',
    readTime: '9 min read',
    author: 'Sarah Chen',
    role: 'Principal Architect',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'coupa-idoc',
    title: 'Legacy Meets Modern: Bridging JSON and SAP IDocs',
    excerpt: 'Architectural patterns for translating modern RESTful JSON payloads into legacy SAP ALE and IDoc formats securely and reliably.',
    category: 'ARCHITECTURE',
    date: 'May 02, 2026',
    readTime: '7 min read',
    author: 'David Kumar',
    role: 'Integration Specialist',
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'saas-governance',
    title: 'The Hidden Cost of Shadow IT: Automating SaaS Governance',
    excerpt: 'How integrating SaaS management platforms with your ERP can automatically uncover unsanctioned software spend and enforce policies.',
    category: 'STRATEGY',
    date: 'April 20, 2026',
    readTime: '5 min read',
    author: 'Rachel Foster',
    role: 'IT Operations Manager',
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ai-automation',
    title: 'Evaluating LLMs for Automated Invoice Reconciliation',
    excerpt: 'Our findings on utilizing frontier AI models to parse, map, and mathematically reconcile complex multi-line PDF invoices at scale.',
    category: 'AI & ML',
    date: 'April 08, 2026',
    readTime: '11 min read',
    author: 'Dr. James Wilson',
    role: 'AI Researcher',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'data-mesh-implementation',
    title: 'Transitioning to a Data Mesh Architecture for Financial Data',
    excerpt: 'Why centralized data lakes are failing enterprise finance. A practical guide to implementing a domain-oriented decentralized data ownership model.',
    category: 'DATA ARCHITECTURE',
    date: 'March 22, 2026',
    readTime: '10 min read',
    author: 'Alex Thorne',
    role: 'Data Architect',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'zero-trust-erp',
    title: 'Implementing Zero Trust within Legacy ERP Ecosystems',
    excerpt: 'Securing massive ERP surfaces isn\'t just about VPNs anymore. We explore applying identity-aware proxies and micro-segmentation to on-premise systems.',
    category: 'SECURITY',
    date: 'March 11, 2026',
    readTime: '8 min read',
    author: 'Michael Chang',
    role: 'Lead Security Engineer',
    image: 'https://images.unsplash.com/photo-1614064641913-6b714165ea24?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'cloud-cost-optimization',
    title: 'FinOps for Integration: Optimizing High-Volume Middleware Cloud Costs',
    excerpt: 'When integration pipelines process billions of events, infrastructure costs can spiral. Learn how to architect for efficiency without sacrificing throughput.',
    category: 'STRATEGY',
    date: 'February 28, 2026',
    readTime: '7 min read',
    author: 'Elena Rodriguez',
    role: 'NetSuite Architect',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600'
  }
]

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const post = POSTS.find(p => p.id === slug) || POSTS[0]
  
  return (
    <main className="bg-white min-h-screen font-sans text-slate-800">
      
      {/* ── SPENDFLO STYLE HERO SECTION ── */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column (Content) */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#E8A020]/10 text-[#E8A020] text-[11px] font-bold tracking-widest uppercase rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-[46px] font-bold text-slate-900 leading-[1.2] mb-6 tracking-tight">
                {post.title}
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </p>
              
              <div className="text-sm text-slate-500 mb-8">
                Published on: {post.date}
              </div>
              
              <div className="h-px w-full bg-slate-200 mb-8" />
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden border border-slate-300">
                  {post.author ? post.author.charAt(0) : 'F'}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{post.author}</div>
                  <div className="text-sm text-slate-500">{post.role}</div>
                </div>
              </div>
            </div>

            {/* Right Column (Visual) */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-slate-50">
              <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── SPENDFLO STYLE BELOW-HERO CTA BANNER ── */}
      <div className="w-full bg-[#0A1628] py-4">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg">
            State of SaaS Procurement 2026
          </div>
          <button className="px-6 py-2 bg-[#E8A020] hover:bg-[#F0B030] text-[#0A1628] font-bold rounded-full transition-colors text-sm">
            Download Now
          </button>
        </div>
      </div>

      {/* ── BODY SECTION & STICKY SIDEBAR ── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Main Body (Left Column - ~70%) */}
          <div className="lg:w-[70%]">
            
            {/* Table of Contents */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What this blog covers</h3>
              <ul className="space-y-4 list-none p-0 m-0">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8A020] mt-2 shrink-0" />
                  <a href="#core-challenge" className="text-slate-600 hover:text-[#E8A020] font-medium text-lg transition-colors underline-offset-4">The Core Challenge</a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8A020] mt-2 shrink-0" />
                  <a href="#architecting-resilience" className="text-slate-600 hover:text-[#E8A020] font-medium text-lg transition-colors underline-offset-4">Architecting for Resilience</a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8A020] mt-2 shrink-0" />
                  <a href="#implementation" className="text-slate-600 hover:text-[#E8A020] font-medium text-lg transition-colors underline-offset-4">Next Steps</a>
                </li>
              </ul>
            </div>

            {/* Prose Content */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[#E8A020] prose-p:text-slate-600 prose-p:leading-relaxed">
              
              <h2 id="core-challenge" className="text-3xl mt-12 mb-6">The Core Challenge</h2>
              <p>
                In today's highly dynamic enterprise landscape, maintaining seamless data flow across heterogeneous systems is not merely an operational nicety—it's a critical strategic imperative. As systems scale and API boundaries expand, legacy architectures begin to fracture under the load.
              </p>
              <p>
                When evaluating the current state of middleware infrastructure, the initial impulse is often to leverage out-of-the-box connectors. However, our engineering teams have observed that relying purely on synchronous point-to-point bindings dramatically increases operational risk during high-volume periods (e.g., end-of-quarter financial closing).
              </p>
              
              <div className="my-10 p-8 rounded-2xl bg-[#EAEAF5]/50 border border-slate-200">
                <p className="font-medium text-slate-800 m-0 italic">
                  "We don't just build pipelines; we build resilient nervous systems for the enterprise. A failing integration shouldn't require an incident response team—it should self-heal."
                </p>
              </div>

              <h2 id="architecting-resilience" className="text-3xl mt-12 mb-6">Architecting for Resilience</h2>
              <p>
                Implementing an event-driven architecture using platforms like Kafka or advanced message queuing allows for strict decoupling of producers and consumers. This methodology guarantees that when a downstream ERP system is undergoing maintenance, transactions are safely buffered in the message broker.
              </p>

              <ul className="space-y-2 mt-6">
                <li><strong>Eliminate Timeout Errors:</strong> During batch synchronization windows, ensuring high availability.</li>
                <li><strong>Graceful Replay Mechanisms:</strong> For failed transactional payloads without manual intervention.</li>
                <li><strong>End-to-End Telemetry:</strong> Complete observability across the entire integration pipeline.</li>
              </ul>

              <h2 id="implementation" className="text-3xl mt-12 mb-6">Next Steps</h2>
              <p>
                Transitioning away from fragile integrations requires a calculated approach. In our upcoming deep dive, we'll cover the <a href="#">practical steps to refactoring your integration catalog</a> using a staggered migration strategy, ensuring zero downtime for mission-critical processes.
              </p>
            </div>
          </div>

          {/* Sticky Sidebar (Right Column - ~30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-32">
              <div className="bg-gradient-to-b from-[#1a1438] to-[#2d1b4e] rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                
                {/* Logo & Rating */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="text-white font-extrabold text-2xl tracking-tight mb-4">Flowtaris</div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-[#E8A020] text-[#E8A020]" />
                    ))}
                  </div>
                  <div className="text-white/80 text-sm font-medium">4.6 out of 5 stars</div>
                </div>

                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-white text-xs font-bold mb-8">
                  G2 LEADER FALL 2026
                </div>

                <h3 className="text-white text-2xl font-bold leading-tight mb-8">
                  Streamlined Procurement Greater Spend Control
                </h3>

                <Link href="/contact" className="w-full py-4 px-6 bg-[#E8A020] hover:bg-[#F0B030] text-[#0A1628] font-bold rounded-xl transition-colors text-center">
                  Talk to an expert for free
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SIMILAR BLOGS SECTION ── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Similar Blogs</h2>
            <Link href="/blog" className="text-[#E8A020] font-bold hover:text-[#F0B030] transition-colors">
              See All &gt;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POSTS.slice(1, 4).map((relatedPost) => (
              <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-video">
                  <Image src={relatedPost.image} alt={relatedPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E8A020] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
