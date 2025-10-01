import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { fetchTeacherById } from '../services/api';
import { globalStyles, colors, typography, spacing, responsiveTypography, isSmallScreen } from '../styles/globalStyles';
import { wp, hp, normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const FacultyDetailScreen = ({ route, navigation }) => {
  const { teacherId } = route.params;
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTeacherDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchTeacherById(teacherId);
      setTeacher(res.data);
    } catch (err) {
      console.error('Error loading teacher details:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load teacher details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeacherDetails();
  }, [teacherId]);

  const handleLinkedInPress = () => {
    if (teacher?.linkedin) {
      Linking.openURL(teacher.linkedin).catch(() => {
        Alert.alert('Error', 'Could not open LinkedIn profile');
      });
    }
  };

  const handleEmailPress = () => {
    if (teacher?.contact) {
      Linking.openURL(`mailto:${teacher.contact}`).catch(() => {
        Alert.alert('Error', 'Could not open email client');
      });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading teacher details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadTeacherDetails} />;
  }

  if (!teacher) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.errorContainer}>
          <FontAwesome5 name="chalkboard-teacher" size={64} color={colors.text.secondary} style={{marginBottom: spacing.lg}} />
          <Text style={globalStyles.errorTitle}>Teacher Not Found</Text>
          <Text style={globalStyles.errorMessage}>
            The requested teacher information is not available.
          </Text>
          <BackButton onPress={() => navigation.goBack()} title="Back" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} title="Back to Faculty" />
          
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: teacher.image || 'https://via.placeholder.com/150' }}
                style={styles.profileImage}
                defaultSource={require('../assets/icon.png')}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.teacherName}>{teacher.name}</Text>
              <Text style={styles.designation}>{teacher.designation}</Text>
              <Text style={styles.department}>{teacher.department}</Text>
            </View>
          </View>

          {/* Contact Actions */}
          <View style={styles.contactActions}>
            {teacher.linkedin && (
              <TouchableOpacity
                style={[styles.contactButton, styles.linkedinButton]}
                onPress={handleLinkedInPress}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-linkedin" size={20} color={colors.text.white} style={{marginRight: 8}} />
                <Text style={styles.contactText}>LinkedIn</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bio Section */}
          {teacher.bio && (
            <View style={globalStyles.card}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bioText}>{teacher.bio}</Text>
            </View>
          )}

          {/* Experience Section */}
          {teacher.experience && (
            <View style={globalStyles.card}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.detailRow}>
                <FontAwesome5 name="briefcase" size={18} color={colors.primary} style={{marginRight: 12, width: 20}} />
                <Text style={styles.detailText}>{teacher.experience}</Text>
              </View>
            </View>
          )}

          {/* Education Section */}
          {teacher.education && (
            <View style={globalStyles.card}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.detailRow}>
                <Ionicons name="school" size={20} color={colors.primary} style={{marginRight: 12, width: 20}} />
                <Text style={styles.detailText}>{teacher.education}</Text>
              </View>
            </View>
          )}

          {/* Contact Information */}
          <View style={globalStyles.card}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="business" size={20} color={colors.primary} style={{marginRight: 12, width: 20}} />
              <Text style={styles.detailText}>{teacher.department}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome5 name="user-tie" size={18} color={colors.primary} style={{marginRight: 12, width: 20}} />
              <Text style={styles.detailText}>{teacher.designation}</Text>
            </View>
          </View>

          {/* Subjects Taught */}
          <View style={globalStyles.card}>
            <Text style={styles.sectionTitle}>Subjects Taught</Text>
            {teacher.subjects && teacher.subjects.length > 0 ? (
              teacher.subjects.map((subject, index) => (
                <View key={index} style={styles.subjectItem}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectDetails}>
                    {subject.totalLectures} lectures • {subject.totalLabs} labs • {subject.credits} credits
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSubjectsText}>No subjects assigned yet</Text>
            )}
          </View>

          {/* Lab Subjects */}
          {teacher.labSubjects && teacher.labSubjects.length > 0 && (
            <View style={globalStyles.card}>
              <Text style={styles.sectionTitle}>Lab Subjects</Text>
              {teacher.labSubjects.map((subject, index) => (
                <View key={index} style={styles.subjectItem}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectDetails}>
                    {subject.totalLectures} lectures • {subject.totalLabs} labs • {subject.credits} credits
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  container: {
    padding: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  imageContainer: {
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  profileInfo: {
    alignItems: 'center',
  },
  teacherName: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  designation: {
    ...typography.h4,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  department: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 25,
    minWidth: 120,
    justifyContent: 'center',
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
  },
  contactIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  contactText: {
    ...typography.body,
    color: colors.text.white,
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  bioText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  detailIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  detailText: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
  subjectItem: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  subjectName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subjectDetails: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  noSubjectsText: {
    ...typography.body,
    color: colors.text.light,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
});

export default FacultyDetailScreen;
