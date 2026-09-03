import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect } from 'react-native-svg';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

export function GradientButton({
  onPress,
  title,
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  size = 'md',
  pill = true,
}: GradientButtonProps) {
  const height = size === 'sm' ? 38 : size === 'lg' ? 56 : 50;
  const borderRadius = pill ? height / 2 : 16;
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 15 : 14;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[
        styles.container,
        {
          height,
          borderRadius,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {/* SVG Linear Gradient Background */}
      <View style={[StyleSheet.absoluteFill, { borderRadius, overflow: 'hidden' }]}>
        <Svg width="100%" height="100%">
          <Defs>
            <SvgGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#00F5A0" />
              <Stop offset="50%" stopColor="#00E5C9" />
              <Stop offset="100%" stopColor="#00D2FF" />
            </SvgGradient>
          </Defs>
          <Rect width="100%" height="100%" rx={borderRadius} fill="url(#btnGrad)" />
        </Svg>
      </View>

      {/* Button Content */}
      <View style={[styles.contentRow, { paddingHorizontal: size === 'sm' ? 12 : 20 }]}>
        {loading ? (
          <ActivityIndicator size="small" color="#041017" />
        ) : (
          <>
            <Text
              numberOfLines={1}
              style={[
                styles.buttonText,
                {
                  fontSize,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: '#041017',
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  iconContainer: {
    marginLeft: 8,
  },
});
