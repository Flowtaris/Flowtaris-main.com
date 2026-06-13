import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/utils'

/* ════════════════════════════════════════════════════════
   SIMPLE METADATA GENERATOR (synchronous)
   Used by all page stubs from Prompt 2.
   ════════════════════════════════════════════════════════ */

interface SimpleMetadataParams {
  title: string
  description: string
  path: string
  ogImage?: string
  noIndex?: boolean
}

/**
 * Generate consistent metadata for all pages (synchronous).
 * Compatible with the page stubs created in earlier prompts.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: SimpleMetadataParams): Metadata {
  const url = absoluteUrl(path)
  const image = ogImage || absoluteUrl('/api/og?title=' + encodeURIComponent(title))

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

/* ════════════════════════════════════════════════════════
   SUPABASE-DRIVEN METADATA GENERATOR (async)
   Used when per-page SEO overrides are needed from the CMS.
   ════════════════════════════════════════════════════════ */

interface SupabaseMetadataOptions {
  pageSlug: string
  defaults: {
    title: string
    description: string
    ogImage?: string
  }
}

/**
 * Generate per-page metadata with Supabase SEO override support.
 * Falls back to provided defaults if no override row exists.
 */
export async function generateSupabaseMetadata({
  pageSlug,
  defaults,
}: SupabaseMetadataOptions): Promise<Metadata> {
  // Dynamic import to avoid importing server-only code in client components
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data: override } = await supabase
    .from('seo_overrides')
    .select('*')
    .eq('page_slug', pageSlug)
    .single()

  const title       = override?.meta_title       || defaults.title
  const description = override?.meta_description  || defaults.description
  const ogTitle     = override?.og_title          || title
  const ogDesc      = override?.og_description    || description
  const ogImage     = override?.og_image_url      || defaults.ogImage || '/og-default.png'
  const canonical   = override?.canonical_url     || undefined
  const noIndex     = override?.no_index          || false

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      images: [ogImage],
    },
  }
}
