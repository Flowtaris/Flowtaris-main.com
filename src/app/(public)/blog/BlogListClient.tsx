'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/components/ui/PageTransition'
import { Search } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  categories: string[]
  date: string
  author: string
  authorDesignation?: string
  image: string
}

export function BlogListClient({ initialPosts, allCategories }: { initialPosts: Post[], allCategories: string[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 6 // 6 regular posts per page

  const categories = ['All', ...allCategories]

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.categories.some(cat => cat.toLowerCase() === activeCategory.toLowerCase());
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  const isFiltering = activeCategory !== 'All' || searchQuery !== '';
  
  // Only show the featured post on the default 'All' view without search
  const featuredPost = isFiltering ? null : initialPosts[0];
  
  // Always show all matching posts in the grid, including the featured one
  const regularPosts = filteredPosts;

  // Paginate regular posts
  const totalPages = Math.ceil(regularPosts.length / limit)
  const paginatedRegularPosts = useMemo(() => {
    const from = (currentPage - 1) * limit
    const to = from + limit
    return regularPosts.slice(from, to)
  }, [regularPosts, currentPage, limit])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return (
    <>
      {/* Hero & Featured Post */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Stay updated with our latest insights
            </h1>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch mb-16 bg-white rounded-[2.5rem] p-3 border border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_-4px_rgba(10,22,40,0.12)] transition-all duration-500">
              
              {/* Image side (spans 7 cols) */}
              <Link href={`/blog/${featuredPost.id}`} className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px] lg:col-span-7 rounded-[2rem] overflow-hidden bg-slate-100 block">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </Link>

              {/* Content side (spans 5 cols) */}
              <div className="p-8 lg:p-12 lg:col-span-5 flex flex-col justify-center relative bg-white rounded-r-[2.5rem]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-[#E8A020] rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E8A020]">Featured</span>
                </div>

                <Link href={`/blog/${featuredPost.id}`}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] leading-[1.25] mb-6 hover:text-[#E8A020] transition-colors duration-300" style={{ fontFamily: 'var(--font-sora)' }}>
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-slate-500 text-lg mb-10 line-clamp-3 leading-relaxed font-medium">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
                      <span className="text-[#0A1628] font-bold text-lg" style={{ fontFamily: 'var(--font-sora)' }}>{featuredPost.author.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#0A1628]">{featuredPost.author}</span>
                      <span className="text-xs text-slate-500 font-semibold">{featuredPost.authorDesignation}  {featuredPost.date}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.id}`} className="w-12 h-12 rounded-full bg-[#0A1628] text-white flex items-center justify-center group-hover:bg-[#E8A020] transition-colors duration-300 shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories & Search */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 gap-6 pb-0">
          {/* Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors border-b-[3px] ${
                  activeCategory === cat 
                    ? 'text-[#0A1628] border-[#0A1628]' 
                    : 'text-slate-500 hover:text-[#0A1628] border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative mb-3 w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Topic" 
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-11 pr-4 py-2.5 w-full md:w-72 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-32">
        {paginatedRegularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedRegularPosts.map((post) => (
              <Link 
                href={`/blog/${post.id}`} 
                key={post.id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(10,22,40,0.1)] hover:-translate-y-1 transition-all duration-500 relative"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/20 to-transparent z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1 relative bg-white">
                  <div className="w-10 h-1 bg-[#E8A020] mb-6 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                  
                  <h3 className="text-2xl font-bold text-[#0A1628] mb-4 leading-[1.3] group-hover:text-[#E8A020] transition-colors duration-300" style={{ fontFamily: 'var(--font-sora)' }}>
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-slate-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {/* Author / Meta Section */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100/80">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
                        <span className="text-[#0A1628] font-bold text-sm" style={{ fontFamily: 'var(--font-sora)' }}>
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0A1628] leading-tight">{post.author}</span>
                        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{post.date}</span>
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#E8A020] transition-colors duration-300">
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">
              {featuredPost 
                ? "No additional posts found in this category."
                : "No blog posts found matching your filters."}
            </p>
          </div>
        )}
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            {currentPage > 1 ? (
              <button 
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-slate-100 text-sm font-semibold text-slate-300 cursor-not-allowed">
                Previous
              </span>
            )}
            
            <span className="text-sm font-semibold text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            
            {currentPage < totalPages ? (
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            ) : (
              <span className="px-5 py-2.5 rounded-full border border-slate-100 text-sm font-semibold text-slate-300 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </section>
    </>
  )
}
