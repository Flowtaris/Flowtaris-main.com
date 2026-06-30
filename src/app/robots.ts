import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/', 
        '/studio/',
        '/blogs/',
        '/f/',
        '/*?blogcategory=',
        '/*?rwg_token=',
        '/*?gsas='
      ],
    },
    sitemap: [
      'https://www.flowtaris.com/sitemap.xml',
      'https://www.flowtaris.com/sitemap-static.xml',
    ],
  };
}
