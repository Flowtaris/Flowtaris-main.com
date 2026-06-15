import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = 7; // 1 featured + 6 regular
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient(['blogs'])
  const { data: blogsData, error, count } = await supabase
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
        author_name
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  const totalPages = Math.ceil((count || 0) / limit);

  if (error) {
    console.error('Error fetching blogs:', error)
  }

  const posts = (blogsData || []).map((b: any) => {
    const hero = Array.isArray(b.blogs_hero) ? b.blogs_hero[0] : b.blogs_hero;
    
    return {
      id: b.slug,
      title: hero?.title || b.name,
      excerpt: hero?.description || '',
      category: b.name,
      date: hero?.publication_date || new Date(b.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: hero?.author_name || 'Admin',
      image: hero?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
    }
  })

  const FEATURED_POST = posts[0]
  const REGULAR_POSTS = posts.slice(1)

  if (!FEATURED_POST) return (
    <main className="bg-white min-h-screen font-sans flex items-center justify-center">
      <p className="text-slate-500">No blogs found.</p>
    </main>
  );
  
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#E8A020] selection:text-white">
      {/* Hero & Featured Post */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Stay updated with our latest insights
            </h1>
          </div>

          {/* Featured Post (Horizontal 2-Column) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-8 bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm">
            <Link href={`/blog/${FEATURED_POST.id}`} className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 block">
              <Image src={FEATURED_POST.image} alt={FEATURED_POST.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="p-6 lg:pr-12">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                {FEATURED_POST.category}
              </span>
              <Link href={`/blog/${FEATURED_POST.id}`}>
                <h2 className="text-3xl font-bold text-[#0A1628] leading-snug mb-4 hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                  {FEATURED_POST.title}
                </h2>
              </Link>
              <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                {FEATURED_POST.excerpt}
              </p>
              <Link href={`/blog/${FEATURED_POST.id}`} className="inline-flex items-center text-[#0A1628] font-bold hover:text-[#E8A020] transition-colors group">
                <span className="border-b-2 border-[#0A1628] group-hover:border-[#E8A020] pb-1 transition-colors">Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Search */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 gap-6 pb-0">
          {/* Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['All', 'Engineering', 'Architecture', 'Strategy', 'Security & Compliance'].map((cat, i) => (
              <button 
                key={cat}
                className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors ${
                  i === 0 
                    ? 'text-[#0A1628] border-b-[3px] border-[#0A1628]' 
                    : 'text-slate-500 hover:text-[#0A1628] border-b-[3px] border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative mb-3 w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Topic" 
              className="pl-11 pr-4 py-2.5 w-full md:w-72 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REGULAR_POSTS.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-[#fafafa] rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 pb-0">
                <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-slate-200">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-3 leading-snug group-hover:text-[#E8A020] transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-slate-600 text-sm line-clamp-2 mt-auto leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            {page > 1 ? (
              <Link href={`/blog?page=${page - 1}`} className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Previous
              </Link>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-slate-100 text-sm font-semibold text-slate-300 cursor-not-allowed">
                Previous
              </span>
            )}
            
            <span className="text-sm font-semibold text-slate-500">
              Page {page} of {totalPages}
            </span>
            
            {page < totalPages ? (
              <Link href={`/blog?page=${page + 1}`} className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Next
              </Link>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-slate-100 text-sm font-semibold text-slate-300 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
