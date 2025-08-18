import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { View } from 'react-native';

export default function TabBarBackground() {
  const backgroundColor = useThemeColor({}, 'primary');
  
  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor 
      }} 
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
