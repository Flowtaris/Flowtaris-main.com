'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  dark?: boolean
  allowMultiple?: boolean
}

export function Accordion({
  items,
  className,
  dark = false,
  allowMultiple = false,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index)

        return (
          <div
            key={index}
            className={cn(
              'rounded-card border overflow-hidden transition-colors duration-200',
              dark
                ? isOpen
                  ? 'border-navy-600 bg-navy-800'
                  : 'border-navy-700 bg-navy-800/50'
                : isOpen
                  ? 'border-gold-200 bg-gold-50/30'
                  : 'border-slate-100 bg-white'
            )}
          >
            <button
              onClick={() => toggle(index)}
              className={cn(
                'w-full flex items-start justify-between gap-4 px-6 py-5 text-left',
                'transition-colors duration-150',
                dark ? 'hover:bg-navy-700/50' : 'hover:bg-slate-50/50'
              )}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  'font-display font-medium text-[15px] leading-snug',
                  dark ? 'text-white' : 'text-navy-900'
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  'shrink-0 mt-0.5 rounded-full p-0.5 transition-colors duration-150',
                  dark ? 'text-gold-400' : 'text-gold-500'
                )}
              >
                {isOpen ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div
                    className={cn(
                      'px-6 pb-6 text-sm leading-relaxed',
                      dark ? 'text-navy-200' : 'text-slate-600'
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
