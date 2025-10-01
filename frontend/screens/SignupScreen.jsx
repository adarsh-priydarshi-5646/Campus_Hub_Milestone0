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
import { globalStyles, colors, typography, spacing, responsiveTypography, responsiveSpacing, isSmallScreen } from '../styles/globalStyles';
import { wp, hp, normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import Button3D from '../components/3DButton';
import Card3D from '../components/3DCard';
import Icon3D from '../components/3DIcon';
import AnimatedBackground from '../components/AnimatedBackground';
import Toast from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
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
      setToast({ visible: true, message: Object.values(newErrors)[0], type: 'error' });
      return;
    }

    setLoading(true);
    const result = await register(name.trim(), email.trim().toLowerCase(), password);
    setLoading(false);

    if (result.success) {
      setToast({ visible: true, message: 'Account created successfully! Welcome to MyCampusHub!', type: 'success' });
      setTimeout(() => navigation.replace('Home'), 1500);
    } else {
      setToast({ visible: true, message: result.error || 'Unable to create account. Please try again.', type: 'error' });
    }
  };

  

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Toast 
        visible={toast.visible} 
        message={toast.message} 
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
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
                <Ionicons name="school" size={56} color={colors.text.white} />
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
                  <View style={styles.labelContainer}>
                    <Ionicons name="person" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Full Name</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Ionicons 
                      name="person" 
                      size={20} 
                      color={focusedInput === 'name' ? colors.primary : colors.text.light} 
                      style={styles.inputIcon}
                    />
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
                        styles.textInputWithIcon,
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
                  <View style={styles.labelContainer}>
                    <MaterialIcons name="email" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Email Address</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Ionicons 
                      name="mail" 
                      size={20} 
                      color={focusedInput === 'email' ? colors.primary : colors.text.light} 
                      style={styles.inputIcon}
                    />
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
                        styles.textInputWithIcon,
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
                  <View style={styles.labelContainer}>
                    <Ionicons name="lock-closed" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Password</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Ionicons 
                      name="lock-closed" 
                      size={20} 
                      color={focusedInput === 'password' ? colors.primary : colors.text.light} 
                      style={styles.inputIcon}
                    />
                    <TextInput 
                      placeholder="Create a password (min 6 characters)" 
                      placeholderTextColor={colors.text.light}
                      value={password} 
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors({...errors, password: null});
                      }} 
                      secureTextEntry={!showPassword}
                      style={[
                        styles.textInput,
                        styles.textInputWithIcon,
                        focusedInput === 'password' && styles.inputFocused,
                        errors.password && styles.inputError
                      ]}
                      autoCapitalize="none"
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      editable={!loading}
                      returnKeyType="next"
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)} 
                      style={styles.eyeIcon}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-off" : "eye"} 
                        size={20} 
                        color={colors.text.light} 
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="lock-closed" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Ionicons 
                      name="lock-closed" 
                      size={20} 
                      color={focusedInput === 'confirmPassword' ? colors.primary : colors.text.light} 
                      style={styles.inputIcon}
                    />
                    <TextInput 
                      placeholder="Re-enter your password" 
                      placeholderTextColor={colors.text.light}
                      value={confirmPassword} 
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errors.confirmPassword) setErrors({...errors, confirmPassword: null});
                      }} 
                      secureTextEntry={!showConfirmPassword}
                      style={[
                        styles.textInput,
                        styles.textInputWithIcon,
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
                    <TouchableOpacity 
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                      style={styles.eyeIcon}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons 
                        name={showConfirmPassword ? "eye-off" : "eye"} 
                        size={20} 
                        color={colors.text.light} 
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
                
                <TouchableOpacity 
                  onPress={handleSignup} 
                  style={[styles.signupButton, loading && styles.disabledButton]}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Ionicons name={loading ? "reload" : "person-add"} size={20} color={colors.text.white} style={{marginRight: 8}} />
                  <Text style={styles.signupButtonText}>
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
    alignSelf: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  backgroundContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    minHeight: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: rs(spacing.lg),
    paddingVertical: rs(spacing.xl),
    minHeight: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: normalize(20),
    padding: rs(spacing.xl),
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
    width: '100%',
    alignItems: 'center',
    marginBottom: rs(spacing.xl),
  },
  logoContainer: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(spacing.lg),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(spacing.xs),
  },
  logoIcon: {
    fontSize: 45,
    color: colors.text.white,
  },
  title: {
    ...responsiveTypography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: rs(spacing.sm),
    fontWeight: '800',
  },
  subtitle: {
    ...responsiveTypography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: normalize(22),
    marginBottom: rs(spacing.md),
  },
  welcomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: rs(spacing.md),
    paddingVertical: rs(spacing.xs),
    borderRadius: normalize(20),
    marginTop: rs(spacing.sm),
  },
  badgeText: {
    ...responsiveTypography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  formSection: {
    width: '100%',
    gap: rs(spacing.lg),
  },
  inputGroup: {
    width: '100%',
    gap: rs(spacing.sm),
  },
  inputLabel: {
    ...responsiveTypography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: rs(spacing.xs),
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: rs(spacing.md),
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: rs(spacing.md),
    zIndex: 1,
  },
  textInputWithIcon: {
    paddingLeft: rs(spacing.xl + spacing.lg),
    paddingRight: rs(spacing.xl + spacing.lg),
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingLeft: rs(spacing.lg),
    paddingRight: rs(spacing.lg),
    paddingVertical: rs(spacing.md + 2),
    fontSize: normalize(16),
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: normalize(16),
    color: colors.text.primary,
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
    ...responsiveTypography.bodySmall,
    color: colors.danger,
    marginTop: rs(spacing.xs),
    marginLeft: rs(spacing.sm),
  },
  signupButton: {
    flexDirection: 'row',
    backgroundColor: colors.success,
    paddingVertical: rs(spacing.md + 4),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(spacing.md),
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonText: {
    ...responsiveTypography.body,
    color: colors.text.white,
    fontWeight: '700',
    fontSize: normalize(16),
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: rs(spacing.md),
  },
  loginText: {
    ...responsiveTypography.body,
    color: colors.text.secondary,
  },
  loginTextBold: {
    color: colors.primary,
    fontWeight: '700',
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
    width: '100%',
    backgroundColor: colors.primaryLight,
    borderRadius: normalize(20),
    padding: rs(spacing.lg),
    alignItems: 'center',
    marginTop: rs(spacing.lg),
  },
  featuresTitle: {
    ...responsiveTypography.h4,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: rs(spacing.md),
    textAlign: 'center',
  },
  featuresList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.sm),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(spacing.sm),
    width: isSmallScreen ? '48%' : '48%',
    minWidth: isSmallScreen ? '45%' : '45%',
  },
  featureIcon: {
    fontSize: normalize(24),
    marginBottom: rs(spacing.xs),
  },
  featureText: {
    ...responsiveTypography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignupScreen;
