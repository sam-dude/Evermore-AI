import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Flame, Compass, ArrowRight, CheckCircle2 } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
  onLoginPress: () => void;
}

const SLIDES = [
  {
    id: '1',
    icon: BookOpen,
    badge: 'Curated Knowledge',
    title: 'Learn Practical\nDigital Skills',
    description:
      'Master essential tech concepts, data workflows, and modern digital skills through structured, bite-sized lessons.',
    highlight: '5+ Interactive Learning Modules',
  },
  {
    id: '2',
    icon: Flame,
    badge: 'Consistency & Growth',
    title: 'Build Your Daily\nLearning Streak',
    description:
      'Check in daily, test your retention with quizzes, and earn EverPoints as you progress toward your goals.',
    highlight: 'Earn points & build habits daily',
  },
  {
    id: '3',
    icon: Compass,
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
    <SafeAreaView className="flex-1 bg-[#090D16]">
      {/* ── TOP BAR ── */}
      <View className="flex-row items-center justify-between px-6 pt-3 pb-2">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-xl overflow-hidden mr-2.5 border border-slate-700 bg-slate-800">
            <Image
              source={require('../../assets/images/evertap-logo.jpeg')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Text className="text-base font-extrabold text-white tracking-tight">
            EVER<Text className="text-sky-400">MORE</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={onFinish} activeOpacity={0.7} className="py-1 px-2.5">
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
              {/* Graphic Card */}
              <View className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl items-center justify-center min-h-[220px]">
                <View className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/20 items-center justify-center mb-5">
                  <IconComponent size={36} color="#38BDF8" strokeWidth={1.8} />
                </View>

                <View className="flex-row items-center bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 size={13} color="#38BDF8" />
                  <Text className="text-xs font-medium text-slate-200 ml-1.5">
                    {item.highlight}
                  </Text>
                </View>
              </View>

              {/* Text Info */}
              <View className="mb-2">
                <View className="self-start bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full mb-3">
                  <Text className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
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
        <View className="flex-row items-center justify-center space-x-2 mb-6">
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-7 bg-sky-400' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          className="bg-sky-400 active:bg-sky-300 py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-sky-500/20 mb-3.5"
        >
          <Text className="font-extrabold text-slate-950 text-sm mr-2">
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          <ArrowRight size={16} color="#020617" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity onPress={onLoginPress} activeOpacity={0.7} className="items-center py-2">
          <Text className="text-xs text-slate-400">
            Already have an account?{' '}
            <Text className="text-sky-400 font-bold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
