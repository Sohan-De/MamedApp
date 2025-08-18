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
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useAlert } from '../../contexts/AlertContext';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { signUp, isLoading, goBackToWelcome } = useAuth();
  const { showAlert } = useAlert();
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const tertiaryColor = useThemeColor({}, 'tertiary');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = 'rgb(3, 17, 63)';
  const colorScheme = useColorScheme();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showAlert('Alert', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Password Mismatch', 'Passwords do not match');
      return;
    }

    try {
      await signUp(name, email, password);
      // Auth context will handle navigation
    } catch (error) {
      showAlert('Registration Failed', 'Please try again.');
    }
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <MamedLogo width={240} height={140} color={secondaryColor} />
          </View>

          <ThemedView variant="card" style={styles.formContainer}>
            <ThemedText type="heading">Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: secondaryColor + '4D', // 30% opacity
                    color: textColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                ]}
                placeholder="Enter your full name"
                placeholderTextColor="rgba(155, 161, 166, 0.8)"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Email</ThemedText>
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

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: secondaryColor + '4D', // 30% opacity
                    color: textColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                ]}
                placeholder="Create a password"
                placeholderTextColor="rgba(155, 161, 166, 0.8)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: secondaryColor + '4D', // 30% opacity
                    color: textColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                ]}
                placeholder="Confirm your password"
                placeholderTextColor="rgba(155, 161, 166, 0.8)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: 'rgb(241, 227, 164)' }]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <View style={[
              styles.loginButton,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderWidth: 0.5,
                borderColor: secondaryColor + '33' // 20% opacity
              }
            ]}>
              <View style={styles.loginContainer}>
                <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
                <TouchableOpacity 
                  onPress={() => router.push('/auth/login')}
                  style={styles.signInButton}
                >
                  <ThemedText style={[styles.loginLink, { color: secondaryColor }]}>
                    Sign In
                  </ThemedText>
                  <Ionicons name="arrow-back" size={20} color={secondaryColor} style={styles.loginIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    marginHorizontal: 20,
    marginBottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  subtitle: {
    marginBottom: 30,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 0.5,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  registerButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'rgb(3, 17, 63)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginIcon: {
    marginLeft: 5,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 