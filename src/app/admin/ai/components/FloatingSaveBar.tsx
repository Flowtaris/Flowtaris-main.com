'use client'

import { Save, Loader2, CheckCircle2 } from 'lucide-react'

/**
 * FloatingSaveBar — a fixed-position save button that floats at the bottom
 * of the viewport, always visible regardless of scroll position.
 * Used across all admin/ai config pages for consistent UX.
 */
export function FloatingSaveBar({
  onSave,
  saving,
  hint = 'Changes are saved to the database and go live within ~60 seconds.',
  label = 'Save Configuration',
  type = 'button',
}: {
  onSave?: () => void
  saving: boolean
  hint?: string
  label?: string
  type?: 'button' | 'submit'
}) {
  return (
    <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <p className="text-xs text-gray-400 hidden sm:block">{hint}</p>
      <button
        type={type}
        disabled={saving}
        onClick={onSave}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl
          bg-gradient-to-r from-blue-600 to-blue-700
          hover:from-blue-500 hover:to-blue-600
          text-white text-sm font-bold shadow-lg shadow-blue-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 ml-auto"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving…
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            {label}
          </>
        )}
      </button>
    </div>
  )
}

