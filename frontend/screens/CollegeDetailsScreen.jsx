import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { fetchCollegeDetails } from '../services/api';
import { globalStyles, colors, typography, spacing,isSmallScreen } from '../styles/globalStyles';
import { normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import LoadingSpinner from '../components/LoadingSpinner';

const CollegeDetailsScreen = ({ navigation }) => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Newton School of Technology Details
  const newtonDetails = {
    name: "Newton School of Technology",
    tagline: "Empowering Future Innovators",
    established: "2010",
    location: "Bhubaneswar, Odisha",
    affiliation: "Biju Patnaik University of Technology (BPUT)",
    accreditation: "NAAC A+ Grade",
    
    about: "Newton School of Technology is a premier engineering institution dedicated to providing world-class technical education. With state-of-the-art infrastructure and experienced faculty, we nurture innovation, creativity, and excellence in our students. Our focus on practical learning, industry partnerships, and holistic development ensures that our graduates are industry-ready and globally competitive.",
    
    vision: "To be a globally recognized center of excellence in technical education, fostering innovation, research, and entrepreneurship.",
    
    mission: [
      "Provide quality education with emphasis on practical learning",
      "Foster research and innovation in emerging technologies",
      "Develop industry-ready professionals with strong ethical values",
      "Promote entrepreneurship and leadership skills"
    ],
    
    departments: [
      { name: "Computer Science & Engineering", icon: "laptop", students: 240 },
      { name: "Electronics & Communication", icon: "hardware-chip", students: 180 },
      { name: "Mechanical Engineering", icon: "construct", students: 120 },
      { name: "Civil Engineering", icon: "business", students: 90 },
      { name: "Electrical Engineering", icon: "flash", students: 120 }
    ],
    
    facilities: [
      { name: "Modern Laboratories", icon: "flask", description: "Well-equipped labs with latest equipment" },
      { name: "Digital Library", icon: "library", description: "10,000+ books and e-resources" },
      { name: "Smart Classrooms", icon: "desktop", description: "AC classrooms with projectors" },
      { name: "Sports Complex", icon: "football", description: "Indoor & outdoor sports facilities" },
      { name: "Hostel", icon: "bed", description: "Separate hostels for boys and girls" },
      { name: "Cafeteria", icon: "restaurant", description: "Hygienic food at affordable prices" },
      { name: "Wi-Fi Campus", icon: "wifi", description: "24x7 high-speed internet" },
      { name: "Placement Cell", icon: "briefcase", description: "Dedicated placement support" }
    ],
    
    achievements: [
      "95% Placement Record",
      "Top 50 Engineering Colleges in Eastern India",
      "Research Publications in International Journals",
      "Winner of Multiple Hackathons & Competitions"
    ],
    
    contact: {
      phone: "+91-674-XXXX-XXX",
      email: "info@newtontech.edu.in",
      website: "www.newtontech.edu.in",
      address: "Plot No. 123, Chandrasekharpur, Bhubaneswar, Odisha - 751016"
    }
  };

  const loadCollegeDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchCollegeDetails();
      setCollege(res.data || newtonDetails);
    } catch (err) {
      if (__DEV__) console.error('Error loading college details:', err);
      // Use Newton details as fallback
      setCollege(newtonDetails);
    } finally {
      setLoading(false);
    }
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${newtonDetails.contact.phone}`).catch(() => {
      Alert.alert('Error', 'Could not open phone dialer');
    });
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${newtonDetails.contact.email}`).catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  const handleWebsitePress = () => {
    Linking.openURL(`https://${newtonDetails.contact.website}`).catch(() => {
      Alert.alert('Error', 'Could not open website');
    });
  };

  useEffect(() => {
    loadCollegeDetails();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading college details..." />;
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BackButton onPress={() => navigation.goBack()} title="Back to Home" />
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="university" size={40} color={colors.primary} />
          </View>
          <Text style={styles.title}>{newtonDetails.name}</Text>
          <Text style={styles.tagline}>{newtonDetails.tagline}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Ionicons name="star" size={14} color={colors.primary} style={{marginRight: 4}} />
              <Text style={styles.badgeText}>{newtonDetails.accreditation}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="school" size={14} color={colors.primary} style={{marginRight: 4}} />
              <Text style={styles.badgeText}>BPUT Affiliated</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={32} color={colors.primary} />
            <Text style={styles.statNumber}>750+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="chalkboard-teacher" size={28} color={colors.success} />
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Faculty</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="business-center" size={32} color={colors.warning} />
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Placement</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={32} color={colors.error} />
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>About Us</Text>
          </View>
          <Text style={styles.description}>{newtonDetails.about}</Text>
        </View>

        {/* Vision & Mission */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="eye" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Our Vision</Text>
          </View>
          <Text style={styles.description}>{newtonDetails.vision}</Text>
          
          <View style={[styles.cardHeader, {marginTop: spacing.lg}]}>
            <Ionicons name="flag" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Our Mission</Text>
          </View>
          {newtonDetails.mission.map((item, index) => (
            <View key={index} style={styles.missionItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={styles.missionText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Departments */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="school" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Departments</Text>
          </View>
          {newtonDetails.departments.map((dept, index) => (
            <View key={index} style={styles.deptItem}>
              <View style={styles.deptIconContainer}>
                <Ionicons name={dept.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.deptContent}>
                <Text style={styles.deptName}>{dept.name}</Text>
                <Text style={styles.deptStudents}>{dept.students} Students</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Facilities */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="apartment" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Facilities & Infrastructure</Text>
          </View>
          <View style={styles.facilitiesGrid}>
            {newtonDetails.facilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <View style={styles.facilityIconContainer}>
                  <Ionicons name={facility.icon} size={24} color={colors.primary} />
                </View>
                <Text style={styles.facilityName}>{facility.name}</Text>
                <Text style={styles.facilityDesc}>{facility.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Achievements & Recognition</Text>
          </View>
          {newtonDetails.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Ionicons name="star" size={18} color={colors.warning} />
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="call" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Contact Us</Text>
          </View>
          
          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="call" size={20} color={colors.text.white} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{newtonDetails.contact.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <View style={styles.contactIconContainer}>
              <MaterialIcons name="email" size={20} color={colors.text.white} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{newtonDetails.contact.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="globe" size={20} color={colors.text.white} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>{newtonDetails.contact.website}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="location" size={20} color={colors.text.white} />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>{newtonDetails.contact.address}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Established in {newtonDetails.established}</Text>
          <Text style={styles.footerSubtext}>{newtonDetails.location}</Text>
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
    marginBottom: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.xl,
    borderRadius: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.text.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    ...typography.h1,
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontWeight: '800',
  },
  tagline: {
    ...typography.body,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  badgeText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '800',
    marginTop: spacing.xs,
    marginBottom: 2,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
    textAlign: 'justify',
  },
  missionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  missionText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 22,
  },
  deptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  deptIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  deptContent: {
    flex: 1,
  },
  deptName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  deptStudents: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  facilitiesGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  facilityItem: {
    width: isSmallScreen ? '48%' : '48.5%',
    backgroundColor: colors.background,
    borderRadius: normalize(16),
    padding: rs(spacing.md),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: rs(spacing.md),
  },
  facilityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  facilityName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  facilityDesc: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 11,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  achievementText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  footerSubtext: {
    ...typography.bodySmall,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
});

export default CollegeDetailsScreen;
