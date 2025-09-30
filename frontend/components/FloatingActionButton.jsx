import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing } from '../styles/globalStyles';

const FloatingActionButton = ({ 
  onPress, 
  icon = '➕',
  size = 'medium',
  variant = 'primary',
  position = 'bottomRight',
  style 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [scaleAnim]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      rotateAnim.setValue(0);
      onPress();
    });
  };

  const getSize = () => {
    switch (size) {
      case 'small': return 48;
      case 'medium': return 56;
      case 'large': return 64;
      default: return 56;
    }
  };

  const getPosition = () => {
    switch (position) {
      case 'bottomRight':
        return { bottom: 20, right: 20 };
      case 'bottomLeft':
        return { bottom: 20, left: 20 };
      case 'topRight':
        return { top: 20, right: 20 };
      case 'topLeft':
        return { top: 20, left: 20 };
      default:
        return { bottom: 20, right: 20 };
    }
  };

  const buttonSize = getSize();
  const positionStyle = getPosition();

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        { 
          width: buttonSize, 
          height: buttonSize,
          transform: [{ scale: scaleAnim }, { rotate }]
        },
        style
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          styles[variant],
          { borderRadius: buttonSize / 2 }
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={[styles.icon, { fontSize: buttonSize * 0.4 }]}>
          {icon}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 3,
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderLeftColor: 'rgba(255, 255, 255, 0.4)',
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  icon: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Variants
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
});

export default FloatingActionButton;
