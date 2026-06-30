'use client'

import { Career } from '@/types/database'
import { useState, useMemo } from 'react'
import { Search, MapPin, Briefcase, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function CareersListClient({ initialCareers }: { initialCareers: Career[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCareers = useMemo(() => {
    return initialCareers.filter(career => {
      const matchesSearch = searchQuery === '' || 
        career.position_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.short_description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [initialCareers, searchQuery])

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
            Join Our Team
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
            Build the future of enterprise software. Explore open positions and find your next big opportunity at Flowtaris.
          </p>

          <div className="max-w-2xl mx-auto relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by position or keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-6 lg:px-12 pb-32">
        {filteredCareers.length > 0 ? (
          <div className="space-y-6">
            {filteredCareers.map((career) => (
              <Link 
                key={career.id} 
                href={`/careers/${career.id}`}
                className="group block bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(10,22,40,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                        {career.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Posted {new Date(career.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A1628] mb-3 group-hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                      {career.position_name}
                    </h2>
                    <p className="text-slate-500 line-clamp-2 mb-6">
                      {career.short_description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {career.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        {career.employment_type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-slate-100">
                    <span className="text-[#0A1628] font-bold group-hover:text-[#E8A020] transition-colors">
                      Apply Now
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#E8A020] transition-colors duration-300">
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 className="text-xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: 'var(--font-sora)' }}>No open positions found</h3>
            <p className="text-slate-500">We couldn't find any job openings matching your criteria.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-[#E8A020] font-bold hover:text-[#d69018] transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </>
  )
}
