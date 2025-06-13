type EventName = 
  | 'page_view'
  | 'button_click'
  | 'form_submit'
  | 'scroll'
  | 'video_play'
  | 'video_pause'
  | 'video_complete';

interface EventProperties {
  [key: string]: any;
}

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
}

interface FormSubmissionData {
  formType: string;
  fields: Record<string, any>;
  timestamp: number;
  sessionId: string;
}

// Generate a session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server_session';
  
  let sessionId = sessionStorage.getItem('smashlabs_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('smashlabs_session_id', sessionId);
  }
  return sessionId;
};

// Google Analytics tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Enhanced event tracking with real analytics
export const trackEvent = (
  eventName: string,
  parameters: {
    action?: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  } = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label,
      value: parameters.value,
      ...parameters,
    });
  }
  
  // Fallback for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, parameters);
  }
};

// Specific tracking functions
export const trackButtonClick = (
  buttonName: string,
  location: string,
  additionalData?: Record<string, any>
) => {
  trackEvent('button_click', {
    action: 'click',
    category: 'user_interaction',
    label: buttonName,
    button_location: location,
    ...additionalData,
  });
};

export const trackFormSubmit = (
  formName: string,
  formData?: Record<string, any>
) => {
  trackEvent('form_submit', {
    action: 'submit',
    category: 'conversion',
    label: formName,
    form_name: formName,
    // Don't track PII, just form completion
    fields_completed: formData ? Object.keys(formData).length : 0,
  });
};

export const trackVideoInteraction = (
  action: 'play' | 'pause' | 'ended' | 'progress',
  videoName: string,
  progress?: number
) => {
  trackEvent('video_interaction', {
    action,
    category: 'media',
    label: videoName,
    video_name: videoName,
    progress_percent: progress,
  });
};

export const trackPageView = (pageName: string, customData?: Record<string, any>) => {
  trackEvent('page_view', {
    action: 'view',
    category: 'navigation',
    label: pageName,
    page_name: pageName,
    ...customData,
  });
};

export const trackBookingAttempt = (packageType: string, guestCount: number) => {
  trackEvent('booking_attempt', {
    action: 'attempt',
    category: 'conversion',
    label: packageType,
    package_type: packageType,
    guest_count: guestCount,
    value: guestCount, // Can be used for conversion value
  });
};

export const trackContactAttempt = (source: string) => {
  trackEvent('contact_attempt', {
    action: 'attempt',
    category: 'lead_generation',
    label: source,
    contact_source: source,
  });
};

export const trackSmashInteraction = (smashType: 'glass' | 'wood' | 'metal') => {
  trackEvent('smash_interaction', {
    action: 'smash',
    category: 'engagement',
    label: smashType,
    smash_type: smashType,
  });
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string, location: string) => {
  trackEvent('error_occurred', {
    action: 'error',
    category: 'technical',
    label: errorType,
    error_type: errorType,
    error_message: errorMessage.substring(0, 100), // Limit length
    error_location: location,
  });
};

// Performance tracking
export const trackPerformance = (metricName: string, value: number, unit: string = 'ms') => {
  trackEvent('performance_metric', {
    action: 'measure',
    category: 'performance',
    label: metricName,
    metric_name: metricName,
    value: Math.round(value),
    unit,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number): void => {
  trackEvent('scroll_depth', {
    depth_percentage: Math.round(depth * 100),
  });
};

// Track time spent on page
export const trackTimeOnPage = (timeInSeconds: number): void => {
  trackEvent('time_on_page', {
    time_seconds: timeInSeconds,
  });
};

// Initialize analytics
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Track initial page view
  trackPageView(window.location.pathname);

  // Track scroll depth
  let maxScrollDepth = 0;
  const handleScroll = () => {
    const scrollDepth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      if (maxScrollDepth >= 0.25 && maxScrollDepth < 0.5) {
        trackScrollDepth(0.25);
      } else if (maxScrollDepth >= 0.5 && maxScrollDepth < 0.75) {
        trackScrollDepth(0.5);
      } else if (maxScrollDepth >= 0.75 && maxScrollDepth < 1) {
        trackScrollDepth(0.75);
      } else if (maxScrollDepth >= 1) {
        trackScrollDepth(1);
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Track time on page
  const startTime = Date.now();
  const trackTimeInterval = setInterval(() => {
    const timeOnPage = (Date.now() - startTime) / 1000;
    trackTimeOnPage(timeOnPage);
  }, 30000); // Track every 30 seconds

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(trackTimeInterval);
    window.removeEventListener('scroll', handleScroll);
    
    const finalTimeOnPage = (Date.now() - startTime) / 1000;
    trackTimeOnPage(finalTimeOnPage);
  });

  // Track errors
  window.addEventListener('error', (event) => {
    trackError('global_error_handler', event.message, 'global_error_handler');
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackError('unhandled_promise_rejection', event.reason.message, 'unhandled_promise_rejection');
  });
};

export const trackScroll = (depth: number) => {
  trackEvent('scroll', {
    scroll_depth: depth,
  });
};

 