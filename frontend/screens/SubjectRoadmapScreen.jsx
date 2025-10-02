import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,

} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchSubjects } from '../services/api';
import { globalStyles, colors, typography, spacing, isSmallScreen } from '../styles/globalStyles';
import { normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SubjectRoadmapScreen = ({ route, navigation }) => {
  const { semesterId, semesterName } = route.params;
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchSubjects(semesterId);
      setSubjects(res.data);
    } catch (err) {
      if (__DEV__) console.error('Error loading subjects:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load subjects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate semester totals
  const semesterStats = subjects.reduce(
    (acc, subject) => ({
      totalLectures: acc.totalLectures + (subject.totalLectures || 0),
      totalLabs: acc.totalLabs + (subject.totalLabs || 0),
      totalCredits: acc.totalCredits + (subject.credits || 0),
      totalSubjects: acc.totalSubjects + 1,
    }),
    { totalLectures: 0, totalLabs: 0, totalCredits: 0, totalSubjects: 0 }
  );

  useEffect(() => {
    loadSubjects();
  }, [semesterId]);

  if (loading) {
    return <LoadingSpinner message="Loading subject roadmaps..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadSubjects} />;
  }

  if (subjects.length === 0) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} title="Back to Semesters" />
          <View style={globalStyles.errorContainer}>
            <Text style={styles.emptyText}>No subjects available for this semester</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} title="Back to Semesters" />
          
          <View style={styles.header}>
            <View style={styles.headerBadge}>
              <FontAwesome5 name="graduation-cap" size={36} color={colors.primary} />
            </View>
            <Text style={styles.title}>{semesterName}</Text>
            <Text style={styles.subtitle}>Subject Roadmaps & Study Guides</Text>
            <View style={styles.divider} />
            
            {/* Semester Overview Stats */}
            <View style={styles.semesterStatsContainer}>
              <View style={styles.semesterStatCard}>
                <Ionicons name="book" size={28} color={colors.primary} />
                <Text style={styles.semesterStatNumber}>{semesterStats.totalLectures}</Text>
                <Text style={styles.semesterStatLabel}>Total Lectures</Text>
              </View>
              <View style={styles.semesterStatCard}>
                <MaterialIcons name="science" size={28} color={colors.success} />
                <Text style={styles.semesterStatNumber}>{semesterStats.totalLabs}</Text>
                <Text style={styles.semesterStatLabel}>Total Labs</Text>
              </View>
              <View style={styles.semesterStatCard}>
                <MaterialIcons name="school" size={28} color={colors.warning} />
                <Text style={styles.semesterStatNumber}>{semesterStats.totalSubjects}</Text>
                <Text style={styles.semesterStatLabel}>Subjects</Text>
              </View>
              <View style={styles.semesterStatCard}>
                <Ionicons name="star" size={28} color={colors.error} />
                <Text style={styles.semesterStatNumber}>{semesterStats.totalCredits}</Text>
                <Text style={styles.semesterStatLabel}>Credits</Text>
              </View>
            </View>
          </View>

          {subjects.map((subject, index) => (
            <View key={subject.id} style={[globalStyles.card, styles.subjectCard]}>
              <LinearGradient
                colors={['rgba(99, 102, 241, 0.05)', 'rgba(99, 102, 241, 0.02)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.subjectNumberBadge}>
                    <Text style={styles.subjectNumber}>{index + 1}</Text>
                  </View>
                  <View style={styles.subjectHeaderContent}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <View style={styles.creditsContainer}>
                      <Ionicons name="star" size={14} color={colors.primary} style={{marginRight: spacing.xs}} />
                      <Text style={styles.credits}>{subject.credits} Credits</Text>
                    </View>
                  </View>
                </View>
                
                {subject.description && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{subject.description}</Text>
                  </View>
                )}
              
                {(subject.teacher || subject.labTeacher) && (
                  <View style={styles.teacherSection}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md}}>
                      <MaterialIcons name="groups" size={18} color={colors.primary} style={{marginRight: spacing.xs}} />
                      <Text style={styles.sectionTitle}>Faculty</Text>
                    </View>
                    <View style={styles.teacherInfo}>
                      {subject.teacher && (
                        <View style={styles.teacherCard}>
                          <View style={styles.teacherIconContainer}>
                            <FontAwesome5 name="chalkboard-teacher" size={20} color={colors.primary} />
                          </View>
                          <View style={styles.teacherDetails}>
                            <Text style={styles.teacherLabel}>Lecture Teacher</Text>
                            <Text style={styles.teacherName}>{subject.teacher.name}</Text>
                            <Text style={styles.teacherDept}>{subject.teacher.department}</Text>
                          </View>
                        </View>
                      )}
                      {subject.labTeacher && (
                        <View style={styles.teacherCard}>
                          <View style={styles.teacherIconContainer}>
                            <MaterialIcons name="science" size={24} color={colors.primary} />
                          </View>
                          <View style={styles.teacherDetails}>
                            <Text style={styles.teacherLabel}>Lab Teacher</Text>
                            <Text style={styles.teacherName}>{subject.labTeacher.name}</Text>
                            <Text style={styles.teacherDept}>{subject.labTeacher.department}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )}

                <View style={styles.statsSection}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md}}>
                    <MaterialIcons name="analytics" size={18} color={colors.primary} style={{marginRight: spacing.xs}} />
                    <Text style={styles.sectionTitle}>Course Statistics</Text>
                  </View>
                  <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                      <View style={styles.statIconContainer}>
                        <Ionicons name="book" size={20} color={colors.primary} />
                      </View>
                      <Text style={styles.statNumber}>{subject.totalLectures || 0}</Text>
                      <Text style={styles.statLabel}>Lectures</Text>
                    </View>
                    <View style={styles.statCard}>
                      <View style={styles.statIconContainer}>
                        <MaterialIcons name="science" size={20} color={colors.primary} />
                      </View>
                      <Text style={styles.statNumber}>{subject.totalLabs || 0}</Text>
                      <Text style={styles.statLabel}>Labs</Text>
                    </View>
                    <View style={styles.statCard}>
                      <View style={styles.statIconContainer}>
                        <Ionicons name="star" size={20} color={colors.primary} />
                      </View>
                      <Text style={styles.statNumber}>{subject.credits}</Text>
                      <Text style={styles.statLabel}>Credits</Text>
                    </View>
                  </View>
                </View>

                {subject.prerequisites && subject.prerequisites.trim() && (
                  <View style={styles.infoSection}>
                    <View style={styles.infoHeader}>
                      <MaterialIcons name="checklist" size={20} color={colors.primary} style={{marginRight: spacing.sm}} />
                      <Text style={styles.infoTitle}>Prerequisites</Text>
                    </View>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoText}>{subject.prerequisites.trim()}</Text>
                    </View>
                  </View>
                )}

                {subject.roadmap && subject.roadmap.trim() && (
                  <View style={styles.roadmapSection}>
                    <LinearGradient
                      colors={['rgba(99, 102, 241, 0.08)', 'rgba(139, 92, 246, 0.08)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.roadmapGradient}
                    >
                      <View style={styles.roadmapHeader}>
                        <View style={styles.roadmapIconContainer}>
                          <MaterialIcons name="map" size={24} color={colors.text.white} />
                        </View>
                        <View style={styles.roadmapHeaderText}>
                          <Text style={styles.roadmapTitle}>Study Roadmap</Text>
                          <Text style={styles.roadmapSubtitle}>Your Learning Path</Text>
                        </View>
                      </View>
                      
                      <View style={styles.roadmapContent}>
                        {subject.roadmap.trim().split('\n').map((line, index) => {
                          const trimmedLine = line.trim();
                          if (!trimmedLine) return null;
                          
                          const cleanLine = trimmedLine.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
                          if (!cleanLine) return null;
                          
                          const isNumbered = /^\d+\./.test(cleanLine);
                          const isBullet = cleanLine.startsWith('•') || cleanLine.startsWith('-') || cleanLine.startsWith('✓');
                          const isWeekHeader = /Week\s+\d+/i.test(cleanLine);
                          
                          if (isWeekHeader) {
                            return (
                              <View key={index} style={styles.roadmapWeekHeader}>
                                <View style={styles.roadmapWeekIconContainer}>
                                  <MaterialIcons name="date-range" size={20} color={colors.primary} />
                                </View>
                                <Text style={styles.roadmapWeekText}>{cleanLine}</Text>
                              </View>
                            );
                          }
                          
                          return (
                            <View key={index} style={styles.roadmapItem}>
                              <View style={styles.roadmapBulletContainer}>
                                {isNumbered ? (
                                  <View style={styles.roadmapNumberBadge}>
                                    <Text style={styles.roadmapNumber}>{cleanLine.match(/^\d+/)[0]}</Text>
                                  </View>
                                ) : (
                                  <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                                )}
                              </View>
                              <Text style={styles.roadmapItemText}>
                                {isNumbered ? cleanLine.replace(/^\d+\.\s*/, '') : 
                                 isBullet ? cleanLine.replace(/^[•\-✓]\s*/, '') : 
                                 cleanLine}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      
                      <View style={styles.roadmapFooter}>
                        <Ionicons name="bulb-outline" size={16} color={colors.warning} />
                        <Text style={styles.roadmapFooterText}>
                          Follow this roadmap for structured learning
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                )}
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  headerBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontWeight: '800',
    fontSize: 28,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  semesterStatsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: rs(spacing.md),
  },
  semesterStatCard: {
    width: isSmallScreen ? '48%' : '23.5%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: rs(spacing.md),
    borderRadius: normalize(16),
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
    marginBottom: rs(spacing.md),
  },
  semesterStatNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 24,
    marginTop: spacing.xs,
    marginBottom: spacing.xs / 2,
  },
  semesterStatLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  subjectCard: {
    width: '100%',
    marginBottom: rs(spacing.xl),
    padding: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    width: '100%',
    padding: rs(spacing.lg),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  subjectNumberBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  subjectNumber: {
    ...typography.h3,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subjectHeaderContent: {
    flex: 1,
  },
  subjectName: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 22,
    marginBottom: spacing.sm,
    lineHeight: 28,
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  credits: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
    fontSize: 15,
    textAlign: 'justify',
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  teacherSection: {
    marginBottom: spacing.lg,
  },
  teacherInfo: {
    gap: spacing.md,
  },
  teacherCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  teacherIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  teacherDetails: {
    flex: 1,
  },
  teacherLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs / 2,
    fontWeight: '600',
  },
  teacherName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: spacing.xs / 2,
  },
  teacherDept: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontSize: 13,
  },
  statsSection: {
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 28,
    marginBottom: spacing.xs / 2,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  infoContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  infoText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
    fontSize: 15,
    textAlign: 'justify',
  },
  emptyText: {
    ...typography.h3,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  roadmapSection: {
    width: '135%',
    marginTop: rs(spacing.md),
    marginLeft: '-17.5%',
    borderRadius: normalize(20),
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  roadmapGradient: {
    width: '100%',
    padding: rs(spacing.xl),
  },
  roadmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  roadmapIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  roadmapHeaderText: {
    flex: 1,
  },
  roadmapTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 20,
    marginBottom: spacing.xs / 2,
  },
  roadmapSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  roadmapContent: {
    gap: spacing.md,
  },
  roadmapWeekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  roadmapWeekIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.text.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  roadmapWeekText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
  },
  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: spacing.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  roadmapBulletContainer: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  roadmapNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roadmapNumber: {
    ...typography.bodySmall,
    color: colors.text.white,
    fontWeight: '800',
    fontSize: 12,
  },
  roadmapItemText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 22,
    fontSize: 15,
  },
  roadmapFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.2)',
    gap: spacing.xs,
  },
  roadmapFooterText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default SubjectRoadmapScreen;
