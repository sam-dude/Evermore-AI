import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Sparkles } from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';
import { LESSONS } from '@/data/lessons';
import { LessonCard } from '@/components/lesson-card';

export default function LearnScreen() {
  const { lessonProgress } = useAuth();

  const completedCount = Object.values(lessonProgress).filter((p) => p.completed).length;
  const totalCount = LESSONS.length;
  const totalPointsAvailable = LESSONS.reduce((sum, l) => sum + l.pointsReward, 0);

  return (
    <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 36 }}
      >
        {/* ── HEADER ── */}
        <View className="pt-2 pb-3 mb-2">
          <Text className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">
            Curriculum
          </Text>
          <Text className="text-2xl font-black text-white tracking-tight">
            Digital Skills &amp; Tech Literacy
          </Text>
          <Text className="text-xs text-slate-400 mt-1 leading-relaxed">
            Complete self-paced lessons, test your understanding with quizzes, and earn EverPoints.
          </Text>
        </View>

        {/* ── STATS BAR ── */}
        <View className="flex-row bg-[#121A2A] border border-[#1E2C44] rounded-2xl p-3.5 mb-5 shadow-sm">
          <View className="flex-1 items-center border-r border-slate-800">
            <View className="flex-row items-center">
              <BookOpen size={14} color="#38BDF8" />
              <Text className="text-sm font-black text-white ml-1.5">
                {completedCount} / {totalCount}
              </Text>
            </View>
            <Text className="text-[10px] font-semibold text-slate-400 mt-0.5">Completed</Text>
          </View>

          <View className="flex-1 items-center">
            <View className="flex-row items-center">
              <Sparkles size={14} color="#F59E0B" />
              <Text className="text-sm font-black text-white ml-1.5">
                {totalPointsAvailable} pts
              </Text>
            </View>
            <Text className="text-[10px] font-semibold text-slate-400 mt-0.5">Total Rewards</Text>
          </View>
        </View>

        {/* ── LESSONS LIST ── */}
        <View className="mb-2">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-0.5">
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
