'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { trackButtonClick } from '@/lib/analytics'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'booknow', label: 'Book Now' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentActive = 'home';
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && (sectionTop + sectionHeight) > 100) { // 100px offset for navbar height
          currentActive = section.id;
        }
      });
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-900/90 shadow-lg backdrop-blur-lg border-b border-primary-500/20' : 'bg-transparent backdrop-blur-none border-b border-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 rounded-lg p-2" 
            onClick={(e) => scrollToSection('home', e)} 
            aria-label="SmashLabs Home - Go to top of page"
          >
            <Image
              src="/logo.png"
              alt="SmashLabs Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-red-500 group-hover:text-white' : 'text-white group-hover:text-gray-200'
            }`}>
              <span className="text-red-500">SMASH</span>LABS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6" role="menubar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => scrollToSection(link.id, e)}
                onKeyDown={(e) => handleKeyDown(e, link.id)}
                className={`text-sm lg:text-base font-medium transition-colors duration-300 whitespace-nowrap px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 ${
                  activeSection === link.id ? 'text-white font-semibold bg-red-600/20' : (isScrolled ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-300 hover:text-white hover:bg-white/5')
                }`}
                aria-current={activeSection === link.id ? 'page' : undefined}
                role="menuitem"
                tabIndex={0}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            onKeyDown={handleMobileMenuKeyDown}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 transition-colors duration-300"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" aria-hidden="true" />
            ) : (
              <FaBars className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-dark-900/95 backdrop-blur-lg border-t border-gray-700/50 py-4"
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => scrollToSection(link.id, e)}
                  onKeyDown={(e) => handleKeyDown(e, link.id)}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark-900 ${
                    activeSection === link.id ? 'text-white font-semibold bg-red-600/20' : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  role="menuitem"
                  tabIndex={0}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 