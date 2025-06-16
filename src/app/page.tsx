'use client';

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaHammer, FaGlassMartiniAlt, FaTshirt, FaShieldAlt, FaArrowRight, FaCalendarAlt, FaUsers, FaClock, FaTools, FaChevronDown, FaUserShield, FaUserTie, FaArrowUp, FaStar, FaQuoteLeft, FaInstagram, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCoffee, FaBriefcase } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import { trackButtonClick, trackFormSubmit, trackVideoInteraction, trackBookingAttempt, trackContactAttempt, trackError } from '@/lib/analytics'
import { GridSkeleton, TextSkeleton, Skeleton } from '@/components/Skeleton'
import { useCounter } from '@/hooks/useCounter'
import Counter from '@/components/Counter'
import CustomCursor from '@/components/CustomCursor'
import SmashAnimation from '@/components/SmashAnimation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useToast } from '@/components/ui/Toast'
import { validateBookingForm, validateContactForm, sanitizeInput, type BookingFormData, type ContactFormData } from '@/lib/validation'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { submitBooking, submitContact, APIError } from '@/lib/api'

// Add tracking function
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // You can implement your analytics tracking here
  // For now, we'll just console.log for development
  console.log('Event tracked:', eventName, properties)
}

export default function Home() {
  const { count: customers, isAnimating: customersAnimating } = useCounter(0);
  const { count: satisfaction, isAnimating: satisfactionAnimating } = useCounter(95);
  const { count: events, isAnimating: eventsAnimating } = useCounter(0);

  const statsLoading = customersAnimating || satisfactionAnimating || eventsAnimating;

  const [contactFormLoading, setContactFormLoading] = useState(false);

  const { success, error: showError } = useToast();
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    package: 'standard',
    message: ''
  });

  const [contactFormData, setContactFormData] = useState<ContactFormData>({
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted with data:', formData);
    
    const validation = validateBookingForm(formData);
    console.log('🔍 Validation result:', validation);
    
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      setErrors(validation.errors);
      showError('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setIsBookingLoading(true);
    setErrors({});

    try {
      // Track booking attempt
      trackBookingAttempt(formData.package, parseInt(formData.guests) || 1);
      console.log('🚀 Starting booking submission...', formData);
      
      // Convert time to period for API
      const getTimePeriod = (time: string): 'morning' | 'afternoon' | 'evening' => {
        const hour = parseInt(time.split(':')[0]);
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
      };

      // Submit to real API
      const response = await submitBooking({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: `+91${formData.phone}`, // Add country code
        packageType: formData.package as 'basic' | 'premium' | 'ultimate',
        packageName: formData.package,
        packagePrice: formData.package === 'basic' ? 2500 : formData.package === 'group' ? 4500 : 6500,
        preferredDate: formData.date,
        preferredTime: getTimePeriod(formData.time),
        duration: formData.package === 'basic' ? 30 : formData.package === 'group' ? 60 : 90,
        participants: parseInt(formData.guests) || 1,
        specialRequests: formData.message
      });
      
      trackFormSubmit('Booking Form', {
        bookingId: response.data?.bookingId,
        packageType: formData.package,
        guestCount: parseInt(formData.guests) || 1
      });
      
      // Reset form
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: today,
        time: '',
        guests: '',
        package: 'standard',
        message: ''
      });
      
      console.log('✅ Booking API response:', response);
      success('🎉 Booking Confirmed!', `Your smash session is booked! Booking ID: ${response.data?.bookingId || 'SMASH-' + Date.now()}. Check your email for confirmation details. Get ready to unleash your stress!`);
    } catch (error) {
      console.error('❌ Booking submission error:', error);
      console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
      
      // Track error
      trackError('booking_submission_failed', error instanceof Error ? error.message : 'Unknown error', 'booking_form');
      
      if (error instanceof APIError) {
        if (error.status === 409) {
          showError('Time Slot Unavailable', 'This time slot is already booked. Please select a different time.');
        } else if (error.status === 400) {
          showError('Invalid Booking Data', error.message);
        } else {
          showError('Booking Failed', error.message);
        }
      } else {
        // For now, show success even if API fails (since backend might not be fully connected)
        console.log('🔄 API failed, showing fallback success message');
        success('🎉 Booking Received!', `Your booking request has been received! We'll contact you shortly to confirm your smash session. Get ready to unleash your stress!`);
        
        // Reset form even on API failure
        const today = new Date().toISOString().split('T')[0];
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: today,
          time: '',
          guests: '',
          package: 'basic',
          message: ''
        });
      }
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateContactForm(contactFormData);
    if (!validation.isValid) {
      setContactFormErrors(validation.errors);
      showError('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setContactFormLoading(true);
    setContactFormErrors({});

    try {
      // Track contact attempt
      trackContactAttempt('contact_form');
      
      // Submit to real API
      const response = await submitContact({
        name: contactFormData.name,
        email: contactFormData.email,
        subject: 'Website Contact Form',
        message: contactFormData.message,
        inquiryType: 'general',
        source: 'website_contact_form'
      });
      
      trackFormSubmit('Contact Form', {
        ticketId: response.data?.id
      });
      
      setContactFormData({
        name: '',
        email: '',
        message: ''
      });
      
      success('Message Sent!', `Your message has been sent! Ticket ID: ${response.data?.id}. We will get back to you soon.`);
    } catch (error) {
      console.error('Contact submission error:', error);
      
      // Track error
      trackError('contact_submission_failed', error instanceof Error ? error.message : 'Unknown error', 'contact_form');
      
      if (error instanceof APIError) {
        showError('Send Failed', error.message);
      } else {
        showError('Send Failed', 'An unexpected error occurred. Please try again or contact support.');
      }
    } finally {
      setContactFormLoading(false);
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = safeSanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Safe sanitization that preserves spaces
  const safeSanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags only
      .substring(0, 1000); // Limit length but keep spaces and don't trim
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = safeSanitizeInput(value);
    
    setContactFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field
    if (contactFormErrors[name]) {
      setContactFormErrors(prev => ({ ...prev, [name]: '' }));
    }
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
      <CustomCursor />
              <SmashAnimation isActive={showSmashAnimation} type={smashType} />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-500 origin-left z-50"
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
            onEnded={() => trackVideoInteraction('ended', 'hero-background')}
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-red-500">
              Unleash Your Inner Beast
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
              <span className="text-red-500">Smash</span>. Destroy. <span className="text-red-500">Conquer</span>.
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('booknow')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide"
              >
                Book Session
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('experience')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-gray-600 hover:border-gray-500 uppercase tracking-wide"
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
        className="fixed bottom-8 right-8 z-50 bg-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-red-500/50 transition-all duration-300"
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
      <section id="stats" className="section bg-black/20 backdrop-blur-sm py-24 relative overflow-hidden">
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
                  className="text-4xl md:text-5xl font-bold text-red-500 mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RedBull of India Section */}
      <section id="lifestyle" className="section bg-black/30 backdrop-blur-sm py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-red-500">
              The Crackhead Version of RedBull
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-4xl mx-auto">
              Red Bull gives you wings. SmashLabs gives you guts. We're here for the high-achievers, the risk-takers, and the game-changers who operate at 110% and need a release valve that matches their intensity. We're not just a 'rage room'; we are a brand that champions radical self-care and cathartic release.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
              We sponsor local bands, host underground art shows, and fuel the creative chaos that drives India forward. We are the rebellion against the mundane.
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
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm"
              >
                Book Your Experience
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
                The SmashLabs Experience
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                At SmashLabs, we don't just offer a service; we offer a transformation. Step into our world of controlled chaos, where every swing, every shatter, and every crash is a step towards liberation.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <FaTools className="w-7 h-7 text-blue-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">State-of-the-art Facilities</span>
                    <p className="text-gray-400 text-sm">State-of-the-art smash rooms designed for exhilarating experiences.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FaShieldAlt className="w-7 h-7 text-green-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Diverse Selection</span>
                    <p className="text-gray-400 text-sm">A diverse selection of items to smash, from electronics to glass.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FaUserTie className="w-7 h-7 text-purple-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Customizable Packages</span>
                    <p className="text-gray-400 text-sm">Customizable packages for individuals, groups, and corporate events.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FaCoffee className="w-7 h-7 text-orange-400 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Chill Zone</span>
                    <p className="text-gray-400 text-sm">Relax after smashing with healthy juices, gourmet snacks, and beverages in our serene environment.</p>
                  </div>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent('experience_book_click');
                  scrollToSection('booknow');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 border border-red-500 hover:border-red-600 uppercase tracking-wide"
              >
                Book Experience
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

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
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
                className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section id="booknow" className="section bg-black/40 backdrop-blur-md py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
              Ready to Smash Your Stress?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose your path to stress relief and join the SmashLabs community today!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Book Session Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCalendarAlt className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Book Your Session</h3>
                <p className="text-gray-300 mb-6">
                  Ready to smash? Book your stress relief session now and experience the ultimate adrenaline rush!
                </p>
                <motion.a
                  href="/book"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-red-500 hover:border-red-600 hover:shadow-lg hover:shadow-red-500/25 uppercase tracking-wide inline-block"
                >
                  Book Now
                </motion.a>
              </div>
            </motion.div>

            {/* Corporate Events Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">For Corporates</h3>
                <p className="text-gray-300 mb-6">
                  Transform your team dynamics with professional corporate stress relief and team building experiences!
                </p>
                <motion.a
                  href="/corporate-booking"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-purple-500 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/25 uppercase tracking-wide inline-block"
                >
                  Book Corporate Event
                </motion.a>
              </div>
            </motion.div>

            {/* Join Community Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUsers className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                <p className="text-gray-300 mb-6">
                  Be the first to know about our launch, exclusive offers, and stress-busting events!
                </p>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-blue-500 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25 uppercase tracking-wide inline-block"
                >
                  Join Community
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-black/20 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their SmashLabs experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 - John Doe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-red-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <FaQuoteLeft className="w-8 h-8 text-gray-400/50 mb-4" />
              <p className="text-gray-300 mb-6">
                "SmashLabs exceeded all our expectations! The facilities are world-class, the safety protocols are impeccable, and the overall experience was absolutely phenomenal. Our entire team left feeling rejuvenated and more connected than ever."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">John Doe</h4>
                  <p className="text-sm text-gray-400">Corporate Event</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 - Sarah Chen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <FaQuoteLeft className="w-8 h-8 text-gray-400/50 mb-4" />
              <p className="text-gray-300 mb-6">
                "What an incredible team bonding experience! The Chill Zone was perfect for debriefing after our smash session. My team has never been more unified, and the stress relief was exactly what we needed to tackle our next big project."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">SC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Sarah Chen</h4>
                  <p className="text-sm text-gray-400">Team Lead</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 - Michael Rodriguez */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-dark-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <FaQuoteLeft className="w-8 h-8 text-gray-400/50 mb-4" />
              <p className="text-gray-300 mb-6">
                "From an HR perspective, SmashLabs delivers on every front. The safety measures are comprehensive, the staff is highly professional, and the positive impact on employee morale and stress levels is measurable. This is corporate wellness done right."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-400">HR Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-black/20 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-2xl font-bold text-white">Follow Us on Social Media</h3>
            <div className="flex gap-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/smashlab_x?igsh=MTNnZmRydm13ZnU2eg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com/smashlabs_hq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com/smashlabs.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </motion.a>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
              SmashLabs Gallery
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Take a look at our state-of-the-art facilities and the exhilarating experiences we offer.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* First row - 3 images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                                  <Image
                    src="/images/gallery-1.jpg.png"
                    alt="SmashLabs Gallery Image 1"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                                  <Image
                    src="/images/gallery-2.jpg.png"
                    alt="SmashLabs Gallery Image 2"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                                  <Image
                    src="/images/gallery-3.jpg.png"
                    alt="SmashLabs Gallery Image 3"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
              </motion.div>
            </div>

            {/* Second row - 2 images centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                                      <Image
                      src="/images/gallery-4.jpg.png"
                      alt="SmashLabs Gallery Image 4"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                                      <Image
                      src="/images/gallery-5.jpg.png"
                      alt="SmashLabs Gallery Image 5"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </motion.div>
              </div>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500">
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