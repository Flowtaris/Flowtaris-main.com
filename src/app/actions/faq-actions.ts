'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createFaq(data: { question: string; answer: string; priority: number; status: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').insert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}

export async function updateFaq(id: string, data: { question: string; answer: string; priority: number; status: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}

export async function deleteFaq(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}
