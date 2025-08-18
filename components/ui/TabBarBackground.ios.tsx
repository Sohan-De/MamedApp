import { useColorScheme } from '@/hooks/useColorScheme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

export default function BlurTabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <BlurView
      // Use dark blur for dark mode and light blur for light mode
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      intensity={colorScheme === 'dark' ? 80 : 60}
      style={StyleSheet.absoluteFill}
    >
      {/* Add a slight overlay to enhance the theme colors */}
      <View 
        style={[
          StyleSheet.absoluteFill, 
          { 
            backgroundColor: colorScheme === 'dark' ? 'rgba(10, 26, 60, 0.3)' : 'rgba(255, 251, 234, 0.3)' 
          }
        ]} 
      />
    </BlurView>
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
