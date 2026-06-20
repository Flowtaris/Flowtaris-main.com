import { absoluteUrl } from '@/lib/utils'

/**
 * Generate Organization JSON-LD schema
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Flowtaris',
    description:
      'Enterprise ERP consulting and integration partner specializing in NetSuite, Coupa, SAP, Workday, Ironclad, automation and managed support.',
    url: 'https://flowtaris.com',
    logo: absoluteUrl('/logo.png'),
    email: 'info@flowtaris.com',
    slogan: 'The Science of Business Flow',
    sameAs: [
      'https://www.linkedin.com/company/flowtaris-private-limited',
      'https://www.instagram.com/flowtaris_official',
      'https://www.youtube.com/@Flowtaris',
      'https://www.x.com/flowtaris',
    ],
    knowsAbout: [
      'NetSuite ERP',
      'Coupa Procurement',
      'SAP',
      'Workday',
      'ERP Integration',
      'Enterprise Automation',
      'Managed IT Support',
    ],
  }
}

/**
 * Generate Service JSON-LD schema
 */
export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(url),
    provider: {
      '@type': 'Organization',
      name: 'Flowtaris',
      url: 'https://flowtaris.com',
    },
  }
}

/**
 * Generate FAQ JSON-LD schema
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Article JSON-LD schema
 */
export function articleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  imageUrl,
  authorName,
}: {
  title: string
  description: string
  datePublished: string
  dateModified: string
  url: string
  imageUrl?: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified,
    url: absoluteUrl(url),
    image: imageUrl ? absoluteUrl(imageUrl) : undefined,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@type': 'Organization', name: 'Flowtaris' },
    publisher: {
      '@type': 'Organization',
      name: 'Flowtaris',
      logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') },
    },
  }
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}
