import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchFaculty } from '../services/api';
import { globalStyles, colors, typography, spacing,} from '../styles/globalStyles';
import { rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import AnimatedCard from '../components/AnimatedCard';
const FacultyScreen = ({ navigation }) => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchFaculty();
      console.log('Faculty response:', res.data);
      setFaculty(res.data);
    } catch (err) {
      console.error('Error loading faculty:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load faculty. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={globalStyles.loadingContainer}>
          <Text style={styles.loadingText}>Loading faculty...</Text>
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
          <Text style={styles.title}>Faculty</Text>
          <Text style={styles.subtitle}>Meet our teaching staff</Text>
        </View>
        
        {faculty.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="school" size={64} color={colors.text.secondary} style={{marginBottom: spacing.lg}} />
            <Text style={styles.emptyTitle}>No Faculty Found</Text>
            <Text style={styles.emptyMessage}>
              Faculty information is not available at the moment.
            </Text>
          </View>
        ) : (
          <FlatList
            data={faculty}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AnimatedCard 
                style={styles.facultyCard}
                animationType="lift"
              >
                <TouchableOpacity 
                  onPress={() => navigation.navigate('FacultyDetail', { teacherId: item.id })}
                  activeOpacity={0.8}
                >
                <View style={styles.facultyInfo}>
                  <View style={styles.facultyHeader}>
                    <View style={styles.facultyTextInfo}>
                      <Text style={styles.facultyName}>{item.name}</Text>
                      <Text style={styles.facultyDesignation}>{item.designation}</Text>
                      <Text style={styles.facultyDepartment}>{item.department}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <Text style={styles.arrow}>→</Text>
                    </View>
                  </View>
                  <Text style={styles.facultyContact}>{item.contact}</Text>
                  {item.subjects && item.subjects.length > 0 && (
                    <View style={styles.subjectsContainer}>
                      <Text style={styles.subjectsTitle}>Subjects:</Text>
                      {item.subjects.slice(0, 2).map((subject, index) => (
                        <Text key={index} style={styles.subjectName}>
                          • {subject.name}
                        </Text>
                      ))}
                      {item.subjects.length > 2 && (
                        <Text style={styles.moreSubjects}>
                          +{item.subjects.length - 2} more subjects
                        </Text>
                      )}
                    </View>
                  )}
                </View>
                </TouchableOpacity>
              </AnimatedCard>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  listContainer: {
    paddingBottom: rs(spacing.xl),
  },
  facultyCard: {
    width: '100%',
    marginBottom: rs(spacing.md),
    padding: rs(spacing.lg),
  },
  facultyInfo: {
    gap: spacing.sm,
  },
  facultyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  facultyTextInfo: {
    flex: 1,
  },
  facultyName: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  facultyDesignation: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  facultyDepartment: {
    ...typography.bodySmall,
    color: colors.text.secondary,
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
  facultyContact: {
    ...typography.body,
    color: colors.text.secondary,
  },
  subjectsContainer: {
    marginTop: spacing.sm,
  },
  subjectsTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  subjectName: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  moreSubjects: {
    ...typography.bodySmall,
    color: colors.primary,
    fontStyle: 'italic',
    marginLeft: spacing.sm,
    marginTop: spacing.xs,
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

export default FacultyScreen;
