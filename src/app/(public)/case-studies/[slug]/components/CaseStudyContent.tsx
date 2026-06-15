import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CaseStudyContent({
  clientSituation,
  solutionApproach,
  outcomeSummary,
}: {
  clientSituation?: string | null
  solutionApproach?: string | null
  outcomeSummary?: string | null
}) {
  return (
    <div className="max-w-[800px] mx-auto space-y-20 font-sans">
      
      {clientSituation && (
        <AnimatedSection className="relative">
          <div className="absolute -left-12 -top-12 text-[160px] font-black text-gray-50 pointer-events-none select-none tracking-tighter z-0 leading-none">
            1
          </div>
          <div className="relative z-10 pt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              The Challenge
            </h2>
            <div className="prose prose-lg md:prose-xl prose-gray max-w-none prose-p:leading-[1.8] prose-p:text-gray-600">
              <p>{clientSituation}</p>
            </div>
          </div>
        </AnimatedSection>
      )}

      {solutionApproach && (
        <AnimatedSection className="relative">
          <div className="absolute -left-12 -top-12 text-[160px] font-black text-gray-50 pointer-events-none select-none tracking-tighter z-0 leading-none">
            2
          </div>
          <div className="relative z-10 pt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              The Solution
            </h2>
            <div className="prose prose-lg md:prose-xl prose-gray max-w-none prose-p:leading-[1.8] prose-p:text-gray-600">
              <p>{solutionApproach}</p>
            </div>
          </div>
        </AnimatedSection>
      )}

      {outcomeSummary && (
        <AnimatedSection>
          <div className="relative mt-24 p-10 md:p-14 bg-[#FAFAFA] rounded-2xl border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold text-xl mb-8">
              3
            </div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
              The Outcome
            </h2>
            <div className="text-xl md:text-2xl text-gray-900 leading-[1.6] font-medium max-w-2xl mx-auto">
              &ldquo;{outcomeSummary}&rdquo;
            </div>
          </div>
        </AnimatedSection>
      )}

    </div>
  )
}
