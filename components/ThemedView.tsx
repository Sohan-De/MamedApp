import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'card' | 'elegant' | 'glass';
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  variant = 'default',
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 
    variant === 'default' ? 'background' : 
    variant === 'primary' ? 'primary' : 
    variant === 'secondary' ? 'secondary' : 
    variant === 'card' ? 'tertiary' : 'background'
  );

  const secondaryColor = useThemeColor({}, 'secondary');

  // For glassmorphism effect
  const glassStyle = variant === 'glass' || variant === 'card' ? {
    backgroundColor: 'rgba(28, 44, 76, 0.5)', // Semi-transparent tertiary color
    borderColor: secondaryColor,  // Use the secondary color (logo color) for the border
    borderWidth: 0.5,
    borderOpacity: 0.4, // Add some transparency to the border
  } : {};

  return (
    <View 
      style={[
        variant !== 'glass' && variant !== 'card' && { backgroundColor }, 
        variant === 'elegant' && styles.elegant,
        variant === 'card' && styles.card,
        variant === 'glass' && styles.glass,
        variant === 'elegant' && { borderColor: secondaryColor },
        glassStyle,
        style
      ]} 
      {...otherProps} 
    />
  );
}

const styles = StyleSheet.create({
  elegant: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    // Note: backdrop-filter is not supported in React Native directly
    // We simulate the effect with transparency and shadows
  },
  glass: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 0.5,
  }
});
