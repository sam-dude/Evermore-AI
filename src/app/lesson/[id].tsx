import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, Sparkles, Brain, TrendingUp, Cpu, Rocket, Briefcase } from 'lucide-react-native';
import { LESSONS } from '@/data/lessons';
import { Quiz } from '@/components/quiz';
import { useAuth } from '@/context/auth-context';

const ICON_MAP: Record<string, any> = {
  brain: Brain,
  'trending-up': TrendingUp,
  cpu: Cpu,
  rocket: Rocket,
  briefcase: Briefcase,
};

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeLesson } = useAuth();

  const lesson = LESSONS.find((l) => l.id === id);

  if (!lesson) {
    return (
      <SafeAreaView className="flex-1 bg-evermore-bg items-center justify-center p-6">
        <Text className="text-base font-bold text-white mb-3">Lesson Not Found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-evermore-cyan py-2.5 px-5 rounded-xl"
        >
          <Text className="text-xs font-bold text-slate-950">Return to Curriculum</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const IconComponent = ICON_MAP[lesson.icon] || BookOpen;

  const handleQuizComplete = async (score: number) => {
    await completeLesson(lesson.id, score, lesson.pointsReward);
  };

  // Render markdown-like sections cleanly
  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('## ')) {
        return (
          <Text key={index} className="text-lg font-extrabold text-white mt-5 mb-2">
            {trimmed.replace('## ', '')}
          </Text>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <Text key={index} className="text-sm font-bold text-evermore-cyan mt-3.5 mb-1.5">
            {trimmed.replace('### ', '')}
          </Text>
        );
      }

      if (trimmed.startsWith('• ') || trimmed.startsWith('✅ ') || trimmed.startsWith('❌ ')) {
        return (
          <View key={index} className="mb-2">
            {trimmed.split('\n').map((line, lIdx) => (
              <Text key={lIdx} className="text-xs text-slate-300 leading-relaxed mb-1">
                {line}
              </Text>
            ))}
          </View>
        );
      }

      return (
        <Text key={index} className="text-xs text-slate-300 leading-relaxed mb-3">
          {trimmed}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg" edges={['top']}>
      {/* ── TOP NAV ── */}
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-slate-800/80">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <ArrowLeft size={18} color="#00E5FF" />
          <Text className="text-xs font-bold text-evermore-cyan ml-1.5">Curriculum</Text>
        </TouchableOpacity>

        <View className="flex-row items-center bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
          <Sparkles size={12} color="#00E5FF" />
          <Text className="text-[11px] font-bold text-evermore-cyan ml-1">
            +{lesson.pointsReward} EverPoints
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}
      >
        {/* Title Header */}
        <View className="flex-row items-center mb-3">
          <View className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 items-center justify-center mr-3">
            <IconComponent size={22} color="#00E5FF" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-extrabold text-white">{lesson.title}</Text>
            <Text className="text-xs text-evermore-muted mt-0.5">{lesson.description}</Text>
          </View>
        </View>

        {/* Lesson Content */}
        <View className="bg-evermore-surface border border-evermore-border rounded-3xl p-5 mb-4 shadow-lg">
          {renderContent(lesson.content)}
        </View>

        {/* Interactive Quiz */}
        <Quiz
          questions={lesson.quiz}
          pointsReward={lesson.pointsReward}
          onComplete={handleQuizComplete}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
