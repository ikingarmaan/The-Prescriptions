/**
 * Google Analytics 4 (GA4) Client-Side Tracking Utility for Theprescription
 * 
 * Supports:
 * 1. Automatic script loading via VITE_GA_MEASUREMENT_ID environment variable
 * 2. Virtual SPA Pageview tracking across navigation tabs & hash routes
 * 3. Custom healthcare and user engagement event tracking
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
}

// Fallback or default measurement ID
export const getGaMeasurementId = (): string => {
  const envId = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
  if (envId && !envId.includes('XXXXX')) {
    return envId;
  }
  const windowId = (window.GA_MEASUREMENT_ID || '').trim();
  if (windowId && !windowId.includes('XXXXX')) {
    return windowId;
  }
  return '';
};

let isInitialized = false;

/**
 * Initializes Google Analytics gtag.js script and dataLayer
 */
export const initGA = (customId?: string): boolean => {
  const measurementId = customId || getGaMeasurementId();

  if (!measurementId) {
    // GA Measurement ID not yet provided - no-op until configured
    return false;
  }

  if (isInitialized) {
    return true;
  }

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());

  // Configure GA4 with manual SPA pageview management
  window.gtag('config', measurementId, {
    send_page_view: false, // We dispatch virtual pageviews manually on tab/route changes
  });

  // Inject script tag if not already present
  const existingScript = document.getElementById('ga-gtag-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'ga-gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  isInitialized = true;
  return true;
};

/**
 * Tracks virtual pageviews in Single Page Application (SPA)
 */
export const trackPageView = (path?: string, title?: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  const pagePath = path || (window.location.pathname + (window.location.hash || ''));
  const pageTitle = title || document.title;
  const pageLocation = window.location.href;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: pageLocation,
  });
};

/**
 * Tracks custom events to Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, string | number | boolean | undefined> = {}
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Filter out undefined parameters
  const cleanParams: Record<string, string | number | boolean> = {};
  Object.entries(eventParams).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      cleanParams[key] = val;
    }
  });

  window.gtag('event', eventName, cleanParams);
};

// ============================================================================
// Specialized Event Tracking Helpers for Theprescription
// ============================================================================

/**
 * Track when a user analyzes a prescription
 */
export const trackPrescriptionAnalysis = (params: {
  method: 'photo' | 'text';
  medicinesCount?: number;
  hasPatientContext?: boolean;
}): void => {
  trackEvent('prescription_analyzed', {
    analysis_method: params.method,
    medicines_detected: params.medicinesCount || 0,
    has_patient_context: Boolean(params.hasPatientContext),
  });
};

/**
 * Track when a user selects an instant demo sample prescription
 */
export const trackSamplePrescriptionSelected = (sampleTitle: string): void => {
  trackEvent('sample_prescription_selected', {
    sample_title: sampleTitle,
  });
};

/**
 * Track medicine directory lookup searches
 */
export const trackMedicineSearch = (query: string, resultsCount?: number): void => {
  trackEvent('medicine_search', {
    search_term: query,
    results_found: resultsCount ?? 0,
  });
};

/**
 * Track reading a clinical blog article
 */
export const trackBlogArticleView = (articleSlug: string, articleTitle: string): void => {
  trackEvent('blog_article_view', {
    article_slug: articleSlug,
    article_title: articleTitle,
  });
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmission = (subject: string): void => {
  trackEvent('contact_form_submitted', {
    subject,
  });
};

/**
 * Track camera viewfinder opened
 */
export const trackCameraOpened = (): void => {
  trackEvent('camera_scanner_opened');
};

/**
 * Track medication schedule print card opened
 */
export const trackPrintCardOpened = (): void => {
  trackEvent('print_card_opened');
};
