import { BookingFormData, ContactFormData, ApiResponse, BookingResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic API request function with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Booking API functions
export const bookingApi = {
  // Submit booking form
  async submitBooking(formData: BookingFormData): Promise<ApiResponse<BookingResponse>> {
    return apiRequest<BookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  // Check availability for a specific date/time
  async checkAvailability(date: string, time: string): Promise<ApiResponse<{ available: boolean }>> {
    return apiRequest<{ available: boolean }>(`/bookings/availability?date=${date}&time=${time}`);
  },

  // Get booking by confirmation number
  async getBooking(confirmationNumber: string): Promise<ApiResponse<BookingResponse>> {
    return apiRequest<BookingResponse>(`/bookings/${confirmationNumber}`);
  },

  // Cancel booking
  async cancelBooking(confirmationNumber: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiRequest<{ success: boolean }>(`/bookings/${confirmationNumber}`, {
      method: 'DELETE',
    });
  },
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  async submitContact(formData: ContactFormData): Promise<ApiResponse<{ messageId: string }>> {
    return apiRequest<{ messageId: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};

// Package API functions
export const packageApi = {
  // Get all packages
  async getPackages(): Promise<ApiResponse<any[]>> {
    return apiRequest<any[]>('/packages');
  },

  // Get package by ID
  async getPackage(id: string): Promise<ApiResponse<any>> {
    return apiRequest<any>(`/packages/${id}`);
  },
};

// Analytics API functions
export const analyticsApi = {
  // Track event
  async trackEvent(eventName: string, properties?: Record<string, any>): Promise<ApiResponse<void>> {
    return apiRequest<void>('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      }),
    });
  },
};

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