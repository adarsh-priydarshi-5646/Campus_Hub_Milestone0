import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/globalStyles';

const BackButton = ({ onPress, title = "Back", style = {}, textColor = colors.primary, showIcon = true }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.backButton, style]}
    activeOpacity={0.7}
  >
    {showIcon && <Text style={[styles.backIcon, { color: textColor }]}>←</Text>}
    <Text style={[styles.backText, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  backIcon: {
    fontSize: 20,
    marginRight: spacing.xs,
    fontWeight: 'bold',
  },
  backText: {
    ...typography.body,
    fontWeight: '500',
  },
});

export default BackButton;
