'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadAsset(formData: FormData): Promise<string> {
  const file = formData.get('file') as File | null
  if (!file) {
    throw new Error('No file provided')
  }

  const supabase = await createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('assets')
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  const { data: publicUrlData } = supabase.storage
    .from('assets')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}

export async function uploadImage(formData: FormData): Promise<{ publicUrl: string | null, error: string | null }> {
  const file = formData.get('file') as File | null
  const bucket = (formData.get('bucket') as string) || 'images'
  const folder = (formData.get('folder') as string) || ''

  if (!file) {
    return { publicUrl: null, error: 'No file provided' }
  }

  try {
    const supabase = await createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      return { publicUrl: null, error: error.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return { publicUrl: publicUrlData.publicUrl, error: null }
  } catch (err: any) {
    return { publicUrl: null, error: err.message || 'Unknown error occurred' }
  }
}
