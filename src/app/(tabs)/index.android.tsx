import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Defs, RadialGradient, LinearGradient, Stop, Rect, Circle as SvgCircle } from 'react-native-svg';
import {
  ChevronDown,
  ArrowRight,
  Send,
  Sparkles,
  Zap,
  Globe2,
  TrendingUp,
  Brain,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TELEGRAM_SUPPORT_URL = 'https://t.me/evermoreai';

export default function AndroidHomeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleJoinEverMore = () => {
    router.push('/membership');
  };

  const handleOpenTelegram = async () => {
    try {
      await Linking.openURL(TELEGRAM_SUPPORT_URL);
    } catch {
      // Fallback url
      Linking.openURL('https://t.me/evermoreai');
    }
  };

  const scrollToFirstSection = () => {
    scrollViewRef.current?.scrollTo({ y: 480, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top']}>
      {/* Dynamic Background Glow */}
      <Svg width={SCREEN_WIDTH} height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="homeGlow1" cx="20%" cy="10%" rx="60%" ry="40%">
            <Stop offset="0%" stopColor="#0E355C" stopOpacity="0.45" />
            <Stop offset="100%" stopColor="#050B14" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="homeGlow2" cx="80%" cy="55%" rx="50%" ry="35%">
            <Stop offset="0%" stopColor="#005748" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#050B14" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#homeGlow1)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#homeGlow2)" />
      </Svg>

      {/* ── TOP APP BAR ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(30, 58, 95, 0.35)',
        }}
      >
        {/* Evermore Brand Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              overflow: 'hidden',
              marginRight: 9,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 229, 255, 0.4)',
              backgroundColor: '#0A1628',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../../../assets/images/evertap-logo.jpeg')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 15,
                color: '#FFFFFF',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              EVERMORE
            </Text>
          </View>
        </View>

        {/* Support Top Pill */}
        <TouchableOpacity
          onPress={handleOpenTelegram}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 30, 60, 0.85)',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(0, 229, 255, 0.35)',
          }}
        >
          <Send size={13} color="#00E5FF" style={{ marginRight: 6 }} />
          <Text style={{ fontFamily: Fonts.bold, fontSize: 11.5, color: '#00E5FF' }}>
            Support
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── SECTION 1: HERO SECTION ── */}
        <View style={{ paddingHorizontal: 22, paddingTop: 28, paddingBottom: 24 }}>
          {/* Welcome Tag */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
            <View
              style={{
                width: 28,
                height: 3,
                backgroundColor: '#00F5A0',
                borderRadius: 2,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 11,
                color: '#00F5A0',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              WELCOME TO EVERMORE
            </Text>
          </View>

          {/* Main Hero Headline */}
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 38,
              lineHeight: 44,
              color: '#FFFFFF',
              letterSpacing: -0.8,
              marginBottom: 16,
            }}
          >
            Exist Beyond{'\n'}The Moment.
          </Text>

          {/* Subheading */}
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 18,
              color: '#38BDF8',
              letterSpacing: -0.2,
              marginBottom: 12,
            }}
          >
            Learn. Grow. Participate. Earn.
          </Text>

          {/* Body Narrative */}
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14.5,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 26,
            }}
          >
            A technology and opportunity platform connecting people, skills, technology and real-world possibilities.
          </Text>

          {/* Scroll to Discover Indicator */}
          <TouchableOpacity
            onPress={scrollToFirstSection}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <ChevronDown size={18} color="#94A3B8" />
            </View>
            <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: '#94A3B8' }}>
              Scroll to discover
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── SECTION 2: THE ESSENCE SHOWCASE CARD ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: '#0A182E',
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 245, 160, 0.35)',
              overflow: 'hidden',
              padding: 22,
              shadowColor: '#00F5A0',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 18,
              elevation: 8,
            }}
          >
            {/* Background SVG radial highlight */}
            <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
              <Defs>
                <RadialGradient id="cardGlow1" cx="80%" cy="20%" rx="60%" ry="50%">
                  <Stop offset="0%" stopColor="#00F5A0" stopOpacity="0.2" />
                  <Stop offset="100%" stopColor="#0A182E" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#cardGlow1)" />
            </Svg>

            {/* Top Brand Pill in Card */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 245, 160, 0.12)',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 245, 160, 0.3)',
                }}
              >
                <Sparkles size={13} color="#00F5A0" style={{ marginRight: 6 }} />
                <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00F5A0', letterSpacing: 0.5 }}>
                  EVERMORE ESSENCE
                </Text>
              </View>
            </View>

            {/* Card Big Title */}
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 30,
                color: '#FFFFFF',
                letterSpacing: -0.5,
                lineHeight: 36,
                marginBottom: 10,
              }}
            >
              THE ESSENCE
            </Text>

            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 13.5,
                lineHeight: 21,
                color: '#CBD5E1',
                marginBottom: 18,
              }}
            >
              Unlocking human potential through modern artificial intelligence, high-demand skills, and decentralized earning avenues.
            </Text>

            {/* Micro Highlights Grid */}
            <View style={{ gap: 10 }}>
              {[
                { icon: Brain, title: 'AI Mastery', desc: 'Practical prompt engineering & generative models' },
                { icon: Zap, title: 'Real Monetization', desc: 'Hourly paid AI tasks and training campaigns' },
                { icon: Globe2, title: 'Borderless Access', desc: 'Designed specifically for ambitious African talents' },
              ].map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(5, 14, 28, 0.7)',
                    borderRadius: 14,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: 'rgba(0, 229, 255, 0.12)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    <item.icon size={18} color="#00E5FF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: Fonts.bold, fontSize: 13, color: '#FFFFFF' }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontFamily: Fonts.regular, fontSize: 11.5, color: '#94A3B8' }}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── SECTION 3: WHERE POSSIBILITIES BECOME EXPERIENCES ── */}
        <View style={{ paddingHorizontal: 22, marginBottom: 36 }}>
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 32,
              lineHeight: 38,
              color: '#FFFFFF',
              letterSpacing: -0.6,
              marginBottom: 18,
            }}
          >
            Where Possibilities{'\n'}Become Experiences.
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 14,
            }}
          >
            EverMore is a technology and opportunity platform built to bridge the gap between the digital world and real-world opportunities.
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 14,
            }}
          >
            We create avenues for people to learn, develop skills, participate in AI, monetize their abilities, discover opportunities and earn rewards.
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 24,
            }}
          >
            At the heart of EverMore is a simple belief: there is always more to learn, more to build and more to achieve.
          </Text>

          {/* Section CTA Button */}
          <TouchableOpacity
            onPress={handleJoinEverMore}
            activeOpacity={0.88}
            style={{
              backgroundColor: '#00F5A0',
              paddingVertical: 15,
              paddingHorizontal: 24,
              borderRadius: 28,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              shadowColor: '#00F5A0',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 14,
              elevation: 6,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 14.5,
                color: '#040914',
                letterSpacing: 0.3,
              }}
            >
              Join EverMore
            </Text>
            <ArrowRight size={17} color="#040914" strokeWidth={2.8} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* ── SECTION 4: AFRICA, MEET EVERAI ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 36 }}>
          <View
            style={{
              backgroundColor: '#081527',
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: 'rgba(0, 229, 255, 0.35)',
              overflow: 'hidden',
              padding: 22,
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.22,
              shadowRadius: 18,
              elevation: 8,
            }}
          >
            {/* Top Tag inside card */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.14)',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                }}
              >
                <Text style={{ fontFamily: Fonts.bold, fontSize: 10.5, color: '#00E5FF', letterSpacing: 0.6 }}>
                  NEXT-GEN PLATFORM
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(245, 158, 11, 0.35)',
                }}
              >
                <Text style={{ fontFamily: Fonts.bold, fontSize: 10, color: '#F59E0B' }}>
                  Coming soon
                </Text>
              </View>
            </View>

            {/* Title */}
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 30,
                color: '#FFFFFF',
                letterSpacing: -0.6,
                lineHeight: 36,
                marginBottom: 8,
              }}
            >
              Africa,{'\n'}Meet EverAi.
            </Text>

            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: 14,
                color: '#00F5A0',
                marginBottom: 16,
              }}
            >
              We are building a new generation of Generative AI.
            </Text>

            {/* Banner Content Container */}
            <View
              style={{
                backgroundColor: 'rgba(4, 10, 20, 0.85)',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.08)',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontFamily: Fonts.bold, fontSize: 14, color: '#FFFFFF', marginBottom: 6 }}>
                No Longer Location-restricted.
              </Text>
              <Text style={{ fontFamily: Fonts.regular, fontSize: 12.5, color: '#94A3B8', lineHeight: 19, marginBottom: 14 }}>
                Anticipate the Next Big Thing in Africa. Work directly with foundational AI models, label high-value datasets, and earn guaranteed digital payouts.
              </Text>

              {/* Badges */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Train', 'Contribute', 'Get Rewarded'].map((tag, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 245, 160, 0.1)',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 245, 160, 0.25)',
                    }}
                  >
                    <CheckCircle2 size={12} color="#00F5A0" style={{ marginRight: 5 }} />
                    <Text style={{ fontFamily: Fonts.bold, fontSize: 11, color: '#00F5A0' }}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={{ fontFamily: Fonts.medium, fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
              The future of AI monetization is going beyond borders.
            </Text>
          </View>
        </View>

        {/* ── SECTION 5: MORE WAYS TO PARTICIPATE ── */}
        <View style={{ paddingHorizontal: 22, marginBottom: 28 }}>
          {/* Section Number & Tag */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 16,
                color: '#00E5FF',
                marginRight: 10,
              }}
            >
              07
            </Text>
            <View
              style={{
                width: 20,
                height: 2,
                backgroundColor: '#00E5FF',
                borderRadius: 1,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 11,
                color: '#00E5FF',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              MORE WAYS TO PARTICIPATE
            </Text>
          </View>

          {/* Headline */}
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 30,
              lineHeight: 36,
              color: '#FFFFFF',
              letterSpacing: -0.5,
              marginBottom: 16,
            }}
          >
            We Turn Trends{'\n'}Into Opportunities.
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 14,
            }}
          >
            EverMore is not limited to learning and AI.
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 14,
            }}
          >
            The platform also creates reward-driven experiences around the conversations and trends people care about.
          </Text>

          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 23,
              color: '#94A3B8',
              marginBottom: 26,
            }}
          >
            Users can participate in selected prediction and engagement experiences, make free predictions and stand a chance to earn rewards.
          </Text>
        </View>
      </ScrollView>

      {/* ── FIXED BOTTOM ACTION BAR ── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(5, 11, 20, 0.94)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(30, 58, 95, 0.6)',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 22,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Primary CTA: Join EverMore -> */}
        <TouchableOpacity
          onPress={handleJoinEverMore}
          activeOpacity={0.88}
          style={{
            flex: 1,
            backgroundColor: '#00F5A0',
            paddingVertical: 14,
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#00F5A0',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 14.5,
              color: '#040914',
              letterSpacing: 0.3,
            }}
          >
            Join EverMore
          </Text>
          <ArrowRight size={17} color="#040914" strokeWidth={2.8} style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Telegram Support Pill Button */}
        <TouchableOpacity
          onPress={handleOpenTelegram}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#0A1E38',
            paddingVertical: 14,
            paddingHorizontal: 18,
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(0, 229, 255, 0.4)',
          }}
        >
          <Send size={15} color="#00E5FF" style={{ marginRight: 6 }} />
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 13,
              color: '#FFFFFF',
            }}
          >
            Support
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
