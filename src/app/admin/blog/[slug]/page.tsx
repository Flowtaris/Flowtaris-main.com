import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { BlogSectionTabs } from '@/components/admin/blog/BlogSectionTabs'
import { BlogHeroEditor } from '@/components/admin/blog/BlogHeroEditor'
import { BlogTopicsEditor } from '@/components/admin/blog/BlogTopicsEditor'
import { BlogFaqsEditor } from '@/components/admin/blog/BlogFaqsEditor'

export const revalidate = 0

export default async function AdminBlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the parent blog record
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!blog) notFound()

  const blogId = blog.id

  // Fetch all content scoped to this blog post
  const [
    { data: heroData },
    { data: topicsData },
    { data: faqsData },
  ] = await Promise.all([
    supabase.from('blogs_hero').select('*').eq('blog_id', blogId).limit(1).maybeSingle(),
    supabase.from('blogs_topics').select('*').eq('blog_id', blogId).order('sort_order', { ascending: true }),
    supabase.from('blogs_faqs').select('*').eq('blog_id', blogId).order('sort_order', { ascending: true }),
  ])

  const tabs = [
    { id: 'hero',   label: 'Hero' },
    { id: 'topics', label: 'Topics', badge: String(topicsData?.length ?? 0) },
    { id: 'faqs',   label: 'FAQs',   badge: String(faqsData?.length ?? 0) },
  ]

  return (
    <div className="space-y-6">
      {/* Back + Page header */}
      <div>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Blog Posts
        </Link>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          {blog.name}
        </h1>
        <p className="text-slate-400 mt-0.5 text-xs font-mono">/blog/{blog.slug}</p>
        <p className="text-slate-500 mt-1 text-sm">
          Manage the content sections of this blog post.
        </p>
      </div>

      {/* Tabbed sections */}
      <BlogSectionTabs tabs={tabs}>
        {/* ── 1. HERO ───────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Hero Section</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the title, description, image, and author details for this blog post.
            </p>
          </div>
          <BlogHeroEditor blogId={blogId} initialData={heroData ?? null} />
        </div>

        {/* ── 2. TOPICS ─────────────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Topics & Content</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add, edit or delete topics. Each topic can have multiple sub-descriptions.
            </p>
          </div>
          <BlogTopicsEditor blogId={blogId} initialTopics={topicsData ?? []} />
        </div>

        {/* ── 3. FAQS ──────────────────── */}
        <div>
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add FAQs with questions and answers.
            </p>
          </div>
          <BlogFaqsEditor blogId={blogId} initialFaqs={faqsData ?? []} />
        </div>
      </BlogSectionTabs>
    </div>
  )
}
