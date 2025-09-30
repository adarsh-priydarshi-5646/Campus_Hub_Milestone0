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
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import BackButton from '../components/BackButton';
import Button3D from '../components/3DButton';
import Card3D from '../components/3DCard';
import Icon3D from '../components/3DIcon';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
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
      Alert.alert('Validation Error', Object.values(newErrors)[0]);
      return;
    }

    setLoading(true);
    const result = await login(email.trim().toLowerCase(), password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Login successful! Welcome back! 🎉');
      setTimeout(() => navigation.replace('Home'), 500);
    } else {
      Alert.alert('Login Failed', result.error || 'Unable to login. Please check your credentials.');
    }
  };

  

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
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
                  <Icon3D 
                    emoji="🎓" 
                    size="xxl" 
                    variant="primary" 
                    style={styles.logoIcon}
                  />
                  <Text style={styles.title}>Welcome Back!</Text>
                  <Text style={styles.subtitle}>Sign in to your MyCampusHub account</Text>
                  <View style={styles.welcomeBadge}>
                    <Text style={styles.badgeText}>✨ Your Campus, Your Way</Text>
                  </View>
                </View>

                {/* Login Card */}
                <Card3D variant="primary" elevation="high" style={styles.card}>
                  <View style={styles.formSection}>
                    {/* Email */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>📧 Email Address</Text>
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
                        />
                      </View>
                      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                    
                    {/* Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>🔒 Password</Text>
                      <View style={styles.inputContainer}>
                        <TextInput 
                          placeholder="Enter your password" 
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
                          onSubmitEditing={handleLogin}
                          returnKeyType="go"
                        />
                      </View>
                      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword}>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    
                    {/* Sign In Button */}
                    <Button3D 
                      title={loading ? '🔄 Signing In...' : '🚀 Sign In'}
                      onPress={handleLogin} 
                      variant="primary"
                      size="large"
                      disabled={loading}
                      style={styles.loginButton}
                    />
                    
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
                <Card3D variant="gradient" elevation="medium" style={styles.featuresPreview}>
                  <Text style={styles.featuresTitle}>What's inside MyCampusHub?</Text>
                  <View style={styles.featuresList}>
                    <View style={styles.featureItem}>
                      <Icon3D emoji="📚" size="medium" variant="primary" />
                      <Text style={styles.featureText}>Academic Resources</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Icon3D emoji="👨‍🏫" size="medium" variant="success" />
                      <Text style={styles.featureText}>Faculty Directory</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Icon3D emoji="📅" size="medium" variant="warning" />
                      <Text style={styles.featureText}>Event Updates</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Icon3D emoji="🍽️" size="medium" variant="danger" />
                      <Text style={styles.featureText}>Mess Menu</Text>
                    </View>
                  </View>
                </Card3D>
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
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoIcon: {
    marginBottom: spacing.lg,
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
  card: {
    marginBottom: spacing.xl,
    marginHorizontal: spacing.sm,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
  },
  forgotPasswordText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: spacing.md,
  },
  signupLink: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  signupText: {
    ...typography.body,
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
    alignItems: 'center',
    marginHorizontal: spacing.sm,
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
    alignItems: 'center',
    marginBottom: spacing.sm,
    width: '45%',
  },
  featureText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LoginScreen;
