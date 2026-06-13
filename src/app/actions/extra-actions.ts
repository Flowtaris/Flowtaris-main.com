'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Technologies Actions
export async function addTechnology(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('modern_technologies').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/technologies')
}

export async function deleteTechnology(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('modern_technologies').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/technologies')
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
}
