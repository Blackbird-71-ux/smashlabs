import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://smashlabs-backend-production.up.railway.app/api';

// Backend-specific response type
export interface BackendResponse<T = any> extends ApiResponse<T> {
  errors?: string[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Booking Types
export interface SmashLabsBooking {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageType: 'basic' | 'premium' | 'ultimate';
  packageName: string;
  packagePrice: number;
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  duration: number;
  participants: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageType: 'basic' | 'premium' | 'ultimate';
  packageName: string;
  packagePrice: number;
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  duration: number;
  participants: number;
  specialRequests?: string;
}

// Contact Types
export interface SmashLabsContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'booking' | 'support' | 'partnership' | 'feedback';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'booking' | 'support' | 'partnership' | 'feedback';
}

// Newsletter Types
export interface SmashLabsNewsletter {
  _id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed' | 'bounced' | 'spam';
  interests: ('packages' | 'events' | 'promotions' | 'tips' | 'news')[];
  frequency: 'daily' | 'weekly' | 'monthly' | 'special';
  subscriptionDate: string;
}

export interface CreateNewsletterRequest {
  email: string;
  name?: string;
  interests?: ('packages' | 'events' | 'promotions' | 'tips' | 'news')[];
  frequency?: 'daily' | 'weekly' | 'monthly' | 'special';
}

// API Error Class
export class SmashLabsApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'SmashLabsApiError';
  }
}

// Base API request function
async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<BackendResponse<T>> {
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
    const data: BackendResponse<T> = await response.json();

    if (!response.ok) {
      throw new SmashLabsApiError(
        response.status,
        data.message || data.error || 'API request failed',
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof SmashLabsApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new SmashLabsApiError(
      500,
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

// Booking API functions
export const bookingApi = {
  // Create new booking
  create: async (data: CreateBookingRequest): Promise<BackendResponse<{ booking: SmashLabsBooking; bookingId: string }>> => {
    return makeApiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get booking by ID
  getById: async (id: string): Promise<BackendResponse<SmashLabsBooking>> => {
    return makeApiRequest(`/bookings/${id}`);
  },

  // Get booking by booking ID (public reference)
  getByBookingId: async (bookingId: string): Promise<BackendResponse<SmashLabsBooking>> => {
    return makeApiRequest(`/bookings/booking-id/${bookingId}`);
  },

  // Get all bookings with pagination
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    packageType?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<BackendResponse<{ bookings: SmashLabsBooking[]; pagination: any }>> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return makeApiRequest(`/bookings${query}`);
  },
};

// Contact API functions
export const contactApi = {
  // Create new contact
  create: async (data: CreateContactRequest): Promise<BackendResponse<{ id: string; status: string; createdAt: string }>> => {
    return makeApiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get contact by ID
  getById: async (id: string): Promise<BackendResponse<SmashLabsContact>> => {
    return makeApiRequest(`/contact/${id}`);
  },

  // Get all contacts with pagination (admin)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    inquiryType?: string;
    priority?: string;
  }): Promise<BackendResponse<{ contacts: SmashLabsContact[]; pagination: any }>> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return makeApiRequest(`/contact${query}`);
  },
};

// Newsletter API functions
export const newsletterApi = {
  // Subscribe to newsletter
  subscribe: async (data: CreateNewsletterRequest): Promise<BackendResponse<SmashLabsNewsletter>> => {
    return makeApiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email: string, reason?: string, feedback?: string): Promise<BackendResponse<any>> => {
    return makeApiRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email, reason, feedback }),
    });
  },

  // Update preferences
  updatePreferences: async (id: string, data: Partial<CreateNewsletterRequest>): Promise<BackendResponse<SmashLabsNewsletter>> => {
    return makeApiRequest(`/newsletter/${id}/preferences`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<BackendResponse<{ status: string; timestamp: string; uptime: number; environment: string }>> => {
    return makeApiRequest('/health', { method: 'GET' });
  },
};

// Utility functions
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

// Main API export
export const smashLabsApi = {
  booking: bookingApi,
  contact: contactApi,
  newsletter: newsletterApi,
  health: healthApi,
};

export default smashLabsApi; 