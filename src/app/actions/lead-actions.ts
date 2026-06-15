'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

import { z } from 'zod'

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.string().min(1),
})

const deleteSchema = z.object({
  id: z.string().uuid(),
})

export async function updateLeadStatus(id: string, status: string) {
  const parsed = updateSchema.safeParse({ id, status })
  if (!parsed.success) throw new Error('Invalid input')

  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .update({ status: parsed.data.status })
    .eq('id', parsed.data.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/leads')
}

export async function deleteLead(id: string) {
  const parsed = deleteSchema.safeParse({ id })
  if (!parsed.success) throw new Error('Invalid input')

  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', parsed.data.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/leads')
}
