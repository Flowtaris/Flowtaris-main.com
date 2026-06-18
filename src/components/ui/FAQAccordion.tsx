'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  sectionLabel?: string
}

export function FAQAccordion({ items, sectionLabel = 'General' }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const allOpen = openIndexes.length === items.length

  const toggleAll = () => {
    if (allOpen) {
      setOpenIndexes([])
    } else {
      setOpenIndexes(items.map((_, i) => i))
    }
  }

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-0">
        <h2
          className="text-2xl font-bold text-[#0A1628]"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          {sectionLabel}
        </h2>
        <button
          onClick={toggleAll}
          className="text-base font-medium text-[#0066CC] hover:underline focus:outline-none transition-colors"
        >
          {allOpen ? 'Close all' : 'Open all'}
        </button>
      </div>

      {/* FAQ Items */}
      <div>
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index)
          return (
            <div key={index} className="border-b border-slate-200">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group focus:outline-none"
                aria-expanded={isOpen}
              >
                <span
                  className="text-lg font-bold text-[#0A1628] leading-snug group-hover:text-[#0066CC] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-sora)' }}
                >
                  Q: {item.question}
                </span>
                <span className="shrink-0 mt-0.5 text-[#0A1628] group-hover:text-[#0066CC] transition-colors duration-200">
                  {isOpen ? (
                    <Minus className="w-6 h-6" strokeWidth={2} />
                  ) : (
                    <Plus className="w-6 h-6" strokeWidth={2} />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-base text-slate-600 leading-relaxed max-w-4xl">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
