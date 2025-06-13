import Head from 'next/head';
import { SEOProps } from '@/types';

const defaultSEO = {
  title: 'SmashLabs - Premium Stress Relief & Team Building Experience',
  description: 'Experience the ultimate stress relief at SmashLabs. Professional rage room and team building activities. Book your cathartic experience today!',
  keywords: ['stress relief', 'rage room', 'team building', 'corporate events', 'anger management', 'therapy', 'smash room'],
  image: '/images/smashlabs-og.jpg',
  type: 'website' as const,
};

export const SEO = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
}: SEOProps) => {
  const seo = {
    title: title ? `${title} | SmashLabs` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: [...defaultSEO.keywords, ...keywords],
    image: image || defaultSEO.image,
    url: url || process.env.NEXT_PUBLIC_SITE_URL || 'https://smashlabs.com',
    type,
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content="SmashLabs" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="SmashLabs" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content="@smashlabs" />
      <meta name="twitter:creator" content="@smashlabs" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'SmashLabs',
            description: seo.description,
            url: seo.url,
            image: seo.image,
            telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+1234567890',
            email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@smashlabs.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Smash Street',
              addressLocality: 'City',
              addressRegion: 'State',
              postalCode: '12345',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '40.7128',
              longitude: '-74.0060',
            },
            openingHours: [
              'Mo-Fr 10:00-22:00',
              'Sa-Su 09:00-23:00',
            ],
            priceRange: '$$',
            servesCuisine: 'Entertainment',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '150',
            },
            sameAs: [
              'https://www.facebook.com/smashlabs',
              'https://www.instagram.com/smashlabs',
              'https://www.twitter.com/smashlabs',
            ],
          }),
        }}
      />
    </Head>
  );
}; 