/**
 * Hook for Location Management with Graceful Degradation
 *
 * Usage:
 * const { location, manualLocation, setManualLocation, isLoading, isDegraded, statusMessage } = useLocation();
 */

import { useCallback, useEffect, useState } from 'react';
import { LocationData, locationService, LocationSourceType } from '../services/locationService';
import { useDegradationStore } from '../store/degradationStore';
import { appLogger } from '../utils/logger';

interface UseLocationReturn {
  /** Current location (from GPS, cache, or manual entry) */
  location: LocationData | null;
  /** Manually entered location string */
  manualLocation: string;
  /** Set manual location string */
  setManualLocation: (address: string) => void;
  /** Whether location fetch is in progress */
  isLoading: boolean;
  /** Whether location feature is degraded (no GPS) */
  isDegraded: boolean;
  /** Human-friendly status message */
  statusMessage: string;
  /** Request location permission */
  requestPermission: () => Promise<boolean>;
  /** Refresh current location */
  refreshLocation: () => Promise<void>;
  /** Clear cached location */
  clearCachedLocation: () => void;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [manualLocation, setManualLocationState] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDegraded, setIsDegraded] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const degradationStore = useDegradationStore();

  /**
   * Request location permission
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    const granted = await locationService.requestPermission();
    if (granted) {
      setIsDegraded(false);
      setStatusMessage('Location permission granted');
    } else {
      setIsDegraded(true);
      setStatusMessage('Location permission denied - manual entry available');
    }
    return granted;
  }, []);

  /**
   * Refresh current location with fallback chain
   */
  const refreshLocation = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      appLogger.infoSync('[useLocation] Refreshing location');
      const locationData = await locationService.getLocationWithFallback(manualLocation);

      if (locationData) {
        setLocation(locationData);
        setStatusMessage(locationService.getStatusMessage(locationData));

        // Update manual location if one was obtained
        if (locationData.source === LocationSourceType.MANUAL && locationData.address) {
          setManualLocationState(locationData.address);
        }

        setIsDegraded(locationData.source !== LocationSourceType.GPS);
      } else {
        setLocation(null);
        setIsDegraded(true);
        setStatusMessage('Please enter your location manually');
      }
    } catch (error) {
      appLogger.errorSync('[useLocation] Error refreshing location', error instanceof Error ? error : new Error(String(error)));
      setIsDegraded(true);
      setStatusMessage('Location refresh failed - please enter manually');
    } finally {
      setIsLoading(false);
    }
  }, [manualLocation]);

  /**
   * Set manual location
   */
  const handleSetManualLocation = useCallback((address: string): void => {
    if (address.trim()) {
      const locationData = locationService.setManualLocation(address);
      setLocation(locationData);
      setManualLocationState(address);
      setStatusMessage(`Location saved: ${address}`);
      setIsDegraded(true); // Manual entry is degraded mode
      appLogger.infoSync('[useLocation] Manual location set', { address });
    }
  }, []);

  /**
   * Clear cached location
   */
  const clearCachedLocation = useCallback((): void => {
    locationService.clearCachedLocation();
    setLocation(null);
    setManualLocationState('');
    setStatusMessage('Location cleared');
    appLogger.infoSync('[useLocation] Location cleared');
  }, []);

  /**
   * Check permission and attempt to get location on mount
   */
  useEffect(() => {
    const initLocation = async () => {
      const hasPermission = await locationService.checkPermission();
      if (hasPermission) {
        await refreshLocation();
      } else {
        setIsDegraded(true);
        setStatusMessage('Location permission required - manual entry available');
      }
    };

    initLocation();
  }, []);

  return {
    location,
    manualLocation,
    setManualLocation: handleSetManualLocation,
    isLoading,
    isDegraded,
    statusMessage,
    requestPermission,
    refreshLocation,
    clearCachedLocation,
  };
};
