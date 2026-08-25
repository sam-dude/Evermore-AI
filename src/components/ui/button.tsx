import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
}: ButtonProps) {
  const sizeStyles = {
    sm: 'py-2 px-3.5',
    md: 'py-3 px-5',
    lg: 'py-4 px-6',
  }[size];

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  const variantStyles = {
    primary: 'bg-indigo-600 active:bg-indigo-700 text-white shadow-md shadow-indigo-600/30',
    secondary: 'bg-slate-800 active:bg-slate-700 text-slate-100 border border-slate-700',
    outline: 'bg-transparent border border-indigo-500/50 active:bg-indigo-500/10 text-indigo-300',
    glow: 'bg-indigo-600 active:bg-indigo-500 text-white shadow-lg shadow-indigo-500/40',
  }[variant];

  const textColors = {
    primary: 'text-white',
    secondary: 'text-slate-100',
    outline: 'text-indigo-300',
    glow: 'text-white',
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className={`flex-row items-center justify-center rounded-xl font-medium ${sizeStyles} ${variantStyles} ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <>
          {icon ? <View className="mr-2">{icon}</View> : null}
          <Text className={`font-semibold ${textSizes} ${textColors}`}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}
