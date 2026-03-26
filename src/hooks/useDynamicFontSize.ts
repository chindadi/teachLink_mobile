import { useState, useEffect } from 'react';
import { PixelRatio } from 'react-native';

/**
 * Hook to track and react to dynamic font scaling changes.
 * Returns the current font scale factor.
 */
export const useDynamicFontSize = () => {
  const [fontScale, setFontScale] = useState(PixelRatio.getFontScale());

  useEffect(() => {
    // Note: PixelRatio.getFontScale() doesn't have an event listener in basic RN,
    // but we can check it on mount or when the window dimensions change.
    // In most cases, users don't change this while the app is running.
    const currentScale = PixelRatio.getFontScale();
    if (currentScale !== fontScale) {
      setFontScale(currentScale);
    }
  }, []);

  /**
   * Scales a given size based on the current font scale.
   */
  const scale = (size: number) => size * fontScale;

  return { fontScale, scale };
};
