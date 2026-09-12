import { z } from 'zod'

/**
 * Consultation form  primary lead capture
 */
export const consultationFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  workEmail: z.string().email('Please enter a valid work email'),
  platform: z.array(z.string()).min(1, 'Select at least one platform'),
  serviceNeeded: z.string().min(1, 'Please select a service'),
  projectTimeline: z.string().optional(),
  businessChallenge: z
    .string()
    .min(20, 'Please describe your challenge in at least 20 characters')
    .max(2000, 'Challenge description must be under 2000 characters'),
  preferredContact: z.enum(['email', 'phone', 'video']).default('email'),
  hcaptchaToken: z.string().min(1, 'Please complete the captcha'),
})

export type ConsultationFormData = z.infer<typeof consultationFormSchema>

/**
 * Proposal request form  detailed lead capture
 */
export const proposalFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  workEmail: z.string().email('Please enter a valid work email'),
  phone: z.string().optional(),
  platform: z.array(z.string()).min(1, 'Select at least one platform'),
  serviceNeeded: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  projectTimeline: z.string().min(1, 'Please select a timeline'),
  businessChallenge: z
    .string()
    .min(20, 'Please describe your challenge in at least 20 characters')
    .max(5000, 'Description must be under 5000 characters'),
  hcaptchaToken: z.string().min(1, 'Please complete the captcha'),
})

export type ProposalFormData = z.infer<typeof proposalFormSchema>

/**
 * General inquiry form  simple contact
 */
export const inquiryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  hcaptchaToken: z.string().min(1, 'Please complete the captcha'),
})

export type InquiryFormData = z.infer<typeof inquiryFormSchema>

/**
 * Resource gate form  gated content download
 */
export const resourceGateFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  workEmail: z.string().email('Please enter a valid work email'),
  hcaptchaToken: z.string().min(1, 'Please complete the captcha'),
})

export type ResourceGateFormData = z.infer<typeof resourceGateFormSchema>

/**
 * Newsletter signup form
 */
export const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>
