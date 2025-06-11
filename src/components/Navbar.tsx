import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 bg-opacity-70 backdrop-blur-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Smashlabs Logo" width={40} height={40} className="mr-3" />
          <Link href="/" className="text-white text-2xl font-bold">
            SMASHLABS™
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/why-smashlabs" className="text-gray-300 hover:text-white transition-colors">
            Why SmashLabs
          </Link>
          <Link href="/the-experience" className="text-gray-300 hover:text-white transition-colors">
            The Experience
          </Link>
          <Link href="/packages" className="text-gray-300 hover:text-white transition-colors">
            Packages
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
} 