import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

/**
 * Merge Tailwind classes with clsx — prevents class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format ISO date string to "MMMM d, yyyy" (e.g., "January 15, 2025")
 */
export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'MMMM d, yyyy')
}

/**
 * Format ISO date string to "MMM d, yyyy" (e.g., "Jan 15, 2025")
 */
export function formatDateShort(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy')
}

/**
 * Estimate reading time for content in minutes
 */
export function readingTime(content: string): number {
  const wordsPerMinute = 225
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

/**
 * Generate absolute URL for the site
 */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flowtaris.com'
  return `${base}${path}`
}
