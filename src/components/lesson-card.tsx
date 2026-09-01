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
} from 'lucide-react-native';
import { Lesson } from '@/data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted?: boolean;
  score?: number | null;
}

const ICON_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
  brain: { icon: Brain, color: '#38BDF8', bg: 'bg-sky-500/15' },
  'trending-up': { icon: TrendingUp, color: '#34D399', bg: 'bg-emerald-500/15' },
  cpu: { icon: Cpu, color: '#A78BFA', bg: 'bg-purple-500/15' },
  rocket: { icon: Rocket, color: '#F59E0B', bg: 'bg-amber-500/15' },
  briefcase: { icon: Briefcase, color: '#FB7185', bg: 'bg-rose-500/15' },
};

export function LessonCard({ lesson, index, isCompleted = false, score }: LessonCardProps) {
  const router = useRouter();
  const config = ICON_CONFIG[lesson.icon] || { icon: BookOpen, color: '#38BDF8', bg: 'bg-sky-500/15' };
  const IconComponent = config.icon;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/lesson/${lesson.id}` as any)}
      className="bg-[#121A2A] border border-[#1E2C44] active:bg-[#182338] rounded-2xl p-4 mb-3"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1 pr-2">
          {/* iOS-style Squircle Icon */}
          <View
            className={`w-11 h-11 rounded-2xl ${config.bg} items-center justify-center mr-3 border border-white/5`}
          >
            <IconComponent size={22} color={config.color} strokeWidth={2} />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center space-x-1.5 mb-0.5">
              <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Module {index + 1}
              </Text>
            </View>
            <Text className="text-base font-extrabold text-white leading-tight" numberOfLines={1}>
              {lesson.title}
            </Text>
          </View>
        </View>

        {isCompleted ? (
          <View className="flex-row items-center bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={12} color="#34D399" />
            <Text className="text-[11px] font-bold text-emerald-400 ml-1">Completed</Text>
          </View>
        ) : (
          <View className="bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
            <Text className="text-[11px] font-bold text-sky-400">+{lesson.pointsReward} pts</Text>
          </View>
        )}
      </View>

      <Text className="text-xs text-slate-400 leading-relaxed mb-3.5 pl-0.5" numberOfLines={2}>
        {lesson.description}
      </Text>

      {/* Meta Footer */}
      <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-800/80 pl-0.5">
        <View className="flex-row items-center">
          <Clock size={12} color="#64748B" />
          <Text className="text-[11px] text-slate-400 font-medium ml-1">
            4 min read · {lesson.quiz.length} Questions
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-xs font-bold text-sky-400 mr-1">
            {isCompleted ? 'Review' : 'Start'}
          </Text>
          <ChevronRight size={14} color="#38BDF8" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
