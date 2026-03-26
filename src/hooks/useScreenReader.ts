import { useState, useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Hook to detect if a screen reader (VoiceOver/TalkBack) is currently enabled.
 */
export const useScreenReader = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check initial state
    AccessibilityInfo.isScreenReaderEnabled().then((status) => {
      setIsEnabled(status);
    });

    // Subscribe to changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (status: boolean) => {
        setIsEnabled(status);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return isEnabled;
};
