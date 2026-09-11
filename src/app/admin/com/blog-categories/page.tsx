import { createClient } from '@/lib/supabase/server'
import { BlogCategoriesList } from '@/components/admin/blog/BlogCategoriesList'

export const revalidate = 0

export default async function AdminBlogCategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name', { ascending: true })

  return <BlogCategoriesList initialCategories={categories ?? []} />
}
