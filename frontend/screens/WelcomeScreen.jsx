import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import Button3D from '../components/3DButton';
import Card3D from '../components/3DCard';
import Icon3D from '../components/3DIcon';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingActionButton from '../components/FloatingActionButton';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AnimatedBackground variant="none">
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <Animated.View 
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Icon3D 
              emoji="🎓" 
              size="xxl" 
              variant="primary" 
              style={styles.logoIcon}
            />
            <Text style={styles.title}>MyCampusHub</Text>
            <Text style={styles.subtitle}>Your Complete Campus Management Solution</Text>
            <Text style={styles.description}>
              Connect with faculty, access study materials, track events, and manage your academic journey all in one place.
            </Text>
          </Animated.View>

        {/* Features Grid */}
        <View style={[styles.featuresSection, styles.maxWidth] }>
          <Text style={styles.sectionTitle}>Why Choose MyCampusHub?</Text>
          <View style={styles.featuresGrid}>
            <Card3D variant="primary" elevation="medium" style={styles.featureCard}>
              <Icon3D emoji="📚" size="large" variant="primary" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Academic Resources</Text>
              <Text style={styles.featureDescription}>Access study materials, roadmaps, and exam schedules</Text>
            </Card3D>
            <Card3D variant="success" elevation="medium" style={styles.featureCard}>
              <Icon3D emoji="👨‍🏫" size="large" variant="success" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Faculty Directory</Text>
              <Text style={styles.featureDescription}>Connect with expert teachers and get guidance</Text>
            </Card3D>
            <Card3D variant="warning" elevation="medium" style={styles.featureCard}>
              <Icon3D emoji="📅" size="large" variant="warning" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Event Updates</Text>
              <Text style={styles.featureDescription}>Stay updated with campus events and announcements</Text>
            </Card3D>
            <Card3D variant="danger" elevation="medium" style={styles.featureCard}>
              <Icon3D emoji="🍽️" size="large" variant="danger" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Mess Menu</Text>
              <Text style={styles.featureDescription}>Check daily meal plans and dining options</Text>
            </Card3D>
            <Card3D variant="primary" elevation="medium" style={styles.featureCard}>
              <Icon3D emoji="🏫" size="large" variant="primary" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>College Info</Text>
              <Text style={styles.featureDescription}>Complete college details and facilities</Text>
            </Card3D>
            <Card3D variant="success" elevation="medium" style={styles.featureCard}>
              <Icon3D emoji="🏠" size="large" variant="success" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Hostel Details</Text>
              <Text style={styles.featureDescription}>Hostel facilities and accommodation info</Text>
            </Card3D>
          </View>
          </View>
          
        {/* Stats Section */}
        <Card3D variant="gradient" elevation="high" style={[styles.statsSection, styles.maxWidth]}>
          <Text style={styles.statsTitle}>📊 Campus Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Icon3D emoji="👨‍🏫" size="medium" variant="primary" />
              <Text style={styles.statNumber}>6+</Text>
              <Text style={styles.statLabel}>Expert Faculty</Text>
            </View>
            <View style={styles.statItem}>
              <Icon3D emoji="📚" size="medium" variant="success" />
              <Text style={styles.statNumber}>12+</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
            <View style={styles.statItem}>
              <Icon3D emoji="👥" size="medium" variant="warning" />
              <Text style={styles.statNumber}>100+</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statItem}>
              <Icon3D emoji="🛠️" size="medium" variant="danger" />
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </Card3D>

        {/* CTA Section */}
        <Card3D variant="primary" elevation="ultra" style={[styles.ctaSection, styles.maxWidth]}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaSubtitle}>Join thousands of students already using MyCampusHub</Text>
          
          <View style={styles.buttonContainer}>
            <Button3D 
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
              variant="primary"
              size="large"
              style={styles.primaryButton}
            />
            
            <Button3D 
              title="Create Account"
              onPress={() => navigation.navigate('Signup')}
              variant="secondary"
              size="large"
              style={styles.secondaryButton}
            />
          </View>
        </Card3D>

        {/* Footer */}
        <View style={[styles.footer, styles.maxWidth]}>
          <Text style={styles.footerText}>© 2024 MyCampusHub. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Made for students</Text>
        </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <FloatingActionButton
        icon="💬"
        onPress={() => navigation.navigate('Login')}
        variant="primary"
        size="large"
        position="bottomRight"
      />
      </AnimatedBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maxWidth: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoIcon: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '900',
  },
  subtitle: {
    ...typography.h4,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    paddingHorizontal: spacing.md,
  },
  featuresSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    fontWeight: '800',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  featureIcon: {
    marginBottom: spacing.md,
  },
  featureTitle: {
    ...typography.h5,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  featureDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statsTitle: {
    ...typography.h4,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  ctaTitle: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '800',
  },
  ctaSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    ...typography.bodySmall,
    color: colors.text.light,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default WelcomeScreen;
