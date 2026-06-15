import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ServicesSectionTabs } from '@/components/admin/services/ServicesSectionTabs'
import { CaseStudyHeroEditor } from '@/components/admin/case-studies/CaseStudyHeroEditor'
import { CaseStudySimpleListEditor } from '@/components/admin/case-studies/CaseStudySimpleListEditor'
import { CaseStudyTopicsEditor } from '@/components/admin/case-studies/CaseStudyTopicsEditor'

import {
  addCaseStudyIndustry, updateCaseStudyIndustry, deleteCaseStudyIndustry,
  addCaseStudySolution, updateCaseStudySolution, deleteCaseStudySolution,
  addCaseStudyTechStack, updateCaseStudyTechStack, deleteCaseStudyTechStack
} from '@/app/actions/case-studies-actions'

export const revalidate = 0

export default async function AdminCaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch parent
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!caseStudy) notFound()
  const csId = caseStudy.id

  // Fetch all content
  const [
    { data: heroData },
    { data: industryData },
    { data: solutionsData },
    { data: techStackData },
    { data: topicsData },
  ] = await Promise.all([
    supabase.from('case_studies_hero').select('*').eq('case_study_id', csId).limit(1).maybeSingle(),
    supabase.from('case_studies_industry').select('*').eq('case_study_id', csId).order('created_at', { ascending: true }),
    supabase.from('case_studies_solutions').select('*').eq('case_study_id', csId).order('created_at', { ascending: true }),
    supabase.from('case_studies_tech_stack').select('*').eq('case_study_id', csId).order('created_at', { ascending: true }),
    supabase.from('case_studies_topics').select('*').eq('case_study_id', csId).order('created_at', { ascending: true }),
  ])

  const tabs = [
    { id: 'hero',         label: 'Hero' },
    { id: 'industry',     label: 'Industry',             badge: String(industryData?.length ?? 0) },
    { id: 'solutions',    label: 'Solutions Delivered',  badge: String(solutionsData?.length ?? 0) },
    { id: 'tech-stack',   label: 'Technology Stack',     badge: String(techStackData?.length ?? 0) },
    { id: 'topics',       label: 'Topics',               badge: String(topicsData?.length ?? 0) },
  ]

  return (
    <div className="space-y-6">
      {/* Back + Page header */}
      <div>
        <Link
          href="/admin/case-studies"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Case Studies
        </Link>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          {caseStudy.title}
        </h1>
        <p className="text-slate-400 mt-0.5 text-xs font-mono">/case-studies/{caseStudy.slug}</p>
        <p className="text-slate-500 mt-1 text-sm">
          Manage the content architecture of this case study.
        </p>
      </div>

      {/* Tabbed sections (Re-using ServicesSectionTabs UI) */}
      <ServicesSectionTabs tabs={tabs}>
        {/* ── 1. HERO ───────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Hero Section</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the hero headline, description, and cover image.
            </p>
          </div>
          <CaseStudyHeroEditor caseStudyId={csId} initialData={heroData ?? null} />
        </div>

        {/* ── 2. INDUSTRY ───────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Industry Type</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add, edit, or remove associated industries.
            </p>
          </div>
          <CaseStudySimpleListEditor
            caseStudyId={csId}
            items={industryData ?? []}
            itemName="Industry"
            addAction={addCaseStudyIndustry}
            updateAction={updateCaseStudyIndustry}
            deleteAction={deleteCaseStudyIndustry}
          />
        </div>

        {/* ── 3. SOLUTIONS ──────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Solutions Delivered</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              List the solutions implemented in this case study.
            </p>
          </div>
          <CaseStudySimpleListEditor
            caseStudyId={csId}
            items={solutionsData ?? []}
            itemName="Solution"
            addAction={addCaseStudySolution}
            updateAction={updateCaseStudySolution}
            deleteAction={deleteCaseStudySolution}
          />
        </div>

        {/* ── 4. TECH STACK ─────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Technology Stack</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specify the platforms and tools used.
            </p>
          </div>
          <CaseStudySimpleListEditor
            caseStudyId={csId}
            items={techStackData ?? []}
            itemName="Technology"
            addAction={addCaseStudyTechStack}
            updateAction={updateCaseStudyTechStack}
            deleteAction={deleteCaseStudyTechStack}
          />
        </div>

        {/* ── 5. TOPICS ─────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Narrative Topics</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add detailed sections like "Client Situation", "Solution Approach", or "Outcome".
            </p>
          </div>
          <CaseStudyTopicsEditor caseStudyId={csId} items={topicsData ?? []} />
        </div>
      </ServicesSectionTabs>
    </div>
  )
}
