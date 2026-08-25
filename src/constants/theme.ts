/**
 * Brand color tokens matching evermoreinnovation.site
 */
import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#050B14',
    backgroundElement: '#0A1628',
    backgroundSelected: '#112240',
    textSecondary: '#94A3B8',
    tint: '#00E5FF',
  },
  dark: {
    text: '#FFFFFF',
    background: '#050B14',
    backgroundElement: '#0A1628',
    backgroundSelected: '#112240',
    textSecondary: '#94A3B8',
    tint: '#00E5FF',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
