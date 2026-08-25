import React from 'react';
import { Text, View } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'purple' | 'cyan';
  dot?: boolean;
  className?: string;
}

export function Badge({ label, variant = 'primary', dot = false, className = '' }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  }[variant];

  const dotStyles = {
    primary: 'bg-blue-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    purple: 'bg-purple-400',
    cyan: 'bg-cyan-400',
  }[variant];

  return (
    <View className={`flex-row items-center px-2.5 py-1 rounded-full border ${variantStyles} ${className}`}>
      {dot && <View className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`} />}
      <Text className={`text-xs font-semibold ${variantStyles.split(' ')[1]}`}>{label}</Text>
    </View>
  );
}
