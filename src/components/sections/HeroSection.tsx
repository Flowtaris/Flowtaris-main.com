'use client'
import { Link } from '@/components/ui/PageTransition'
import Image from 'next/image'
import CardSwap, { Card } from '@/components/ui/CardSwap'

import LogoLoop from '@/components/ui/LogoLoop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSupabase, SiFramer, SiVercel, SiNodedotjs } from 'react-icons/si'

const techLogos = [
  { node: <SiReact size={75} />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs size={75} />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript size={75} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss size={75} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiSupabase size={75} />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiFramer size={75} />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiVercel size={75} />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiNodedotjs size={75} />, title: "Node.js", href: "https://nodejs.org" },
]

import { ModernTechnology } from '@/types/database'

interface HeroSectionProps {
  title?: string;
  description?: string;
  technologies?: ModernTechnology[];
  heroImages?: any[];
}

export function HeroSection({ title, description, technologies, heroImages }: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center pb-20 font-sans">
      <div className="container mx-auto px-6 md:px-[60px] max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
              {title ? title : (
                <>
                  Enterprise ERP Consulting, Integration and Automation Services <br className="block sm:hidden" />
                  for Finance and Procurement
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-10 leading-relaxed">
              {description || "Boutique ERP consulting firm helping mid-market companies implement, integrate, and optimise NetSuite, Coupa, SAP, and Workday platforms"}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors inline-block text-center">
                Diagnose My ERP Problem
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full flex justify-center items-center h-[400px] md:h-[500px] lg:h-[600px] relative">
            <div className="relative w-full max-w-[498px] flex justify-center items-center">
              <CardSwap
                cardDistance={40}
                verticalDistance={50}
                delay={5000}
                pauseOnHover={false}
                width={498}
                height={445}
              >
                {heroImages && heroImages.length > 0 ? (
                  heroImages.map((img, index) => (
                    <Card key={img.id} className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl relative group">
                      {/* Background Image */}
                      <Image src={img.image_url} alt={img.topic || 'Hero image'} width={498} height={445} priority={index === 0} className="absolute inset-0 w-full h-full object-cover" />

                      {/* Card Header (Top Bar) */}
                      <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-black/20 backdrop-blur-md relative z-10 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                      </div>

                      {/* Empty flex-1 to push any future content down or just fill space */}
                      <div className="flex-1"></div>
                    </Card>
                  ))
                ) : [
                  <Card key="fallback-1" className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl">
                    <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-white/5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-end text-white">
                      <h2 className="text-xl md:text-2xl font-bold mb-2">NetSuite Consulting</h2>
                      <p className="text-sm md:text-base text-gray-400">
                        Implementation & SuiteScript
                      </p>
                    </div>
                  </Card>,
                  <Card key="fallback-2" className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl">
                    <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-white/5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-end text-white">
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Coupa BSM</h2>
                      <p className="text-sm md:text-base text-gray-400">
                        Procurement Transformation
                      </p>
                    </div>
                  </Card>,
                  <Card key="fallback-3" className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl">
                    <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-white/5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-end text-white">
                      <h2 className="text-xl md:text-2xl font-bold mb-2">ERP Integrations</h2>
                      <p className="text-sm md:text-base text-gray-400">
                        Connect your entire stack
                      </p>
                    </div>
                  </Card>
                ]}
              </CardSwap>
            </div>
          </div>

        </div>
      </div>

      {/* Logo Loop Section */}
      <div className="w-full mt-24 overflow-hidden">
        <p className="text-center text-sm font-semibold text-gray-400 mb-8 tracking-wider uppercase">
          Powered by Modern Technologies
        </p>
        <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={technologies && technologies.length > 0
              ? technologies.map(t => ({ src: t.logo_url, title: t.name }))
              : techLogos}
            speed={60}
            direction="right"
            logoHeight={150}
            gap={100}
            fadeOut
            fadeOutColor="#FAFAFA"
            ariaLabel="Technology partners"
            className="transition-opacity duration-300"
            renderItem={(item) => {
              const src = 'src' in item ? item.src : '';
              const title = item.title || '';
              return (
                <div className="group relative flex flex-col items-center justify-center cursor-pointer pb-8">
                  {src ? (
                    <Image
                      src={src}
                      alt={title}
                      width={300}
                      height={150}
                      className="w-auto h-16 lg:h-[120px] object-contain transition-all duration-500"
                    />
                  ) : (
                    <div className="transition-all duration-500 text-[#0A1628] scale-100 lg:scale-[1.6] origin-bottom">
                      {'node' in item ? item.node : null}
                    </div>
                  )}
                  {/* Tag for Name (appears on hover) */}
                  <span className="absolute bottom-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-[#0A1628] font-bold text-lg md:text-xl tracking-wide whitespace-nowrap" style={{ fontFamily: 'var(--font-sora)' }}>
                    {title}
                  </span>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  )
}
