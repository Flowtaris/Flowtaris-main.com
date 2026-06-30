import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MapPin, Briefcase, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import JobApplicationForm from './JobApplicationForm'

export default async function CareerDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient(['careers'])
  const { data: career } = await supabase.from('careers').select('*').eq('id', params.id).single()

  if (!career || career.status !== 'Active') notFound()

  return (
    <main className="bg-slate-50 min-h-screen pt-32 pb-32 font-sans">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <Link href="/careers" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0A1628] font-semibold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/60 shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
              {career.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-8 leading-tight" style={{ fontFamily: 'var(--font-sora)' }}>
            {career.position_name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <MapPin className="w-5 h-5 text-slate-400" />
              {career.location}
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Briefcase className="w-5 h-5 text-slate-400" />
              {career.employment_type}
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Calendar className="w-5 h-5 text-slate-400" />
              Posted {new Date(career.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-4">About the Role</h3>
            <div className="whitespace-pre-wrap text-slate-600 mb-10 leading-relaxed">
              {career.full_description}
            </div>

            {career.responsibilities && (
              <>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">Responsibilities</h3>
                <div className="whitespace-pre-wrap text-slate-600 mb-10 leading-relaxed">
                  {career.responsibilities}
                </div>
              </>
            )}

            {career.requirements && (
              <>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">Requirements</h3>
                <div className="whitespace-pre-wrap text-slate-600 mb-10 leading-relaxed">
                  {career.requirements}
                </div>
              </>
            )}
          </div>
        </div>

        <div id="apply-section" className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E8A020]/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <h2 className="text-3xl font-bold text-[#0A1628] mb-2 relative z-10" style={{ fontFamily: 'var(--font-sora)' }}>
            Apply for this position
          </h2>
          <p className="text-slate-500 mb-8 relative z-10">
            Fill out the form below and attach your resume. We will get back to you shortly.
          </p>
          
          <JobApplicationForm careerId={career.id} />
        </div>
      </div>
    </main>
  )
}
