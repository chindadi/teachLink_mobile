import logger from '../utils/logger';
import { mobileAnalyticsService } from './mobileAnalytics';
import { AnalyticsEvent } from '../utils/trackingEvents';

/**
 * CrashReportingService manages global error tracking and exception handling.
 * It integrates with the analytics service to record crash events.
 */
class CrashReportingService {
  private isInitialized: boolean = false;

  /**
   * Initializes global error handlers for JS and native (via bridge).
   */
  public init(): void {
    if (this.isInitialized) return;

    try {
      // 1. Capture React Native JS globally (Errors that happen in JS thread)
      // Set global handler for JS errors
      // @ts-ignore - ErrorUtils is a global in React Native environment
      if (global.ErrorUtils) {
        // @ts-ignore
        const originalHandler = global.ErrorUtils.getGlobalHandler();
        
        // @ts-ignore
        global.ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
          this.captureCrash(error, isFatal);
          
          // Re-throw if a handler was registered or if we want standard behavior
          if (originalHandler) {
            originalHandler(error, isFatal);
          }
        });
      }

      // 2. Mock native crash reporting (Real apps use Sentry, Bugsnag, or Firebase Crashlytics)
      // crashlytics().setCrashlyticsCollectionEnabled(true);
      
      this.isInitialized = true;
      logger.info('CrashReporting: Initialized global error handlers');
    } catch (error) {
      logger.error('CrashReporting: Failed to initialize handlers', error);
    }
  }

  /**
   * Capture a fatal or non-fatal crash.
   */
  private captureCrash(error: Error, isFatal?: boolean): void {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      isFatal: !!isFatal,
      timestamp: new Date().toISOString(),
    };

    // Log for development
    logger.error(`❌ [Crash] ${isFatal ? 'FATAL' : 'Non-Fatal'} Crash: ${error.message}`, errorDetails);

    // Record as analytics event
    mobileAnalyticsService.trackEvent(AnalyticsEvent.CRASH_REPORT, errorDetails);

    // In a real implementation:
    // crashlytics().recordError(error);
  }

  /**
   * Manually report an error that was caught (e.g., in a try-catch block).
   */
  public reportError(error: Error | any, context?: string, extraData?: any): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    const payload = {
      context,
      message: errorMessage,
      stack: errorStack,
      ...extraData,
    };

    logger.error(`⚠️ [ErrorReport] ${context ? `[${context}] ` : ''}${errorMessage}`, payload);

    mobileAnalyticsService.trackEvent(AnalyticsEvent.API_ERROR, payload);
    
    // In a real implementation:
    // crashlytics().recordError(error);
  }

  /**
   * Tag the current crash report with user ID to help debugging specific user issues.
   */
  public setUser(userId: string): void {
    logger.debug(`CrashReporting: Bound to user ${userId}`);
    // crashlytics().setUserId(userId);
  }
}

export const crashReportingService = new CrashReportingService();
export default crashReportingService;
