'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export function AdminLoginForm() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy-200 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="admin@flowtaris.com"
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-600
                     text-white text-sm placeholder:text-navy-500
                     focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20
                     transition-all duration-150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-200 mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="w-full px-4 py-3 pr-11 rounded-lg bg-navy-800 border border-navy-600
                       text-white text-sm placeholder:text-navy-500
                       focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20
                       transition-all duration-150"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40
                      px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg
                   bg-gold-500 hover:bg-gold-400 text-white font-semibold text-sm
                   transition-colors duration-150
                   disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-sora)' }}
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
      </button>
    </form>
  )
}
