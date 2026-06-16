'use client';

import React from 'react';

const stats = [
  { value: '#1', label: 'ERP Software' },
  { value: '25+', label: 'Business Modules' },
  { value: '50+', label: 'Industries Served' },
  { value: '100+', label: 'Service Locations' },
  { value: '5K+', label: 'Enterprise Customers' },
];

export function CapabilitiesBanner() {
  return (
    <section className="bg-[#FAFAFA] pb-16 pt-4 font-sans px-4 md:px-8">
      {/* The massive gradient pill container */}
      <div className="max-w-[1400px] mx-auto rounded-[32px] md:rounded-[48px] relative overflow-hidden shadow-2xl shadow-[#0A1834]/30 group">
        
        {/* The Deep Navy Logo Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1834] via-[#0F224A] to-[#040A15] opacity-100 transition-transform duration-[3s] ease-out group-hover:scale-105" />
        
        {/* Subtle ambient burn on the edges for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

        {/* Halftone Grain Overlay (matching the service cards tactile feel) */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:4px_4px] mix-blend-overlay" />

        {/* Content */}
        <div className="relative z-10 py-10 md:py-12 px-6">
          <div className="text-center mb-8 md:mb-10">
            <h2 
              className="text-2xl md:text-3xl lg:text-[40px] font-black text-white mb-2 tracking-tighter leading-none" 
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              Management Capabilities
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light max-w-2xl mx-auto tracking-wide">
              We would be more than happy to see you contribute to these numbers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:justify-between items-center max-w-6xl mx-auto gap-y-8 lg:gap-y-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className={`flex flex-col items-center group/stat cursor-default ${index === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-auto' : ''}`}>
                  {/* Giant floating Gold number */}
                  <div 
                    className="text-3xl md:text-4xl lg:text-[56px] leading-none font-black mb-2 tracking-tighter transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/stat:-translate-y-1 group-hover/stat:scale-110 bg-gradient-to-br from-[#FDE047] via-[#E8A020] to-[#D97706] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(232,160,32,0.3)]" 
                    style={{ fontFamily: 'var(--font-sora)' }}
                  >
                    {stat.value}
                  </div>
                  {/* Sharp modern label */}
                  <div className="text-white/90 text-[10px] md:text-xs lg:text-sm font-bold tracking-[0.2em] uppercase text-center">
                    {stat.label}
                  </div>
                </div>
                
                {/* Minimalist Glass Divider */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block w-[1px] h-10 bg-[#E8A020]/20 rounded-full shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
