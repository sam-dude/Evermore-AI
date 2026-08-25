import React from 'react';
import { Tabs } from 'expo-router';
import { Flame, Compass } from 'lucide-react-native';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A1628',
          borderTopColor: '#1E3A5F',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#00E5FF',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Evertap',
          tabBarIcon: ({ color, size }) => <Flame size={size ?? 22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Compass size={size ?? 22} color={color} />,
        }}
      />
    </Tabs>
  );
}
