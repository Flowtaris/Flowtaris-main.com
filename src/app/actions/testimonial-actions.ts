'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Testimonial } from '@/types/database'

export async function addTestimonial(data: Partial<Testimonial>) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('testimonials')
    .insert([data])

  if (error) throw new Error(error.message)
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('testimonials')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

export async function updateTestimonialPriorities(updates: { id: string; priority: number }[]) {
  const supabase = await createClient()
  
  // Note: doing sequential updates for simplicity, in a heavy app you might want RPC
  for (const update of updates) {
    const { error } = await supabase
      .from('testimonials')
      .update({ priority: update.priority })
      .eq('id', update.id)
    if (error) throw new Error(error.message)
  }
  
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}
