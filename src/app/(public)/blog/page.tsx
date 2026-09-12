import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { BlogListClient } from './BlogListClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Insights  Flowtaris',
  description: 'Read the latest insights on NetSuite customization, Coupa optimizations, and enterprise integrations from our certified ERP architects.',
  alternates: {
    canonical: 'https://www.flowtaris.com/blog',
  },
  openGraph: {
    title: 'Blog & Insights  Flowtaris',
    description: 'Read the latest insights on NetSuite customization, Coupa optimizations, and enterprise integrations from our certified ERP architects.',
    url: 'https://www.flowtaris.com/blog',
    type: 'website'
  }
}

export default async function BlogsPage() {
  const supabase = await createClient(['blogs'])
  
  // Fetch all blogs from the database
  const { data: blogsData, error } = await supabase
    .from('blogs')
    .select(`
      id,
      name,
      slug,
      created_at,
      blogs_hero (
        title,
        description,
        image_url,
        publication_date,
        author_name,
        author_designation
      ),
      blog_category_relations (
        blog_categories (
          name
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
  }

  // Fetch all active categories to build the tabs
  const { data: allCategoriesData } = await supabase
    .from('blog_categories')
    .select('name')
    .order('name')
  
  const allCategories = allCategoriesData?.map(c => c.name) || ['Engineering', 'Architecture', 'Strategy', 'Security & Compliance']

  const posts = (blogsData || []).map((b: any) => {
    const hero = Array.isArray(b.blogs_hero) ? b.blogs_hero[0] : b.blogs_hero;
    
    // Flatten category relations
    const categoryNames = b.blog_category_relations
      ?.map((rel: any) => rel.blog_categories?.name)
      .filter(Boolean) || [];

    const rawDate = hero?.publication_date || b.created_at;
    const d = new Date(rawDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return {
      id: b.slug,
      title: hero?.title || b.name,
      excerpt: hero?.description || '',
      categories: categoryNames,
      date: formattedDate,
      author: hero?.author_name || 'Flowtaris Team',
      authorDesignation: hero?.author_designation || 'ERP Specialist',
      image: hero?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
    }
  })

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#E8A020] selection:text-white">
      <BlogListClient initialPosts={posts} allCategories={allCategories} />
    </main>
  )
}
