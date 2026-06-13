'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

export function LeadsExportButton() {
  const [loading, setLoading] = useState(false)

  const exportCSV = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/leads/export')
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `flowtaris-leads-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={exportCSV}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200
                 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors
                 disabled:opacity-60"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      Export CSV
    </button>
  )
}
