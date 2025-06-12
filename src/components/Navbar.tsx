'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { trackButtonClick } from '@/lib/analytics'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault(); // Prevent default Link behavior
    }
    trackButtonClick(`Nav Link - ${id}`);

    const navbarHeight = 80; // Height of the fixed navbar

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setActiveSection(id); // Set active section on click
    setIsOpen(false); // Close mobile menu after clicking a link
  };

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#why-choose', label: 'Why Choose Us', id: 'why-choose' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#packages', label: 'Packages', id: 'packages' },
    { href: '#booknow', label: 'Book Now', id: 'booknow' },
    { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },
    { href: '#gallery', label: 'Gallery', id: 'gallery' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-900/90 shadow-lg backdrop-blur-lg border-b border-primary-500/20' : 'bg-transparent backdrop-blur-none border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={(e) => scrollToSection('home', e)} aria-label="SmashLabs Home">
            <Image
              src="/logo.png"
              alt="SmashLabs Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-primary-500 group-hover:text-primary-400' : 'text-white group-hover:text-primary-400'
            }`}>
              SMASHLABS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => scrollToSection(link.id, e)}
                className={`text-sm lg:text-base font-medium transition-colors duration-300 whitespace-nowrap px-2 ${
                  activeSection === link.id ? 'text-primary-400 font-semibold' : (isScrolled ? 'text-gray-300 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400')
                }`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none transition-colors duration-300 ${
                isScrolled ? 'text-primary-400' : 'text-white'
              }`}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-dark-950/95 backdrop-blur-lg transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
          <div className="flex justify-end py-6">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-primary-400 transition-colors duration-300"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => scrollToSection(link.id, e)}
                  className={`block w-full text-xl font-medium text-center transition-colors duration-300 ${
                    activeSection === link.id ? 'text-primary-400' : 'text-white hover:text-primary-400'
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 