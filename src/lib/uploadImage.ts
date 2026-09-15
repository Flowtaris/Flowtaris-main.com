/**
 * Uploads an image file to the server via the /api/ai/upload route.
 * Works whether or not Supabase credentials are configured:
 *   - With credentials → uploads to Supabase Storage, returns public URL
 *   - Without credentials → saves locally to /public/uploads, returns local URL
 */
export async function uploadImageToServer(
  file: File,
  bucket: string = 'assets'
): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  form.append('bucket', bucket)

  const res = await fetch('/api/ai/upload', {
    method: 'POST',
    body: form,
  })

  const json = await res.json()

  if (!res.ok || json.error) {
    throw new Error(json.error || 'Upload failed')
  }

  return json.url as string
}
