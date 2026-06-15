'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { 
  Integration, 
  IntegrationsHero,
  IntegrationsSecurityPrecisionMain,
  IntegrationsSecurityPrecisionCard,
  IntegrationsExecutionTrace,
  ServicesErpArchitectureCard, 
  GlobalHero,
  AboutHero,
  AboutTopic
} from '@/types/database'

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

export async function updateIntegrationHero(id: string | null, data: any) {
  const supabase = await createClient()
  if (!id || id === 'new') {
    const { error } = await supabase.from('integrations_hero').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('integrations_hero').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }
  revalidatePath('/admin/integrations')
}

export async function updateIntegrationSecurityMain(id: string | null, data: any) {
  const supabase = await createClient()
  if (!id || id === 'new') {
    const { error } = await supabase.from('integrations_security_precision_main').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('integrations_security_precision_main').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }
  revalidatePath('/admin/integrations')
}

export async function addIntegrationSecurityCard(data: Omit<IntegrationsSecurityPrecisionCard, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations_security_precision_cards').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
}

export async function updateIntegrationSecurityCard(id: string, data: Partial<IntegrationsSecurityPrecisionCard>) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations_security_precision_cards').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
}

export async function deleteIntegrationSecurityCard(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations_security_precision_cards').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
}

export async function addIntegrationExecutionTrace(data: Omit<IntegrationsExecutionTrace, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations_execution_trace').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
}

export async function updateIntegrationExecutionTrace(id: string, data: Partial<IntegrationsExecutionTrace>) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations_execution_trace').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
}

export async function deleteIntegrationExecutionTrace(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('integrations_execution_trace').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/integrations')
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
export async function addErpCard(data: Omit<ServicesErpArchitectureCard, 'id' | 'created_at' | 'updated_at' | 'service_id'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('services_erp_architecture_cards').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/services') 
}

export async function updateErpCard(id: string, data: Partial<Omit<ServicesErpArchitectureCard, 'service_id'>>) {
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

// ==========================================
// ABOUT PAGE ACTIONS
// ==========================================
export async function updateAboutHero(id: string | null, data: Partial<AboutHero>) {
  const supabase = await createClient()
  if (!id || id === 'new') {
    const { error } = await supabase.from('about_hero').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('about_hero').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }
  revalidatePath('/admin/about')
  revalidatePath('/about')
}

export async function addAboutTopic(data: Omit<AboutTopic, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('about_topics').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/about')
  revalidatePath('/about')
}

export async function updateAboutTopic(id: string, data: Partial<AboutTopic>) {
  const supabase = await createClient()
  const { error } = await supabase.from('about_topics').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/about')
  revalidatePath('/about')
}

export async function deleteAboutTopic(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('about_topics').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/about')
  revalidatePath('/about')
}
