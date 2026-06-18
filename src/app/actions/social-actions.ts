'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { SocialLink } from '@/types/database'

export async function upsertSocialLink(data: Partial<SocialLink>) {
  const supabase = await createClient()

  if (data.id) {
    const { error } = await supabase
      .from('social_links')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', data.id)
    if (error) return { success: false, error: error.message }
  } else {
    const { error } = await supabase
      .from('social_links')
      .insert({ ...data, updated_at: new Date().toISOString() })
    if (error) return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidateTag('layout-data')
  return { success: true }
}

export async function deleteSocialLink(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('social_links')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidateTag('layout-data')
  return { success: true }
}
