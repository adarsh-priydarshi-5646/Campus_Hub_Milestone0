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
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles, colors, typography, spacing, responsiveTypography, isSmallScreen } from '../styles/globalStyles';
import { normalize, rs } from '../utils/responsive';
import BackButton from '../components/BackButton';
import Card3D from '../components/3DCard';
import AnimatedBackground from '../components/AnimatedBackground';
import Toast from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setErrors({});
    
    // Validation
    const newErrors = {};
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
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToast({ visible: true, message: Object.values(newErrors)[0], type: 'error' });
      return;
    }

    setLoading(true);
    const result = await login(email.trim().toLowerCase(), password);
    setLoading(false);

    if (result.success) {
      setToast({ visible: true, message: 'Login successful! Welcome back!', type: 'success' });
      setTimeout(() => navigation.replace('Home'), 1500);
    } else {
      setToast({ visible: true, message: result.error || 'Unable to login. Please check your credentials.', type: 'error' });
    }
  };

  

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Toast 
        visible={toast.visible} 
        message={toast.message} 
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
      <AnimatedBackground variant="gradient">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.container}>
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
                    <LinearGradient
                      colors={[colors.primary, '#8b5cf6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.logoGradient}
                    >
                      <Ionicons name="school" size={56} color={colors.text.white} />
                    </LinearGradient>
                  </View>
                  <Text style={styles.title}>Welcome Back!</Text>
                  <Text style={styles.subtitle}>Sign in to your MyCampusHub account</Text>
                  <View style={styles.welcomeBadge}>
                    <Ionicons name="sparkles" size={16} color={colors.primary} style={{marginRight: 6}} />
                    <Text style={styles.badgeText}>Your Campus, Your Way</Text>
                  </View>
                  
                  {/* Quick Info Pills */}
                  <View style={styles.infoPills}>
                    <View style={styles.infoPill}>
                      <Ionicons name="shield-checkmark" size={14} color={colors.success} style={{marginRight: 4}} />
                      <Text style={styles.infoPillText}>Secure</Text>
                    </View>
                    <View style={styles.infoPill}>
                      <Ionicons name="flash" size={14} color={colors.warning} style={{marginRight: 4}} />
                      <Text style={styles.infoPillText}>Fast</Text>
                    </View>
                    <View style={styles.infoPill}>
                      <Ionicons name="heart" size={14} color={colors.error} style={{marginRight: 4}} />
                      <Text style={styles.infoPillText}>Easy</Text>
                    </View>
                  </View>
                </View>

                {/* Login Card */}
                <Card3D variant="primary" elevation="high" style={styles.card}>
                  <View style={styles.formSection}>
                    {/* Email */}
                    <View style={styles.inputGroup}>
                      <View style={styles.labelContainer}>
                        <Ionicons name="mail" size={16} color={colors.text.secondary} style={{marginRight: 6}} />
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
                        />
                      </View>
                      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                    
                    {/* Password */}
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
                          placeholder="Enter your password" 
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
                          onSubmitEditing={handleLogin}
                          returnKeyType="go"
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

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword}>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    
                    {/* Sign In Button */}
                    <TouchableOpacity 
                      onPress={handleLogin} 
                      style={[styles.loginButton, loading && styles.disabledButton]}
                      activeOpacity={0.8}
                      disabled={loading}
                    >
                      <Ionicons name={loading ? "reload" : "log-in"} size={20} color={colors.text.white} style={{marginRight: 8}} />
                      <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                    </TouchableOpacity>
                    
                    {/* Signup Link */}
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('Signup')} 
                      style={styles.signupLink}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.signupText}>
                        Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card3D>

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
      </AnimatedBackground>
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
  headerSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: rs(spacing.xl),
  },
  logoContainer: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    marginBottom: rs(spacing.lg),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(spacing.xs),
  },
  infoPills: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(spacing.sm),
    marginTop: rs(spacing.md),
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: rs(spacing.sm),
    paddingVertical: rs(spacing.xs / 2),
    borderRadius: normalize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoPillText: {
    ...responsiveTypography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
    fontSize: normalize(11),
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
  card: {
    width: '100%',
    marginBottom: rs(spacing.xl),
    marginHorizontal: 0,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: rs(spacing.xs),
  },
  forgotPasswordText: {
    ...responsiveTypography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: rs(spacing.md + 4),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(spacing.md),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    ...responsiveTypography.body,
    color: colors.text.white,
    fontWeight: '700',
    fontSize: normalize(16),
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupLink: {
    alignItems: 'center',
    paddingVertical: rs(spacing.md),
  },
  signupText: {
    ...responsiveTypography.body,
    color: colors.text.secondary,
  },
  signupTextBold: {
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
    fontWeight: '600',
  },
  socialButton: {
    marginBottom: spacing.md,
  },
  socialButtonIcon: {
    fontSize: 20,
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
  featureText: {
    ...responsiveTypography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LoginScreen;
