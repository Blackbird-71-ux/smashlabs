import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smashlabs.in'
  
  // Static pages
  const staticPages = [
    '',
    '/about-us',
    '/the-experience', 
    '/packages',
    '/why-smashlabs',
    '/testimonials',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ]
  
  // Generate sitemap entries
  const sitemap: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: getPriority(path),
  }))
  
  return sitemap
}

function getPriority(path: string): number {
  switch (path) {
    case '':
      return 1.0 // Homepage
    case '/packages':
    case '/the-experience':
      return 0.9 // Key business pages
    case '/about-us':
    case '/contact':
      return 0.8 // Important pages
    case '/testimonials':
    case '/why-smashlabs':
      return 0.7 // Secondary pages
    default:
      return 0.5 // Other pages
  }
} 