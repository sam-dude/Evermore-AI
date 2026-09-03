import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Flame, CheckCircle, Sparkles, Zap } from 'lucide-react-native';
import { GradientButton } from '@/components/gradient-button';

interface CheckinCardProps {
  streak: number;
  hasCheckedInToday: boolean;
  onCheckIn: () => Promise<void>;
  loading?: boolean;
}

export function CheckinCard({ streak, hasCheckedInToday, onCheckIn, loading = false }: CheckinCardProps) {
  return (
    <View
      className="bg-[#0A1628] border border-cyan-500/20 rounded-[26px] p-5 mb-5"
      style={{
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
      }}
    >
      <View className="flex-row items-center justify-between mb-3.5">
        <View className="flex-row items-center">
          <View
            className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 items-center justify-center mr-3"
            style={{
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.35,
              shadowRadius: 8,
            }}
          >
            <Flame size={24} color="#F59E0B" strokeWidth={2.2} />
          </View>
          <View>
            <Text className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
              Daily Streak
            </Text>
            <Text className="text-xl font-black text-white">
              {streak} {streak === 1 ? 'Day' : 'Days'}
            </Text>
          </View>
        </View>

        <View className="bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 rounded-full flex-row items-center">
          <Zap size={13} color="#00F5A0" />
          <Text className="text-xs font-black text-[#00F5A0] ml-1.5">+25 pts</Text>
        </View>
      </View>

      <Text className="text-xs text-slate-300 mb-4 leading-relaxed">
        Check in daily to build consistency, level up your streak score, and unlock learning milestones.
      </Text>

      {hasCheckedInToday ? (
        <View className="py-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex-row items-center justify-center">
          <CheckCircle size={16} color="#00F5A0" />
          <Text className="font-bold text-xs text-[#00F5A0] ml-2">
            Checked In Today · Streak Active
          </Text>
        </View>
      ) : (
        <GradientButton
          title="CLAIM DAILY CHECK-IN (+25 PTS)"
          onPress={onCheckIn}
          loading={loading}
          size="md"
          pill={true}
          textStyle={{ fontSize: 12, fontWeight: '900', letterSpacing: 0.8 }}
        />
      )}
    </View>
  );
}
