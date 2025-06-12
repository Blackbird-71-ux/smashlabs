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

export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

export const trackButtonClick = (buttonName: string, properties?: EventProperties) => {
  trackEvent('button_click', {
    button_name: buttonName,
    ...properties,
  });
};

export const trackFormSubmit = (formName: string, properties?: EventProperties) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...properties,
  });
};

export const trackScroll = (depth: number) => {
  trackEvent('scroll', {
    scroll_depth: depth,
  });
};

export const trackVideoInteraction = (
  action: 'play' | 'pause' | 'complete',
  videoName: string,
  properties?: EventProperties
) => {
  const eventName = `video_${action}` as EventName;
  trackEvent(eventName, {
    video_name: videoName,
    ...properties,
  });
}; 