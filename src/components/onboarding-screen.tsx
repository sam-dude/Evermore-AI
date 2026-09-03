import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Flame, Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
  onLoginPress: () => void;
}

const SLIDES = [
  {
    id: '1',
    icon: BookOpen,
    iconColor: '#00E5FF',
    badge: 'Curated Knowledge',
    title: 'Learn Practical\nDigital Skills',
    description:
      'Master essential tech concepts, data workflows, and modern digital skills through structured, bite-sized lessons.',
    highlight: '5+ Interactive Learning Modules',
  },
  {
    id: '2',
    icon: Flame,
    iconColor: '#F59E0B',
    badge: 'Consistency & Growth',
    title: 'Build Your Daily\nLearning Streak',
    description:
      'Check in daily, test your retention with quizzes, and earn EverPoints as you progress toward your goals.',
    highlight: 'Earn points & build habits daily',
  },
  {
    id: '3',
    icon: Compass,
    iconColor: '#34D399',
    badge: 'Vibrant Community',
    title: 'Unlock Verified\nOpportunities',
    description:
      'Join thousands of motivated members across Africa connecting with peer communities and digital tasks.',
    highlight: 'Official Telegram & Mentorship',
  },
];

export function OnboardingScreen({ onFinish, onLoginPress }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onFinish();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-evermore-bg">
      {/* ── TOP BAR ── */}
      <View className="flex-row items-center justify-between px-6 pt-3 pb-2">
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-xl overflow-hidden mr-2.5 border border-evermore-border bg-evermore-surface">
            <Image
              source={require('../../assets/images/evertap-logo.jpeg')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Text className="text-base font-extrabold text-white tracking-tight">
            EVER<Text className="text-evermore-cyan">MORE</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={onFinish} activeOpacity={0.7} className="py-1.5 px-3 rounded-full bg-slate-800/50">
          <Text className="text-xs font-semibold text-slate-400">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* ── CAROUSEL ── */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const IconComponent = item.icon;
          return (
            <View style={{ width: SCREEN_WIDTH }} className="px-7 justify-center flex-1 py-6">
              {/* Graphic Card with Glow */}
              <View
                className="bg-evermore-surface border border-evermore-border rounded-3xl p-8 mb-8 items-center justify-center min-h-[220px]"
                style={{
                  shadowColor: item.iconColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.12,
                  shadowRadius: 20,
                }}
              >
                <View
                  className="w-20 h-20 rounded-2xl items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${item.iconColor}15`,
                    borderWidth: 1,
                    borderColor: `${item.iconColor}30`,
                    shadowColor: item.iconColor,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                  }}
                >
                  <IconComponent size={36} color={item.iconColor} strokeWidth={1.8} />
                </View>

                <View className="flex-row items-center bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 size={13} color="#00E5FF" />
                  <Text className="text-xs font-medium text-slate-200 ml-1.5">
                    {item.highlight}
                  </Text>
                </View>
              </View>

              {/* Text Info */}
              <View className="mb-2">
                <View
                  className="self-start px-3 py-1.5 rounded-full mb-3"
                  style={{
                    backgroundColor: `${item.iconColor}10`,
                    borderWidth: 1,
                    borderColor: `${item.iconColor}20`,
                  }}
                >
                  <Text
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: item.iconColor }}
                  >
                    {item.badge}
                  </Text>
                </View>

                <Text className="text-3xl font-black text-white leading-tight tracking-tight mb-3">
                  {item.title}
                </Text>

                <Text className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* ── BOTTOM CONTROLS ── */}
      <View className="px-7 pb-8 pt-2">
        {/* Pagination Dots */}
        <View className="flex-row items-center justify-center mb-6" style={{ gap: 8 }}>
          {SLIDES.map((slide, idx) => (
            <View
              key={idx}
              style={{
                height: 8,
                borderRadius: 4,
                width: currentIndex === idx ? 28 : 8,
                backgroundColor: currentIndex === idx ? '#00E5FF' : '#1E293B',
                ...(currentIndex === idx ? {
                  shadowColor: '#00E5FF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                } : {}),
              }}
            />
          ))}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          className="py-4 rounded-2xl flex-row items-center justify-center mb-3.5"
          style={{
            backgroundColor: '#00E5FF',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
          }}
        >
          <Text className="font-extrabold text-evermore-bg text-sm mr-2">
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          <ArrowRight size={16} color="#050B14" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity onPress={onLoginPress} activeOpacity={0.7} className="items-center py-2">
          <Text className="text-xs text-slate-400">
            Already have an account?{' '}
            <Text className="text-evermore-cyan font-bold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
