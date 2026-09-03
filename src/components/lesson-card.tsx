import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Brain,
  TrendingUp,
  Cpu,
  Rocket,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import { Lesson } from '@/data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted?: boolean;
  score?: number | null;
}

const ICON_CONFIG: Record<string, { icon: any; color: string; bgColor: string; borderColor: string }> = {
  brain: { icon: Brain, color: '#00E5FF', bgColor: 'rgba(0, 229, 255, 0.08)', borderColor: 'rgba(0, 229, 255, 0.15)' },
  'trending-up': { icon: TrendingUp, color: '#34D399', bgColor: 'rgba(52, 211, 153, 0.08)', borderColor: 'rgba(52, 211, 153, 0.15)' },
  cpu: { icon: Cpu, color: '#A78BFA', bgColor: 'rgba(167, 139, 250, 0.08)', borderColor: 'rgba(167, 139, 250, 0.15)' },
  rocket: { icon: Rocket, color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.15)' },
  briefcase: { icon: Briefcase, color: '#FB7185', bgColor: 'rgba(251, 113, 133, 0.08)', borderColor: 'rgba(251, 113, 133, 0.15)' },
};

export function LessonCard({ lesson, index, isCompleted = false, score }: LessonCardProps) {
  const router = useRouter();
  const config = ICON_CONFIG[lesson.icon] || { icon: BookOpen, color: '#00E5FF', bgColor: 'rgba(0, 229, 255, 0.08)', borderColor: 'rgba(0, 229, 255, 0.15)' };
  const IconComponent = config.icon;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/lesson/${lesson.id}` as any)}
      className="bg-evermore-surface border border-evermore-border active:bg-evermore-surfaceLight rounded-2xl p-4 mb-3"
      style={isCompleted ? {
        borderColor: 'rgba(52, 211, 153, 0.15)',
        shadowColor: '#34D399',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      } : {
        shadowColor: config.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1 pr-2">
          {/* Icon with glow */}
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
            style={{
              backgroundColor: config.bgColor,
              borderWidth: 1,
              borderColor: config.borderColor,
              shadowColor: config.color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
            }}
          >
            <IconComponent size={22} color={config.color} strokeWidth={2} />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center mb-0.5">
              <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Module {index + 1}
              </Text>
            </View>
            <Text className="text-base font-extrabold text-white leading-tight" numberOfLines={1}>
              {lesson.title}
            </Text>
          </View>
        </View>

        {isCompleted ? (
          <View className="flex-row items-center bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-full">
            <CheckCircle2 size={12} color="#34D399" />
            <Text className="text-[11px] font-bold text-emerald-400 ml-1">Done</Text>
          </View>
        ) : (
          <View className="bg-evermore-cyan/10 border border-evermore-cyan/20 px-2.5 py-1.5 rounded-full flex-row items-center">
            <Sparkles size={10} color="#00E5FF" />
            <Text className="text-[11px] font-bold text-evermore-cyan ml-1">+{lesson.pointsReward}</Text>
          </View>
        )}
      </View>

      <Text className="text-xs text-slate-400 leading-relaxed mb-3.5 pl-0.5" numberOfLines={2}>
        {lesson.description}
      </Text>

      {/* Meta Footer */}
      <View className="flex-row items-center justify-between pt-3 border-t border-slate-800/60 pl-0.5">
        <View className="flex-row items-center">
          <Clock size={12} color="#64748B" />
          <Text className="text-[11px] text-slate-500 font-medium ml-1">
            4 min read · {lesson.quiz.length} Questions
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-xs font-bold text-evermore-cyan mr-1">
            {isCompleted ? 'Review' : 'Start'}
          </Text>
          <ChevronRight size={14} color="#00E5FF" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
