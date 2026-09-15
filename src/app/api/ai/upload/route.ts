import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const bucket = (formData.get('bucket') as string) || 'assets'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate it's an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop() || 'png'
    const fileName = `admin-upload-${Date.now()}.${fileExt}`
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const supabaseUrl = process.env.SUPABASE_URL_AI
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY_AI

    // --- Path 1: Upload to Supabase Storage ---
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        console.error('Supabase upload error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      return NextResponse.json({ url: publicUrl })
    }

    // --- Path 2: Fallback — save to public/uploads locally ---
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    await writeFile(path.join(uploadsDir, fileName), buffer)
    const publicUrl = `/uploads/${fileName}`

    return NextResponse.json({ url: publicUrl })
  } catch (err: any) {
    console.error('Upload route error:', err)
    return NextResponse.json(
      { error: err?.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
