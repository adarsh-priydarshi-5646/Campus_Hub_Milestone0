import React from 'react';
import { View, StyleSheet } from 'react-native';
import { wp, rs } from '../utils/responsive';
import { spacing } from '../styles/globalStyles';

/**
 * ResponsiveContainer - A wrapper component that provides responsive padding and full width
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.style - Additional styles
 * @param {boolean} props.noPadding - Remove horizontal padding
 * @param {boolean} props.fullWidth - Use 100% width (default: true)
 */
const ResponsiveContainer = ({ 
  children, 
  style, 
  noPadding = false,
  fullWidth = true
}) => {
  return (
    <View style={[
      styles.container,
      fullWidth && styles.fullWidth,
      noPadding ? {} : styles.padding,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  padding: {
    paddingHorizontal: rs(spacing.lg),
  },
});

export default ResponsiveContainer;
