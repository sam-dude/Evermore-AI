import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  glow?: boolean;
}

export function Card({ children, className = '', glow = false, ...props }: CardProps) {
  return (
    <View
      className={`bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-sm ${
        glow ? 'border-indigo-500/40 shadow-indigo-500/10' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
