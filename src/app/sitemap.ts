import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smashlabs.in'
  
  // Static pages with better SEO structure
  const staticPages = [
    '',
    '/about-us',
    '/the-experience', 
    '/packages',
    '/why-smashlabs',
    '/testimonials',
    '/contact',
    '/book',
    '/register',
    '/privacy-policy',
    '/terms-of-service',
    '/faq',
    '/gallery',
    '/corporate-events',
    '/team-building',
    '/stress-relief',
    '/rage-room',
  ]
  
  // Generate sitemap entries
  const sitemap: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }))
  
  return sitemap
}

function getChangeFrequency(path: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  switch (path) {
    case '':
    case '/packages':
      return 'daily' // Homepage and packages change frequently
    case '/testimonials':
    case '/gallery':
      return 'weekly' // Content updated regularly
    case '/book':
    case '/register':
      return 'monthly' // Forms don't change often
    case '/privacy-policy':
    case '/terms-of-service':
      return 'yearly' // Legal pages rarely change
    default:
      return 'monthly' // Default for other pages
  }
}

function getPriority(path: string): number {
  switch (path) {
    case '':
      return 1.0 // Homepage - highest priority
    case '/packages':
    case '/book':
      return 0.9 // Key business pages
    case '/the-experience':
    case '/rage-room':
    case '/stress-relief':
      return 0.8 // Core service pages
    case '/about-us':
    case '/contact':
    case '/corporate-events':
    case '/team-building':
      return 0.7 // Important business pages
    case '/testimonials':
    case '/why-smashlabs':
    case '/gallery':
      return 0.6 // Supporting content
    case '/register':
    case '/faq':
      return 0.5 // Utility pages
    default:
      return 0.4 // Other pages
  }
} 