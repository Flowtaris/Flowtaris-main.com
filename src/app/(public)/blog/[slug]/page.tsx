import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { FAQAccordion } from './FAQAccordion'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient(['blogs', slug])

  // Fetch the current blog
  const { data: blog, error: blogError } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (blogError || !blog) return notFound()

  // Fetch related content concurrently
  const [
    { data: heroData },
    { data: topicsData },
    { data: faqsData },
    { data: similarBlogsData }
  ] = await Promise.all([
    supabase.from('blogs_hero').select('*').eq('blog_id', blog.id).maybeSingle(),
    supabase.from('blogs_topics').select('*').eq('blog_id', blog.id).order('sort_order', { ascending: true }),
    supabase.from('blogs_faqs').select('*').eq('blog_id', blog.id).order('sort_order', { ascending: true }),
    supabase
      .from('blogs')
      .select('id, name, slug, created_at, blogs_hero(title, description, image_url)')
      .neq('id', blog.id)
      .limit(3)
  ])

  // Process similar blogs
  const similarBlogs = (similarBlogsData || []).map((b: any) => {
    const hero = Array.isArray(b.blogs_hero) ? b.blogs_hero[0] : b.blogs_hero;
    return {
      id: b.slug,
      title: hero?.title || b.name,
      excerpt: hero?.description || '',
      category: b.name,
      image: hero?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
    }
  })

  // Format the main post
  const post = {
    title: heroData?.title || blog.name,
    excerpt: heroData?.description || '',
    category: blog.name,
    date: heroData?.publication_date || new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: heroData?.author_name || 'Admin',
    role: heroData?.author_designation || 'Author',
    image: heroData?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
  }

  const topics = topicsData || [];
  const faqs = faqsData || [];

  return (
    <main className="bg-white min-h-screen font-sans text-slate-800">
      
      {/* ── HERO SECTION ── */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column (Content) */}
            <div>
              <h1 className="text-4xl lg:text-[46px] font-bold text-slate-900 leading-[1.2] mb-6 tracking-tight">
                {post.title}
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </p>
              
              <div className="text-sm text-slate-500 mb-8">
                Published on: {post.date}
              </div>
              
              <div className="h-px w-full bg-slate-200 mb-8" />
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden border border-slate-300">
                  {post.author ? post.author.charAt(0) : 'F'}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{post.author}</div>
                  <div className="text-sm text-slate-500">{post.role}</div>
                </div>
              </div>
            </div>

            {/* Right Column (Visual) */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-slate-50">
              <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── BODY SECTION ── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="flex flex-col relative">
          
          {/* Main Body */}
          <div className="w-full max-w-4xl mx-auto">
            
            {/* Table of Contents */}
            {topics.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">What this blog covers</h3>
                <ul className="space-y-4 list-none p-0 m-0">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8A020] mt-2 shrink-0" />
                      <a href={`#topic-${topic.id}`} className="text-slate-600 hover:text-[#E8A020] font-medium text-lg transition-colors underline-offset-4">
                        {topic.title}
                      </a>
                    </li>
                  ))}
                  {faqs.length > 0 && (
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8A020] mt-2 shrink-0" />
                      <a href="#faqs" className="text-slate-600 hover:text-[#E8A020] font-medium text-lg transition-colors underline-offset-4">
                        FAQs
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Prose Content */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[#E8A020] prose-p:text-slate-600 prose-p:leading-relaxed">
              
              {topics.map((topic) => (
                <div key={topic.id} className="mt-12">
                  <h1 id={`topic-${topic.id}`} className="text-3xl mb-6 font-bold">{topic.title}</h1>
                  {topic.description && <h2 className="text-xl font-medium text-slate-700 leading-relaxed mt-2 mb-6">{topic.description}</h2>}
                  
                  {topic.image_url && (
                    <div className="relative aspect-video w-full my-8 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                       <Image src={topic.image_url} alt={topic.title} fill className="object-cover" />
                    </div>
                  )}

                  {topic.sub_descriptions && topic.sub_descriptions.length > 0 && (
                    <div className="space-y-4 mt-6">
                      {topic.sub_descriptions.map((subDesc: string, i: number) => (
                        <h3 key={i} className="text-lg text-slate-600 leading-relaxed font-normal">{subDesc}</h3>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {faqs.length > 0 && (
                <>
                  <hr className="my-12 border-slate-200" />
                  <h2 id="faqs" className="text-3xl mt-12 mb-6 font-bold text-slate-900">Frequently Asked Questions</h2>
                  <FAQAccordion faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
                </>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ── SIMILAR BLOGS SECTION ── */}
      {similarBlogs.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Similar Blogs</h2>
              <Link href="/blog" className="text-[#E8A020] font-bold hover:text-[#F0B030] transition-colors">
                See All &gt;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarBlogs.map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-video">
                    <Image src={relatedPost.image} alt={relatedPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E8A020] transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
