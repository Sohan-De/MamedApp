import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export function StyledButton({
  title,
  variant = 'primary',
  size = 'medium',
  buttonStyle,
  textStyle,
  ...rest
}: StyledButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: primaryColor, borderColor: primaryColor };
      case 'secondary':
        return { backgroundColor: secondaryColor, borderColor: secondaryColor };
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: secondaryColor };
      case 'text':
        return { backgroundColor: 'transparent', borderWidth: 0 };
      default:
        return { backgroundColor: primaryColor, borderColor: primaryColor };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return { color: '#FFFFFF' };
      case 'secondary':
        return { color: '#FFFFFF' };
      case 'outline':
        return { color: secondaryColor };
      case 'text':
        return { color: secondaryColor };
      default:
        return { color: '#FFFFFF' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'medium':
        return styles.mediumText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        buttonStyle,
      ]}
      {...rest}
    >
      <Text style={[styles.text, getTextStyle(), getTextSizeStyle(), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
}); 