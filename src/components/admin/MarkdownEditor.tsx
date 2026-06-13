'use client'

import { useState } from 'react'

interface Props {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: Props) {
  const [mode, setMode] = useState<'write' | 'preview'>('write')

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col bg-white">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50">
        <button
          type="button"
          onClick={() => setMode('write')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            mode === 'write' ? 'bg-white shadow-sm text-navy-900' : 'text-slate-500 hover:text-navy-700'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            mode === 'preview' ? 'bg-white shadow-sm text-navy-900' : 'text-slate-500 hover:text-navy-700'
          }`}
        >
          Preview
        </button>
      </div>
      <div className="flex-1 min-h-[400px]">
        {mode === 'write' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? 'Write markdown here...'}
            className="w-full h-full min-h-[400px] p-4 resize-y focus:outline-none text-sm font-mono text-slate-700 leading-relaxed"
          />
        ) : (
          <div className="p-4 prose prose-slate max-w-none text-sm h-full overflow-y-auto min-h-[400px]">
            {/* Simple preview logic just shows raw markdown for now, usually you'd use marked or similar */}
            <pre className="whitespace-pre-wrap font-mono text-slate-700">{value}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
