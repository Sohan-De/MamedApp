/**
 * Colors inspired by the Mamed.fr website theme
 * Deep blue background with light gold accents and elegant styling
 */

const tintColorLight = 'rgb(241, 227, 164)'; // Light gold color for light mode
const tintColorDark = 'rgb(241, 227, 164)'; // Same light gold color for dark mode

export const Colors = {
  light: {
    text: '#ECEDEE',
    background: 'rgb(3, 17, 63)', // Deeper blue background for light mode
    tint: tintColorLight,
    icon: 'rgb(241, 227, 164)', // Light gold for icons
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorLight,
    primary: 'rgb(3, 17, 63)', // Deeper blue from the website
    secondary: 'rgb(241, 227, 164)', // Light gold accent color
    tertiary: '#1C2C4C', // Slightly lighter blue for contrast
  },
  dark: {
    text: '#ECEDEE',
    background: 'rgb(3, 17, 63)', // Deeper blue background
    tint: tintColorDark,
    icon: 'rgb(241, 227, 164)', // Light gold for icons
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: 'rgb(3, 17, 63)', // Deeper blue
    secondary: 'rgb(241, 227, 164)', // Light gold accent color
    tertiary: '#1C2C4C', // Slightly lighter blue for contrast
  },
};
