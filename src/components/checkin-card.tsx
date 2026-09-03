import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Flame, CheckCircle, Sparkles, Zap } from 'lucide-react-native';

interface CheckinCardProps {
  streak: number;
  hasCheckedInToday: boolean;
  onCheckIn: () => Promise<void>;
  loading?: boolean;
}

export function CheckinCard({ streak, hasCheckedInToday, onCheckIn, loading = false }: CheckinCardProps) {
  return (
    <View
      className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-5"
      style={{
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 items-center justify-center mr-3"
            style={{
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Flame size={22} color="#F59E0B" strokeWidth={2.2} />
          </View>
          <View>
            <Text className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Daily Streak
            </Text>
            <Text className="text-xl font-black text-white">
              {streak} {streak === 1 ? 'Day' : 'Days'}
            </Text>
          </View>
        </View>

        <View className="bg-evermore-cyan/10 border border-evermore-cyan/20 px-3.5 py-2 rounded-full flex-row items-center">
          <Zap size={13} color="#00E5FF" />
          <Text className="text-xs font-bold text-evermore-cyan ml-1.5">+25 pts</Text>
        </View>
      </View>

      <Text className="text-xs text-slate-400 mb-4 leading-relaxed">
        Check in daily to build consistency, level up your streak score, and unlock learning milestones.
      </Text>

      <TouchableOpacity
        onPress={onCheckIn}
        disabled={hasCheckedInToday || loading}
        activeOpacity={0.85}
        className={`py-3.5 rounded-2xl flex-row items-center justify-center ${
          hasCheckedInToday
            ? 'bg-emerald-500/10 border border-emerald-500/30'
            : ''
        }`}
        style={!hasCheckedInToday ? {
          backgroundColor: '#00E5FF',
          shadowColor: '#00E5FF',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
        } : undefined}
      >
        {loading ? (
          <ActivityIndicator size="small" color={hasCheckedInToday ? '#34D399' : '#050B14'} />
        ) : hasCheckedInToday ? (
          <View className="flex-row items-center">
            <CheckCircle size={16} color="#34D399" />
            <Text className="font-bold text-xs text-emerald-400 ml-2">
              Checked In Today · Streak Active
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <Sparkles size={16} color="#050B14" />
            <Text className="font-extrabold text-xs text-evermore-bg uppercase tracking-wider ml-2">
              Claim Daily Check-In (+25 pts)
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
