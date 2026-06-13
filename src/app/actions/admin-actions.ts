'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Integration, ServicesErpArchitectureCard, GlobalHero } from '@/types/database'

// ==========================================
// INTEGRATIONS ACTIONS
// ==========================================
export async function addIntegration(data: Omit<Integration, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
  revalidatePath('/integrations')
}

export async function updateIntegration(id: string, data: Partial<Integration>) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
  revalidatePath('/integrations')
}

export async function deleteIntegration(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
  revalidatePath('/integrations')
}

// ==========================================
// SERVICES (ERP Architecture Cards) ACTIONS
// ==========================================
export async function addErpCard(data: Omit<ServicesErpArchitectureCard, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_erp_architecture_cards').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/services') 
}

export async function updateErpCard(id: string, data: Partial<ServicesErpArchitectureCard>) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_erp_architecture_cards').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/services')
}

// ==========================================
// GLOBAL HERO ACTIONS
// ==========================================
export async function updateGlobalHero(id: string, data: Partial<GlobalHero>) {
  const supabase = await createClient()
  const { error } = await supabase.from('global_hero').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function createGlobalHero(data: Omit<GlobalHero, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('global_hero').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}
