import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, G, Line, Path, Rect, Svg, Text as SvgText } from 'react-native-svg';

interface MamedLogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export function MamedLogo({ width = 200, height = 120, color = 'rgb(241, 227, 164)' }: MamedLogoProps) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 200 120">
        {/* Mosque silhouette */}
        <G stroke={color} strokeWidth="1.5" fill="none">
          {/* Central minaret */}
          <Line x1="100" y1="15" x2="100" y2="35" stroke={color} strokeWidth="1.5" />
          <Circle cx="100" cy="15" r="2" fill={color} />
          
          {/* Main dome */}
          <Path d="M85,35 L115,35" />
          <Path d="M85,35 C85,25 115,25 115,35" />
          
          {/* Main building */}
          <Rect x="75" y="55" width="50" height="20" />
          
          {/* Side minarets */}
          <Path d="M85,35 L85,55" />
          <Path d="M115,35 L115,55" />
          
          {/* Small domes */}
          <Path d="M95,40 L95,55" />
          <Path d="M105,40 L105,55" />
          
          {/* Side domes */}
          <Path d="M82,55 L82,45 C82,40 92,40 92,45 L92,55" />
          <Path d="M108,55 L108,45 C108,40 118,40 118,45 L118,55" />
        </G>
        
        {/* Logo text - with increased spacing between icon and text */}
        <SvgText
          x="100"
          y="100"
          textAnchor="middle"
          fontFamily="Arial"
          fontSize="24"
          fontWeight="bold"
          fill={color}
          letterSpacing="1.5"
        >
          MAMED.FR
        </SvgText>
        
        {/* Tagline */}
        <SvgText
          x="100"
          y="115"
          textAnchor="middle"
          fontFamily="Arial"
          fontSize="10"
          fill={color}
          letterSpacing="0.5"
        >
          Les Merveilles du Monde
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 