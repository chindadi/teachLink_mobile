import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { getAccessibilityProps } from '../../utils/accessibility';

interface AccessibleButtonProps extends TouchableOpacityProps {
  label: string;
  hint?: string;
  role?: 'button' | 'link';
  /**
   * Optional custom styles for the button.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * A reusable accessible button component for TeachLink mobile.
 * Ensures a minimum touch target of 44x44 and provides consistent accessibility props.
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  hint,
  role = 'button',
  children,
  style,
  containerStyle,
  disabled,
  activeOpacity = 0.7,
  ...rest
}: AccessibleButtonProps) => {
  const accessibilityProps = getAccessibilityProps(label, role as 'button' | 'link', hint, {
    disabled: !!disabled,
  });

  return (
    <TouchableOpacity
      {...rest}
      {...accessibilityProps}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[styles.base, containerStyle, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
