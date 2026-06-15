'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Technologies Actions
export async function addTechnology(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('modern_technologies').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/technologies')
  revalidatePath('/')
}

export async function deleteTechnology(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('modern_technologies').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/technologies')
  revalidatePath('/')
}

export async function updateTechnology(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('modern_technologies').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/technologies')
  revalidatePath('/')
}

export async function updateTechnologyPriorities(updates: { id: string, priority: number }[]) {
  const supabase = await createClient()
  
  const promises = updates.map(update => 
    supabase.from('modern_technologies').update({ priority: update.priority }).eq('id', update.id)
  )
  await Promise.all(promises)
  
  revalidatePath('/admin/technologies')
  revalidatePath('/')
}

// Why Choose Us Sectors Actions
export async function addWhyChooseUsSector(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('why_choose_us_sectors').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/why-choose-us')
  revalidatePath('/')
}

export async function deleteWhyChooseUsSector(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('why_choose_us_sectors').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/why-choose-us')
  revalidatePath('/')
}

export async function updateWhyChooseUsSectorPriorities(updates: { id: string, priority: number }[]) {
  const supabase = await createClient()
  const promises = updates.map(update => 
    supabase.from('why_choose_us_sectors').update({ priority: update.priority }).eq('id', update.id)
  )
  await Promise.all(promises)
  revalidatePath('/admin/why-choose-us')
  revalidatePath('/')
}

// Why Choose Us Actions
export async function addWhyChooseUs(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('why_choose_us_cards').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/why-choose-us')
}

export async function deleteWhyChooseUs(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('why_choose_us_cards').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/why-choose-us')
  revalidatePath('/')
}

export async function updateWhyChooseUsPriorities(updates: { id: string, priority: number }[]) {
  const supabase = await createClient()
  
  const promises = updates.map(update => 
    supabase.from('why_choose_us_cards').update({ priority: update.priority }).eq('id', update.id)
  )
  await Promise.all(promises)
  
  revalidatePath('/admin/why-choose-us')
  revalidatePath('/')
}

// Global Hero Image Actions
export async function addHeroImage(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('global_hero_images').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function updateHeroImage(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('global_hero_images').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function deleteHeroImage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('global_hero_images').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}
