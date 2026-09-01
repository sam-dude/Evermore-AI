import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Flame, CheckCircle, Sparkles } from 'lucide-react-native';

interface CheckinCardProps {
  streak: number;
  hasCheckedInToday: boolean;
  onCheckIn: () => Promise<void>;
  loading?: boolean;
}

export function CheckinCard({ streak, hasCheckedInToday, onCheckIn, loading = false }: CheckinCardProps) {
  return (
    <View className="bg-[#121A2A] border border-[#1E2C44] rounded-3xl p-5 mb-5 shadow-lg">
      <View className="flex-row items-center justify-between mb-3.5">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 items-center justify-center mr-3">
            <Flame size={20} color="#F59E0B" />
          </View>
          <View>
            <Text className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Daily Streak
            </Text>
            <Text className="text-lg font-black text-white">
              {streak} {streak === 1 ? 'Day Active' : 'Days Active'}
            </Text>
          </View>
        </View>

        <View className="bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-full flex-row items-center">
          <Sparkles size={13} color="#38BDF8" />
          <Text className="text-xs font-bold text-sky-400 ml-1.5">+25 pts</Text>
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
            : 'bg-sky-400 active:bg-sky-300 shadow-md shadow-sky-500/20'
        }`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#020617" />
        ) : hasCheckedInToday ? (
          <View className="flex-row items-center">
            <CheckCircle size={16} color="#34D399" />
            <Text className="font-bold text-xs text-emerald-400 ml-2">
              Checked In Today · Streak Active
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <Sparkles size={16} color="#020617" />
            <Text className="font-extrabold text-xs text-slate-950 uppercase tracking-wider ml-2">
              Claim Daily Check-In (+25 pts)
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
