'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import {
  BlogHero,
  BlogTopic,
  BlogFaq,
} from '@/types/database'

function revalidateBlog(slug: string) {
  revalidateTag('blogs')
  revalidateTag(slug)
  revalidatePath('/admin/blog')
  revalidatePath(`/admin/blog/${slug}`)
  revalidatePath(`/blog/${slug}`)
  revalidatePath(`/blog`)
}

// ==========================================
// BLOGS REGISTRY (parent)
// ==========================================
export async function createBlog(data: { name: string; slug: string }) {
  const supabase = await createClient()
  const { data: created, error } = await supabase
    .from('blogs')
    .insert([{ name: data.name, slug: data.slug }])
    .select('id, slug')
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
  return created
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
}

// ==========================================
// BLOG HERO
// ==========================================
export async function upsertBlogHero(
  blogId: string,
  id: string | null,
  data: Pick<BlogHero, 'title' | 'description' | 'image_url' | 'publication_date' | 'author_name' | 'author_designation'>
) {
  const supabase = await createClient()
  if (id) {
    const { error } = await supabase.from('blogs_hero').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('blogs_hero').insert([{ ...data, blog_id: blogId }])
    if (error) throw new Error(error.message)
  }
}

// ==========================================
// BLOG TOPICS
// ==========================================
export async function addBlogTopic(
  blogId: string,
  data: Pick<BlogTopic, 'title' | 'description' | 'sub_descriptions' | 'sort_order'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs_topics').insert([{ ...data, blog_id: blogId }])
  if (error) throw new Error(error.message)
}

export async function updateBlogTopic(
  id: string,
  data: Pick<BlogTopic, 'title' | 'description' | 'sub_descriptions' | 'sort_order'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs_topics').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteBlogTopic(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs_topics').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ==========================================
// BLOG FAQS
// ==========================================
export async function addBlogFaq(
  blogId: string,
  data: Pick<BlogFaq, 'question' | 'answer' | 'sort_order'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs_faqs').insert([{ ...data, blog_id: blogId }])
  if (error) throw new Error(error.message)
}

export async function updateBlogFaq(
  id: string,
  data: Pick<BlogFaq, 'question' | 'answer' | 'sort_order'>
) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs_faqs').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteBlogFaq(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs_faqs').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
