/**
 * SUPABASE AUTH CONFIGURATION — STEP 2.12
 *
 * The following settings MUST be applied in the Supabase Dashboard
 * under: Authentication → Settings
 *
 * Project: flowtaris (cqjpzxddgdtocwrwvpvs)
 * URL: https://supabase.com/dashboard/project/cqjpzxddgdtocwrwvpvs/auth/users
 *
 * ─── PROVIDERS ────────────────────────────────────────────────────
 * ✅ Email:         ENABLED
 * ❌ Phone:         DISABLED
 * ❌ Google:        DISABLED
 * ❌ GitHub:        DISABLED
 * ❌ All social:    DISABLED (admin-only auth)
 *
 * ─── EMAIL SETTINGS ───────────────────────────────────────────────
 * ✅ Confirm email:     ENABLED (required before login)
 * ✅ Secure email:      ENABLED
 *
 * ─── PASSWORD POLICY ──────────────────────────────────────────────
 * Minimum length:       12 characters
 * Require uppercase:    YES
 * Require number:       YES
 * Require special char: YES
 *
 * ─── SESSIONS ─────────────────────────────────────────────────────
 * JWT expiry:              3600  (1 hour)
 * Session expiry:          28800 (8 hours)
 * Refresh token rotation:  ENABLED
 * Reuse interval:          0 seconds
 *
 * ─── URLS ─────────────────────────────────────────────────────────
 * Site URL:                https://flowtaris.com
 * Redirect allowlist:
 *   - http://localhost:3000/**
 *   - https://flowtaris.com/**
 *   - https://*.vercel.app/**
 *
 * Dashboard path:
 * https://supabase.com/dashboard/project/cqjpzxddgdtocwrwvpvs/auth/url-configuration
 */

// Auth client configuration for Next.js — applied via createServerClient options
export const authConfig = {
  jwtExpirySeconds: 3600,
  sessionExpirySeconds: 28800,
  refreshTokenRotation: true,
  passwordMinLength: 12,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flowtaris.com',
} as const
