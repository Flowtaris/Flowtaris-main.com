import type { MetadataRoute } from 'next'

const BASE_URL = 'https://flowtaris.com'

// Static routes with priorities
const STATIC_ROUTES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',                           priority: 1.0,  changeFrequency: 'weekly'  },
  { url: '/about',                      priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/services',                   priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/netsuite-consulting', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/services/coupa-consulting',  priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/erp-integrations',  priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/coupa-to-netsuite',  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/workday-to-netsuite', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/coupa-to-sap',       priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/ironclad-to-coupa',  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/managed-support',   priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/ai-automation',     priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/sap-workday',       priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/industries',                 priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/technology-saas', priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/healthcare',      priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/manufacturing',   priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/financial-services', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/industries/professional-services', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/integrations',               priority: 0.85, changeFrequency: 'monthly' },
  { url: '/case-studies',               priority: 0.85, changeFrequency: 'weekly'  },
  { url: '/insights',                   priority: 0.8,  changeFrequency: 'weekly'  },
  { url: '/resources',                  priority: 0.75, changeFrequency: 'weekly'  },
  { url: '/contact',                    priority: 0.9,  changeFrequency: 'monthly' },
]

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url:             `${BASE_URL}${route.url}`,
    lastModified:    new Date(),
    changeFrequency: route.changeFrequency,
    priority:        route.priority,
  }))

  return staticEntries
}
