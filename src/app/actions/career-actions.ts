'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Career } from '@/types/database'

export async function createCareer(data: Omit<Career, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('careers').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
}

export async function updateCareer(id: string, data: Partial<Career>) {
  const supabase = await createClient()
  const { error } = await supabase.from('careers').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
  revalidatePath(`/careers/${id}`)
}

export async function deleteCareer(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('careers').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
}

export async function submitApplication(data: FormData) {
  const supabase = await createClient()
  
  const file = data.get('resume') as File
  let resumeUrl = ''

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
    
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filename, file)
      
    if (uploadError) throw new Error(uploadError.message)
    
    resumeUrl = filename
  }

  const career_id = data.get('career_id') as string
  const name = data.get('name') as string
  const email = data.get('email') as string
  const phone = (data.get('phone') as string) || null
  const message = (data.get('message') as string) || null

  const { error } = await supabase.from('job_applications').insert([{
    career_id,
    name,
    email,
    phone,
    message,
    resume_url: resumeUrl || null
  }])

  if (error) throw new Error(error.message)

  // Fetch career info for email
  const { data: career } = await supabase.from('careers').select('position_name').eq('id', career_id).single()
  const positionName = career?.position_name || 'Job Opening'

  // Send emails using Resend if configured
  if (process.env.RESEND_API_KEY) {
    const adminEmailHtml = `
      <h2>New Job Application: ${positionName}</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        <tr><td><strong>Applicant Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone ?? '—'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message ?? '—'}</td></tr>
      </table>
      <p>Log in to the Flowtaris admin panel to view the application and download the resume.</p>
    `

    // Admin Notification
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.NOTIFICATION_EMAIL_FROM ?? 'noreply@flowtaris.com',
        to: (process.env.NOTIFICATION_EMAIL_TO ?? 'info@flowtaris.com').split(',').map((e: string) => e.trim()),
        subject: `New Job Application: ${positionName} — ${name}`,
        html: adminEmailHtml,
      }),
    }).catch((err) => console.error('[Resend Admin Error]', err))

    const applicantEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6;">
        <h2 style="color: #0A1628;">Application Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for taking the time to apply for the <strong>${positionName}</strong> position at Flowtaris.</p>
        <p>This email is to confirm that we have successfully received your application and resume. Our team will review your qualifications, and if there is a match with our current needs, we will be in touch regarding the next steps.</p>
        <br />
        <p>Best regards,<br/><strong>The Flowtaris Team</strong></p>
      </div>
    `

    // Applicant Confirmation
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.NOTIFICATION_EMAIL_FROM ?? 'noreply@flowtaris.com',
        to: [email],
        subject: `Application Received: ${positionName}`,
        html: applicantEmailHtml,
      }),
    }).catch((err) => console.error('[Resend Applicant Error]', err))
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('job_applications').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/job-applications')
}

export async function getResumeUrl(path: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 60 * 60) // 1 hour
  if (error) throw new Error(error.message)
  return data.signedUrl
}

export async function deleteApplication(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('job_applications').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/job-applications')
}
