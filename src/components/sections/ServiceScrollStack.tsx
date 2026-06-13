'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    label: 'NetSuite',
    sub: 'Consulting',
    href: '/services/netsuite-consulting',
    num: '01',
    gradient: 'from-[#6366F1] to-[#818CF8]',
  },
  {
    label: 'Coupa',
    sub: 'Consulting',
    href: '/services/coupa-consulting',
    num: '02',
    gradient: 'from-[#EC4899] to-[#F472B6]',
  },
  {
    label: 'ERP',
    sub: 'Integrations',
    href: '/services/erp-integrations',
    num: '03',
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
  },
  {
    label: 'Managed',
    sub: 'Support',
    href: '/services/managed-support',
    num: '04',
    gradient: 'from-[#10B981] to-[#34D399]',
  },
  {
    label: 'AI &',
    sub: 'Automation',
    href: '/services/ai-automation',
    num: '05',
    gradient: 'from-[#3B82F6] to-[#60A5FA]',
  },
  {
    label: 'SAP &',
    sub: 'Workday',
    href: '/services/sap-workday',
    num: '06',
    gradient: 'from-[#8B5CF6] to-[#A78BFA]',
  },
];

const CARD_COUNT = services.length;
const SCROLL_PER_CARD = 400; // px of scroll to reveal each card

export function ServiceScrollStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      // How far the top of the section has scrolled past the top of the viewport
      const scrolled = -rect.top;

      if (scrolled < 0) {
        setActiveIndex(0);
        return;
      }

      // Calculate which card should be active based on scroll distance
      const idx = Math.min(
        CARD_COUNT - 1,
        Math.floor(scrolled / SCROLL_PER_CARD)
      );
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [viewportH, setViewportH] = useState(730);

  useEffect(() => {
    setViewportH(window.innerHeight);
    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Total height = enough scroll runway for each card + one viewport to unpin
  const totalHeight = CARD_COUNT * SCROLL_PER_CARD + viewportH;

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAFAFA] relative"
      style={{ height: `${totalHeight}px` }}
    >
      {/* Sticky container — stays pinned on screen while cards animate */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-6 relative z-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p
                className="text-xs font-mono uppercase tracking-[0.3em] text-gray-400 mb-3"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                / Services
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[0.95] tracking-tight"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                What we<br />
                <span className="bg-gradient-to-r from-[#F59E0B] via-[#EC4899] to-[#6366F1] bg-clip-text text-transparent">
                  deliver.
                </span>
              </h2>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-light pb-1">
              Six core capabilities. Each one battle-tested across hundreds of enterprise deployments.
            </p>
          </div>
        </div>

        {/* Card Stack Area */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative mt-4" style={{ height: 'calc(100vh - 220px)' }}>
          {services.map((service, index) => {
            const isVisible = index <= activeIndex;
            const isBehind = index < activeIndex;
            const depthBehind = activeIndex - index;

            // Cards behind scale down slightly to create depth
            // Active card is at full scale
            // Future cards wait below
            let cardTransform = 'translateY(110%)';
            if (isVisible && !isBehind) {
              cardTransform = 'translateY(0) scale(1)';
            } else if (isBehind) {
              cardTransform = `translateY(0) scale(${1 - depthBehind * 0.04})`;
            }

            return (
              <Link
                key={index}
                href={service.href}
                className={`
                  group absolute inset-0
                  flex items-center overflow-hidden
                  rounded-[28px] md:rounded-[36px]
                  bg-gradient-to-br ${service.gradient}
                  shadow-2xl shadow-black/50
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                style={{
                  zIndex: index + 1,
                  transform: cardTransform,
                  transformOrigin: 'top center',
                }}
              >
                {/* Subtle grain */}
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:4px_4px]" />

                {/* Giant faded number */}
                <span
                  className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem] font-black text-white/[0.07] leading-none select-none pointer-events-none tracking-tighter"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  {service.num}
                </span>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between w-full h-full px-8 md:px-16">
                  <div>
                    <h3
                      className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {service.label}<br />
                      <span className="font-light">{service.sub}</span>
                    </h3>
                  </div>

                  {/* Arrow CTA */}
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ArrowUpRight
                      className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-all duration-500 group-hover:rotate-45"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Progress dots */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
            {services.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${index <= activeIndex ? 'bg-gray-800 scale-100' : 'bg-gray-300 scale-75'}
                  ${index === activeIndex ? 'h-6 rounded-full' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
