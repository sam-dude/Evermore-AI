import React from 'react';
import { Platform } from 'react-native';
import AndroidTabLayout from './_layout.android';
import IOSTabLayout from './_layout.ios';

export default function TabLayout() {
  if (Platform.OS === 'android') {
    return <AndroidTabLayout />;
  }
  return <IOSTabLayout />;
}
