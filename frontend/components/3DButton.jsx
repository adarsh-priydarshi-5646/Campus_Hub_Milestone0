import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, typography, spacing } from '../styles/globalStyles';

const Button3D = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon = null,
  ...props 
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[variant], styles[size]];
    if (disabled) baseStyle.push(styles.disabled);
    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
    if (disabled) baseStyle.push(styles.disabledText);
    if (textStyle) baseStyle.push(textStyle);
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={getTextStyle()}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  success: {
    backgroundColor: colors.success,
    borderColor: '#059669',
  },
  warning: {
    backgroundColor: colors.warning,
    borderColor: '#d97706',
  },
  danger: {
    backgroundColor: colors.error,
    borderColor: '#dc2626',
  },
  // Sizes
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 40,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 64,
  },
  // Text styles
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryText: {
    color: colors.text.white,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  successText: {
    color: colors.text.white,
  },
  warningText: {
    color: colors.text.white,
  },
  dangerText: {
    color: colors.text.white,
  },
  // Size text
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // States
  disabled: {
    opacity: 0.6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button3D;
