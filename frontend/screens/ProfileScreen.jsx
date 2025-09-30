import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
  TextInput,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import BackButton from '../components/BackButton';
import { useAuth } from '../contexts/AuthContext';
import { apiUpdateProfile } from '../services/api';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, updateUser } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editRollNumber, setEditRollNumber] = useState('NST2021CS001');
  const [editBranch, setEditBranch] = useState('Computer Science & Engineering');
  const [editSemester, setEditSemester] = useState('6th Semester');
  const [editSection, setEditSection] = useState('A');
  
  const [skills, setSkills] = useState([
    'React Native', 'JavaScript', 'Python', 'Java',
    'Node.js', 'MongoDB', 'Git', 'Problem Solving'
  ]);
  const [newSkill, setNewSkill] = useState('');
  
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Best Project Award', year: '2023', icon: 'trophy' },
    { id: 2, title: 'Hackathon Winner', year: '2023', icon: 'code' },
    { id: 3, title: 'Academic Excellence', year: '2022', icon: 'school' },
    { id: 4, title: 'Sports Champion', year: '2022', icon: 'medal' }
  ]);
  const [newAchievement, setNewAchievement] = useState({ title: '', year: '', icon: 'trophy' });

  const studentProfile = {
    name: user?.name || 'Student Name',
    email: user?.email || 'student@newtontech.edu.in',
    rollNumber: 'NST2021CS001',
    branch: 'Computer Science & Engineering',
    semester: '6th Semester',
    batch: '2021-2025',
    section: 'A',
    
    academic: {
      cgpa: '8.5',
      attendance: '92%',
      creditsCompleted: 140,
      totalCredits: 180,
      rank: 12,
      totalStudents: 240
    },
    
    achievements: [
      { title: 'Best Project Award', year: '2023', icon: 'trophy' },
      { title: 'Hackathon Winner', year: '2023', icon: 'code' },
      { title: 'Academic Excellence', year: '2022', icon: 'school' },
      { title: 'Sports Champion', year: '2022', icon: 'medal' }
    ],
    
    skills: [
      'React Native', 'JavaScript', 'Python', 'Java',
      'Node.js', 'MongoDB', 'Git', 'Problem Solving'
    ],
    
    activities: [
      { name: 'Tech Club', role: 'Member', icon: 'laptop' },
      { name: 'Sports Team', role: 'Player', icon: 'football' },
      { name: 'Cultural Committee', role: 'Volunteer', icon: 'musical-notes' }
    ]
  };
  
  useEffect(() => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    requestImagePermissions();
  }, [user]);

  const requestImagePermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photos to upload profile picture.');
    }
  };

  const compressImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const sizeInMB = blob.size / (1024 * 1024);
      
      if (sizeInMB > 5) {
        Alert.alert('Image Too Large', 'Please select an image smaller than 5MB');
        return null;
      }
      
      return uri;
    } catch (error) {
      if (__DEV__) console.error('Error checking image size:', error);
      return uri;
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        if (compressedUri) {
          setProfileImage(compressedUri);
          Alert.alert('Success', 'Profile picture updated!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow camera access to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        if (compressedUri) {
          setProfileImage(compressedUri);
          Alert.alert('Success', 'Profile picture updated!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: handleTakePhoto },
        { text: 'Choose from Library', onPress: handlePickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: async () => {
            try {
              const success = await logout();
              if (success) {
                if (__DEV__) console.log('ProfileScreen: Logout successful');
              } else {
                Alert.alert('Error', 'Failed to logout. Please try again.');
              }
            } catch (error) {
              if (__DEV__) console.error('ProfileScreen: Logout error:', error);
              Alert.alert('Error', 'An error occurred during logout.');
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditRollNumber(editRollNumber);
    setEditBranch(editBranch);
    setEditSemester(editSemester);
    setEditSection(editSection);
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    if (!editEmail.trim()) {
      Alert.alert('Error', 'Email cannot be empty');
      return;
    }

    try {
      const profileData = {
        name: editName.trim(),
        email: editEmail.trim(),
        rollNumber: editRollNumber,
        branch: editBranch,
        semester: editSemester,
        section: editSection,
        skills,
        achievements,
        profileImage,
      };

      const result = await updateUser(profileData);
      
      if (result.success) {
        Alert.alert('Success', 'Profile updated successfully in database!');
        setShowEditModal(false);
      } else {
        Alert.alert('Error', result.error || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    Alert.alert(
      'Remove Skill',
      'Are you sure you want to remove this skill?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            const updatedSkills = skills.filter((_, i) => i !== index);
            setSkills(updatedSkills);
          }
        }
      ]
    );
  };

  const handleAddAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.year.trim()) {
      const achievement = {
        id: achievements.length + 1,
        ...newAchievement
      };
      setAchievements([...achievements, achievement]);
      setNewAchievement({ title: '', year: '', icon: 'trophy' });
      setShowAchievementsModal(false);
      Alert.alert('Success', 'Achievement added!');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  const handleRemoveAchievement = (id) => {
    Alert.alert(
      'Remove Achievement',
      'Are you sure you want to remove this achievement?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            const updatedAchievements = achievements.filter(a => a.id !== id);
            setAchievements(updatedAchievements);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ScrollView 
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BackButton 
          onPress={() => navigation.navigate('Home')} 
          title="Back to Home"
        />

        {/* Profile Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(editName || studentProfile.name).charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={handleImageUpload}
            >
              <Ionicons name="camera" size={16} color={colors.text.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{studentProfile.name}</Text>
          <Text style={styles.userEmail}>{studentProfile.email}</Text>
          <Text style={styles.rollNumber}>{studentProfile.rollNumber}</Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="school" size={14} color={colors.primary} />
              <Text style={styles.badgeText}>Student</Text>
            </View>
            <View style={[styles.badge, styles.activeBadge]}>
              <Ionicons name="checkmark-circle" size={14} color={colors.text.white} />
              <Text style={[styles.badgeText, { color: colors.text.white }]}>Active</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Academic Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name="graduation-cap" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Academic Information</Text>
          </View>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Branch</Text>
              <Text style={styles.infoValue}>{studentProfile.branch}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Semester</Text>
              <Text style={styles.infoValue}>{studentProfile.semester}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Batch</Text>
              <Text style={styles.infoValue}>{studentProfile.batch}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Section</Text>
              <Text style={styles.infoValue}>{studentProfile.section}</Text>
            </View>
          </View>
        </View>

        {/* Performance Stats */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="analytics" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Academic Performance</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#dbeafe' }]}>
                <MaterialIcons name="grade" size={28} color="#3b82f6" />
              </View>
              <Text style={styles.statValue}>{studentProfile.academic.cgpa}</Text>
              <Text style={styles.statLabel}>CGPA</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#d1fae5' }]}>
                <Ionicons name="calendar" size={28} color="#10b981" />
              </View>
              <Text style={styles.statValue}>{studentProfile.academic.attendance}</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#fef3c7' }]}>
                <FontAwesome5 name="trophy" size={24} color="#f59e0b" />
              </View>
              <Text style={styles.statValue}>#{studentProfile.academic.rank}</Text>
              <Text style={styles.statLabel}>Class Rank</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#e0e7ff' }]}>
                <MaterialIcons name="school" size={28} color="#6366f1" />
              </View>
              <Text style={styles.statValue}>{studentProfile.academic.creditsCompleted}/{studentProfile.academic.totalCredits}</Text>
              <Text style={styles.statLabel}>Credits</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Achievements & Awards</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAchievementsModal(true)}
            >
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Ionicons name={achievement.icon} size={20} color={colors.warning} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementYear}>{achievement.year}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveAchievement(achievement.id)}>
                <Ionicons name="close-circle" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="code" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Skills & Technologies</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowSkillsModal(true)}
            >
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.skillChip}
                onLongPress={() => handleRemoveSkill(index)}
              >
                <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                <Text style={styles.skillText}>{skill}</Text>
                <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
                  <Ionicons name="close" size={14} color={colors.text.secondary} style={{marginLeft: 4}} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Activities */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="groups" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Extra-Curricular Activities</Text>
          </View>
          {studentProfile.activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name={activity.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text style={styles.activityRole}>{activity.role}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="settings" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Settings & Preferences</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notificationsEnabled ? colors.primary : colors.text.light}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color={colors.primary} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={darkModeEnabled ? colors.primary : colors.text.light}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="dashboard" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Quick Actions</Text>
          </View>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Ionicons name="person" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={20} color={colors.primary} />
            <Text style={styles.actionText}>View Marksheet</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="payment" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Fee Payment</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out" size={20} color={colors.text.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>MyCampusHub v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 Newton School of Technology</Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.text.light}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.text.light}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Roll Number</Text>
                <TextInput
                  style={styles.input}
                  value={editRollNumber}
                  onChangeText={setEditRollNumber}
                  placeholder="Enter roll number"
                  placeholderTextColor={colors.text.light}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Branch</Text>
                <TextInput
                  style={styles.input}
                  value={editBranch}
                  onChangeText={setEditBranch}
                  placeholder="Enter branch"
                  placeholderTextColor={colors.text.light}
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Skills Modal */}
      <Modal
        visible={showSkillsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSkillsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Skill</Text>
              <TouchableOpacity onPress={() => setShowSkillsModal(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Skill Name</Text>
                <TextInput
                  style={styles.input}
                  value={newSkill}
                  onChangeText={setNewSkill}
                  placeholder="e.g., React Native, Python"
                  placeholderTextColor={colors.text.light}
                  onSubmitEditing={handleAddSkill}
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => {
                  handleAddSkill();
                  setShowSkillsModal(false);
                }}
              >
                <Ionicons name="add" size={20} color={colors.text.white} style={{marginRight: 8}} />
                <Text style={styles.saveButtonText}>Add Skill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Achievement Modal */}
      <Modal
        visible={showAchievementsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAchievementsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Achievement</Text>
              <TouchableOpacity onPress={() => setShowAchievementsModal(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Achievement Title</Text>
                <TextInput
                  style={styles.input}
                  value={newAchievement.title}
                  onChangeText={(text) => setNewAchievement({...newAchievement, title: text})}
                  placeholder="e.g., Best Project Award"
                  placeholderTextColor={colors.text.light}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={newAchievement.year}
                  onChangeText={(text) => setNewAchievement({...newAchievement, year: text})}
                  placeholder="e.g., 2023"
                  placeholderTextColor={colors.text.light}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Icon</Text>
                <View style={styles.iconSelector}>
                  {['trophy', 'medal', 'star', 'ribbon', 'code', 'school'].map((iconName) => (
                    <TouchableOpacity
                      key={iconName}
                      style={[
                        styles.iconOption,
                        newAchievement.icon === iconName && styles.iconOptionSelected
                      ]}
                      onPress={() => setNewAchievement({...newAchievement, icon: iconName})}
                    >
                      <Ionicons name={iconName} size={24} color={newAchievement.icon === iconName ? colors.primary : colors.text.secondary} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddAchievement}
              >
                <Ionicons name="add" size={20} color={colors.text.white} style={{marginRight: 8}} />
                <Text style={styles.saveButtonText}>Add Achievement</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
    padding: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: 24,
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.text.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    ...typography.h1,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 42,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.text.white,
  },
  userName: {
    ...typography.h2,
    color: colors.text.white,
    fontWeight: '800',
    marginBottom: spacing.xs / 2,
  },
  userEmail: {
    ...typography.body,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.xs / 2,
  },
  rollNumber: {
    ...typography.body,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: 4,
  },
  activeBadge: {
    backgroundColor: colors.success,
  },
  badgeText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
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
    flex: 1,
  },
  addButton: {
    padding: spacing.xs,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  infoItem: {
    width: '48%',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  infoValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '800',
    marginBottom: spacing.xs / 2,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementYear: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  skillText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityRole: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  actionText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutText: {
    ...typography.body,
    color: colors.text.white,
    fontWeight: '700',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  appVersion: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  appCopyright: {
    ...typography.bodySmall,
    color: colors.text.light,
    marginTop: spacing.xs / 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  modalBody: {
    padding: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.text.primary,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  saveButtonText: {
    ...typography.body,
    color: colors.text.white,
    fontWeight: '700',
  },
  iconSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  iconOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
});



export default ProfileScreen;
