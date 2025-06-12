// This is a cosmetic change to trigger a new Vercel deployment
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "SmashLabs - Break Free. Smash Stress.",
  description: "Experience the ultimate stress relief and team building activity at SmashLabs. Perfect for corporate events, team outings, and private parties.",
  keywords: ["rage room", "stress relief", "team building", "corporate events", "smash room", "break room"],
  authors: [{ name: "SmashLabs Team" }],
  openGraph: {
    title: "SmashLabs - Break Free. Smash Stress.",
    description: "Experience the ultimate stress relief and team building activity at SmashLabs.",
    url: "https://smashlabs.in",
    siteName: "SmashLabs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SmashLabs Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmashLabs - Break Free. Smash Stress.",
    description: "Experience the ultimate stress relief and team building activity at SmashLabs.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
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
  );
} 