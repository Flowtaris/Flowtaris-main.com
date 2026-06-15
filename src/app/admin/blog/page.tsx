import { createClient } from '@/lib/supabase/server'
import { BlogList } from '@/components/admin/blog/BlogList'

export const revalidate = 0

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: true })

  return <BlogList initialBlogs={blogs ?? []} />
}
