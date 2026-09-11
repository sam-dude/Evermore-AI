import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { LayoutDashboard, BookOpen, Crown, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(5, 11, 20, 0.98)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(30, 58, 95, 0.6)',
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 12,
        },
        tabBarActiveTintColor: '#00E5FF',
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '700',
          letterSpacing: 0.2,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? {
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            } : undefined}>
              <LayoutDashboard size={21} color={color} strokeWidth={focused ? 2.5 : 1.8} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? {
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            } : undefined}>
              <BookOpen size={21} color={color} strokeWidth={focused ? 2.5 : 1.8} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="membership"
        options={{
          title: 'Membership',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? {
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            } : undefined}>
              <Crown size={21} color={color} strokeWidth={focused ? 2.5 : 1.8} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? {
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            } : undefined}>
              <User size={21} color={color} strokeWidth={focused ? 2.5 : 1.8} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
