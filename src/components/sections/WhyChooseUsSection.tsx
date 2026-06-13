'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, MessageCircle, ScanLine } from 'lucide-react';

const tabs = [
  'Multi-channel brands',
  'Manufacturers',
  'Hybrid product businesses',
  'Regulated product industries'
];

export function WhyChooseUsSection() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="bg-[#FAFAFA] py-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar mb-16 border-b border-gray-200">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`whitespace-nowrap px-8 py-5 text-xl font-bold transition-all relative ${
                activeTab === idx
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === idx && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-[#F5F5F5] flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Content */}
          <div className="w-full lg:w-5/12 p-12 md:p-16 flex flex-col justify-center relative z-10">
            <ShieldCheck className="w-10 h-10 text-gray-900 mb-8" strokeWidth={1.5} />
            <h3 className="text-4xl lg:text-[44px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Protect your business with full product traceability
            </h3>
            <p className="text-gray-600 text-[17px] leading-relaxed mb-12">
              Keep a clear record for every product you sell, and track lot and
              serial information across inventory and production. Flowtaris
              makes it easier to stay audit-ready and respond to compliance
              requests without building separate processes for compliance.
            </p>
            <button className="flex items-center text-gray-900 font-bold hover:text-gray-600 gap-3 group transition-colors">
              <ScanLine className="w-5 h-5" />
              Track every batch and serial
            </button>
          </div>

          {/* Right Image Container */}
          <div className="w-full lg:w-7/12 relative min-h-[400px] lg:min-h-[700px]">
            <Image
              src="/images/inventory-worker.png"
              alt="Inventory Traceability"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            
            {/* Stat Cards - Floating between columns */}
            <div className="absolute left-6 bottom-16 lg:-left-24 flex flex-col gap-6 z-20">
              <div className="bg-white/90 backdrop-blur-md px-8 py-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 w-64 transform transition-transform hover:scale-105">
                <div className="text-[40px] font-black text-gray-900 mb-1 leading-none tracking-tight">-40%</div>
                <div className="text-gray-600 text-[15px] font-medium leading-tight">manual data entry</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md px-8 py-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 w-64 transform transition-transform hover:scale-105">
                <div className="text-[40px] font-black text-gray-900 mb-1 leading-none tracking-tight">-30%</div>
                <div className="text-gray-600 text-[15px] font-medium leading-tight">stock discrepancies</div>
              </div>
            </div>

            {/* Discover CTA Button */}
            <button className="absolute bottom-8 right-8 bg-[#0F172A] hover:bg-black text-white px-6 py-4 rounded-full flex items-center gap-3 font-semibold shadow-xl transition-all hover:scale-105 z-20">
              <MessageCircle className="w-5 h-5 fill-white" />
              Discover Flowtaris
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
