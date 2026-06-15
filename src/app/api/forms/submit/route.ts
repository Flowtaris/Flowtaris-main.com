import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const leadSchema = z.object({
  form_type: z.string().min(1, 'Form type is required'),
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  work_email: z.string().email('Invalid email address'),
  platform: z.union([z.string(), z.array(z.string())]).optional(),
  service_needed: z.string().optional(),
  project_timeline: z.string().optional(),
  team_size: z.string().optional(),
  business_challenge: z.string().optional(),
  current_challenge: z.string().optional(),
  desired_outcome: z.string().optional(),
  question: z.string().optional(),
  preferred_contact: z.string().optional(),
  hcaptcha_token: z.string().optional(),
})

// Rate limiting: simple in-memory for edge (replace with Upstash for production)
const submissions = new Map<string, number>()

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('leads').select('*')
  return NextResponse.json({ data, error })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // ── Validate payload using Zod ───────────────────────────────────────
    const parsedResult = leadSchema.safeParse(body)
    if (!parsedResult.success) {
      return NextResponse.json({ error: parsedResult.error.errors[0].message }, { status: 400 })
    }

    const {
      form_type, name, company, work_email,
      platform, service_needed, project_timeline,
      team_size, business_challenge, current_challenge,
      desired_outcome, question, preferred_contact,
      hcaptcha_token,
    } = parsedResult.data

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

    // Save to database
    const supabase = await createClient()
    const { error: dbError } = await supabase.from('leads').insert({
      form_type,
      name,
      company: company || null,
      work_email,
      platform: Array.isArray(platform) ? platform.join(', ') : platform || null,
      service_needed: service_needed || null,
      project_timeline: project_timeline || null,
      team_size: team_size || null,
      business_challenge: business_challenge || null,
      current_challenge: current_challenge || null,
      desired_outcome: desired_outcome || null,
      question: question || null,
      preferred_contact: preferred_contact || null,
    })

    if (dbError) {
      const fs = require('fs')
      fs.writeFileSync('db_error_log.txt', JSON.stringify(dbError, null, 2))
      console.error('[Form Submission] Database error:', dbError)
      return NextResponse.json({ error: 'Database error. Did you run the SQL migration?' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Form Submission] Unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
