import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex flex-wrap justify-center space-x-6 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/why-smashlabs" className="hover:text-white transition-colors">
            Why SmashLabs
          </Link>
          <Link href="/packages" className="hover:text-white transition-colors">
            Packages
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} SmashLabs. All rights reserved.</p>
      </div>
    </footer>
  );
} 