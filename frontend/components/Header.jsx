import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/globalStyles';

const Header = ({ title, subtitle }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.white,
  },
  subtitle: {
    ...typography.body,
    color: colors.primaryLight,
    marginTop: spacing.xs,
  },
});

export default Header;
