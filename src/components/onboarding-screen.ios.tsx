import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Circle as SvgCircle,
  Rect,
  Line,
} from 'react-native-svg';
import {
  Sparkles,
  Rocket,
  TrendingUp,
  ArrowRight,
} from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
  onLoginPress: () => void;
  onGuestPress?: () => void;
}

interface SlideData {
  id: string;
  watermark: string;
  tag: string;
  headline: string;
  body: string;
  icon: 'sparkles' | 'rocket' | 'trend';
  buttonLabel: string;
}

const SLIDES: SlideData[] = [
  {
    id: '1',
    watermark: '01',
    tag: 'EVERMORE',
    headline: 'There Is More In You.',
    body: 'Discover your potential, learn new skills, and become more of what you are capable of.',
    icon: 'sparkles',
    buttonLabel: 'Continue',
  },
  {
    id: '2',
    watermark: '02',
    tag: 'EVERMORE',
    headline: 'Turn Potential Into Possibility.',
    body: 'Access opportunities, participate in technology and AI, develop your abilities, and create new ways to earn.',
    icon: 'rocket',
    buttonLabel: 'Continue',
  },
  {
    id: '3',
    watermark: '03',
    tag: 'EVERMORE',
    headline: 'Grow. Track. Achieve.',
    body: 'Keep moving forward. Track your progress, build your capabilities, and achieve more with EverMore.',
    icon: 'trend',
    buttonLabel: 'Get Started',
  },
];

export function OnboardingScreen({ onFinish, onLoginPress, onGuestPress }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const openLegal = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, { toolbarColor: '#050B14' });
    } catch {}
  };

  const handleSkip = () => {
    if (onGuestPress) {
      onGuestPress();
    } else {
      onFinish();
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const goToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      onFinish();
    }
  };

  const renderIcon = (iconType: 'sparkles' | 'rocket' | 'trend') => {
    switch (iconType) {
      case 'sparkles':
        return <Sparkles size={40} color="#FFFFFF" />;
      case 'rocket':
        return <Rocket size={40} color="#FFFFFF" style={{ transform: [{ rotate: '45deg' }] }} />;
      case 'trend':
        return <TrendingUp size={40} color="#FFFFFF" strokeWidth={2.8} />;
    }
  };

  const renderSlide = ({ item }: { item: SlideData }) => (
    <View style={{ width: SCREEN_WIDTH, flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' }}>
      <View style={{ height: 16 }} />

      {/* ── RADAR HOLOGRAM CENTER GRAPHIC ── */}
      <View
        style={{
          width: '100%',
          height: 270,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background Large Faint Watermark Number */}
        <Text
          style={{
            position: 'absolute',
            fontSize: 130,
            fontFamily: Fonts.extraBold,
            color: 'rgba(255, 255, 255, 0.035)',
            letterSpacing: -4,
          }}
        >
          {item.watermark}
        </Text>

        {/* Radar Concentric Rings with Glow */}
        <Svg width={270} height={270} style={{ position: 'absolute' }}>
          <Defs>
            <RadialGradient id={`ios-glow-${item.id}`} cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
              <Stop offset="55%" stopColor="#0055AA" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="#061124" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <SvgCircle cx="135" cy="135" r="130" fill={`url(#ios-glow-${item.id})`} />
          <SvgCircle
            cx="135"
            cy="135"
            r="115"
            stroke="rgba(35, 75, 135, 0.4)"
            strokeWidth="1"
            fill="none"
          />
          <SvgCircle
            cx="135"
            cy="135"
            r="82"
            stroke="rgba(45, 105, 175, 0.45)"
            strokeWidth="1"
            fill="none"
          />
        </Svg>

        {/* Central Glowing Circle Platform */}
        <View
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
            backgroundColor: 'rgba(12, 48, 88, 0.65)',
            borderWidth: 1.5,
            borderColor: 'rgba(0, 229, 255, 0.55)',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.45,
            shadowRadius: 18,
            elevation: 8,
          }}
        >
          {renderIcon(item.icon)}
        </View>

        {/* Floating Glowing Accent Dots */}
        <View
          style={{
            position: 'absolute',
            left: 48,
            top: 48,
            width: 7,
            height: 7,
            borderRadius: 3.5,
            backgroundColor: '#00E5FF',
            shadowColor: '#00E5FF',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.9,
            shadowRadius: 8,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 65,
            bottom: 60,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#00E5FF',
            opacity: 0.6,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: 58,
            bottom: 52,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00F5A0',
            shadowColor: '#00F5A0',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.9,
            shadowRadius: 10,
          }}
        />
      </View>

      {/* ── TEXT CONTENT ── */}
      <View style={{ marginBottom: 20 }}>
        {/* Neon Green Accent Line + EVERMORE */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View
            style={{
              width: 24,
              height: 3,
              backgroundColor: '#00F5A0',
              borderRadius: 2,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 12,
              color: '#00F5A0',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {item.tag}
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            fontSize: 32,
            lineHeight: 38,
            color: '#FFFFFF',
            letterSpacing: -0.6,
            marginBottom: 12,
          }}
        >
          {item.headline}
        </Text>

        {/* Body Description */}
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: 14.5,
            lineHeight: 23,
            color: '#94A3B8',
          }}
        >
          {item.body}
        </Text>
      </View>
    </View>
  );

  const progressPercent = ((currentIndex + 1) / SLIDES.length) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#061124' }} edges={['top', 'bottom']}>
      {/* Background Subtle Tech Grid */}
      <Svg width={SCREEN_WIDTH} height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="iosScreenBg" cx="50%" cy="30%" rx="70%" ry="50%">
            <Stop offset="0%" stopColor="#0B1E38" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#061124" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#iosScreenBg)" />
        {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => (
          <Line
            key={`v-${idx}`}
            x1={SCREEN_WIDTH * ratio}
            y1={0}
            x2={SCREEN_WIDTH * ratio}
            y2="100%"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
          />
        ))}
        {[0.15, 0.3, 0.45, 0.6, 0.75].map((ratio, idx) => (
          <Line
            key={`h-${idx}`}
            x1={0}
            y1={`${ratio * 100}%`}
            x2={SCREEN_WIDTH}
            y2={`${ratio * 100}%`}
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
          />
        ))}
      </Svg>

      {/* ── TOP BAR ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 22,
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        {/* Evermore Infinity Logo + Lowercase Text */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/evermore-logo-white.png')}
            style={{ width: 34, height: 22, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 16,
              color: '#FFFFFF',
              letterSpacing: 0.2,
            }}
          >
            evermore
          </Text>
        </View>

        {/* Sleek Skip Pill Button */}
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          style={{
            paddingHorizontal: 18,
            paddingVertical: 7,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <Text style={{ fontFamily: Fonts.bold, fontSize: 12, color: '#E2E8F0' }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── CAROUSEL ── */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        style={{ flex: 1 }}
      />

      {/* ── BOTTOM NAVIGATION SECTION ── */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 10 }}>
        {/* Horizontal Progress Bar + Step Counter */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              marginRight: 14,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                borderRadius: 2,
                backgroundColor: '#00F5A0',
              }}
            />
          </View>
          <Text style={{ fontFamily: Fonts.bold, fontSize: 12, color: '#64748B' }}>
            {currentIndex + 1}/3
          </Text>
        </View>

        {/* Vibrant Green Action Button */}
        <TouchableOpacity
          onPress={goToNext}
          activeOpacity={0.88}
          style={{
            backgroundColor: '#00E599',
            paddingVertical: 16,
            borderRadius: 28,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#00E599',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 14,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 16,
              color: '#050B14',
              letterSpacing: 0.2,
              marginRight: 6,
            }}
          >
            {SLIDES[currentIndex].buttonLabel}
          </Text>
          <ArrowRight size={18} color="#050B14" strokeWidth={2.6} />
        </TouchableOpacity>

        {/* Slide 3 Secondary Options (Sign In & Guest Access) */}
        {currentIndex === SLIDES.length - 1 ? (
          <View style={{ marginTop: 12, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={onLoginPress}
              activeOpacity={0.75}
              style={{ paddingVertical: 4 }}
            >
              <Text style={{ fontFamily: Fonts.regular, fontSize: 12.5, color: '#94A3B8' }}>
                Already have an account?{' '}
                <Text style={{ fontFamily: Fonts.bold, color: '#00E5FF' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSkip}
              activeOpacity={0.75}
              style={{ paddingVertical: 4 }}
            >
              <Text style={{ fontFamily: Fonts.medium, fontSize: 11.5, color: '#64748B' }}>
                or <Text style={{ color: '#94A3B8', textDecorationLine: 'underline' }}>Explore as Guest (No Account Required)</Text>
              </Text>
            </TouchableOpacity>

            {/* Legal links */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/privacy.html')}>
                <Text style={{ fontFamily: Fonts.regular, fontSize: 11, color: '#64748B' }}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={{ color: '#334155', fontSize: 10 }}>•</Text>
              <TouchableOpacity onPress={() => openLegal('https://evermoreinnovation.site/terms.html')}>
                <Text style={{ fontFamily: Fonts.regular, fontSize: 11, color: '#64748B' }}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ height: 60 }} />
        )}
      </View>
    </SafeAreaView>
  );
}
