export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  package: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports Indian mobile numbers)
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian mobile: starts with 6-9, exactly 10 digits

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

// Validate phone format
export const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  console.log('📱 Validating phone:', phone, '→', cleanPhone, 'Valid:', PHONE_REGEX.test(cleanPhone));
  return PHONE_REGEX.test(cleanPhone);
};

// Validate booking form
export const validateBookingForm = (data: BookingFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Please select a future date';
    }
  }

  // Time validation
  if (!data.time) {
    errors.time = 'Time is required';
  }

  // Guests validation
  if (!data.guests.trim()) {
    errors.guests = 'Number of guests is required';
  } else {
    const guestCount = parseInt(data.guests);
    if (isNaN(guestCount) || guestCount < 1) {
      errors.guests = 'Please enter at least 1 guest';
    } else if (guestCount > 50) {
      errors.guests = 'Maximum 50 guests allowed';
    }
  }

  // Package validation
  if (!data.package) {
    errors.package = 'Please select a package';
  }

  // Message validation (optional but with length limit)
  if (data.message && data.message.length > 500) {
    errors.message = 'Message must be less than 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate contact form
export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 