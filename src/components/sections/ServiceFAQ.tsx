import { createClient } from '@/lib/supabase/server'
import { Accordion } from '@/components/ui/Accordion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { faqSchema } from '@/lib/schema'

interface ServiceFAQProps {
  pageSlug: string
}

export async function ServiceFAQ({ pageSlug }: ServiceFAQProps) {
  const supabase = await createClient()

  const { data: faqs } = await supabase
    .from('faqs')
    .select('question, answer')
    .eq('page_slug', pageSlug)
    .eq('is_published', true)
    .eq('include_in_schema', true)
    .order('display_order', { ascending: true })

  if (!faqs || faqs.length === 0) return null

  const schema = faqSchema(faqs)

  return (
    <section className="section bg-surface">
      <div className="container-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-px w-6 bg-gold-500" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold-500"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}>
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-10"
              style={{ fontFamily: 'var(--font-sora)' }}>
            Common Questions About This Service
          </h2>

          <Accordion items={faqs} />
        </AnimatedSection>
      </div>
    </section>
  )
}
