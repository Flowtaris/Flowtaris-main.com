'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ─── Case Studies Registry ─────────────────────────────────────────

export async function addCaseStudy(title: string, slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('case_studies')
    .insert([{ title, slug }])
    .select()
    .single()
  
  if (error) {
    console.error('Error adding case study:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/case-studies')
  revalidatePath(`/case-studies/${slug}`)
  return data
}

export async function deleteCaseStudy(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting case study:', error)
    throw new Error('Failed to delete case study')
  }

  revalidatePath('/admin/case-studies')
  revalidatePath('/case-studies')
}

// ─── Case Studies Hero ──────────────────────────────────────────────

export async function upsertCaseStudyHero(
  caseStudyId: string,
  heroTitle: string,
  heroDescription: string,
  imageUrl: string
) {
  const supabase = await createClient()

  // check if exists
  const { data: existing } = await supabase
    .from('case_studies_hero')
    .select('id')
    .eq('case_study_id', caseStudyId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('case_studies_hero')
      .update({
        hero_title: heroTitle,
        hero_description: heroDescription,
        image_url: imageUrl,
      })
      .eq('id', existing.id)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('case_studies_hero')
      .insert([{
        case_study_id: caseStudyId,
        hero_title: heroTitle,
        hero_description: heroDescription,
        image_url: imageUrl,
      }])

    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/case-studies/[slug]', 'page')
}

// ─── Case Studies Industry ──────────────────────────────────────────

export async function addCaseStudyIndustry(caseStudyId: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_industry')
    .insert([{ case_study_id: caseStudyId, name }])

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function updateCaseStudyIndustry(id: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_industry')
    .update({ name })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function deleteCaseStudyIndustry(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_industry')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

// ─── Case Studies Solutions ─────────────────────────────────────────

export async function addCaseStudySolution(caseStudyId: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_solutions')
    .insert([{ case_study_id: caseStudyId, name }])

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function updateCaseStudySolution(id: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_solutions')
    .update({ name })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function deleteCaseStudySolution(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_solutions')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

// ─── Case Studies Tech Stack ────────────────────────────────────────

export async function addCaseStudyTechStack(caseStudyId: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_tech_stack')
    .insert([{ case_study_id: caseStudyId, name }])

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function updateCaseStudyTechStack(id: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_tech_stack')
    .update({ name })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function deleteCaseStudyTechStack(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_tech_stack')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

// ─── Case Studies Topics ────────────────────────────────────────────

export async function addCaseStudyTopic(caseStudyId: string, topic: string, description: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_topics')
    .insert([{ case_study_id: caseStudyId, topic, description }])

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function updateCaseStudyTopic(id: string, topic: string, description: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_topics')
    .update({ topic, description })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}

export async function deleteCaseStudyTopic(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('case_studies_topics')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/case-studies/[slug]', 'page')
}
