import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://flowtaris.com';

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch blogs (where published=true)
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at')
      .eq('published', true);

    const blogUrls: MetadataRoute.Sitemap = (blogs || []).map((blog) => ({
      url: `${baseUrl}/insights/${blog.slug}`,
      lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
      changeFrequency: 'never',
      priority: 0.75,
    }));

    // Fetch case studies
    const { data: caseStudies } = await supabase
      .from('case_studies')
      .select('slug, updated_at');

    const caseStudyUrls: MetadataRoute.Sitemap = (caseStudies || []).map((cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: cs.updated_at ? new Date(cs.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // Fetch services
    const { data: services } = await supabase
      .from('services')
      .select('slug, updated_at');

    const serviceUrls: MetadataRoute.Sitemap = (services || []).map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

    // Fetch integrations (if table exists)
    let integrationUrls: MetadataRoute.Sitemap = [];
    try {
      const { data: integrations, error } = await supabase
        .from('integrations')
        .select('slug, updated_at');

      if (!error && integrations) {
        integrationUrls = integrations.map((integration) => ({
          url: `${baseUrl}/integrations/${integration.slug}`,
          lastModified: integration.updated_at ? new Date(integration.updated_at) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        }));
      }
    } catch (e) {
      // Ignore error if 'integrations' table doesn't exist
    }

    return [
      ...staticUrls,
      ...blogUrls,
      ...caseStudyUrls,
      ...serviceUrls,
      ...integrationUrls,
    ];
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    // On error, return only static URLs so sitemap never breaks
    return staticUrls;
  }
}
