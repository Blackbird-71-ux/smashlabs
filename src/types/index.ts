// Form Types
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  package: 'basic' | 'group' | 'corporate';
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingResponse {
  id: string;
  confirmationNumber: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Component Props Types
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// Toast Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Analytics Types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

// Package Types
export interface Package {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  review: string;
  rating: number;
  image?: string;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src?: string;
  url?: string; // Support both src and url for compatibility
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  caption?: string;
}

// Error Types
export interface FormErrors {
  [key: string]: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// SEO Types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
} 