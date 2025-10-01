import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { fetchSemesterDetails } from '../services/api';
import { globalStyles, colors, typography, spacing, responsiveTypography, isSmallScreen } from '../styles/globalStyles';
import { wp, hp, normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';

const SemesterDetailsScreen = ({ route, navigation }) => {
  const { semesterId, semesterName } = route.params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await fetchSemesterDetails(semesterId);
        console.log('Semester details response:', res.data);
        setDetails(res.data);
      } catch (err) {
        console.error('Error loading semester details:', err);
        // You could add error state handling here if needed
      }
    };
    
    loadDetails();
  }, [semesterId]);

  if(!details) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading details...</Text>
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
          <BackButton 
            onPress={() => navigation.goBack()} 
            title="Back to Semesters"
          />
          <View style={styles.header}>
            <Text style={styles.title}>{semesterName}</Text>
            <Text style={styles.subtitle}>Semester Details</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subjects</Text>
            {details.subjects.map(sub => (
              <View key={sub.id} style={[globalStyles.card, styles.subjectCard]}>
                <Text style={styles.subjectName}>{sub.name}</Text>
                <View style={styles.subjectDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Teacher:</Text>
                    <Text style={styles.detailValue}>{sub.teacher.name}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Lectures:</Text>
                    <Text style={styles.detailValue}>{sub.totalLectures}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Labs:</Text>
                    <Text style={styles.detailValue}>{sub.totalLabs}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exams</Text>
            <View style={[globalStyles.card, styles.examCard]}>
              {details.midSem && (
                <View style={styles.examItem}>
                  <Text style={styles.examLabel}>Mid-Semester Exam</Text>
                  <Text style={styles.examDate}>
                    {new Date(details.midSem.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              )}
              {details.endSem && (
                <View style={styles.examItem}>
                  <Text style={styles.examLabel}>End-Semester Exam</Text>
                  <Text style={styles.examDate}>
                    {new Date(details.endSem.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              )}
              {!details.midSem && !details.endSem && (
                <Text style={styles.noExamText}>No exam dates available</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  subjectCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  subjectName: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  subjectDetails: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '500',
    width: 80,
  },
  detailValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
  },
  examCard: {
    padding: spacing.lg,
  },
  examItem: {
    marginBottom: spacing.lg,
  },
  examLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  examDate: {
    ...typography.body,
    color: colors.text.primary,
  },
  noExamText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
});

export default SemesterDetailsScreen;
