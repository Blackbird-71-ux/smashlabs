'use client';

import Image from 'next/image'
import Link from 'next/link'
import { FaHammer, FaGlassMartiniAlt, FaTshirt, FaShieldAlt, FaArrowRight, FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { trackButtonClick, trackFormSubmit, trackVideoInteraction } from '@/lib/analytics'
import { GridSkeleton, TextSkeleton } from '@/components/Skeleton'

export default function Home() {
  const [stats, setStats] = useState({
    customers: 0,
    satisfaction: 0,
    events: 0
  });

  const [statsLoading, setStatsLoading] = useState(true);
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

  useEffect(() => {
    // Simulate fetching stats data
    setStatsLoading(true);
    const timer = setTimeout(() => {
      const targetStats = {
        customers: 10000,
        satisfaction: 95,
        events: 500
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          customers: Math.floor(targetStats.customers * progress),
          satisfaction: Math.floor(targetStats.satisfaction * progress),
          events: Math.floor(targetStats.events * progress)
        });

        if (currentStep === steps) {
          clearInterval(interval);
          setStatsLoading(false);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/smashlabs-experience-room.png"
            aria-label="Background video showing SmashLabs experience"
            preload="auto"
            onPlay={() => trackVideoInteraction('play', 'SmashLabs Room Video')}
            onPause={() => trackVideoInteraction('pause', 'SmashLabs Room Video')}
            onEnded={() => trackVideoInteraction('complete', 'SmashLabs Room Video')}
          >
            <source src="/smashlabs-room.mp4" type="video/mp4" />
            <Image
              src="/smashlabs-experience-room.png"
              alt="SmashLabs Experience Room"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 to-dark-950/60" />
          <div className="absolute inset-0 bg-noise-pattern opacity-10" />
        </div>
        <div className="relative z-10 text-center px-4 py-16">
          <h1 className="text-white mb-6 animate-fade-in animate-delay-100">
            Unleash Your Inner Beast.
            <span className="block text-primary-500 text-gradient">Smash. Destroy. Conquer.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up animate-delay-200">
            Dive into the ultimate stress-relief experience. Break free from your worries and unleash your rage in a safe, exhilarating environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in animate-delay-300">
            <Link href="#booking" className="btn btn-primary group"
              onClick={() => trackButtonClick('Book Your Session - Hero')}>
              Book Your Session <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#packages" className="btn btn-outline group"
              onClick={() => trackButtonClick('View Packages - Hero')}>
              View Packages <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="section bg-gradient-to-b from-dark-950 to-dark-900 border-b border-dark-800">
        <div className="container">
          {statsLoading ? (
            <GridSkeleton count={4} className="animate-fade-in" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in animate-delay-400">
              <div className="card text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-primary-500 mb-2"><span className="text-gradient">{stats.customers.toLocaleString()}+</span></div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div className="card text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-primary-500 mb-2"><span className="text-gradient">{stats.satisfaction}%</span></div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </div>
              <div className="card text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-primary-500 mb-2"><span className="text-gradient">{stats.events}+</span></div>
                <div className="text-gray-400">Events Hosted</div>
              </div>
              <div className="card text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-primary-500 mb-2"><span className="text-gradient">24/7</span></div>
                <div className="text-gray-400">Adrenaline Rush</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-dark-900 border-b border-dark-800">
        <div className="container">
          <div className="section-title animate-slide-up">
            <h2 className="text-white mb-4">Why Choose <span className="text-gradient">SmashLabs?</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The ultimate destination for stress relief, team building, and unforgettable experiences.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="card group animate-scale-in animate-delay-100">
              <div className="icon-feature"><FaHammer /></div>
              <h3 className="text-white mb-2">Premium Arsenal</h3>
              <p className="text-gray-400">Equip yourself with an array of heavy-duty tools designed for maximum destruction.</p>
            </div>
            <div className="card group animate-scale-in animate-delay-200">
              <div className="icon-feature"><FaGlassMartiniAlt /></div>
              <h3 className="text-white mb-2">Controlled Chaos</h3>
              <p className="text-gray-400">Our state-of-the-art rooms are built for safety, ensuring an exhilarating yet secure smashing experience.</p>
            </div>
            <div className="card group animate-scale-in animate-delay-300">
              <div className="icon-feature"><FaTshirt /></div>
              <h3 className="text-white mb-2">Full Protective Gear</h3>
              <p className="text-gray-400">We provide all necessary safety equipment, so you can focus on the smash.</p>
            </div>
            <div className="card group animate-scale-in animate-delay-400">
              <div className="icon-feature"><FaShieldAlt /></div>
              <h3 className="text-white mb-2">Expert Guidance</h3>
              <p className="text-gray-400">Our trained staff ensures your experience is safe, fun, and truly cathartic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section bg-gradient-to-b from-dark-900 to-dark-950 border-b border-dark-800">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-white mb-6">The <span className="text-gradient">SmashLabs</span> Experience</h2>
              <p className="text-gray-300 mb-6">
                At SmashLabs, we don't just offer a service; we offer a transformation. Step into our world of controlled chaos, where every swing, every shatter, and every crash is a step towards liberation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <FaArrowRight className="text-primary-500 mr-3" />
                  State-of-the-art smash rooms designed for exhilarating experiences.
                </li>
                <li className="flex items-center text-gray-300">
                  <FaArrowRight className="text-primary-500 mr-3" />
                  A diverse selection of items to smash, from electronics to glass.
                </li>
                <li className="flex items-center text-gray-300">
                  <FaArrowRight className="text-primary-500 mr-3" />
                  Customizable packages for individuals, groups, and corporate events.
                </li>
                <li className="flex items-center text-gray-300">
                  <FaArrowRight className="text-primary-500 mr-3" />
                  Unmatched stress relief and a powerful sense of accomplishment.
                </li>
              </ul>
            </div>
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-custom animate-scale-in">
              <Image
                src="/smashlabs-experience-room.png"
                alt="SmashLabs Experience"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Packages */}
      <section id="packages" className="section bg-dark-950 border-b border-dark-800">
        <div className="container">
          <div className="section-title animate-slide-up">
            <h2 className="text-white mb-4">Unleash Team Power with <span className="text-gradient">Corporate Smash</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Boost morale, reduce stress, and strengthen bonds with our unique team-building packages.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="card animate-scale-in animate-delay-100 group transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-white mb-4 text-gradient">Team Cohesion</h3>
              <p className="text-gray-400 mb-6">
                Foster stronger teamwork and communication through a shared exhilarating experience.
              </p>
              <Link href="#booking" className="btn btn-primary w-full group"
                onClick={() => trackButtonClick('Book Now - Team Cohesion')}>
                Book Now <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="card animate-scale-in animate-delay-200 group transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-white mb-4 text-gradient">Stress Buster</h3>
              <p className="text-gray-400 mb-6">
                A unique way to de-stress and re-energize your team, leaving them refreshed and focused.
              </p>
              <Link href="#booking" className="btn btn-primary w-full group"
                onClick={() => trackButtonClick('Book Now - Stress Buster')}>
                Book Now <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="card animate-scale-in animate-delay-300 group transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-white mb-4 text-gradient">Unforgettable Fun</h3>
              <p className="text-gray-400 mb-6">
                Create lasting memories and stories with an activity unlike any other corporate outing.
              </p>
              <Link href="#booking" className="btn btn-primary w-full group"
                onClick={() => trackButtonClick('Book Now - Unforgettable Fun')}>
                Book Now <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section bg-dark-900 border-b border-dark-800">
        <div className="container">
          <div className="section-title animate-slide-up">
            <h2 className="text-white mb-4">Hear From Our <span className="text-gradient">Happy Smashers</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Don't just take our word for it. Our customers love the SmashLabs experience!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="card animate-scale-in animate-delay-100 transform hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                "SmashLabs was an incredible experience! So much fun and truly cathartic. I left feeling completely refreshed and stress-free. Highly recommend for anyone needing to let loose!"
              </p>
              <p className="font-semibold text-primary-400">- Jane Doe</p>
              <p className="text-gray-500 text-sm">Individual Smashing Session</p>
            </div>
            <div className="card animate-scale-in animate-delay-200 transform hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                "We brought our team here for a corporate event, and it was a huge hit! Everyone had a blast, and it was a fantastic way to bond and blow off some steam. We'll definitely be back."
              </p>
              <p className="font-semibold text-primary-400">- John Smith</p>
              <p className="text-gray-500 text-sm">Corporate Team Building</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="section bg-gradient-to-b from-dark-950 to-dark-900 border-b border-dark-800">
        <div className="container">
          <div className="section-title animate-slide-up">
            <h2 className="text-white mb-4">Book Your <span className="text-gradient">Smash Session</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Reserve your spot for an unforgettable experience. Choose your package, date, and time.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Booking Form */}
            <div className="card animate-scale-in">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleBookingChange}
                    required
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleBookingChange}
                    required
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your@example.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleBookingChange}
                    required
                    className={`input ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="e.g., +1234567890"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="label">Preferred Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleBookingChange}
                      required
                      className={`input ${errors.date ? 'border-red-500' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                      aria-required="true"
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                    />
                    {errors.date && <p id="date-error" className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="time" className="label">Preferred Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleBookingChange}
                      required
                      className={`input ${errors.time ? 'border-red-500' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.time}
                      aria-describedby={errors.time ? 'time-error' : undefined}
                    />
                    {errors.time && <p id="time-error" className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="label">Number of Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleBookingChange}
                    required
                    className={`input ${errors.guests ? 'border-red-500' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.guests}
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  {errors.guests && <p id="guests-error" className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                </div>

                <div>
                  <label htmlFor="package" className="label">Select Package</label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleBookingChange}
                    required
                    className={`input ${errors.package ? 'border-red-500' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.package}
                    aria-describedby={errors.package ? 'package-error' : undefined}
                  >
                    <option value="standard">Standard Smash (1 Room, 30 Mins)</option>
                    <option value="premium">Premium Smash (2 Rooms, 60 Mins)</option>
                    <option value="ultimate">Ultimate Smash (3 Rooms, 90 Mins)</option>
                    <option value="corporate">Corporate Event (Custom)</option>
                  </select>
                  {errors.package && <p id="package-error" className="text-red-500 text-sm mt-1">{errors.package}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="label">Additional Notes (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleBookingChange}
                    className="input"
                    placeholder="Any specific requests or details?"
                    aria-label="Additional Notes"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full group">
                  Submit Booking <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            {/* Booking Info Cards */}
            <div className="space-y-8">
              <div className="card animate-scale-in animate-delay-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center text-primary-500 mb-3">
                  <FaCalendarAlt size={24} className="mr-3" />
                  <h3 className="text-white text-xl font-semibold">Availability</h3>
                </div>
                <p className="text-gray-400 mb-4">Our smash rooms are available 7 days a week, from 10 AM to 10 PM. Please select your preferred date and time on the form.</p>
                <Link href="#contact" className="text-primary-400 hover:underline"
                  onClick={() => trackButtonClick('Contact us for special requests - Booking Info')}>
                  Contact us for special requests &gt;
                </Link>
              </div>

              <div className="card animate-scale-in animate-delay-200 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center text-primary-500 mb-3">
                  <FaUsers size={24} className="mr-3" />
                  <h3 className="text-white text-xl font-semibold">Group Bookings</h3>
                </div>
                <p className="text-gray-400 mb-4">Planning a group event? We offer custom packages for birthdays, team-building, and corporate outings. Get ready for an epic group smash!</p>
                <Link href="#packages" className="text-primary-400 hover:underline"
                  onClick={() => trackButtonClick('View Corporate Packages - Booking Info')}>
                  View Corporate Packages &gt;
                </Link>
              </div>

              <div className="card animate-scale-in animate-delay-300 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center text-primary-500 mb-3">
                  <FaClock size={24} className="mr-3" />
                  <h3 className="text-white text-xl font-semibold">Session Duration</h3>
                </div>
                <p className="text-gray-400 mb-4">Standard sessions are 30 minutes, with options to extend up to 90 minutes for ultimate destruction. Arrive 15 minutes early for safety briefing.</p>
                <Link href="#packages" className="text-primary-400 hover:underline"
                  onClick={() => trackButtonClick('Explore Packages - Booking Info')}>
                  Explore Packages &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-dark-900">
        <div className="container">
          <div className="section-title animate-slide-up">
            <h2 className="text-white mb-4">Get in <span className="text-gradient">Touch</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Have questions or need assistance? Reach out to us!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="card animate-scale-in animate-delay-100">
              <h3 className="text-white mb-4 text-gradient">Contact Information</h3>
              <p className="text-gray-300 mb-2"><strong className="text-primary-400">Address:</strong> 123 Smash Street, Rage City, SM 98765</p>
              <p className="text-gray-300 mb-2"><strong className="text-primary-400">Phone:</strong> +1 (555) 123-4567</p>
              <p className="text-gray-300 mb-4"><strong className="text-primary-400">Email:</strong> info@smashlabs.com</p>
              
              <h3 className="text-white mb-4 text-gradient">Follow Us</h3>
              <div className="flex space-x-4 text-2xl">
                <a href="https://www.facebook.com/SmashLabsOfficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/smashlabs_official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://twitter.com/smashlabs_hq" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/user/smashlabs-official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="https://www.linkedin.com/company/smashlabs-inc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            
            <div className="card animate-scale-in animate-delay-200">
              <h3 className="text-white mb-4 text-gradient">Send Us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="label">Your Name</label>
                  {contactFormLoading ? (
                    <TextSkeleton />
                  ) : (
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      required
                      className={`input ${contactFormErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Your Name"
                      aria-required="true"
                      aria-invalid={!!contactFormErrors.name}
                      aria-describedby={contactFormErrors.name ? 'contact-name-error' : undefined}
                    />
                  )}
                  {contactFormErrors.name && <p id="contact-name-error" className="text-red-500 text-sm mt-1">{contactFormErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="label">Your Email</label>
                  {contactFormLoading ? (
                    <TextSkeleton />
                  ) : (
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      required
                      className={`input ${contactFormErrors.email ? 'border-red-500' : ''}`}
                      placeholder="your@example.com"
                      aria-required="true"
                      aria-invalid={!!contactFormErrors.email}
                      aria-describedby={contactFormErrors.email ? 'contact-email-error' : undefined}
                    />
                  )}
                  {contactFormErrors.email && <p id="contact-email-error" className="text-red-500 text-sm mt-1">{contactFormErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="label">Message</label>
                  {contactFormLoading ? (
                    <TextSkeleton className="h-20" />
                  ) : (
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={contactFormData.message}
                      onChange={handleContactChange}
                      required
                      className={`input ${contactFormErrors.message ? 'border-red-500' : ''}`}
                      placeholder="Your message"
                      aria-required="true"
                      aria-invalid={!!contactFormErrors.message}
                      aria-describedby={contactFormErrors.message ? 'contact-message-error' : undefined}
                    ></textarea>
                  )}
                  {contactFormErrors.message && <p id="contact-message-error" className="text-red-500 text-sm mt-1">{contactFormErrors.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary w-full group" disabled={contactFormLoading}>
                  {contactFormLoading ? 'Sending...' : 'Send Message'} <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
} 