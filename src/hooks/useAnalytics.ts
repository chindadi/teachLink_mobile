import { useCallback } from 'react';
import { useAnalyticsContext } from '../components/mobile/AnalyticsProvider';
import { AnalyticsEvent, EventProperties, PerformanceMetric } from '../utils/trackingEvents';

/**
 * Custom hook to access analytics tracking capabilities from functional components.
 * 
 * @example
 * const { trackEvent, trackScreen } = useAnalytics();
 * trackEvent(AnalyticsEvent.UI_CLICK, { button: 'search' });
 */
export const useAnalytics = () => {
  const { service } = useAnalyticsContext();

  /**
   * Record a custom user interaction or system event.
   */
  const trackEvent = useCallback(
    (event: AnalyticsEvent, properties?: EventProperties) => {
      service.trackEvent(event, properties);
    },
    [service]
  );

  /**
   * Record a navigation transition.
   */
  const trackScreen = useCallback(
    (screenName: string, properties?: EventProperties) => {
      service.trackScreen(screenName, properties);
    },
    [service]
  );

  /**
   * Record a performance metric (e.g., component render time or API response).
   */
  const trackTiming = useCallback(
    (metric: PerformanceMetric | string, value: number, properties?: EventProperties) => {
      service.trackPerformance(metric, value, properties);
    },
    [service]
  );

  /**
   * Identify the user for future events.
   */
  const identify = useCallback(
    (userId: string, properties?: EventProperties) => {
      service.identifyUser(userId, properties);
    },
    [service]
  );

  return {
    trackEvent,
    trackScreen,
    trackTiming,
    identify,
    service, // Direct access if needed
  };
};

export default useAnalytics;
