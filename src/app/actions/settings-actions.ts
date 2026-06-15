'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertSiteSetting(key: string, value: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() })

  if (error) {
    console.error('Error upserting site setting:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout') // revalidate the entire site layout
  return { success: true }
}
