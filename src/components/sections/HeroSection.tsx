'use client'

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

export function HeroSection() {
  return (
    <section className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center pb-20 font-sans">
      <div className="container mx-auto px-6 md:px-[60px] max-w-[1260px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              ERP Implementation for Companies Outgrowing Chaos
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              A lightweight, hardware-accelerated React component for creating beautiful card swapping animations. No complex configuration required.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Install Component
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                View GitHub
              </button>
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
                <Card className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl">
                  {/* Card Header */}
                  <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-white/5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-end text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">React Bits</h3>
                    <p className="text-sm md:text-base text-gray-400">
                      Seamlessly integrate smooth, GSAP-powered animations into your application with a simple wrapper component.
                    </p>
                  </div>
                </Card>
                <Card className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl">
                  {/* Card Header */}
                  <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-white/5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-end text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">TypeScript Ready</h3>
                    <p className="text-sm md:text-base text-gray-400">
                      Fully typed props and refs for a flawless developer experience right out of the box.
                    </p>
                  </div>
                </Card>
                <Card className="flex flex-col overflow-hidden border border-white/10 bg-black rounded-xl">
                  {/* Card Header */}
                  <div className="w-full h-10 flex items-center px-4 gap-2 border-b border-white/10 bg-white/5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-end text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Customizable</h3>
                    <p className="text-sm md:text-base text-gray-400">
                      Easily override CSS classes or pass inline styles to match your project's exact aesthetic.
                    </p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>

        </div>
      </div>

      {/* Logo Loop Section */}
      <div className="w-full mt-24">
        <p className="text-center text-sm font-semibold text-gray-400 mb-8 tracking-wider uppercase">
          Powered by Modern Technologies
        </p>
        <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="right"
            logoHeight={75}
            gap={85}
            fadeOut
            fadeOutColor="#FAFAFA"
            ariaLabel="Technology partners"
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  )
}
