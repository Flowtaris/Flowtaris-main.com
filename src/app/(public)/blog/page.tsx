'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'

const POSTS = [
  {
    id: 'sox-compliance',
    title: 'Automating SOX Compliance in Your Procure-to-Pay Pipeline',
    excerpt: 'Manual audits are prone to error. Learn how cryptographic hashing and immutable ledger posts can guarantee strict compliance without the overhead.',
    category: 'Security & Compliance',
    date: 'June 5, 2026',
    author: 'Michael Chang',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'netsuite-suiteql',
    title: 'Advanced SuiteQL: Unlocking Real-time Financial Telemetry',
    excerpt: 'Move beyond traditional saved searches. A deep dive into utilizing SuiteQL via RESTlets for high-performance, real-time data extraction.',
    category: 'Technical Guide',
    date: 'May 28, 2026',
    author: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'workday-hcm',
    title: 'Idempotency Patterns in Workday Payroll Integrations',
    excerpt: 'Handling network failures gracefully. How to design idempotent payloads to ensure high-value journal entries are never duplicated.',
    category: 'Engineering',
    date: 'May 15, 2026',
    author: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'coupa-idoc',
    title: 'Legacy Meets Modern: Bridging JSON and SAP IDocs',
    excerpt: 'Architectural patterns for translating modern RESTful JSON payloads into legacy SAP ALE and IDoc formats securely and reliably.',
    category: 'Architecture',
    date: 'May 02, 2026',
    author: 'David Kumar',
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'saas-governance',
    title: 'The Hidden Cost of Shadow IT: Automating SaaS Governance',
    excerpt: 'How integrating SaaS management platforms with your ERP can automatically uncover unsanctioned software spend and enforce policies.',
    category: 'Strategy',
    date: 'April 20, 2026',
    author: 'Rachel Foster',
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ai-automation',
    title: 'Evaluating LLMs for Automated Invoice Reconciliation',
    excerpt: 'Our findings on utilizing frontier AI models to parse, map, and mathematically reconcile complex multi-line PDF invoices at scale.',
    category: 'AI & ML',
    date: 'April 08, 2026',
    author: 'Dr. James Wilson',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'data-mesh-implementation',
    title: 'Transitioning to a Data Mesh Architecture for Financial Data',
    excerpt: 'Why centralized data lakes are failing enterprise finance. A practical guide to implementing a domain-oriented decentralized data ownership model.',
    category: 'Data Architecture',
    date: 'March 22, 2026',
    author: 'Alex Thorne',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'zero-trust-erp',
    title: 'Implementing Zero Trust within Legacy ERP Ecosystems',
    excerpt: 'Securing massive ERP surfaces isn\'t just about VPNs anymore. We explore applying identity-aware proxies and micro-segmentation to on-premise systems.',
    category: 'Security',
    date: 'March 11, 2026',
    author: 'Michael Chang',
    image: 'https://images.unsplash.com/photo-1614064641913-6b714165ea24?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'cloud-cost-optimization',
    title: 'FinOps for Integration: Optimizing High-Volume Middleware Cloud Costs',
    excerpt: 'When integration pipelines process billions of events, infrastructure costs can spiral. Learn how to architect for efficiency without sacrificing throughput.',
    category: 'Strategy',
    date: 'February 28, 2026',
    author: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600'
  }
]

const FEATURED_POST = POSTS[0]
const REGULAR_POSTS = POSTS.slice(1)

export default function BlogsPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#E8A020] selection:text-white">
      {/* Hero & Featured Post */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Stay updated with our latest insights
            </h1>
          </div>

          {/* Featured Post (Horizontal 2-Column) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-8 bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm">
            <Link href={`/blog/${FEATURED_POST.id}`} className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 block">
              <Image src={FEATURED_POST.image} alt={FEATURED_POST.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="p-6 lg:pr-12">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                {FEATURED_POST.category}
              </span>
              <Link href={`/blog/${FEATURED_POST.id}`}>
                <h2 className="text-3xl font-bold text-[#0A1628] leading-snug mb-4 hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                  {FEATURED_POST.title}
                </h2>
              </Link>
              <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                {FEATURED_POST.excerpt}
              </p>
              <Link href={`/blog/${FEATURED_POST.id}`} className="inline-flex items-center text-[#0A1628] font-bold hover:text-[#E8A020] transition-colors group">
                <span className="border-b-2 border-[#0A1628] group-hover:border-[#E8A020] pb-1 transition-colors">Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Search */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 gap-6 pb-0">
          {/* Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['All', 'Engineering', 'Architecture', 'Strategy', 'Security & Compliance'].map((cat, i) => (
              <button 
                key={cat}
                className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors ${
                  i === 0 
                    ? 'text-[#0A1628] border-b-[3px] border-[#0A1628]' 
                    : 'text-slate-500 hover:text-[#0A1628] border-b-[3px] border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative mb-3 w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Topic" 
              className="pl-11 pr-4 py-2.5 w-full md:w-72 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REGULAR_POSTS.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-[#fafafa] rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 pb-0">
                <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-slate-200">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-3 leading-snug group-hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-slate-600 text-sm line-clamp-2 mt-auto leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
