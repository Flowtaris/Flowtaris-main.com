import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CaseStudyMetadata({
  platforms,
  services,
  industries,
}: {
  platforms: string[]
  services: string[]
  industries: string[]
}) {
  return (
    <div className="bg-white border-y border-gray-100 py-10 font-sans">
      <div className="container mx-auto px-6 md:px-[60px] max-w-[1260px]">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            <div className="md:pr-8 first:pt-0 pt-6 md:pt-0">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Industry</h3>
              <div className="flex flex-wrap gap-2.5">
                {industries.map(i => (
                  <span key={i} className="text-base font-semibold text-gray-900">{i}</span>
                ))}
                {industries.length === 0 && <span className="text-sm text-gray-400">—</span>}
              </div>
            </div>

            <div className="md:px-8 pt-6 md:pt-0">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Solutions Delivered</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {services.map(s => (
                  <span key={s} className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    {s}
                  </span>
                ))}
                {services.length === 0 && <span className="text-sm text-gray-400">—</span>}
              </div>
            </div>

            <div className="md:pl-8 pt-6 md:pt-0">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2.5">
                {platforms.map(p => (
                  <span key={p} className="text-xs font-bold px-4 py-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-200">
                    {p}
                  </span>
                ))}
                {platforms.length === 0 && <span className="text-sm text-gray-400">—</span>}
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
