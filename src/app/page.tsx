'use client';

import Image from 'next/image'
import Link from 'next/link'
import { FaHammer, FaGlassMartiniAlt, FaTshirt, FaShieldAlt, FaArrowRight, FaCalendarAlt, FaUsers, FaClock, FaTools, FaChevronDown, FaUserShield, FaUserTie, FaArrowUp, FaStar, FaQuoteLeft, FaInstagram, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import { trackButtonClick, trackFormSubmit, trackVideoInteraction } from '@/lib/analytics'
import { GridSkeleton, TextSkeleton, Skeleton } from '@/components/Skeleton'
import { useCounter } from '@/hooks/useCounter'
import Counter from '@/components/Counter'
import CustomCursor from '@/components/CustomCursor'
import SmashAnimation from '@/components/SmashAnimation'
import { motion, useScroll, useTransform } from 'framer-motion'

// Add tracking function
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // You can implement your analytics tracking here
  // For now, we'll just console.log for development
  console.log('Event tracked:', eventName, properties)
}

export default function Home() {
  const { count: customers, isAnimating: customersAnimating } = useCounter(10000);
  const { count: satisfaction, isAnimating: satisfactionAnimating } = useCounter(95);
  const { count: events, isAnimating: eventsAnimating } = useCounter(500);

  const statsLoading = customersAnimating || satisfactionAnimating || eventsAnimating;

  const [contactFormLoading, setContactFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    package: 'standard',
    message: ''
  });

  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactFormErrors, setContactFormErrors] = useState<Record<string, string>>({});

  const animationRef = useRef<number>();

  const [showStats, setShowStats] = useState(false);
  const [showSmashAnimation, setShowSmashAnimation] = useState(false);
  const [smashType, setSmashType] = useState<'glass' | 'wood' | 'metal'>('glass');

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Set minimum date after component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      date: today
    }));
  }, []);

  const validateBookingForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format (e.g., +1234567890 or 1234567890)';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (!formData.guests || parseInt(formData.guests) < 1) {
      newErrors.guests = 'Number of guests must be at least 1';
    }
    if (!formData.package) {
      newErrors.package = 'Package selection is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};
    if (!contactFormData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!contactFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(contactFormData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!contactFormData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setContactFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBookingForm()) {
      alert('Please correct the errors in the booking form.');
      return;
    }
    console.log('Booking Form submitted:', formData);
    trackFormSubmit('Booking Form', formData);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: today,
      time: '',
      guests: '1',
      package: 'standard',
      message: ''
    });
    alert('Booking request submitted! We will contact you shortly.');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) {
      alert('Please correct the errors in the contact form.');
      return;
    }
    setContactFormLoading(true);
    console.log('Contact Form submitted:', contactFormData);
    trackFormSubmit('Contact Form', contactFormData);
    
    setTimeout(() => {
      setContactFormData({
        name: '',
        email: '',
        message: ''
      });
      alert('Your message has been sent! We will get back to you soon.');
      setContactFormLoading(false);
    }, 1500);
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setContactFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSmash = (type: 'glass' | 'wood' | 'metal') => {
    setSmashType(type);
    setShowSmashAnimation(true);
    setTimeout(() => setShowSmashAnimation(false), 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <CustomCursor />
      <SmashAnimation isVisible={showSmashAnimation} type={smashType} />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-rage-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section with Parallax */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
            preload="auto"
            onPlay={() => trackVideoInteraction('play', 'hero-background')}
            onPause={() => trackVideoInteraction('pause', 'hero-background')}
            onEnded={() => trackVideoInteraction('complete', 'hero-background')}
          >
            <source src="/videos/smashlabs-bg.mp4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 to-dark-950/90"></div>
        </motion.div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-rage-400 to-rage-600 text-transparent bg-clip-text">
              Unleash Your Inner Beast
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
              Smash. Destroy. Conquer.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Dive into the ultimate stress-relief experience. Break free from your worries and unleash your rage in a safe, exhilarating environment.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('booknow')}
                className="btn btn-primary text-lg px-8 py-4 rounded-full bg-rage-500 hover:bg-rage-600 text-white font-bold transition-all duration-300"
              >
                Book Your Smash Session
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('experience')}
                className="btn btn-outline text-lg px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/10 font-bold transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-center"
          >
            <span className="block text-sm mb-2">Scroll to Explore</span>
            <FaChevronDown className="w-6 h-6 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToSection('booknow')}
        className="fixed bottom-8 right-8 z-50 bg-rage-500 text-white p-4 rounded-full shadow-lg hover:shadow-rage-500/50 transition-all duration-300"
      >
        <FaCalendarAlt className="w-6 h-6" />
      </motion.button>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, scale: scrollYProgress.get() > 0.2 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 z-50 bg-dark-800 text-white p-4 rounded-full shadow-lg hover:shadow-dark-800/50 transition-all duration-300"
      >
        <FaArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Enhanced Stats Section */}
      <section id="stats" className="section bg-gradient-to-b from-dark-900 to-dark-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: customers.toLocaleString() + '+', label: 'Happy Customers', icon: FaUsers },
              { value: satisfaction + '%', label: 'Satisfaction Rate', icon: FaStar },
              { value: events.toLocaleString() + '+', label: 'Corporate Events', icon: FaCalendarAlt },
              { value: '24/7', label: 'Adrenaline Rush', icon: FaClock }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-8 text-center rounded-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-rage-500 mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
              Why Choose SmashLabs?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience the perfect blend of adrenaline, safety, and premium service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: FaTools,
                title: 'Premium Arsenal',
                description: 'State-of-the-art equipment and tools for maximum destruction.'
              },
              {
                icon: FaShieldAlt,
                title: 'Controlled Chaos',
                description: 'Expertly designed spaces for safe yet exhilarating experiences.'
              },
              {
                icon: FaUserShield,
                title: 'Full Protective Gear',
                description: 'Top-quality safety equipment for worry-free smashing.'
              },
              {
                icon: FaUserTie,
                title: 'Expert Guidance',
                description: 'Professional staff ensuring your experience is both safe and satisfying.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-rage-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-rage-500/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-rage-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 bg-dark-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
                The SmashLabs Experience
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                At SmashLabs, we don't just offer a service; we offer a transformation. Step into our world of controlled chaos, where every swing, every shatter, and every crash is a step towards liberation.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <FaTools className="w-7 h-7 text-rage-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">State-of-the-art Facilities</span>
                    <p className="text-gray-400 text-sm">State-of-the-art smash rooms designed for exhilarating experiences.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FaShieldAlt className="w-7 h-7 text-rage-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Diverse Selection</span>
                    <p className="text-gray-400 text-sm">A diverse selection of items to smash, from electronics to glass.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FaUserTie className="w-7 h-7 text-rage-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Customizable Packages</span>
                    <p className="text-gray-400 text-sm">Customizable packages for individuals, groups, and corporate events.</p>
                  </div>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackEvent('experience_book_click');
                  scrollToSection('booknow');
                }}
                className="px-8 py-4 bg-gradient-to-r from-rage-500 to-rage-600 text-white rounded-lg font-semibold hover:from-rage-600 hover:to-rage-700 transition-all duration-300 shadow-lg hover:shadow-rage-500/20"
              >
                Book Your Experience
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src="/smashlabs-experience-room.png"
                    alt="SmashLabs Experience"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RedBull of India Section */}
      <section id="lifestyle" className="section bg-gradient-to-b from-dark-900 to-dark-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-rage-400 to-rage-600 text-transparent bg-clip-text">
              The Crackhead Version of RedBull
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Where stress relief meets pure adrenaline. SmashLabs is your ultimate destination for controlled chaos and therapeutic destruction.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <button
                onClick={() => scrollToSection('booknow')}
                className="btn btn-primary text-lg px-8 py-4 rounded-full bg-rage-500 hover:bg-rage-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
              >
                Book Your Experience
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section bg-gradient-to-b from-dark-950 to-dark-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-rage-400 to-rage-600 text-transparent bg-clip-text">
              Corporate Packages
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Unleash Team Power</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Boost morale, reduce stress, and strengthen bonds with our unique team-building packages.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <FaUsers className="w-5 h-5 text-rage-400 mr-3" />
                  <span>Team Cohesion</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Foster stronger teamwork and communication through a shared exhilarating experience.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackButtonClick('book_now_package_1');
                  scrollToSection('booknow');
                }}
                className="w-full bg-rage-500 hover:bg-rage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Book Now
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Stress Buster</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                A unique way to de-stress and re-energize your team, leaving them refreshed and focused.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <FaGlassMartiniAlt className="w-5 h-5 text-rage-400 mr-3" />
                  <span>Team Refresh</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Create lasting memories and stories with an activity unlike any other corporate outing.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackButtonClick('book_now_package_2');
                  scrollToSection('booknow');
                }}
                className="w-full bg-rage-500 hover:bg-rage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Book Now
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Unforgettable Fun</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Create lasting memories and stories with an activity unlike any other corporate outing.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="w-5 h-5 text-rage-400 mr-3" />
                  <span>Custom Events</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Tailored experiences for your team's specific needs and goals.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackButtonClick('book_now_package_3');
                  scrollToSection('booknow');
                }}
                className="w-full bg-rage-500 hover:bg-rage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Book Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booknow" className="section bg-gradient-to-b from-dark-950 to-dark-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
              Book Your Smash Session
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ready to unleash your inner beast? Book your session now and prepare for an unforgettable experience.
            </p>
          </motion.div>

          <form onSubmit={handleBookingSubmit} className="max-w-3xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="label text-lg mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleBookingChange}
                  className="input text-lg py-4"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-rage-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="label text-lg mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleBookingChange}
                  className="input text-lg py-4"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-rage-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="label text-lg mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleBookingChange}
                className="input text-lg py-4"
                placeholder="Your phone number"
              />
              {errors.phone && (
                <p className="mt-2 text-rage-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="date" className="label text-lg mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleBookingChange}
                  className="input text-lg py-4"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="mt-2 text-rage-500 text-sm">{errors.date}</p>
                )}
              </div>
              <div>
                <label htmlFor="time" className="label text-lg mb-2">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleBookingChange}
                  className="input text-lg py-4"
                />
                {errors.time && (
                  <p className="mt-2 text-rage-500 text-sm">{errors.time}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="guests" className="label text-lg mb-2">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleBookingChange}
                  className="input text-lg py-4"
                  min="1"
                  max="20"
                />
                {errors.guests && (
                  <p className="mt-2 text-rage-500 text-sm">{errors.guests}</p>
                )}
              </div>
              <div>
                <label htmlFor="package" className="label text-lg mb-2">Package</label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleBookingChange}
                  className="input text-lg py-4"
                >
                  <option value="basic">Basic Smash</option>
                  <option value="group">Group Smash</option>
                  <option value="corporate">Corporate Experience</option>
                </select>
                {errors.package && (
                  <p className="mt-2 text-rage-500 text-sm">{errors.package}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="label text-lg mb-2">Additional Notes</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleBookingChange}
                className="input text-lg h-40 py-4"
                placeholder="Tell us anything else we should know..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full text-lg py-5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Now
            </motion.button>
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their SmashLabs experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-rage-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-rage-400" />
                  ))}
                </div>
                <FaQuoteLeft className="w-8 h-8 text-rage-400/50 mb-4" />
                <p className="text-gray-300 mb-6">
                  "The most exhilarating experience I've ever had! The staff was professional, the facilities were top-notch, and the catharsis was real."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rage-500/20 flex items-center justify-center">
                    <span className="text-rage-400 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">John Doe</h4>
                    <p className="text-sm text-gray-400">Corporate Event</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-dark-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-2xl font-bold text-white">Follow Us on Social Media</h3>
            <div className="flex gap-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-rage-500 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-rage-500 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-rage-500 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="w-5 h-5 text-rage-400 mr-3" />
                    <span>123 Smash Street, City, Country</span>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaPhone className="w-5 h-5 text-rage-400 mr-3" />
                    <span>+1 234 567 890</span>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaEnvelope className="w-5 h-5 text-rage-400 mr-3" />
                    <span>info@smashlabs.com</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Business Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                  <p>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rage-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rage-500 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rage-500 focus:border-transparent"
                    placeholder="Your message"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-rage-500 hover:bg-rage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
              SmashLabs Gallery
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Take a look at our state-of-the-art facilities and the exhilarating experiences we offer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={`/images/gallery-${index + 1}.jpg`}
                  alt={`SmashLabs Gallery Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold">SmashLabs Experience</h3>
                    <p className="text-gray-300 text-sm">View Details</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-dark-950 to-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about your SmashLabs experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'What safety measures are in place?',
                answer: 'We provide full protective gear and have trained staff supervising all sessions. Our rooms are specially designed for safe destruction.'
              },
              {
                question: 'What items can I smash?',
                answer: 'We offer a variety of items including electronics, glass, and furniture. All items are pre-approved for safe destruction.'
              },
              {
                question: 'How long is each session?',
                answer: 'Standard sessions are 30 minutes, with options for extended sessions. Corporate events can be customized to your needs.'
              },
              {
                question: 'Do I need to bring anything?',
                answer: 'Just yourself and comfortable clothes. We provide all necessary safety equipment and tools.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-800/50 p-6 rounded-xl backdrop-blur-sm border border-dark-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 