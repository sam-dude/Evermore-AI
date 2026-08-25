import React, { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-3">
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        className="flex-row items-center space-x-2 py-2"
      >
        <View
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          className="w-6 h-6 rounded-full bg-slate-800 items-center justify-center"
        >
          <ChevronRight size={14} color="#00E5FF" />
        </View>
        <Text className="text-sm font-semibold text-white">{title}</Text>
      </Pressable>
      {isOpen && (
        <View className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 mt-2 ml-4">
          {children}
        </View>
      )}
    </View>
  );
}
