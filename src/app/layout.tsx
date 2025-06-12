// This is a cosmetic change to trigger a new Vercel deployment
import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SmashLabs - Corporate Entertainment & Team Building',
  description: 'SmashLabs offers unique corporate entertainment and team building experiences through rage rooms and interactive activities.',
  keywords: 'corporate entertainment, team building, rage room, corporate events, stress relief, team activities',
  authors: [{ name: 'SmashLabs' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smashlabs.com',
    title: 'SmashLabs - Corporate Entertainment & Team Building',
    description: 'Experience the ultimate stress relief and team building activity at SmashLabs.',
    siteName: 'SmashLabs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SmashLabs Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmashLabs - Corporate Entertainment & Team Building',
    description: 'Experience the ultimate stress relief and team building activity at SmashLabs.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Add structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SmashLabs',
  description: 'Corporate entertainment and team building experiences through rage rooms and interactive activities.',
  url: 'https://smashlabs.com',
  logo: 'https://smashlabs.com/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main Street',
    addressLocality: 'Your City',
    addressRegion: 'Your State',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 'YOUR_LATITUDE',
    longitude: 'YOUR_LONGITUDE',
  },
  telephone: '+1-234-567-8900',
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/smashlabs',
    'https://www.instagram.com/smashlabs',
    'https://www.linkedin.com/company/smashlabs',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased text-base leading-relaxed">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  )
} 