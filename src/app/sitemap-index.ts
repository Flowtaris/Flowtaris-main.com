import { MetadataRoute } from 'next';

/**
 * Sitemap Index File (if needed for > 100 URLs).
 * Note: In Next.js 14, to use this as an actual sitemap index, 
 * you typically rename this file to `sitemap.ts` in a separate directory, 
 * or handle it via a `route.ts`. 
 * 
 * It points to the dynamically generated sitemap and the static fallback.
 */
export default function sitemapIndex(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://flowtaris.com/sitemap.xml',
      lastModified: new Date(),
    },
    {
      url: 'https://flowtaris.com/sitemap-static.xml',
      lastModified: new Date(),
    }
  ];
}
