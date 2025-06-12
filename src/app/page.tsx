'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [stats, setStats] = useState({
    customers: 0,
    satisfaction: 0,
    events: 0
  })

  useEffect(() => {
    const targetStats = {
      customers: 10000,
      satisfaction: 85,
      events: 500
    }

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        customers: Math.floor(targetStats.customers * progress),
        satisfaction: Math.floor(targetStats.satisfaction * progress),
        events: Math.floor(targetStats.events * progress)
      })

      if (currentStep === steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/smashlabs-experience-room.png"
            aria-label="Background video showing SmashLabs experience"
          >
            <source src="/smashlabs-room.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </div>
        
        <div className="container relative z-10 text-center text-white px-4">
          <h1 className="mb-6 animate-fade-in">
            Break Free. Smash Stress.
          </h1>
          <p className="mb-8 max-w-2xl mx-auto animate-slide-up">
            Experience the ultimate stress relief and team building activity at SmashLabs.
            Perfect for corporate events, team outings, and private parties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link 
              href="#contact" 
              className="btn btn-primary"
              aria-label="Book your session at SmashLabs"
            >
              Book Your Session
            </Link>
            <Link 
              href="#about" 
              className="btn btn-outline text-white border-white hover:bg-white/10"
              aria-label="Learn more about SmashLabs"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stats.satisfaction}%
              </div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stats.events}+
              </div>
              <div className="text-gray-600">Corporate Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SmashLabs Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why SmashLabs?</h2>
            <p>Experience the perfect blend of stress relief and team building</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Stress Relief</h3>
              <p className="text-gray-600">Release tension and stress in a safe, controlled environment.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Team Building</h3>
              <p className="text-gray-600">Strengthen team bonds through shared experiences and fun activities.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Unique Experience</h3>
              <p className="text-gray-600">Create unforgettable memories with our innovative rage room concept.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="services" className="section bg-gray-50">
        <div className="container">
          <div className="section-title">
            <h2>The Experience</h2>
            <p>What to expect at SmashLabs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/smashlabs-experience-room.png"
                alt="SmashLabs Experience"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Safety Briefing</h3>
                  <p className="text-gray-600">Get equipped with safety gear and learn the rules of the rage room.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Choose Your Tools</h3>
                  <p className="text-gray-600">Select from our range of safe, specially designed smashing tools.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smash & Release</h3>
                  <p className="text-gray-600">Enter the rage room and let your stress out in a controlled environment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Packages Section */}
      <section id="packages" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Corporate Packages</h2>
            <p>Tailored experiences for your team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Team Building</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 20 participants
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2-hour session
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Team activities
                  </li>
                </ul>
                <Link href="#contact" className="btn btn-primary w-full">
                  Book Now
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Corporate Event</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 50 participants
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    4-hour session
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom activities
                  </li>
                </ul>
                <Link href="#contact" className="btn btn-primary w-full">
                  Book Now
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Private Party</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 30 participants
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    3-hour session
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Party package
                  </li>
                </ul>
                <Link href="#contact" className="btn btn-primary w-full">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section bg-gray-50">
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p>Hear from our satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-gray-600">CEO, Tech Corp</p>
                </div>
              </div>
              <p className="text-gray-600">"An amazing team building experience. Our employees loved it and came back energized!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-gray-600">HR Manager, Design Co</p>
                </div>
              </div>
              <p className="text-gray-600">"The perfect stress relief activity for our team. Highly recommended for corporate events!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  RJ
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-gray-600">Team Lead, Marketing Inc</p>
                </div>
              </div>
              <p className="text-gray-600">"Great facility and amazing staff. Our team had a blast and can't wait to come back!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Ready to Smash Stress?</h2>
            <p>Book your session today and experience the ultimate stress relief and team building activity.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 