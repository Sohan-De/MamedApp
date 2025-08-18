import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of the user object
type User = {
  id: string;
  name: string;
  email: string;
} | null;

// Define the shape of the context
type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  skipAuth: () => void;
  isLoading: boolean;
  isGuest: boolean;
  hasSeenWelcome: boolean;
  setHasSeenWelcome: (seen: boolean) => void;
  goBackToWelcome: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // Check if the user is authenticated or in guest mode and redirect accordingly
  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inWelcome = segments[0] === 'welcome';
    
    if (!hasSeenWelcome && !inWelcome) {
      // Redirect to welcome page if user hasn't seen it yet
      router.replace('/welcome');
    } else if (hasSeenWelcome && !user && !isGuest && !inAuthGroup) {
      // Redirect to the sign-in page if the user is not signed in and not in guest mode
      router.replace('/auth/login');
    } else if ((user || isGuest) && inAuthGroup) {
      // Redirect to the home page if the user is signed in or in guest mode and trying to access auth pages
      router.replace('/(tabs)');
    }
  }, [user, isGuest, segments, hasSeenWelcome]);

  // Skip authentication and enter as guest
  const skipAuth = () => {
    setIsGuest(true);
    router.replace('/(tabs)');
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from your backend
      setUser({
        id: '1',
        name: 'Test User',
        email: email,
      });
      setIsGuest(false);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from your backend
      setUser({
        id: '1',
        name: name,
        email: email,
      });
      setIsGuest(false);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    setIsGuest(false);
    router.replace('/auth/login');
  };

  // Go back to welcome function
  const goBackToWelcome = () => {
    setHasSeenWelcome(false);
    router.replace('/welcome');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, skipAuth, isLoading, isGuest, hasSeenWelcome, setHasSeenWelcome, goBackToWelcome }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 