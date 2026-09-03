import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Sparkles, Trophy } from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';
import { LESSONS } from '@/data/lessons';
import { LessonCard } from '@/components/lesson-card';

export default function LearnScreen() {
  const { lessonProgress } = useAuth();

  const completedCount = Object.values(lessonProgress).filter((p) => p.completed).length;
  const totalCount = LESSONS.length;
  const totalPointsAvailable = LESSONS.reduce((sum, l) => sum + l.pointsReward, 0);

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 36 }}
      >
        {/* ── HEADER ── */}
        <View className="pt-3 pb-3 mb-2">
          <Text className="text-[11px] font-bold text-evermore-cyan uppercase tracking-widest mb-1">
            Curriculum
          </Text>
          <Text className="text-2xl font-black text-white tracking-tight">
            Digital Skills &amp; Tech Literacy
          </Text>
          <Text className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Complete self-paced lessons, test your understanding with quizzes, and earn EverPoints.
          </Text>
        </View>

        {/* ── STATS BAR ── */}
        <View
          className="flex-row bg-evermore-surface border border-evermore-border rounded-2xl p-4 mb-5"
          style={{
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
          }}
        >
          <View className="flex-1 items-center border-r border-slate-800">
            <View className="flex-row items-center">
              <BookOpen size={14} color="#00E5FF" />
              <Text className="text-base font-black text-white ml-1.5">
                {completedCount} / {totalCount}
              </Text>
            </View>
            <Text className="text-[10px] font-semibold text-slate-400 mt-1">Completed</Text>
          </View>

          <View className="flex-1 items-center">
            <View className="flex-row items-center">
              <Trophy size={14} color="#F59E0B" />
              <Text className="text-base font-black text-white ml-1.5">
                {totalPointsAvailable} pts
              </Text>
            </View>
            <Text className="text-[10px] font-semibold text-slate-400 mt-1">Total Rewards</Text>
          </View>
        </View>

        {/* ── PROGRESS INDICATOR ── */}
        {completedCount > 0 && (
          <View className="bg-evermore-surface border border-evermore-border rounded-2xl p-4 mb-5">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-bold text-slate-300">Overall Progress</Text>
              <Text className="text-xs font-extrabold text-evermore-cyan">
                {Math.round((completedCount / totalCount) * 100)}%
              </Text>
            </View>
            <View className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(5, (completedCount / totalCount) * 100)}%`,
                  backgroundColor: '#00E5FF',
                  shadowColor: '#00E5FF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 6,
                }}
              />
            </View>
          </View>
        )}

        {/* ── LESSONS LIST ── */}
        <View className="mb-2">
          <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 pl-0.5">
            Core Modules
          </Text>

          {LESSONS.map((lesson, idx) => {
            const progress = lessonProgress[lesson.id];
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={idx}
                isCompleted={progress?.completed}
                score={progress?.quizScore}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
