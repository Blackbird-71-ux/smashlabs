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
        if (sectionTop <= 80 && (sectionTop + sectionHeight) > 80) { // 80px offset for navbar height
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

    const navbarHeight = 80; // Approximate height of your fixed navbar

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

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
    { href: '#features', label: 'Features', id: 'features' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#packages', label: 'Packages', id: 'packages' },
    { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },
    { href: '#booking', label: 'Book Now', id: 'booking' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-900/90 shadow-lg backdrop-blur-lg border-b border-primary-500/20' : 'bg-transparent backdrop-blur-none border-b border-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-3 group" onClick={(e) => scrollToSection('home', e)} aria-label="SmashLabs Home">
          <Image
            src="/logo.png"
            alt="SmashLabs Logo"
            width={48}
            height={48}
            className="transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <span className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-primary-500 group-hover:text-primary-400' : 'text-white group-hover:text-primary-400'
          }`}>
            SMASHLABS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={(e) => scrollToSection(link.id, e)}
              className={`text-lg font-medium transition-colors duration-300 ${
                activeSection === link.id ? 'text-primary-400 font-semibold' : (isScrolled ? 'text-gray-300 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400')
              }`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </Link>
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

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen ? 'max-h-screen opacity-100 py-4 translate-y-0' : 'max-h-0 opacity-0 -translate-y-full'
        } bg-dark-950/90 backdrop-blur-md`}
      >
        <div className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={(e) => scrollToSection(link.id, e)}
              className={`text-gray-300 hover:text-primary-400 transition-colors text-lg font-medium py-2 ${
                activeSection === link.id ? 'text-primary-400 font-semibold' : ''
              }`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 