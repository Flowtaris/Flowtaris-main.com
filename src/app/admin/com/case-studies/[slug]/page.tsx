import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { CaseStudyEditor } from '@/components/admin/CaseStudyEditor'

export const revalidate = 0

export default async function AdminCaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!caseStudy) notFound()

  return (
    <div className="space-y-6">
      {/* Back + Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link
            href="/admin/case-studies"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All Case Studies
          </Link>
          <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
            {caseStudy.title}
          </h1>
          <p className="text-slate-500 mt-0.5 text-xs font-mono">/case-studies/{caseStudy.slug}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              caseStudy.status === 'published'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
              {caseStudy.status === 'published' ? '● Published' : '○ Draft'}
            </span>
            {caseStudy.is_featured && (
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200">
                ★ Featured
              </span>
            )}
          </div>
        </div>
        <a
          href={`/case-studies/${caseStudy.slug}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-navy-900 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview Live Page
        </a>
      </div>

      {/* Primary Editor */}
      <div className="admin-card p-0 overflow-hidden">
        <CaseStudyEditor caseStudy={caseStudy} />
      </div>
    </div>
  )
}
