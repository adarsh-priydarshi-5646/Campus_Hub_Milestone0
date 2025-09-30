import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/globalStyles';

const Icon3D = ({ 
  emoji, 
  size = 'medium',
  variant = 'default',
  style,
  ...props 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'medium': return 32;
      case 'large': return 48;
      case 'xl': return 64;
      case 'xxl': return 80;
      default: return 32;
    }
  };

  const iconSize = getSize();

  return (
    <View
      style={[
        styles.container,
        styles[variant],
        { width: iconSize, height: iconSize },
        style
      ]}
      {...props}
    >
      <Text style={[styles.emoji, { fontSize: iconSize * 0.6 }]}>
        {emoji}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    borderLeftColor: 'rgba(255, 255, 255, 0.5)',
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  emoji: {
    textAlign: 'center',
  },
  // Variants
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
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
  gradient: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
});

export default Icon3D;
