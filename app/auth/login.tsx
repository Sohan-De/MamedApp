import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MamedLogo } from '@/components/ui/MamedLogo';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useAlert } from '../../contexts/AlertContext';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const router = useRouter();
  const { signIn, isLoading, skipAuth, goBackToWelcome } = useAuth();
  const { showAlert } = useAlert();
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const tertiaryColor = useThemeColor({}, 'tertiary');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = 'rgb(3, 17, 63)';
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Alert', 'Please fill in all fields');
      return;
    }

    try {
      await signIn(email, password);
      // Auth context will handle navigation
    } catch (error) {
      showAlert('Login Failed', 'Please check your credentials.');
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor }]}
      >
        <StatusBar style="light" />
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={goBackToWelcome}
        >
          <Ionicons name="arrow-back" size={24} color={secondaryColor} />
        </TouchableOpacity>

        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        
        <View style={styles.logoContainer}>
          <MamedLogo width={240} height={140} color={secondaryColor} />
        </View>

        <ThemedView variant="card" style={styles.formContainer}>
          <View style={styles.formHeader}>
            <ThemedText type="heading" style={styles.heading}>Welcome</ThemedText>
            <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="rgba(241, 227, 164, 0.7)" style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: secondaryColor + '4D', // 30% opacity
                    color: textColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                ]}
                placeholder="Enter your email"
                placeholderTextColor="rgba(155, 161, 166, 0.8)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="rgba(241, 227, 164, 0.7)" style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: secondaryColor + '4D', // 30% opacity
                    color: textColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    paddingRight: 45
                  }
                ]}
                placeholder="Enter your password"
                placeholderTextColor="rgba(155, 161, 166, 0.8)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={toggleSecureTextEntry}
              >
                <Ionicons 
                  name={secureTextEntry ? "eye-outline" : "eye-off-outline"} 
                  size={22} 
                  color="rgba(241, 227, 164, 0.7)" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.forgotPassword}>
              <ThemedText style={[styles.forgotPasswordText, { color: secondaryColor }]}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={skipAuth}>
              <ThemedText style={[styles.skipButtonText, { color: secondaryColor }]}>
                Skip
              </ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: 'rgb(241, 227, 164)' }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={[
            styles.registerButton, 
            { 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderWidth: 0.5,
              borderColor: secondaryColor + '33' // 20% opacity
            }
          ]}>
            <View style={styles.registerContainer}>
              <ThemedText style={styles.registerText}>Don&apos;t have an account? </ThemedText>
              <TouchableOpacity 
                onPress={() => router.push('/auth/register')}
                style={styles.signUpButton}
              >
                <ThemedText style={[styles.registerLink, { color: secondaryColor }]}>
                  Sign Up
                </ThemedText>
                <Ionicons name="arrow-forward" size={20} color={secondaryColor} style={styles.registerIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(241, 227, 164, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(241, 227, 164, 0.3)',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(241, 227, 164, 0.03)',
    top: -width * 0.3,
    right: -width * 0.3,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(241, 227, 164, 0.02)',
    bottom: -width * 0.2,
    left: -width * 0.2,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  formContainer: {
    flex: 0.85, // Reduced from 1 to make it take less space at the bottom
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 30,
    marginHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 20,
    opacity: 0.7,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 0.5,
    padding: 15,
    paddingLeft: 45,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: 'rgb(3, 17, 63)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerIcon: {
    marginLeft: 5,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 