'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function FeaturedShowcase({ featured }: { featured: any[] }) {
  if (!featured || featured.length === 0) return null

  // Ensure we only take up to 3 featured items for the bento box
  const items = featured.slice(0, 3)

  return (
    <section className="bg-[#0B1121] py-24 relative overflow-hidden">
      <div className="container-content relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-gold-500" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">
            Featured Engagements
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((cs, idx) => {
            const isFirst = idx === 0
            const metrics = Array.isArray(cs.metrics) ? cs.metrics as Array<{ label: string; value: string; unit?: string }> : []

            return (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm ${
                  isFirst ? 'lg:col-span-2 min-h-[500px]' : 'min-h-[400px]'
                }`}
              >
                <Link href={`/case-studies/${cs.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${cs.title}`} />
                
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 w-full h-full">
                  {cs.cover_image_url ? (
                    <Image
                      src={cs.cover_image_url}
                      alt={cs.title}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-[1.5s] group-hover:scale-105 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-[#0B1121]" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isFirst ? 'from-[#0B1121] via-[#0B1121]/80 to-transparent' : 'from-[#0B1121] to-[#0B1121]/40'}`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end pointer-events-none">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="gold">Featured</Badge>
                    {(cs.platforms as string[])?.map((p) => (
                      <Badge key={p} variant="slate" className="text-slate-300 border-white/20 bg-white/5">{p}</Badge>
                    ))}
                  </div>

                  <h2 
                    className={`font-bold text-white mb-4 leading-tight group-hover:text-gold-100 transition-colors ${
                      isFirst ? 'text-3xl md:text-5xl max-w-4xl' : 'text-2xl md:text-3xl'
                    }`} 
                    style={{ fontFamily: 'var(--font-sora)' }}
                  >
                    {cs.title}
                  </h2>
                  
                  {isFirst && (
                    <p className="text-slate-400 md:text-lg max-w-2xl mb-8 line-clamp-2">
                      {cs.outcome_summary}
                    </p>
                  )}

                  <div className={`flex items-center justify-between ${!isFirst ? 'mt-4' : 'mt-auto'}`}>
                    {metrics.length > 0 && (
                      <div className="flex gap-6">
                        {metrics.slice(0, isFirst ? 3 : 2).map((m) => (
                          <div key={m.label}>
                            <div className={`font-bold text-gold-400 ${isFirst ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{m.value}{m.unit}</div>
                            <div className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-navy-950 transition-all duration-500">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
