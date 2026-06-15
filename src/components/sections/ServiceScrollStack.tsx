'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Workflow, Box, ShieldCheck, Database, Cloud } from 'lucide-react';

const iconMap = [Cpu, Workflow, Box, ShieldCheck, Database, Cloud];

export function ServiceScrollStack({ dynamicServices = [] }: { dynamicServices?: any[] }) {
  const displayServices = dynamicServices.length > 0
    ? dynamicServices.map((ds, idx) => {
      const heroData = ds.services_hero && ds.services_hero.length > 0 ? ds.services_hero[0] : null;
      return {
        title: ds.name,
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
              Our Service <span className="text-slate-400">for modern enterprise.</span>
            </h1>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed lg:pb-3 font-light">
            Sleek, powerful architecture for the modern web. We translate complex requirements into flawless execution.
          </p>
        </div>

        {/* 1px Hairline Grid System */}
        <div className="bg-[#FAFAFA] border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-slate-200">
            {displayServices.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group flex flex-col h-full p-10 md:p-14 transition-all duration-700 hover:brightness-110 relative overflow-hidden min-h-[420px]"
                style={{ backgroundColor: service.color, '--brand-color': service.color } as React.CSSProperties}
              >
                {/* Subtle internal gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />

                {/* Numbering & Icon */}
                <div className="flex justify-between items-start mb-24 relative z-10">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">
                    No. {service.num}
                  </span>
                  {(() => {
                    const ServiceIcon = service.Icon as any;
                    return (
                      <ServiceIcon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                    );
                  })()}
                </div>

                {/* Content */}
                <div className="flex-1 relative z-10">
                  <h2 className="text-3xl font-light text-white mb-6 leading-tight group-hover:text-white/90 transition-colors duration-500" style={{ fontFamily: 'var(--font-sora)' }}>
                    {service.title}
                  </h2>
                  <p className="text-sm text-white/70 font-light leading-relaxed max-w-[90%]">
                    {service.description}
                  </p>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 flex items-center gap-4 relative z-10">
                  <div className="h-[1px] w-8 bg-white/30 group-hover:w-12 group-hover:bg-white transition-all duration-500 ease-out" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors duration-500">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
