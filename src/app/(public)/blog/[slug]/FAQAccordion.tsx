'use client'

import React, { useState } from 'react'

export function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 not-prose">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors hover:border-slate-300">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
            >
              <h1 className="font-bold text-lg text-slate-900 m-0 leading-tight">{faq.question}</h1>
              <span className={`transition-transform duration-300 ease-in-out shrink-0 ml-4 ${isOpen ? '-rotate-180 text-[#E8A020]' : 'text-slate-400'}`}>
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <h2 className="px-6 pb-6 text-slate-600 leading-relaxed bg-white text-base font-normal border-t border-slate-100 pt-4 m-0">
                  {faq.answer}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
