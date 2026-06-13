import { NextRequest, NextResponse } from 'next/server'

// Rate limiting: simple in-memory for edge (replace with Upstash for production)
const submissions = new Map<string, number>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      form_type, name, company, work_email,
      platform, service_needed, project_timeline,
      business_challenge, preferred_contact,
      hcaptcha_token,
    } = body

    // ── Validate required fields ───────────────────────────────────────
    if (!name || !work_email || !form_type) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(work_email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ── Rate limiting — 20 second cooldown per IP ──────────────────────
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    const now = Date.now()
    const last = submissions.get(ip) ?? 0
    if (now - last < 20_000) {
      return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 })
    }
    submissions.set(ip, now)

    // ── hCaptcha verification ──────────────────────────────────────────
    if (hcaptcha_token && process.env.HCAPTCHA_SECRET_KEY) {
      const verifyRes = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret:   process.env.HCAPTCHA_SECRET_KEY,
          response: hcaptcha_token,
        }),
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return NextResponse.json({ error: 'CAPTCHA verification failed.' }, { status: 400 })
      }
    }

    // ── Send notification email via Resend ────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const emailHtml = `
        <h2>New ${form_type} from Flowtaris.com</h2>
        <table cellpadding="8" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Company</strong></td><td>${company ?? '—'}</td></tr>
          <tr><td><strong>Email</strong></td><td>${work_email}</td></tr>
          <tr><td><strong>Service</strong></td><td>${service_needed ?? '—'}</td></tr>
          <tr><td><strong>Platform</strong></td><td>${Array.isArray(platform) ? platform.join(', ') : platform ?? '—'}</td></tr>
          <tr><td><strong>Timeline</strong></td><td>${project_timeline ?? '—'}</td></tr>
          <tr><td><strong>Challenge</strong></td><td>${business_challenge ?? '—'}</td></tr>
          <tr><td><strong>Preferred Contact</strong></td><td>${preferred_contact ?? '—'}</td></tr>
        </table>
      `

      await fetch('https://api.resend.com/emails', {
        method:  'POST',
        headers: {
          Authorization:  `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    process.env.NOTIFICATION_EMAIL_FROM ?? 'noreply@flowtaris.com',
          to:      [process.env.NOTIFICATION_EMAIL_TO ?? 'info@flowtaris.com'],
          subject: `New ${form_type} — ${name} from ${company ?? 'Unknown Company'}`,
          html:    emailHtml,
        }),
      })
    }

    // Mock successful submission since backend is not implemented yet
    console.log('[Form Submission] Received form data. Skipping DB save.', { name, work_email, form_type })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Form Submission] Unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
