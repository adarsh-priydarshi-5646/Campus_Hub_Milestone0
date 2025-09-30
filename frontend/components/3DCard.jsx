import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../styles/globalStyles';

const Card3D = ({ 
  children, 
  style, 
  onPress, 
  variant = 'default',
  elevation = 'medium',
  ...props 
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.card,
        styles[variant],
        styles[elevation],
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.95 : 1}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderLeftColor: 'rgba(255, 255, 255, 0.4)',
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
  },
  // Variants
  default: {
    borderColor: colors.borderLight,
  },
  primary: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20',
  },
  success: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  warning: {
    borderColor: colors.warning,
    backgroundColor: colors.warning + '10',
  },
  danger: {
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
  },
  // Elevations
  low: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  high: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  ultra: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
});

export default Card3D;
