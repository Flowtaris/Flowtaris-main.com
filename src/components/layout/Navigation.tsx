'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion'
import {
  Menu, X, ArrowRight, Database, Cloud, Webhook,
  ShieldCheck, ArrowLeftRight, Component,
  Box, Layers, ShoppingCart, Globe, Briefcase, Command, MessageCircle,
  Cpu, Network, Lock, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
]

// ─────────────────────────────────────────────────────────────────────────────
// The Ultra-Premium "Command Center" Mega Menu (Flowtaris Brand Colors)
// ─────────────────────────────────────────────────────────────────────────────
function CommandCenterMenu({ onEnter, onLeave, dynamicServices = [] }: { onEnter: () => void, onLeave: () => void, dynamicServices?: any[] }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  // 100/100 Staggered Entry Physics
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(12px)' },
    show: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.04 }
    },
    exit: {
      opacity: 0, y: 10, scale: 0.98, filter: 'blur(8px)',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96, filter: 'blur(8px)' },
    show: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const iconMap = [Database, ShoppingCart, ArrowLeftRight, ShieldCheck, Cpu, Briefcase];

  // Map dynamic services to the format needed
  const displayServices = dynamicServices.length > 0 
    ? dynamicServices.slice(0, 6).map((ds, idx) => {
        const heroData = ds.services_hero && ds.services_hero.length > 0 ? ds.services_hero[0] : null;
        return {
          title: ds.name,
          href: `/services/${ds.slug}`,
          num: `0${idx + 1}`.slice(-2),
          color: heroData?.color || '#E8A020',
          desc: heroData?.normal_description?.slice(0, 50) + '...' || 'Enterprise architecture and integration solutions.',
          detailTitle: ds.name,
          detailDesc: heroData?.normal_description || 'Scalable architecture and implementations.',
          icon: iconMap[idx % iconMap.length]
        }
      })
    : [
      { title: 'NetSuite Consulting', icon: Database, desc: 'Implementation and custom scripting.', detailTitle: 'NetSuite Mastery', detailDesc: 'Full-cycle implementation, SuiteScript 2.0 customization, and Advanced RevRec deployment.', color: '#4F46E5', href: '/services/netsuite-consulting' },
      { title: 'Coupa Consulting', icon: ShoppingCart, desc: 'BSM implementation and optimization.', detailTitle: 'Spend Optimization', detailDesc: 'Architecting Procure-to-Pay pipelines and supplier management for maximum ROI.', color: '#E11D48', href: '/services/coupa-consulting' },
      { title: 'ERP Integrations', icon: ArrowLeftRight, desc: 'Seamless system connectivity.', detailTitle: 'Robust Data Pipelines', detailDesc: 'MuleSoft & Boomi integrations ensuring real-time bidirectional syncing across your stack.', color: '#E8A020', href: '/services/erp-integrations' },
      { title: 'Managed Support', icon: ShieldCheck, desc: 'Dedicated post-go-live administration.', detailTitle: '24/7 Administration', detailDesc: 'Continuous system optimization, stringent security audits, and dedicated SLA support.', color: '#059669', href: '/services/managed-support' },
      { title: 'AI & Automation', icon: Cpu, desc: 'Intelligent workflow automation.', detailTitle: 'Workflow Automation', detailDesc: 'Injecting predictive analytics and RPA into legacy processes to drastically reduce manual effort.', color: '#7C3AED', href: '/services/ai-automation' },
      { title: 'SAP & Workday', icon: Briefcase, desc: 'Enterprise ecosystem management.', detailTitle: 'Enterprise Scale', detailDesc: 'Expertise navigating complex S/4HANA migrations and Workday HCM deployments securely.', color: '#0284C7', href: '/services/sap-workday' },
    ]

  const activeService = hoveredIdx !== null ? displayServices[hoveredIdx] : null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden" animate="show" exit="exit"
      onMouseMove={handleMouseMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[840px] h-[480px] p-3 rounded-[32px] bg-white/80 backdrop-blur-[60px] border border-white shadow-[0_40px_100px_-20px_rgba(10,22,40,0.15),0_0_0_1px_rgba(10,22,40,0.03)] overflow-hidden pointer-events-auto flex gap-3"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-multiply"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(232,160,32,0.04), transparent 40%)`
          )
        }}
      />

      {/* ── Left Block: The Morphing Hero Card (Col Span 4) ── */}
      <motion.div variants={itemVariants} className="flex-[1.1] relative">
        <Link
          href="/services"
          className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white via-slate-50/80 to-[#F0F4F8] border border-slate-200/60 p-8 flex flex-col justify-between overflow-hidden group shadow-[0_8px_30px_rgba(10,22,40,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(10,22,40,0.12)] transition-all duration-500"
        >
          <div className="absolute inset-0 rounded-[24px] border-[2px] border-transparent group-hover:border-[#E8A020]/20 transition-colors duration-700" />

          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIdx ?? 'default'}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 text-[#E8A020] shadow-[0_4px_12px_rgba(0,0,0,0.04)] group-hover:scale-110 transition-transform duration-500">
                {activeService ? (() => {
                  const ActiveIcon = activeService.icon as any;
                  return <ActiveIcon strokeWidth={1.5} className="w-7 h-7" style={{ color: activeService.color }} />
                })() : (
                  <Globe strokeWidth={1.5} className="w-7 h-7" />
                )}
              </div>

              <h3 className="text-[32px] font-extrabold text-navy-950 tracking-tight mb-3 leading-tight">
                {activeService ? activeService.detailTitle : <><span className="block">Enterprise</span>Consulting</>}
              </h3>

              <p className="text-slate-500 text-[15px] leading-relaxed max-w-[240px]">
                {activeService ? activeService.detailDesc : 'Architecting scalable ERP systems and custom integrations for high-growth organizations.'}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[#E8A020] font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
                {activeService ? `Explore ${activeService.title}` : 'View All Services'} <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Majestic 3D Data Viz Background */}
          <div className="absolute right-[-60px] bottom-[-60px] w-80 h-80 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_40s_linear_infinite]">
              <circle cx="100" cy="100" r="80" stroke={activeService ? activeService.color : "#E8A020"} strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.4" className="transition-colors duration-500" />
              <circle cx="100" cy="100" r="60" stroke={activeService ? activeService.color : "#E8A020"} strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.6" className="transition-colors duration-500" />
              <circle cx="100" cy="100" r="40" stroke={activeService ? activeService.color : "#E8A020"} strokeWidth="0.25" strokeDasharray="1 2" className="transition-colors duration-500" />
              <path d="M100 0 L100 200 M0 100 L200 100" stroke="#0A1628" strokeWidth="0.5" strokeOpacity="0.05" />
            </svg>
          </div>
        </Link>
      </motion.div>

      {/* ── Middle Block: The Grid (Col Span 5) ── */}
      <div
        className="flex-[1.5] grid grid-cols-2 grid-rows-3 gap-2 relative z-10"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {displayServices.map((item, idx) => (
          <motion.div key={idx} variants={itemVariants} className="relative group" onMouseEnter={() => setHoveredIdx(idx)}>
            <Link
              href={item.href}
              className="absolute inset-0 rounded-[20px] bg-white/60 hover:bg-white border border-slate-200/60 p-4 flex gap-4 items-center group-hover:-translate-y-[3px] group-hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08),0_0_0_1px_rgba(232,160,32,0.2)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
              style={{
                borderColor: hoveredIdx === idx ? `${item.color}40` : '',
                boxShadow: hoveredIdx === idx ? `0 12px 30px -10px ${item.color}20, 0 0 0 1px ${item.color}40` : ''
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, transparent, ${item.color})` }}
              />

              <div
                className="relative w-12 h-12 rounded-[14px] bg-slate-100/80 border border-slate-200/50 flex items-center justify-center shrink-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  backgroundColor: hoveredIdx === idx ? '#0A1628' : '',
                  borderColor: hoveredIdx === idx ? '#0A1628' : ''
                }}
              >
                {(() => {
                  const ItemIcon = item.icon as any;
                  return (
                    <ItemIcon
                      className="w-5 h-5 text-slate-500 transition-all duration-400"
                      strokeWidth={1.5}
                      style={{
                        color: hoveredIdx === idx ? item.color : '',
                        transform: hoveredIdx === idx ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                  );
                })()}
              </div>
              <div className="relative">
                <h4 className="text-[14px] font-bold text-slate-800 tracking-tight mb-0.5 group-hover:text-[#0A1628] transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-[13px] leading-tight line-clamp-1 group-hover:text-slate-600 transition-colors">{item.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Integrations Mega Menu
// ─────────────────────────────────────────────────────────────────────────────
function IntegrationsMenu({ onEnter, onLeave }: { onEnter: () => void, onLeave: () => void }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(12px)' },
    show: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.04 }
    },
    exit: {
      opacity: 0, y: 10, scale: 0.98, filter: 'blur(8px)',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96, filter: 'blur(8px)' },
    show: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const INTEGRATIONS = [
    { title: 'Coupa to NetSuite', icon: ArrowLeftRight, desc: 'Procurement to GL journal automation.', detailTitle: 'Procurement to GL', detailDesc: 'Procurement-to-GL journal automation with full reconciliation and audit trail.', color: '#4F46E5', href: '/integrations/procurement-to-GL' },
    { title: 'Workday to NetSuite', icon: Database, desc: 'HCM Sync & Payroll automation.', detailTitle: 'HCM Sync', detailDesc: 'Payroll journal entry automation from HCM to ERP — eliminating manual finance work.', color: '#E11D48', href: '/integrations/hcm-sync' },
    { title: 'Coupa to SAP', icon: Layers, desc: 'Procurement workflow sync.', detailTitle: 'IDoc Management', detailDesc: 'Procurement workflow sync between Coupa and SAP S/4HANA with IDoc management.', color: '#E8A020', href: '/integrations/idoc-management' },
    { title: 'Ironclad to Coupa', icon: Webhook, desc: 'Contract lifecycle automation.', detailTitle: 'Contract Lifecycle', detailDesc: 'Contract lifecycle to procurement workflow — automated supplier onboarding.', color: '#059669', href: '/integrations/contract-lifecycle' },
    { title: 'Workday to Coupa', icon: Network, desc: 'Employee provisioning.', detailTitle: 'Identity Provisioning', detailDesc: 'Employee provisioning and access management automation across HR and procurement.', color: '#7C3AED', href: '/integrations/identity-provisioning' },
    { title: 'Zylo to ERP', icon: Zap, desc: 'SaaS governance automation.', detailTitle: 'SaaS Governance', detailDesc: 'SaaS portfolio governance and software asset management automation.', color: '#0284C7', href: '/integrations/saas-governance' },
  ]

  const activeInt = hoveredIdx !== null ? INTEGRATIONS[hoveredIdx] : null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden" animate="show" exit="exit"
      onMouseMove={handleMouseMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[840px] h-[480px] p-3 rounded-[32px] bg-white/80 backdrop-blur-[60px] border border-white shadow-[0_40px_100px_-20px_rgba(10,22,40,0.15),0_0_0_1px_rgba(10,22,40,0.03)] overflow-hidden pointer-events-auto flex gap-3"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-multiply"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(232,160,32,0.04), transparent 40%)`
          )
        }}
      />

      <motion.div variants={itemVariants} className="flex-[1.1] relative">
        <Link
          href="/integrations"
          className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white via-slate-50/80 to-[#F0F4F8] border border-slate-200/60 p-8 flex flex-col justify-between overflow-hidden group shadow-[0_8px_30px_rgba(10,22,40,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(10,22,40,0.12)] transition-all duration-500"
        >
          <div className="absolute inset-0 rounded-[24px] border-[2px] border-transparent group-hover:border-[#E8A020]/20 transition-colors duration-700" />

          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIdx ?? 'default'}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 text-[#E8A020] shadow-[0_4px_12px_rgba(0,0,0,0.04)] group-hover:scale-110 transition-transform duration-500">
                {activeInt ? (
                  <activeInt.icon strokeWidth={1.5} className="w-7 h-7" style={{ color: activeInt.color }} />
                ) : (
                  <Network strokeWidth={1.5} className="w-7 h-7" />
                )}
              </div>

              <h3 className="text-[32px] font-extrabold text-navy-950 tracking-tight mb-3 leading-tight">
                {activeInt ? activeInt.detailTitle : <><span className="block">Enterprise</span>Integrations</>}
              </h3>

              <p className="text-slate-500 text-[15px] leading-relaxed max-w-[240px]">
                {activeInt ? activeInt.detailDesc : 'Architecting secure, bidirectional data pipelines that unify your corporate technology stack.'}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[#E8A020] font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
                {activeInt ? `Explore ${activeInt.title}` : 'View All Integrations'} <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-[-60px] bottom-[-60px] w-80 h-80 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_40s_linear_infinite]">
              <circle cx="100" cy="100" r="80" stroke={activeInt ? activeInt.color : "#E8A020"} strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.4" className="transition-colors duration-500" />
              <circle cx="100" cy="100" r="60" stroke={activeInt ? activeInt.color : "#E8A020"} strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.6" className="transition-colors duration-500" />
              <circle cx="100" cy="100" r="40" stroke={activeInt ? activeInt.color : "#E8A020"} strokeWidth="0.25" strokeDasharray="1 2" className="transition-colors duration-500" />
              <path d="M100 0 L100 200 M0 100 L200 100" stroke="#0A1628" strokeWidth="0.5" strokeOpacity="0.05" />
            </svg>
          </div>
        </Link>
      </motion.div>

      <div
        className="flex-[1.5] grid grid-cols-2 grid-rows-3 gap-2 relative z-10"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {INTEGRATIONS.map((item, idx) => (
          <motion.div key={idx} variants={itemVariants} className="relative group" onMouseEnter={() => setHoveredIdx(idx)}>
            <Link
              href={item.href}
              className="absolute inset-0 rounded-[20px] bg-white/60 hover:bg-white border border-slate-200/60 p-4 flex gap-4 items-center group-hover:-translate-y-[3px] group-hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08),0_0_0_1px_rgba(232,160,32,0.2)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
              style={{
                borderColor: hoveredIdx === idx ? `${item.color}40` : '',
                boxShadow: hoveredIdx === idx ? `0 12px 30px -10px ${item.color}20, 0 0 0 1px ${item.color}40` : ''
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, transparent, ${item.color})` }}
              />

              <div
                className="relative w-12 h-12 rounded-[14px] bg-slate-100/80 border border-slate-200/50 flex items-center justify-center shrink-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  backgroundColor: hoveredIdx === idx ? '#0A1628' : '',
                  borderColor: hoveredIdx === idx ? '#0A1628' : ''
                }}
              >
                <item.icon
                  className="w-5 h-5 text-slate-500 transition-all duration-400"
                  strokeWidth={1.5}
                  style={{
                    color: hoveredIdx === idx ? item.color : '',
                    transform: hoveredIdx === idx ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              </div>
              <div className="relative">
                <h4 className="text-[14px] font-bold text-slate-800 tracking-tight mb-0.5 group-hover:text-[#0A1628] transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-[13px] leading-tight line-clamp-1 group-hover:text-slate-600 transition-colors">{item.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Navigation Component
// ─────────────────────────────────────────────────────────────────────────────
export function Navigation({ dynamicServices = [] }: { dynamicServices?: any[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navTimer = useRef<NodeJS.Timeout | null>(null)

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMouseEnter = (menu: string) => {
    if (navTimer.current) clearTimeout(navTimer.current)
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    navTimer.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-slate-100'
            : 'bg-transparent'
        )}
        style={{ height: '90px' }}
      >
        <div className="h-full w-full px-6 lg:px-12 flex items-center justify-between relative">

          {/* 1. Left: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center group" suppressHydrationWarning>
              <span className="text-[26px] font-extrabold tracking-tight leading-none text-navy-950 transition-colors duration-300 flex items-center gap-1.5">
                Flowtaris
                <span className="block w-2 h-2 rounded-full mb-3 bg-[#E8A020] group-hover:scale-150 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* 2. Center: Spaced Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-10 h-full pointer-events-auto">

            {/* Services Dropdown Trigger */}
            <div
              className="h-full flex items-center cursor-pointer"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={cn(
                  "text-[14px] font-semibold transition-all duration-300 uppercase tracking-widest text-navy-700 hover:text-navy-950",
                  activeMenu === 'services' && "text-navy-950 !font-bold"
                )}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Services
              </div>
            </div>

            {/* Integrations Dropdown Trigger */}
            <div
              className="h-full flex items-center cursor-pointer"
              onMouseEnter={() => handleMouseEnter('integrations')}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={cn(
                  "text-[14px] font-semibold transition-all duration-300 uppercase tracking-widest text-navy-700 hover:text-navy-950",
                  activeMenu === 'integrations' && "text-navy-950 !font-bold"
                )}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Integrations
              </div>
            </div>

            {/* Other Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-semibold transition-all duration-300 uppercase tracking-widest text-navy-700 hover:text-navy-950"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 3. Right: CTA & Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end gap-4 pointer-events-auto">
            <Link
              href="/contact"
              className="hidden lg:flex items-center justify-center px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm bg-navy-950 text-white hover:bg-navy-800 hover:scale-105"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Initiate
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6 text-navy-950" />
            </button>
          </div>

        </div>

        {/* Mega Menu Overlay Wrapper */}
        <AnimatePresence>
          {activeMenu === 'services' && (
            <div className="absolute left-0 right-0 top-0 pointer-events-none h-screen">
              <CommandCenterMenu onEnter={() => handleMouseEnter('services')} onLeave={handleMouseLeave} dynamicServices={dynamicServices} />
            </div>
          )}
          {activeMenu === 'integrations' && (
            <div className="absolute left-0 right-0 top-0 pointer-events-none h-screen">
              <IntegrationsMenu onEnter={() => handleMouseEnter('integrations')} onLeave={handleMouseLeave} />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer (Truncated for brevity, kept simple) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#060D1A]/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            {/* Simple mobile menu implementation */}
            <div className="absolute right-0 top-0 bottom-0 w-[80vw] bg-white shadow-2xl p-6">
              <button onClick={() => setMobileOpen(false)}><X className="mb-8 text-navy-950" /></button>
              <div className="flex flex-col gap-6">
                <Link href="/services" className="text-xl font-bold text-navy-950">Services</Link>
                <Link href="/integrations" className="text-xl font-bold text-navy-950">Integrations</Link>
                <Link href="/case-studies" className="text-xl font-bold text-navy-950">Case Studies</Link>
                {NAV_LINKS.filter(l => l.href !== '/case-studies').map(l => <Link key={l.label} href={l.href} className="text-xl font-bold text-navy-950">{l.label}</Link>)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
