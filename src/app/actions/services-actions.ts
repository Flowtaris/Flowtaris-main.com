'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import {
  ServicesHero,
  ServicesWhyChoose,
  ServicesBusinessSuiteMain,
  ServicesBusinessSuiteItem,
  ServicesErpArchitectureMain,
  ServicesErpArchitectureCard,
  ServicesDeepModule,
} from '@/types/database'

function revalidateService(slug: string) {
  revalidatePath('/admin/services')
  revalidatePath(`/admin/services/${slug}`)
  revalidatePath(`/services/${slug}`)
}

// ==========================================
// SERVICES REGISTRY (parent)
// ==========================================
export async function createService(data: { name: string; slug: string }) {
  const supabase = await createClient()
  const { data: created, error } = await supabase
    .from('services')
    .insert([{ name: data.name, slug: data.slug }])
    .select('id, slug')
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  return created
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
}

// ==========================================
// SERVICES HERO
// ==========================================
export async function upsertServicesHero(
  serviceId: string,
  id: string | null,
  data: Pick<ServicesHero, 'hero_description' | 'normal_description'>
) {
  const supabase = await createClient()
  if (id) {
    const { error } = await supabase.from('services_hero').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('services_hero').insert([{ ...data, service_id: serviceId }])
    if (error) throw new Error(error.message)
  }
}

// ==========================================
// SERVICES WHY CHOOSE (cards)
// ==========================================
export async function addWhyChooseCard(
  serviceId: string,
  data: Pick<ServicesWhyChoose, 'main_description' | 'small_description'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_why_choose').insert([{ ...data, service_id: serviceId }])
  if (error) throw new Error(error.message)
}

export async function updateWhyChooseCard(
  id: string,
  data: Pick<ServicesWhyChoose, 'main_description' | 'small_description'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_why_choose').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteWhyChooseCard(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_why_choose').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ==========================================
// SERVICES BUSINESS SUITE MAIN
// ==========================================
export async function upsertBusinessSuiteMain(
  serviceId: string,
  id: string | null,
  data: Pick<ServicesBusinessSuiteMain, 'small_description'>
) {
  const supabase = await createClient()
  if (id) {
    const { error } = await supabase.from('services_business_suite_main').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('services_business_suite_main').insert([{ ...data, service_id: serviceId }])
    if (error) throw new Error(error.message)
  }
}

// ==========================================
// SERVICES BUSINESS SUITE ITEMS
// ==========================================
export async function addBusinessSuiteItem(
  serviceId: string,
  data: Pick<ServicesBusinessSuiteItem, 'title' | 'description' | 'image_url'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_business_suite_items').insert([{ ...data, service_id: serviceId }])
  if (error) throw new Error(error.message)
}

export async function updateBusinessSuiteItem(
  id: string,
  data: Pick<ServicesBusinessSuiteItem, 'title' | 'description' | 'image_url'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_business_suite_items').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteBusinessSuiteItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_business_suite_items').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ==========================================
// SERVICES ERP ARCHITECTURE MAIN
// ==========================================
export async function upsertErpArchitectureMain(
  serviceId: string,
  id: string | null,
  data: Pick<ServicesErpArchitectureMain, 'small_description'>
) {
  const supabase = await createClient()
  if (id) {
    const { error } = await supabase.from('services_erp_architecture_main').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('services_erp_architecture_main').insert([{ ...data, service_id: serviceId }])
    if (error) throw new Error(error.message)
  }
}

// ==========================================
// SERVICES ERP ARCHITECTURE CARDS (full CRUD)
// ==========================================
export async function addErpArchitectureCard(
  serviceId: string,
  data: Pick<ServicesErpArchitectureCard, 'title' | 'description' | 'tags' | 'priority'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_erp_architecture_cards').insert([{ ...data, service_id: serviceId }])
  if (error) throw new Error(error.message)
}

export async function updateErpArchitectureCard(
  id: string,
  data: Pick<ServicesErpArchitectureCard, 'title' | 'description' | 'tags' | 'priority'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_erp_architecture_cards').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteErpArchitectureCard(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_erp_architecture_cards').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ==========================================
// SERVICES DEEP MODULE
// ==========================================
export async function addDeepModuleCard(
  serviceId: string,
  data: Pick<ServicesDeepModule, 'title' | 'small_description'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_deep_module').insert([{ ...data, service_id: serviceId }])
  if (error) throw new Error(error.message)
}

export async function updateDeepModuleCard(
  id: string,
  data: Pick<ServicesDeepModule, 'title' | 'small_description'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_deep_module').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteDeepModuleCard(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_deep_module').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
