'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadAsset(formData: FormData): Promise<string> {
  const file = formData.get('file') as File | null
  if (!file) {
    throw new Error('No file provided')
  }

  const supabase = await createClient()
  
  // Enforce server-side authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const fileExt = file.name.split('.').pop()
  // Use a secure random name
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  // For server actions, we read the array buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { data, error } = await supabase.storage
    .from('assets')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  // Get the public URL for the uploaded file
  const { data: publicUrlData } = supabase.storage
    .from('assets')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}
