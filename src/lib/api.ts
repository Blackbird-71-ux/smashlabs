import { BookingFormData, ContactFormData, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// API error types
export class APIError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        response.status,
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    throw new APIError(
      0,
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

// Booking submission
export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  package: string;
  message?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId: string;
  message: string;
  estimatedPrice?: number;
}

export async function submitBooking(data: BookingSubmission): Promise<BookingResponse> {
  return apiRequest<BookingResponse>('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Contact form submission
export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  source?: string;
}

export interface ContactResponse {
  success: boolean;
  ticketId: string;
  message: string;
}

export async function submitContact(data: ContactSubmission): Promise<ContactResponse> {
  return apiRequest<ContactResponse>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Newsletter subscription
export interface NewsletterSubmission {
  email: string;
  source?: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

export async function subscribeNewsletter(data: NewsletterSubmission): Promise<NewsletterResponse> {
  return apiRequest<NewsletterResponse>('/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Package pricing retrieval
export interface PackageInfo {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  maxGuests: number;
  popular?: boolean;
}

export async function getPackages(): Promise<PackageInfo[]> {
  return apiRequest<PackageInfo[]>('/packages');
}

// Availability check
export interface AvailabilityCheck {
  date: string;
  time: string;
  guests: number;
  duration: number;
}

export interface AvailabilityResponse {
  available: boolean;
  alternatives?: {
    date: string;
    time: string;
  }[];
  message?: string;
}

export async function checkAvailability(data: AvailabilityCheck): Promise<AvailabilityResponse> {
  return apiRequest<AvailabilityResponse>('/availability', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Testimonials retrieval
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar?: string;
  date: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiRequest<Testimonial[]>('/testimonials');
}

// Gallery images retrieval
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'smash-room' | 'team-event' | 'corporate' | 'before-after';
  caption?: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return apiRequest<GalleryImage[]>('/gallery');
}

// Health check for API
export async function healthCheck(): Promise<{ status: 'ok' | 'error'; timestamp: number }> {
  return apiRequest<{ status: 'ok' | 'error'; timestamp: number }>('/health');
}

// Rate limiting helper
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

export const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_MAX || '5'),
  parseInt(process.env.RATE_LIMIT_WINDOW || '60000')
);

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/[<>]/g, ''); // Remove < and > characters
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
} 