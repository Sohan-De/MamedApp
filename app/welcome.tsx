import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MamedLogo } from '@/components/ui/MamedLogo';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { setHasSeenWelcome } = useAuth();
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const backgroundColor = 'rgb(3, 17, 63)';
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    setHasSeenWelcome(true);
    router.push('/auth/login');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style="light" />
      
      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
      
      {/* Main Content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Logo Section */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScaleAnim }]
            }
          ]}
        >
          <MamedLogo width={280} height={160} color={secondaryColor} />
        </Animated.View>

        {/* Welcome Text */}
        <ThemedView style={styles.textContainer}>
          <ThemedText type="heading" style={[styles.welcomeTitle, { color: secondaryColor }]}>
            Bienvenue
          </ThemedText>
          <ThemedText type="subtitle" style={styles.welcomeSubtitle}>
            Découvrez les merveilles du monde
          </ThemedText>
          <ThemedText style={styles.description}>
            Explorez notre collection exclusive de produits premium soigneusement sélectionnés pour vous offrir le meilleur de l&apos;élégance et de la qualité.
          </ThemedText>
        </ThemedView>

        {/* Features */}
        <ThemedView style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: secondaryColor }]} />
            <ThemedText style={styles.featureText}>Produits Premium</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: secondaryColor }]} />
            <ThemedText style={styles.featureText}>Livraison Mondiale</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: secondaryColor }]} />
            <ThemedText style={styles.featureText}>Service Client 24/7</ThemedText>
          </View>
        </ThemedView>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={[
            styles.modernButtonWrapper,
            {
              transform: [{ scale: logoScaleAnim }]
            }
          ]}>
            <TouchableOpacity
              style={[styles.modernButton, { backgroundColor: secondaryColor }]}
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <View style={styles.modernButtonContent}>
                                 <Text style={[styles.modernButtonText, { color: backgroundColor }]}>
                   Let&apos;s Shopping
                 </Text>
                <View style={[styles.modernButtonIcon, { backgroundColor: backgroundColor + '20' }]}>
                  <Text style={[styles.modernButtonArrow, { color: backgroundColor }]}>→</Text>
                </View>
              </View>
              
              {/* Shine effect */}
              <Animated.View style={[
                styles.shineEffect,
                {
                  transform: [{ translateX: slideAnim }]
                }
              ]} />
            </TouchableOpacity>
          </Animated.View>
          
          <ThemedText style={styles.footerText}>
            Commencez votre voyage shopping avec nous
          </ThemedText>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(241, 227, 164, 0.05)',
    top: -width * 0.4,
    right: -width * 0.4,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(241, 227, 164, 0.03)',
    bottom: -width * 0.3,
    left: -width * 0.3,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(241, 227, 164, 0.02)',
    top: height * 0.3,
    right: -width * 0.2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    opacity: 0.9,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  modernButtonWrapper: {
    marginBottom: 20,
  },
  modernButton: {
    width: width * 0.7,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  modernButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modernButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    letterSpacing: 0.5,
  },
  modernButtonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modernButtonArrow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
  },
}); 