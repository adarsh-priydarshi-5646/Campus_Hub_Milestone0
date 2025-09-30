import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import BackButton from '../components/BackButton';
import Button3D from '../components/3DButton';
import Card3D from '../components/3DCard';
import Icon3D from '../components/3DIcon';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    // Reset errors
    setErrors({});
    
    // Validation
    const newErrors = {};
    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Validation Error', Object.values(newErrors)[0]);
      return;
    }

    setLoading(true);
    const result = await register(name.trim(), email.trim().toLowerCase(), password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully! Welcome to MyCampusHub!');
      setTimeout(() => navigation.replace('Home'), 500);
    } else {
      Alert.alert('Signup Failed', result.error || 'Unable to create account. Please try again.');
    }
  };

  

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.backgroundContainer}>
            <View style={[styles.container, styles.maxWidth]}>
            <BackButton 
              onPress={() => navigation.navigate('Welcome')} 
              title="Back to Welcome"
            />
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <Ionicons name="school" size={48} color={colors.primary} />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join MyCampusHub and start your journey</Text>
              <View style={styles.welcomeBadge}>
                <Ionicons name="rocket" size={16} color={colors.primary} style={{marginRight: 6}} />
                <Text style={styles.badgeText}>Start Your Academic Journey</Text>
              </View>
            </View>

            <View style={styles.card}>
              
              <View style={styles.formSection}>
                <View style={styles.inputGroup}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs}}>
                    <Ionicons name="person" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Full Name</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput 
                      placeholder="Enter your full name" 
                      placeholderTextColor={colors.text.light}
                      value={name} 
                      onChangeText={(text) => {
                        setName(text);
                        if (errors.name) setErrors({...errors, name: null});
                      }} 
                      style={[
                        styles.textInput,
                        focusedInput === 'name' && styles.inputFocused,
                        errors.name && styles.inputError
                      ]}
                      autoCapitalize="words"
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      editable={!loading}
                      returnKeyType="next"
                    />
                  </View>
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

                <View style={styles.inputGroup}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs}}>
                    <MaterialIcons name="email" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Email Address</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput 
                      placeholder="Enter your email" 
                      placeholderTextColor={colors.text.light}
                      value={email} 
                      onChangeText={(text) => {
                        setEmail(text);
                        if (errors.email) setErrors({...errors, email: null});
                      }} 
                      style={[
                        styles.textInput,
                        focusedInput === 'email' && styles.inputFocused,
                        errors.email && styles.inputError
                      ]}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      editable={!loading}
                      returnKeyType="next"
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs}}>
                    <Ionicons name="lock-closed" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Password</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput 
                      placeholder="Create a password (min 6 characters)" 
                      placeholderTextColor={colors.text.light}
                      value={password} 
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors({...errors, password: null});
                      }} 
                      secureTextEntry 
                      style={[
                        styles.textInput,
                        focusedInput === 'password' && styles.inputFocused,
                        errors.password && styles.inputError
                      ]}
                      autoCapitalize="none"
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      editable={!loading}
                      returnKeyType="next"
                    />
                  </View>
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs}}>
                    <Ionicons name="lock-closed" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput 
                      placeholder="Re-enter your password" 
                      placeholderTextColor={colors.text.light}
                      value={confirmPassword} 
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errors.confirmPassword) setErrors({...errors, confirmPassword: null});
                      }} 
                      secureTextEntry 
                      style={[
                        styles.textInput,
                        focusedInput === 'confirmPassword' && styles.inputFocused,
                        errors.confirmPassword && styles.inputError
                      ]}
                      autoCapitalize="none"
                      onFocus={() => setFocusedInput('confirmPassword')}
                      onBlur={() => setFocusedInput(null)}
                      editable={!loading}
                      onSubmitEditing={handleSignup}
                      returnKeyType="go"
                    />
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
                
                <TouchableOpacity 
                  onPress={handleSignup} 
                  style={[globalStyles.button, styles.signupButton, loading && styles.disabledButton]}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text style={globalStyles.buttonText}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>

                
                
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Login')} 
                  style={styles.loginLink}
                  activeOpacity={0.7}
                >
                  <Text style={styles.loginText}>
                    Already have an account? <Text style={styles.loginTextBold}>Login</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Features Preview */}
            <View style={styles.featuresPreview}>
              <Text style={styles.featuresTitle}>What you'll get with MyCampusHub</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="book" size={20} color={colors.primary} style={{marginRight: 8}} />
                  <Text style={styles.featureText}>Study Materials</Text>
                </View>
                <View style={styles.featureItem}>
                  <FontAwesome5 name="chalkboard-teacher" size={18} color={colors.primary} style={{marginRight: 8}} />
                  <Text style={styles.featureText}>Faculty Connect</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="event" size={20} color={colors.primary} style={{marginRight: 8}} />
                  <Text style={styles.featureText}>Event Updates</Text>
                </View>
                <View style={styles.featureItem}>
                  <MaterialIcons name="restaurant-menu" size={20} color={colors.primary} style={{marginRight: 8}} />
                  <Text style={styles.featureText}>Mess Menu</Text>
                </View>
              </View>
            </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maxWidth: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: colors.background,
    minHeight: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    minHeight: '100%',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  logoIcon: {
    fontSize: 45,
    color: colors.text.white,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  welcomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginTop: spacing.sm,
  },
  badgeText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  formSection: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  inputLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    ...globalStyles.input,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: 16,
    backgroundColor: colors.background,
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    borderColor: colors.danger,
    borderWidth: 2,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.danger,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
  signupButton: {
    backgroundColor: colors.success,
    marginTop: spacing.md,
    shadowColor: colors.success,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  loginText: {
    ...typography.body,
    color: colors.primary,
  },
  loginTextBold: {
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.bodySmall,
    color: colors.text.light,
    marginHorizontal: spacing.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  githubButton: {
    backgroundColor: '#24292e',
    borderColor: '#24292e',
  },
  socialButtonIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  socialButtonText: {
    ...typography.body,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: colors.text.light,
  },
  featuresPreview: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  featuresTitle: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    width: '45%',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  featureText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignupScreen;
