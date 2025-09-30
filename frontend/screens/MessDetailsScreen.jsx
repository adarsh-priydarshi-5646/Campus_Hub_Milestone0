import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchMess } from '../services/api';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const MessDetailsScreen = ({ navigation }) => {
  const [messData, setMessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Enhanced Mess Data with more details
  const enhancedMessData = [
    {
      day: 'Monday',
      color: '#3b82f6',
      breakfast: 'Poha, Bread & Butter, Boiled Eggs, Tea/Coffee, Banana',
      lunch: 'Roti, Rice, Dal Tadka, Mix Veg, Salad, Curd, Pickle',
      dinner: 'Roti, Rice, Paneer Butter Masala, Aloo Gobi, Dal, Salad',
      snacks: 'Samosa, Tea',
      specialNote: 'Healthy Start to the Week'
    },
    {
      day: 'Tuesday',
      color: '#10b981',
      breakfast: 'Idli Sambhar, Coconut Chutney, Boiled Eggs, Tea/Coffee',
      lunch: 'Roti, Rice, Rajma Masala, Bhindi Fry, Dal, Salad, Curd',
      dinner: 'Roti, Rice, Chicken Curry, Cabbage Sabzi, Dal, Raita',
      snacks: 'Bread Pakora, Tea',
      specialNote: 'South Indian Special'
    },
    {
      day: 'Wednesday',
      color: '#f59e0b',
      breakfast: 'Aloo Paratha, Curd, Pickle, Boiled Eggs, Tea/Coffee',
      lunch: 'Roti, Rice, Chole Masala, Aloo Matar, Dal, Salad',
      dinner: 'Roti, Rice, Fish Curry, Mix Veg, Dal, Salad',
      snacks: 'Veg Cutlet, Tea',
      specialNote: 'Mid-Week Feast'
    },
    {
      day: 'Thursday',
      color: '#8b5cf6',
      breakfast: 'Upma, Bread Omelette, Tea/Coffee, Apple',
      lunch: 'Roti, Rice, Kadhi Pakora, Aloo Baingan, Dal, Salad',
      dinner: 'Roti, Rice, Egg Curry, Gobi Matar, Dal, Curd',
      snacks: 'Aloo Tikki, Tea',
      specialNote: 'Protein Power Day'
    },
    {
      day: 'Friday',
      color: '#ec4899',
      breakfast: 'Puri Sabzi, Boiled Eggs, Tea/Coffee, Banana',
      lunch: 'Roti, Rice, Paneer Do Pyaza, Bhindi Masala, Dal, Salad',
      dinner: 'Roti, Rice, Chicken Biryani, Raita, Salad',
      snacks: 'Pakora, Tea',
      specialNote: 'Friday Special Biryani'
    },
    {
      day: 'Saturday',
      color: '#f97316',
      breakfast: 'Dosa, Sambhar, Chutney, Boiled Eggs, Tea/Coffee',
      lunch: 'Roti, Rice, Mutton Curry, Aloo Jeera, Dal, Salad, Curd',
      dinner: 'Roti, Rice, Veg Manchurian, Fried Rice, Salad',
      snacks: 'Spring Roll, Tea',
      specialNote: 'Weekend Special - Non-Veg'
    },
    {
      day: 'Sunday',
      color: '#ef4444',
      breakfast: 'Chole Bhature, Lassi, Boiled Eggs, Tea/Coffee',
      lunch: 'Roti, Rice, Special Chicken Curry, Paneer Tikka, Dal, Salad',
      dinner: 'Roti, Rice, Veg Pulao, Raita, Papad, Ice Cream',
      snacks: 'Burger, Cold Drink',
      specialNote: 'Sunday Grand Feast'
    }
  ];

  const loadMessData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchMess();
      // Use API data if available, otherwise use enhanced data
      setMessData(res.data && res.data.length > 0 ? res.data : enhancedMessData);
    } catch (err) {
      if (__DEV__) console.error('Error loading mess data:', err);
      // Use enhanced data as fallback
      setMessData(enhancedMessData);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMessData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadMessData();
    // Set current day as selected
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setSelectedDay(currentDay);
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading mess menu..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadMessData} />;
  }

  const getMealIcon = (mealType) => {
    const icons = {
      breakfast: 'sunny',
      lunch: 'restaurant',
      dinner: 'moon',
      snacks: 'cafe'
    };
    return icons[mealType] || 'restaurant';
  };

  const getMealColor = (mealType) => {
    const mealColors = {
      breakfast: '#f59e0b',
      lunch: '#3b82f6',
      dinner: '#6366f1',
      snacks: '#10b981'
    };
    return mealColors[mealType] || colors.primary;
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <BackButton onPress={() => navigation.goBack()} title="Back to Home" />
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <MaterialIcons name="restaurant-menu" size={48} color={colors.primary} />
          </View>
          <Text style={styles.title}>Mess Menu</Text>
          <Text style={styles.subtitle}>Delicious & Nutritious Meals</Text>
          <View style={styles.divider} />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="restaurant" size={28} color={colors.primary} />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Meals/Day</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={28} color={colors.success} />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Days Menu</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={28} color={colors.warning} />
            <Text style={styles.statNumber}>A+</Text>
            <Text style={styles.statLabel}>Quality</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="food-variant" size={28} color={colors.error} />
            <Text style={styles.statNumber}>Veg</Text>
            <Text style={styles.statLabel}>& Non-Veg</Text>
          </View>
        </View>

        {/* Mess Timings Card */}
        <View style={styles.timingsCard}>
          <View style={styles.timingsHeader}>
            <Ionicons name="time" size={24} color={colors.primary} />
            <Text style={styles.timingsTitle}>Meal Timings</Text>
          </View>
          <View style={styles.timingsGrid}>
            <View style={styles.timingItem}>
              <Ionicons name="sunny" size={20} color="#f59e0b" />
              <Text style={styles.timingLabel}>Breakfast</Text>
              <Text style={styles.timingTime}>7:00 - 9:00 AM</Text>
            </View>
            <View style={styles.timingItem}>
              <Ionicons name="restaurant" size={20} color="#3b82f6" />
              <Text style={styles.timingLabel}>Lunch</Text>
              <Text style={styles.timingTime}>12:00 - 2:00 PM</Text>
            </View>
            <View style={styles.timingItem}>
              <MaterialCommunityIcons name="food-variant" size={20} color="#10b981" />
              <Text style={styles.timingLabel}>Snacks</Text>
              <Text style={styles.timingTime}>4:00 - 5:00 PM</Text>
            </View>
            <View style={styles.timingItem}>
              <Ionicons name="moon" size={20} color="#6366f1" />
              <Text style={styles.timingLabel}>Dinner</Text>
              <Text style={styles.timingTime}>7:00 - 9:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Weekly Menu */}
        <View style={styles.menuSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="restaurant" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Weekly Menu</Text>
          </View>

          {messData.map((day, index) => {
            const isToday = day.day === selectedDay;
            const dayColor = day.color || colors.primary;
            
            return (
              <View key={index} style={[styles.dayCard, isToday && styles.todayCard]}>
                <LinearGradient
                  colors={[`${dayColor}15`, `${dayColor}05`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.dayCardGradient}
                >
                  {/* Day Header */}
                  <View style={styles.dayHeader}>
                    <View style={[styles.dayBadge, { backgroundColor: dayColor }]}>
                      <Text style={styles.dayNumber}>{index + 1}</Text>
                    </View>
                    <View style={styles.dayInfo}>
                      <Text style={[styles.dayName, { color: dayColor }]}>{day.day}</Text>
                      {isToday && (
                        <View style={styles.todayBadge}>
                          <Ionicons name="today" size={14} color={colors.text.white} />
                          <Text style={styles.todayText}>Today</Text>
                        </View>
                      )}
                    </View>
                    {day.specialNote && (
                      <View style={styles.specialBadge}>
                        <Ionicons name="star" size={12} color={colors.warning} />
                      </View>
                    )}
                  </View>

                  {day.specialNote && (
                    <View style={styles.specialNoteContainer}>
                      <MaterialIcons name="celebration" size={16} color={dayColor} />
                      <Text style={[styles.specialNote, { color: dayColor }]}>{day.specialNote}</Text>
                    </View>
                  )}

                  {/* Meals */}
                  <View style={styles.mealsContainer}>
                    {/* Breakfast */}
                    <View style={[styles.mealCard, { borderLeftColor: '#f59e0b' }]}>
                      <View style={[styles.mealIconBox, { backgroundColor: '#fef3c7' }]}>
                        <Ionicons name="sunny" size={24} color="#f59e0b" />
                      </View>
                      <View style={styles.mealContent}>
                        <View style={styles.mealHeader}>
                          <Text style={styles.mealTitle}>Breakfast</Text>
                          <View style={[styles.timeChip, { backgroundColor: '#fef3c7' }]}>
                            <Ionicons name="time-outline" size={12} color="#f59e0b" />
                            <Text style={[styles.timeText, { color: '#f59e0b' }]}>7-9 AM</Text>
                          </View>
                        </View>
                        <View style={styles.foodItems}>
                          {day.breakfast && day.breakfast.split(',').map((item, i) => (
                            <View key={i} style={styles.foodItem}>
                              <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                              <Text style={styles.foodText}>{item.trim()}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* Lunch */}
                    <View style={[styles.mealCard, { borderLeftColor: '#3b82f6' }]}>
                      <View style={[styles.mealIconBox, { backgroundColor: '#dbeafe' }]}>
                        <Ionicons name="restaurant" size={24} color="#3b82f6" />
                      </View>
                      <View style={styles.mealContent}>
                        <View style={styles.mealHeader}>
                          <Text style={styles.mealTitle}>Lunch</Text>
                          <View style={[styles.timeChip, { backgroundColor: '#dbeafe' }]}>
                            <Ionicons name="time-outline" size={12} color="#3b82f6" />
                            <Text style={[styles.timeText, { color: '#3b82f6' }]}>12-2 PM</Text>
                          </View>
                        </View>
                        <View style={styles.foodItems}>
                          {day.lunch && day.lunch.split(',').map((item, i) => (
                            <View key={i} style={styles.foodItem}>
                              <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                              <Text style={styles.foodText}>{item.trim()}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* Snacks (if available) */}
                    {day.snacks && (
                      <View style={[styles.mealCard, { borderLeftColor: '#10b981' }]}>
                        <View style={[styles.mealIconBox, { backgroundColor: '#d1fae5' }]}>
                          <MaterialCommunityIcons name="food-variant" size={24} color="#10b981" />
                        </View>
                        <View style={styles.mealContent}>
                          <View style={styles.mealHeader}>
                            <Text style={styles.mealTitle}>Snacks</Text>
                            <View style={[styles.timeChip, { backgroundColor: '#d1fae5' }]}>
                              <Ionicons name="time-outline" size={12} color="#10b981" />
                              <Text style={[styles.timeText, { color: '#10b981' }]}>4-5 PM</Text>
                            </View>
                          </View>
                          <View style={styles.foodItems}>
                            {day.snacks.split(',').map((item, i) => (
                              <View key={i} style={styles.foodItem}>
                                <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                                <Text style={styles.foodText}>{item.trim()}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}

                    {/* Dinner */}
                    <View style={[styles.mealCard, { borderLeftColor: '#6366f1' }]}>
                      <View style={[styles.mealIconBox, { backgroundColor: '#e0e7ff' }]}>
                        <Ionicons name="moon" size={24} color="#6366f1" />
                      </View>
                      <View style={styles.mealContent}>
                        <View style={styles.mealHeader}>
                          <Text style={styles.mealTitle}>Dinner</Text>
                          <View style={[styles.timeChip, { backgroundColor: '#e0e7ff' }]}>
                            <Ionicons name="time-outline" size={12} color="#6366f1" />
                            <Text style={[styles.timeText, { color: '#6366f1' }]}>7-9 PM</Text>
                          </View>
                        </View>
                        <View style={styles.foodItems}>
                          {day.dinner && day.dinner.split(',').map((item, i) => (
                            <View key={i} style={styles.foodItem}>
                              <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                              <Text style={styles.foodText}>{item.trim()}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>

        {/* Important Information */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={[colors.primary, '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.infoGradient}
          >
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={24} color={colors.text.white} />
              <Text style={styles.infoTitle}>Important Information</Text>
            </View>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons name="food-variant" size={28} color={colors.primary} />
                <Text style={styles.infoItemTitle}>Dietary Options</Text>
                <Text style={styles.infoItemText}>Both Veg & Non-Veg available</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={28} color={colors.primary} />
                <Text style={styles.infoItemTitle}>Special Days</Text>
                <Text style={styles.infoItemText}>Extra items on weekends</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="clean-hands" size={28} color={colors.primary} />
                <Text style={styles.infoItemTitle}>Hygiene</Text>
                <Text style={styles.infoItemText}>Maintained to highest standards</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="call" size={28} color={colors.primary} />
                <Text style={styles.infoItemTitle}>Contact</Text>
                <Text style={styles.infoItemText}>Mess Manager for queries</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="heart" size={16} color={colors.error} />
          <Text style={styles.footerText}>Prepared with love & care</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  headerIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 11,
  },
  timingsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  timingsTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  timingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  timingItem: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  timingLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  timingTime: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  menuSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '700',
  },
  dayCard: {
    marginBottom: spacing.xl,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  todayCard: {
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dayCardGradient: {
    padding: spacing.lg,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  dayBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  dayNumber: {
    ...typography.h3,
    color: colors.text.white,
    fontWeight: '800',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    ...typography.h3,
    fontWeight: '800',
    marginBottom: spacing.xs / 2,
  },
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  todayText: {
    ...typography.bodySmall,
    color: colors.text.white,
    fontWeight: '700',
    fontSize: 11,
  },
  specialBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  specialNote: {
    ...typography.bodySmall,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  mealsContainer: {
    gap: spacing.md,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mealContent: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  mealTitle: {
    ...typography.h4,
    fontWeight: '700',
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
    gap: 4,
  },
  timeText: {
    ...typography.bodySmall,
    fontWeight: '600',
    fontSize: 11,
  },
  foodItems: {
    gap: spacing.xs / 2,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  foodText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 20,
  },
  infoCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  infoGradient: {
    padding: spacing.xl,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  infoTitle: {
    ...typography.h3,
    color: colors.text.white,
    fontWeight: '800',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  infoItem: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 120,
  },
  infoItemTitle: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  infoItemText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default MessDetailsScreen;
