import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/studio/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/static/', '/studio/'],
      },
      {
        userAgent: ['Googlebot-Image', 'Googlebot-Video', 'Slurp'],
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'YouBot',
          'Google-Extended',
          'CCBot',
          'Applebot-Extended',
          'cohere-ai',
          'AI2Bot',
          'Diffbot',
          'Omgilibot',
          'FacebookBot',
        ],
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/static/', '/studio/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot'],
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/static/', '/studio/'],
        crawlDelay: 1,
      },
      {
        userAgent: ['MJ12bot', 'DotBot'],
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/static/', '/studio/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/static/', '/studio/'],
      },
    ],
    sitemap: [
      'https://flowtaris.com/sitemap.xml',
      'https://flowtaris.com/sitemap-static.xml',
    ],
  };
}
