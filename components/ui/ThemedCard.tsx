import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView, ThemedViewProps } from '../ThemedView';

interface ThemedCardProps extends ThemedViewProps {
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType;
  cardStyle?: ViewStyle;
  imageStyle?: ViewStyle;
  bordered?: boolean;
  elegant?: boolean;
}

export function ThemedCard({
  title,
  subtitle,
  image,
  cardStyle,
  imageStyle,
  children,
  bordered = false,
  elegant = false,
  ...rest
}: ThemedCardProps) {
  const borderColor = useThemeColor({}, 'secondary');
  const backgroundColor = useThemeColor({}, 'tertiary');

  return (
    <ThemedView
      variant="card"
      style={[
        styles.card,
        bordered && { borderWidth: 1, borderColor },
        elegant && [styles.elegantCard, { borderColor }],
        cardStyle,
      ]}
      {...rest}
    >
      {image && (
        <View style={[styles.imageContainer, imageStyle]}>
          <Image source={image} style={styles.image} />
        </View>
      )}
      
      {title && (
        <ThemedText type={elegant ? "elegant" : "subtitle"} style={styles.title}>
          {title}
        </ThemedText>
      )}
      
      {subtitle && (
        <ThemedText style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
      
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  elegantCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
    opacity: 0.7,
  },
}); 