import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

// Responsive width - full width for all devices
export const wp = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
};

// Full width helper
export const fullWidth = SCREEN_WIDTH;

// Responsive height
export const hp = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(value);
};

// Responsive font size
export const normalize = (size) => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Responsive spacing
export const rs = (size) => {
  const scale = SCREEN_WIDTH / baseWidth;
  return Math.round(size * scale);
};

// Device type detection
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414 && SCREEN_WIDTH < 768;
export const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;
export const isDesktop = SCREEN_WIDTH >= 1024;

// Get responsive value based on device
export const getResponsiveValue = (small, medium, large, tablet, desktop) => {
  if (isDesktop && desktop !== undefined) return desktop;
  if (isTablet && tablet !== undefined) return tablet;
  if (isLargeDevice && large !== undefined) return large;
  if (isMediumDevice && medium !== undefined) return medium;
  return small;
};

// Screen dimensions
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

// Orientation
export const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH;
export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
