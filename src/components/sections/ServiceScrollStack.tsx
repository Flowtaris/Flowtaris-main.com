'use client';

import React, { useState } from 'react';
import { Link } from '@/components/ui/PageTransition';
import { Cpu, Workflow, Box, ShieldCheck, Database, Cloud } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

const iconMap = [Cpu, Workflow, Box, ShieldCheck, Database, Cloud];

export function ServiceScrollStack({ dynamicServices = [] }: { dynamicServices?: any[] }) {
  const isMobile = useIsMobile(768);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const displayServices = dynamicServices.length > 0
    ? dynamicServices.map((ds, idx) => {
      const heroData = ds.services_hero && ds.services_hero.length > 0 ? ds.services_hero[0] : null;
      const formattedTitle = ds.name
        ? ds.name
            .replace(/\bcoupa\b/gi, 'Coupa')
            .replace(/\bnetsuite\b/gi, 'NetSuite')
            .replace(/\bconsulting\b/gi, 'Consulting')
            .replace(/\bimplementation\b/gi, 'Implementation')
        : '';
      return {
        title: formattedTitle || ds.name,
        href: `/services/${ds.slug}`,
        num: `0${idx + 1}`.slice(-2),
        color: heroData?.color || '#E8A020',
        description: heroData?.normal_description || 'Comprehensive architecture, consulting, and seamless integration solutions designed specifically for scale and high performance.',
        Icon: iconMap[idx % iconMap.length]
      }
    })
    : [];

  return (
    <section className="bg-[#FAFAFA] py-32 lg:py-40 relative border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#0A1628] leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Our Service <span className="text-slate-500">for modern enterprise.</span>
            </h1>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed lg:pb-3 font-light">
            Sleek, powerful architecture for the modern web. We translate complex requirements into flawless execution.
          </p>
        </div>

        {/* Premium Pencil Draft Grid System */}
        <div className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 xl:gap-12">
            {displayServices.map((service, index) => {
              const isExpanded = expandedIdx === index;
              return (
                <Link
                  key={index}
                  href={service.href}
                  onClick={(e) => {
                    if (isMobile && !isExpanded) {
                      e.preventDefault();
                      setExpandedIdx(index);
                    }
                  }}
                  className={cn(
                    "group flex flex-col h-full relative overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white transition-all duration-700 hover:shadow-[0_20px_40px_-10px_var(--brand-color-shadow)]",
                    isMobile ? (isExpanded ? "p-8 min-h-[300px]" : "p-6 min-h-[140px]") : "p-8 md:p-10 min-h-[320px] hover:-translate-y-2"
                  )}
                  style={{ 
                    '--brand-color': service.color,
                    '--brand-color-light': `color-mix(in srgb, ${service.color} 15%, white)`,
                    '--brand-color-mid': `color-mix(in srgb, ${service.color} 35%, white)`,
                    '--brand-color-shadow': `color-mix(in srgb, ${service.color} 40%, transparent)`,
                    background: `linear-gradient(135deg, var(--brand-color-light) 0%, var(--brand-color-mid) 100%)`
                  } as React.CSSProperties}
                >
                  {/* 1. Subtle Draft Grid Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-700 mix-blend-multiply"
                    style={{
                      backgroundImage: 'linear-gradient(var(--brand-color) 1px, transparent 1px), linear-gradient(90deg, var(--brand-color) 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* 2. Background Architect Wavy Draft Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
                    <path
                      d="M -50 350 Q 150 280 400 320 T 800 280"
                      stroke="var(--brand-color)"
                      strokeWidth="1.5"
                      className="opacity-30 group-hover:opacity-50 [stroke-dasharray:1000] [stroke-dashoffset:1000] group-hover:[stroke-dashoffset:0] group-hover:drop-shadow-[0_0_4px_var(--brand-color-shadow)] transition-all duration-[2000ms] ease-in-out"
                    />
                    {/* Subtle hand-drawn border overlay on hover */}
                    <rect 
                      x="16" y="16" width="calc(100% - 32px)" height="calc(100% - 32px)" rx="16" 
                      stroke="var(--brand-color)" strokeWidth="1.5" fill="none"
                      className="opacity-10 group-hover:opacity-30 transition-all duration-700"
                      strokeDasharray="20 10 5 10" 
                    />
                  </svg>

                  {/* Numbering & Icon */}
                  <div className={cn("flex justify-between items-start relative z-10", isMobile ? (isExpanded ? "mb-10" : "mb-4") : "mb-20")}>
                    <span className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-[0.2em] group-hover:text-[var(--brand-color)] transition-all duration-500 group-hover:drop-shadow-[0_0_8px_var(--brand-color-shadow)]">
                      No. {service.num}
                    </span>

                    <div className="relative">
                      {(() => {
                        const ServiceIcon = service.Icon as any;
                        return (
                          <ServiceIcon className={cn("text-[#0A1628] group-hover:text-[var(--brand-color)] transition-colors duration-500 relative z-10 group-hover:drop-shadow-[0_0_8px_var(--brand-color-shadow)]", isMobile && !isExpanded ? "w-5 h-5" : "w-7 h-7")} strokeWidth={1.5} />
                        );
                      })()}
                      {/* Glowing Sketchy Circle Doodle wrapping the icon */}
                      <svg className={cn("absolute -inset-5 pointer-events-none", isMobile && !isExpanded ? "hidden" : "w-16 h-16")} viewBox="0 0 100 100" fill="none">
                        <path
                          d="M 50 15 C 75 12 88 35 82 60 C 75 85 50 90 30 80 C 10 70 5 45 20 25 C 30 10 60 8 70 20"
                          stroke="var(--brand-color)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_var(--brand-color-shadow)] [stroke-dasharray:300] [stroke-dashoffset:300] group-hover:[stroke-dashoffset:0] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 relative z-10">
                    <h2
                      className={cn("font-light text-[#0A1628] relative inline-block group-hover:text-[var(--brand-color)] transition-colors duration-500 group-hover:drop-shadow-[0_0_12px_var(--brand-color-shadow)]", isMobile ? "text-2xl mb-3" : "text-3xl lg:text-[34px] mb-6 leading-[1.15]")}
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {service.title}
                      {/* Pencil Underline that glows on hover */}
                      <svg className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 10" fill="none">
                        <path
                          d="M 0 5 Q 30 2 60 6 T 100 4"
                          stroke="var(--brand-color)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-30 group-hover:opacity-90 group-hover:drop-shadow-[0_0_6px_var(--brand-color-shadow)] [stroke-dasharray:120] [stroke-dashoffset:120] group-hover:[stroke-dashoffset:0] transition-all duration-[1000ms] ease-out"
                        />
                        {/* Secondary messy stroke */}
                        <path
                          d="M 5 7 Q 40 9 80 5"
                          stroke="var(--brand-color)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="opacity-20 group-hover:opacity-60 group-hover:drop-shadow-[0_0_4px_var(--brand-color-shadow)] [stroke-dasharray:100] [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-all duration-[1400ms] ease-out delay-100"
                        />
                      </svg>
                    </h2>
                    <p className={cn("text-[15px] text-slate-600 font-light leading-relaxed max-w-[95%] group-hover:text-[#0A1628] transition-colors duration-500", isMobile && !isExpanded ? "line-clamp-1" : "line-clamp-5")}>
                      {service.description}
                    </p>
                  </div>

                  {/* Footer CTA */}
                  <div className={cn("flex items-center gap-4 relative z-10", isMobile ? (isExpanded ? "mt-8" : "hidden") : "mt-12")}>
                    <div className="h-[2px] w-8 bg-slate-300 group-hover:w-16 group-hover:bg-[var(--brand-color)] group-hover:drop-shadow-[0_0_4px_var(--brand-color-shadow)] transition-all duration-[800ms] ease-out" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 group-hover:text-[var(--brand-color)] transition-colors duration-500">
                      Explore Details
                    </span>
                  </div>

                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
