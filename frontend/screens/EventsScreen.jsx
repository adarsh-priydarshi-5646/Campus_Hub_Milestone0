import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchEvents } from '../services/api';
import { globalStyles, colors, typography, spacing,} from '../styles/globalStyles';
import {normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import AnimatedCard from '../components/AnimatedCard';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchEvents();
      if (__DEV__) console.log('Events response:', res.data);
      setEvents(res.data);
    } catch (err) {
      if (__DEV__) console.error('Error loading events:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventCategory = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('tech') || lowerTitle.includes('hackathon') || lowerTitle.includes('coding')) {
      return { icon: 'laptop', color: '#3b82f6', label: 'Technical' };
    } else if (lowerTitle.includes('cultural') || lowerTitle.includes('fest') || lowerTitle.includes('music')) {
      return { icon: 'musical-notes', color: '#ec4899', label: 'Cultural' };
    } else if (lowerTitle.includes('sports') || lowerTitle.includes('tournament')) {
      return { icon: 'football', color: '#10b981', label: 'Sports' };
    } else if (lowerTitle.includes('workshop') || lowerTitle.includes('seminar') || lowerTitle.includes('training')) {
      return { icon: 'school', color: '#f59e0b', label: 'Workshop' };
    }
    return { icon: 'calendar', color: colors.primary, label: 'General' };
  };

  const isUpcoming = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={globalStyles.loadingContainer}>
          <Text style={styles.loadingText}>Loading events...</Text>
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
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <BackButton 
          onPress={() => navigation.goBack()} 
          title="Back to Home"
        />
        
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <MaterialIcons name="event" size={40} color={colors.primary} />
          </View>
          <Text style={styles.title}>Campus Events</Text>
          <Text style={styles.subtitle}>Stay updated with upcoming activities</Text>
          <View style={styles.divider} />
        </View>
        
        {events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event" size={64} color={colors.text.secondary} style={{marginBottom: spacing.lg}} />
            <Text style={styles.emptyTitle}>No Events Found</Text>
            <Text style={styles.emptyMessage}>
              No events are scheduled at the moment. Check back later!
            </Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={loadEvents}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
            renderItem={({ item }) => {
              const category = getEventCategory(item.title);
              const upcoming = isUpcoming(item.date);
              
              return (
                <TouchableOpacity activeOpacity={0.9}>
                  <LinearGradient
                    colors={[`${category.color}08`, `${category.color}03`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.eventCard}
                  >
                    <View style={styles.eventHeader}>
                      <View style={[styles.categoryBadge, { backgroundColor: `${category.color}20` }]}>
                        <Ionicons name={category.icon} size={16} color={category.color} />
                        <Text style={[styles.categoryText, { color: category.color }]}>
                          {category.label}
                        </Text>
                      </View>
                      {upcoming && (
                        <View style={styles.upcomingBadge}>
                          <Ionicons name="time" size={12} color={colors.success} />
                          <Text style={styles.upcomingText}>Upcoming</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.eventTitle}>{item.title}</Text>

                    {item.description && (
                      <Text style={styles.eventDescription} numberOfLines={2}>
                        {item.description}
                      </Text>
                    )}

                    <View style={styles.eventDetails}>
                      <View style={styles.detailItem}>
                        <View style={styles.detailIconContainer}>
                          <Ionicons name="calendar" size={18} color={colors.primary} />
                        </View>
                        <View style={styles.detailContent}>
                          <Text style={styles.detailLabel}>Date</Text>
                          <Text style={styles.detailValue}>{formatDate(item.date)}</Text>
                        </View>
                      </View>

                      <View style={styles.detailItem}>
                        <View style={styles.detailIconContainer}>
                          <Ionicons name="time" size={18} color={colors.primary} />
                        </View>
                        <View style={styles.detailContent}>
                          <Text style={styles.detailLabel}>Time</Text>
                          <Text style={styles.detailValue}>{item.time}</Text>
                        </View>
                      </View>

                      {item.venue && (
                        <View style={styles.detailItem}>
                          <View style={styles.detailIconContainer}>
                            <Ionicons name="location" size={18} color={colors.primary} />
                          </View>
                          <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Venue</Text>
                            <Text style={styles.detailValue}>{item.venue}</Text>
                          </View>
                        </View>
                      )}
                    </View>

                    <View style={styles.eventFooter}>
                      <View style={styles.organizerInfo}>
                        <FontAwesome5 name="users" size={12} color={colors.text.secondary} />
                        <Text style={styles.organizerText}>
                          {item.organizer || 'College Administration'}
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>View Details</Text>
                        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
  },
  headerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: spacing.md,
  },
  listContainer: {
    paddingBottom: rs(spacing.xl),
  },
  eventCard: {
    width: '100%',
    marginBottom: rs(spacing.lg),
    padding: rs(spacing.lg),
    borderRadius: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: spacing.xs,
  },
  categoryText: {
    ...typography.bodySmall,
    fontWeight: '700',
    fontSize: 12,
  },
  upcomingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.success}20`,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
    gap: 4,
  },
  upcomingText: {
    ...typography.bodySmall,
    color: colors.success,
    fontWeight: '700',
    fontSize: 11,
  },
  eventTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '700',
    fontSize: 20,
  },
  eventDescription: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  eventDetails: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: spacing.sm,
    borderRadius: 12,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  detailValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  organizerText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontSize: 12,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailsButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
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
    paddingHorizontal: spacing.lg,
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
});

export default EventsScreen;
