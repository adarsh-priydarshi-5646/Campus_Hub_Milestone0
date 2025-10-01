import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles, colors, typography, spacing, responsiveTypography, isSmallScreen } from '../styles/globalStyles';
import { wp, hp, normalize, rs } from '../utils/responsive';
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
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={72} color={colors.text.white} />
            </View>
            <Text style={styles.title}>MyCampusHub</Text>
            <Text style={styles.subtitle}>Your Complete Campus Management Solution</Text>
            <Text style={styles.description}>
              Connect with faculty, access study materials, track events, and manage your academic journey all in one place.
            </Text>
          </Animated.View>

        {/* Features Grid */}
        <View style={[styles.featuresSection, styles.maxWidth] }>
          <Text style={styles.sectionTitle}>Why Choose MyCampusHub?</Text>
          
          {/* Row 1 */}
          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, {backgroundColor: '#dbeafe'}]}>
                <Ionicons name="book" size={40} color="#3b82f6" />
              </View>
              <Text style={styles.featureTitle}>Academic Resources</Text>
              <Text style={styles.featureDescription}>Access study materials, roadmaps, and exam schedules</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, {backgroundColor: '#d1fae5'}]}>
                <FontAwesome5 name="chalkboard-teacher" size={36} color="#10b981" />
              </View>
              <Text style={styles.featureTitle}>Faculty Directory</Text>
              <Text style={styles.featureDescription}>Connect with expert teachers and get guidance</Text>
            </View>
          </View>
          
          {/* Row 2 */}
          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, {backgroundColor: '#fef3c7'}]}>
                <Ionicons name="calendar" size={40} color="#f59e0b" />
              </View>
              <Text style={styles.featureTitle}>Event Updates</Text>
              <Text style={styles.featureDescription}>Stay updated with campus events and announcements</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, {backgroundColor: '#fecaca'}]}>
                <Ionicons name="restaurant" size={40} color="#ef4444" />
              </View>
              <Text style={styles.featureTitle}>Mess Menu</Text>
              <Text style={styles.featureDescription}>Check daily meal plans and dining options</Text>
            </View>
          </View>
          
          {/* Row 3 */}
          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, {backgroundColor: '#e0e7ff'}]}>
                <MaterialIcons name="business" size={40} color="#6366f1" />
              </View>
              <Text style={styles.featureTitle}>College Info</Text>
              <Text style={styles.featureDescription}>Complete college details and facilities</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, {backgroundColor: '#ddd6fe'}]}>
                <MaterialCommunityIcons name="home-city" size={40} color="#8b5cf6" />
              </View>
              <Text style={styles.featureTitle}>Hostel Details</Text>
              <Text style={styles.featureDescription}>Hostel facilities and accommodation info</Text>
            </View>
          </View>
        </View>
          
        {/* Stats Section */}
        <View style={[styles.statsSection, styles.maxWidth]}>
          <LinearGradient
            colors={[colors.primary, '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsGradient}
          >
            <View style={styles.statsTitleContainer}>
              <MaterialIcons name="analytics" size={24} color={colors.text.white} style={{marginRight: 8}} />
              <Text style={styles.statsTitle}>Campus Statistics</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <FontAwesome5 name="chalkboard-teacher" size={28} color="#3b82f6" />
                </View>
                <Text style={styles.statNumber}>6+</Text>
                <Text style={styles.statLabel}>Expert Faculty</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="book" size={28} color="#10b981" />
                </View>
                <Text style={styles.statNumber}>12+</Text>
                <Text style={styles.statLabel}>Subjects</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="people" size={28} color="#f59e0b" />
                </View>
                <Text style={styles.statNumber}>100+</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <MaterialIcons name="support-agent" size={28} color="#ef4444" />
                </View>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Support</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* CTA Section */}
        <View style={[styles.ctaSection, styles.maxWidth]}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaSubtitle}>Join thousands of students already using MyCampusHub</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              style={styles.primaryButton}
              activeOpacity={0.8}
            >
              <Ionicons name="log-in" size={20} color={colors.text.white} style={{marginRight: 8}} />
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('Signup')}
              style={styles.secondaryButton}
              activeOpacity={0.8}
            >
              <Ionicons name="person-add" size={20} color={colors.primary} style={{marginRight: 8}} />
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, styles.maxWidth]}>
          <Text style={styles.footerText}>© 2024 MyCampusHub. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Made for students</Text>
        </View>
      </ScrollView>
      
      </AnimatedBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maxWidth: {
    width: '100%',
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: rs(spacing.xxl),
  },
  heroSection: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
    paddingVertical: rs(spacing.xxl),
    alignItems: 'center',
    borderBottomLeftRadius: normalize(32),
    borderBottomRightRadius: normalize(32),
  },
  logoContainer: {
    width: normalize(140),
    height: normalize(140),
    borderRadius: normalize(70),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(spacing.lg),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  title: {
    ...responsiveTypography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: rs(spacing.sm),
    fontWeight: '900',
  },
  subtitle: {
    ...responsiveTypography.h4,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: rs(spacing.md),
    fontWeight: '600',
  },
  description: {
    ...responsiveTypography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: normalize(24),
    opacity: 0.9,
    paddingHorizontal: rs(spacing.md),
  },
  featuresSection: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
    paddingVertical: rs(spacing.xxl),
  },
  sectionTitle: {
    ...responsiveTypography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: rs(spacing.xl),
    fontWeight: '800',
  },
  featureRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginBottom: rs(spacing.lg),
  },
  featureCard: {
    width: isSmallScreen ? '100%' : '48.5%',
    backgroundColor: colors.surface,
    borderRadius: normalize(20),
    padding: rs(spacing.lg),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: isSmallScreen ? rs(spacing.md) : 0,
  },
  featureIconContainer: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(spacing.md),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  featureTitle: {
    ...responsiveTypography.h4,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: rs(spacing.sm),
    fontWeight: '700',
  },
  featureDescription: {
    ...responsiveTypography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: normalize(20),
  },
  statsSection: {
    width: '100%',
    marginHorizontal: rs(spacing.lg),
    marginBottom: rs(spacing.xl),
    borderRadius: normalize(20),
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  statsGradient: {
    padding: rs(spacing.xl),
  },
  statsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(spacing.lg),
  },
  statsTitle: {
    ...responsiveTypography.h4,
    color: colors.text.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  statIconContainer: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(spacing.sm),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: rs(spacing.sm),
  },
  statItem: {
    alignItems: 'center',
    width: isSmallScreen ? '48%' : '23%',
    minWidth: isSmallScreen ? '45%' : '20%',
    marginBottom: rs(spacing.sm),
  },
  statNumber: {
    ...responsiveTypography.h2,
    color: colors.text.white,
    fontWeight: '900',
    marginBottom: rs(spacing.xs),
  },
  statLabel: {
    ...responsiveTypography.bodySmall,
    color: colors.text.white,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.9,
  },
  ctaSection: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: normalize(20),
    paddingHorizontal: rs(spacing.lg),
    paddingVertical: rs(spacing.xl),
    alignItems: 'center',
    marginHorizontal: rs(spacing.lg),
    marginBottom: rs(spacing.xl),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  ctaTitle: {
    ...responsiveTypography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: rs(spacing.sm),
    fontWeight: '800',
  },
  ctaSubtitle: {
    ...responsiveTypography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: rs(spacing.xl),
    lineHeight: normalize(24),
  },
  buttonContainer: {
    width: '100%',
    gap: rs(spacing.md),
  },
  primaryButton: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: rs(spacing.md + 4),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(spacing.md),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    ...responsiveTypography.body,
    color: colors.text.white,
    fontWeight: '700',
    fontSize: normalize(16),
  },
  secondaryButton: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.surface,
    paddingVertical: rs(spacing.md + 4),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    ...responsiveTypography.body,
    color: colors.primary,
    fontWeight: '700',
    fontSize: normalize(16),
  },
  footer: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
    paddingVertical: rs(spacing.xl),
    alignItems: 'center',
    marginTop: rs(spacing.xl),
  },
  footerText: {
    ...responsiveTypography.bodySmall,
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: rs(spacing.xs),
  },
  footerSubtext: {
    ...responsiveTypography.bodySmall,
    color: colors.text.light,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default WelcomeScreen;
