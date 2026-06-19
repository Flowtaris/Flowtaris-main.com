'use client'

import React, { useRef } from 'react'
import { Link } from '@/components/ui/PageTransition'
import { NAV_SERVICES, NAV_INDUSTRIES, SITE_EMAIL } from '@/lib/constants/navigation'
import { ArrowRight, Mail } from 'lucide-react'

const GlassdoorIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21.905 19.349h-5.01V5.702c0-.528-.432-.96-.96-.96H8.423a.962.962 0 0 0-.96.96v12.607h-5.01V4.704c0-1.077.88-1.957 1.957-1.957h13.578c1.077 0 1.957.88 1.957 1.957v14.645h-.04zM5.385 20.267H19.98c1.077 0 1.957-.88 1.957-1.957v-.553H7.342V5.15H5.385c-1.077 0-1.957.88-1.957 1.957v11.203c0 1.077.88 1.957 1.957 1.957z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const getSocialIcon = (link: SocialLink) => {
  if (link.icon_svg && link.icon_svg.trim() !== '') {
    // Render custom SVG from DB
    return (
      <span
        className="w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: link.icon_svg }}
      />
    )
  }

  const n = link.platform_name.toLowerCase()
  if (n.includes('linkedin')) return <LinkedinIcon className="w-6 h-6" />
  if (n.includes('twitter') || n.includes('x')) return <TwitterIcon className="w-6 h-6" />
  if (n.includes('instagram')) return <InstagramIcon className="w-6 h-6" />
  if (n.includes('glassdoor')) return <GlassdoorIcon className="w-6 h-6" />
  if (n.includes('mail') || n.includes('email')) return <Mail className="w-6 h-6" />
  if (n.includes('whatsapp')) return <WhatsappIcon className="w-6 h-6" />
  return null
}

const FOOTER_LINKS = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-of-use' },
]

import { SocialLink } from '@/types/database'

export function Footer({ settings = { company_name: 'FLOWTARIS' }, socialLinks = [] }: { settings?: Record<string, string>, socialLinks?: SocialLink[] }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#0A1628] border-t border-white/[0.05] overflow-hidden">
      {/* Subtle Ambient Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-50%] left-[-20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle_at_center,#E8A020_0%,transparent_70%)] opacity-[0.1] animate-pulse mix-blend-screen" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-50%] right-[-20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(circle_at_center,#F5B041_0%,transparent_70%)] opacity-[0.08] animate-pulse mix-blend-screen" style={{ animationDuration: '14s', animationDelay: '2s' }} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 md:py-16">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-8">
          
          {/* Branding Left */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-sora)' }}>
              {(settings?.company_name || 'FLOWTARIS').toUpperCase()}
            </h2>
            <p className="text-[#E8A020] text-xs font-bold tracking-[0.2em] uppercase">
              The Science Of Business Flow
            </p>
          </div>

          {/* Social Links & Info Center */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <a 
                href={`tel:${settings?.phone_number?.replace(/\s/g, '') || '+61212345678'}`}
                className="text-xs uppercase tracking-[0.15em] font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                {settings?.phone_number || '+61 2 1234 5678'}
              </a>

              <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />

              {(socialLinks.length > 0 ? socialLinks : [
                { id: '1', platform_name: 'LinkedIn', url: 'https://linkedin.com/company/flowtaris', priority: 4, created_at: '', updated_at: '' },
                { id: '2', platform_name: 'Twitter', url: 'https://twitter.com/flowtaris', priority: 3, created_at: '', updated_at: '' },
                { id: '3', platform_name: 'Instagram', url: 'https://instagram.com/flowtaris', priority: 2, created_at: '', updated_at: '' },
                { id: '4', platform_name: 'Glassdoor', url: 'https://glassdoor.com/flowtaris', priority: 1, created_at: '', updated_at: '' },
              ]).map((link) => {
                const Icon = getSocialIcon(link)
                const isWhatsapp = link.platform_name.toLowerCase().includes('whatsapp')
                let href = link.url

                if (isWhatsapp) {
                  const number = settings?.whatsapp_number || settings?.phone_number || '919391274394'
                  const cleanNumber = number.replace(/\D/g, '')
                  const finalNumber = cleanNumber.length === 10 ? '91' + cleanNumber : cleanNumber
                  const message = 'Hi Flowtaris, I would like to inquire about your services.'
                  href = `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`
                }

                return (
                  <a
                    key={link.id}
                    href={href}
                    target={href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={link.platform_name}
                  >
                    {Icon || <span className="text-xs uppercase tracking-[0.15em] font-bold">{link.platform_name}</span>}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Clean Row Links Right */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/30">
              &copy; {settings?.company_name || 'Flowtaris'}. All Rights Reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
