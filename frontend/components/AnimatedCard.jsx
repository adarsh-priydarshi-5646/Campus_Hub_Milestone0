import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { colors } from '../styles/globalStyles';

const AnimatedCard = ({ 
  children, 
  style, 
  onPress,
  activeOpacity = 0.8,
  animationType = 'lift', // 'lift', 'scale', 'glow'
  disabled = false,
  ...props 
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const shadowValue = useRef(new Animated.Value(4)).current;
  const glowValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (disabled || !onPress) return;
    
    if (animationType === 'lift') {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.02,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }),
        Animated.timing(shadowValue, {
          toValue: 12,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (animationType === 'scale') {
      Animated.spring(scaleValue, {
        toValue: 0.98,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    } else if (animationType === 'glow') {
      Animated.timing(glowValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (disabled || !onPress) return;
    
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(shadowValue, {
        toValue: 4,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    shadowOffset: {
      width: 0,
      height: shadowValue,
    },
    shadowOpacity: glowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.3],
    }),
    shadowRadius: shadowValue,
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View style={[styles.card, animatedStyle, style]}>
      <CardComponent
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={activeOpacity}
        disabled={disabled}
        style={styles.cardContent}
        {...props}
      >
        {children}
      </CardComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginVertical: 8,
    shadowColor: colors.shadow.medium,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardContent: {
    padding: 16,
  },
});

export default AnimatedCard;
