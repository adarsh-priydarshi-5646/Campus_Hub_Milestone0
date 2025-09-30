import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  RefreshControl,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { fetchSemesters } from '../services/api';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import BackButton from '../components/BackButton';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCard from '../components/AnimatedCard';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

  const loadSemesters = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const res = await fetchSemesters();
      // Sort semesters in ascending order by name
      const sortedSemesters = res.data.sort((a, b) => {
        const aNum = parseInt(a.name.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.name.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
      setSemesters(sortedSemesters);
    } catch (err) {
      if (__DEV__) console.error('Error loading semesters:', err);
      
      // Handle 401 Unauthorized - redirect to login
      if (err.response?.status === 401) {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please login again.',
          [
            {
              text: 'OK',
              onPress: async () => {
                await logout();
                // Navigation will automatically switch to Welcome screen
              }
            }
          ]
        );
        return;
      }
      
      setError(err.response?.data?.error || err.message || 'Failed to load semesters. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    loadSemesters(true);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await logout();
              if (success) {
                if (__DEV__) console.log('HomeScreen: Logout successful');
              } else {
                Alert.alert('Error', 'Failed to logout. Please try again.');
              }
            } catch (error) {
              if (__DEV__) console.error('HomeScreen: Logout error:', error);
              Alert.alert('Error', 'An error occurred during logout.');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    loadSemesters();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={globalStyles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your semesters...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
  return (
      <SafeAreaView style={globalStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={globalStyles.errorContainer}>
          <Ionicons name="warning" size={64} color={colors.error} style={{marginBottom: spacing.lg}} />
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            onPress={loadSemesters}
            style={[globalStyles.button, styles.retryButton]}
            activeOpacity={0.8}
          >
            <Text style={globalStyles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, styles.maxWidth]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.topBar}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={28} color={colors.primary} />
            </View>
            <View style={styles.topBarActions}>
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Ionicons name="person" size={20} color={colors.text.white} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>MyCampusHub</Text>
            <Text style={styles.subtitle}>Welcome back, {user?.name || 'User'}!</Text>
            <Text style={styles.description}>Your complete campus management solution</Text>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <Text style={styles.sectionSubtitle}>Access your campus features instantly</Text>
        </View>
        
        {/* 2x2 Grid Layout */}
        <View style={styles.gridContainer}>
          {/* First Row */}
          <View style={styles.gridRow}>
            <View style={styles.cardWrapper}>
              <AnimatedButton 
                style={[styles.quickAccessCard, styles.facultyCard]}
                onPress={() => navigation.navigate('Faculty')}
                animationType="bounce"
              >
                <FontAwesome5 name="chalkboard-teacher" size={36} color="#3b82f6" style={{marginBottom: spacing.md}} />
                <Text style={styles.quickAccessTitle}>Faculty</Text>
                <Text style={styles.quickAccessSubtitle}>Meet our expert teachers</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.badgeText}>6 Teachers</Text>
                </View>
              </AnimatedButton>
            </View>

            <View style={styles.cardWrapper}>
              <AnimatedButton 
                style={[styles.quickAccessCard, styles.eventsCard]}
                onPress={() => navigation.navigate('Events')}
                animationType="bounce"
              >
                <MaterialIcons name="event" size={36} color="#10b981" style={{marginBottom: spacing.md}} />
                <Text style={styles.quickAccessTitle}>Events</Text>
                <Text style={styles.quickAccessSubtitle}>Upcoming activities</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.badgeText}>3 Events</Text>
                </View>
              </AnimatedButton>
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.gridRow}>
            <View style={styles.cardWrapper}>
              <AnimatedButton 
                style={[styles.quickAccessCard, styles.collegeCard]}
                onPress={() => navigation.navigate('CollegeDetails')}
                animationType="bounce"
              >
                <FontAwesome5 name="university" size={36} color="#8b5cf6" style={{marginBottom: spacing.md}} />
                <Text style={styles.quickAccessTitle}>College Info</Text>
                <Text style={styles.quickAccessSubtitle}>Discover our campus</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.badgeText}>A+ Grade</Text>
                </View>
              </AnimatedButton>
            </View>

            <View style={styles.cardWrapper}>
              <AnimatedButton 
                style={[styles.quickAccessCard, styles.messCard]}
                onPress={() => navigation.navigate('MessDetails')}
                animationType="bounce"
              >
                <MaterialIcons name="restaurant-menu" size={36} color="#f59e0b" style={{marginBottom: spacing.md}} />
                <Text style={styles.quickAccessTitle}>Mess Menu</Text>
                <Text style={styles.quickAccessSubtitle}>Today's delicious meals</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.badgeText}>7 Days</Text>
                </View>
              </AnimatedButton>
            </View>
          </View>
        </View>
        
        {/* Visual Separator */}
        <View style={styles.separator} />
        
        {/* Motivational Section */}
        <View style={styles.motivationCard}>
          <Ionicons name="school" size={48} color={colors.primary} style={{marginBottom: spacing.md}} />
          <Text style={styles.motivationTitle}>Ready to Excel?</Text>
          <Text style={styles.motivationText}>
            Access your academic resources, connect with faculty, and stay updated with campus events. 
            Your journey to success starts here!
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Academic Semesters</Text>
          <Text style={styles.sectionSubtitle}>Choose your semester to explore subjects and study materials</Text>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading semesters...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={64} color={colors.error} style={{marginBottom: spacing.lg}} />
            <Text style={styles.errorTitle}>Error Loading Semesters</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity 
              onPress={onRefresh}
              style={[globalStyles.button, styles.retryButton]}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : semesters.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="book" size={64} color={colors.text.secondary} style={{marginBottom: spacing.lg}} />
            <Text style={styles.emptyTitle}>No Semesters Found</Text>
            <Text style={styles.emptyMessage}>
              It looks like there are no semesters available yet.
            </Text>
            <TouchableOpacity 
              onPress={onRefresh}
              style={[globalStyles.button, styles.refreshButton]}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.semesterListContainer}>
            {semesters.map((item) => (
              <AnimatedCard 
                key={item.id}
                style={styles.semesterCard}
                animationType="lift"
              >
                <TouchableOpacity 
                  style={styles.semesterMain}
                  onPress={() => navigation.navigate('SemesterDetails', { semesterId: item.id, semesterName: item.name })}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardText}>
                      <Text style={styles.semesterName}>{item.name}</Text>
                      <Text style={styles.semesterSubtext}>Tap to view details</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <Text style={styles.arrow}>→</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
                <AnimatedButton 
                  style={styles.roadmapButton}
                  onPress={() => navigation.navigate('SubjectRoadmap', { 
                    semesterId: item.id, 
                    semesterName: item.name 
                  })}
                  animationType="scale"
                >
                  <MaterialIcons name="map" size={16} color={colors.primary} style={{marginRight: 6}} />
                  <Text style={styles.roadmapButtonText}>Study Roadmap</Text>
                </AnimatedButton>
              </AnimatedCard>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maxWidth: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  profileIcon: {
    fontSize: 20,
    color: colors.text.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 24,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    marginLeft: spacing.sm,
  },
  logoutText: {
    color: colors.text.white,
    fontWeight: '600',
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontWeight: '800',
  },
  subtitle: {
    ...typography.h4,
    color: colors.primaryLight,
    marginBottom: spacing.xs,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    ...typography.body,
    color: colors.text.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  welcomeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h3,
    color: colors.text.white,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.primaryLight,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
    marginHorizontal: spacing.lg,
  },
  motivationCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  motivationIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  motivationTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  motivationText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  featuresSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  featuresTitle: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  featureTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  featureDesc: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
  },
  gridContainer: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    width: '100%',
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  quickAccessCard: {
    alignItems: 'center',
    padding: spacing.lg,
    height: 180,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow.medium,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  quickAccessIcon: {
    fontSize: 36,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  quickAccessTitle: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
    flexShrink: 1,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    marginBottom: spacing.md,
    flexShrink: 1,
  },
  // Individual card styles
  facultyCard: {
    borderColor: '#3b82f6', // Blue
    backgroundColor: '#f0f9ff',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.3,
  },
  eventsCard: {
    borderColor: '#10b981', // Green
    backgroundColor: '#f0fdf4',
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
  },
  collegeCard: {
    borderColor: '#8b5cf6', // Purple
    backgroundColor: '#faf5ff',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.3,
  },
  messCard: {
    borderColor: '#f59e0b', // Orange
    backgroundColor: '#fffbeb',
    shadowColor: '#f59e0b',
    shadowOpacity: 0.3,
  },
  cardBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    color: colors.text.white,
    fontWeight: '700',
    fontSize: 9,
    letterSpacing: 0.3,
  },
  listContainer: {
    paddingBottom: spacing.xl,
  },
  semesterListContainer: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  semesterCard: {
    marginBottom: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow.medium,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginHorizontal: spacing.sm,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
  },
  semesterName: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  semesterSubtext: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  arrow: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  errorContainer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  errorTitle: {
    ...typography.h4,
    color: colors.error,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  errorMessage: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  emptyContainer: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyMessage: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  refreshButton: {
    paddingHorizontal: spacing.xl,
  },
  retryButton: {
    marginTop: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  errorTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  errorMessage: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  semesterMain: {
    flex: 1,
  },
  roadmapButton: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    marginTop: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roadmapButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;
