type EventName = 
  | 'page_view'
  | 'button_click'
  | 'form_submit'
  | 'scroll_depth'
  | 'time_on_page'

interface EventProperties {
  [key: string]: any
}

export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
  // Replace with your analytics provider (e.g., Google Analytics, Mixpanel, etc.)
  if (typeof window !== 'undefined') {
    console.log('Analytics Event:', eventName, properties)
    // Example: window.gtag('event', eventName, properties)
  }
}

export const trackPageView = (url: string) => {
  trackEvent('page_view', { url })
}

export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', { buttonName })
}

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', { formName, success })
}

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', { depth })
}

export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', { seconds })
} 