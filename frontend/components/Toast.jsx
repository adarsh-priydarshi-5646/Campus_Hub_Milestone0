import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, responsiveTypography } from '../styles/globalStyles';
import { wp, normalize, rs } from '../utils/responsive';

const { width } = Dimensions.get('window');

const Toast = ({ visible, message, type = 'success', onHide, duration = 3000 }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) onHide();
    });
  };

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          icon: 'checkmark-circle',
        };
      case 'error':
        return {
          backgroundColor: colors.danger,
          icon: 'close-circle',
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          icon: 'warning',
        };
      case 'info':
        return {
          backgroundColor: colors.info,
          icon: 'information-circle',
        };
      default:
        return {
          backgroundColor: colors.success,
          icon: 'checkmark-circle',
        };
    }
  };

  const toastStyle = getToastStyle();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastStyle.backgroundColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Ionicons name={toastStyle.icon} size={24} color="#fff" style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: rs(50),
    left: rs(spacing.md),
    right: rs(spacing.md),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(spacing.md),
    paddingHorizontal: rs(spacing.lg),
    borderRadius: normalize(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 9999,
  },
  icon: {
    marginRight: rs(spacing.sm),
  },
  message: {
    ...responsiveTypography.body,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
  },
});

export default Toast;
