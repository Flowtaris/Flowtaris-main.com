'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, MessageCircle, ScanLine, Sparkles } from 'lucide-react';
import { WhyChooseUsCard, WhyChooseUsSector } from '@/types/database';

export function WhyChooseUsSection({ sectors, cards }: { sectors: WhyChooseUsSector[], cards: WhyChooseUsCard[] }) {
  const [activeTabId, setActiveTabId] = useState<string | null>(sectors[0]?.id || null);

  // If no sectors, fallback to empty layout or return null
  if (!sectors.length) return null;

  // Ensure activeTabId is valid
  const currentTabId = activeTabId && sectors.find(s => s.id === activeTabId) ? activeTabId : sectors[0]!.id;

  // Find the card for the current sector
  const activeCard = cards.find(c => c.sector_id === currentTabId) || cards[0];

  return (
    <section className="bg-[#FAFAFA] pt-8 pb-24 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16 text-center relative max-w-4xl mx-auto">
          <h2 className="relative inline-block text-5xl md:text-6xl lg:text-[72px] font-black tracking-[0.05em] uppercase" style={{ fontFamily: 'var(--font-sora)' }}>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#E8A020] via-[#F3C456] to-[#E8A020] drop-shadow-sm">
              Why Choose Us
            </span>
            
            {/* Striking Underline */}
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#E8A020] to-transparent rounded-full opacity-60 shadow-[0_0_15px_rgba(232,160,32,0.4)]" />
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-start md:justify-center overflow-x-auto hide-scrollbar mb-8 md:mb-16 border-b border-gray-200 w-full px-4 md:px-0">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveTabId(sector.id)}
              className={`whitespace-nowrap px-4 md:px-8 py-3 md:py-5 text-base md:text-xl font-bold transition-all relative ${currentTabId === sector.id
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {sector.name}
              {currentTabId === sector.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-[#F5F5F5] flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
          {/* Left Content */}
          <div className="w-full lg:w-5/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-gray-900 mb-6 md:mb-8" strokeWidth={1.5} />
            <h3 className="text-2xl md:text-4xl lg:text-[44px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4 md:mb-6">
              {activeCard?.description || 'Protect your business'}
            </h3>
            <p className="text-gray-600 text-sm md:text-[17px] leading-relaxed mb-6 md:mb-12">
              {activeCard?.small_description || 'Keep a clear record...'}
            </p>
          </div>

          {/* Right Image Container */}
          <div className="w-full lg:w-7/12 relative min-h-[300px] md:min-h-[400px] lg:min-h-[700px]">
            {activeCard?.image_url ? (
              <Image
                src={activeCard.image_url}
                alt="Section Image"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
