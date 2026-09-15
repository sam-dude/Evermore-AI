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
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import {
  ArrowRight,
  Send,
  Sparkles,
  Zap,
  Globe2,
  Brain,
  CheckCircle2,
  Bell,
  ChevronDown,
} from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TELEGRAM_SUPPORT_URL = 'https://t.me/evermoreai';

export default function AndroidHomeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleGetStarted = () => {
    router.push('/membership');
  };

  const handleOpenTelegram = async () => {
    try {
      await Linking.openURL(TELEGRAM_SUPPORT_URL);
    } catch {
      Linking.openURL('https://t.me/evermoreai');
    }
  };

  const scrollToFirstSection = () => {
    scrollViewRef.current?.scrollTo({ y: 520, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top']}>
      {/* ── AMBIENT CYBER/MINT TOP HERO GLOW ── */}
      <Svg width={SCREEN_WIDTH} height={420} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Defs>
          <RadialGradient id="topMintGlow" cx="50%" cy="0%" rx="80%" ry="70%">
            <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.22" />
            <Stop offset="40%" stopColor="#00F5A0" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#050B14" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#topMintGlow)" />
      </Svg>

      {/* ── TOP APP BAR ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 14,
        }}
      >
        {/* Left: Brand Logo & Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/evermore-logo-white.png')}
            style={{ width: 34, height: 22, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 18,
              color: '#FFFFFF',
              letterSpacing: -0.3,
            }}
          >
            Evermore
          </Text>
        </View>

        {/* Right Actions: NGN badge, Bell, Profile Avatar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* NGN Currency Pill */}
          <View
            style={{
              backgroundColor: '#0D1527',
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 12.5,
                color: '#FFFFFF',
                letterSpacing: 0.5,
              }}
            >
              NGN
            </Text>
          </View>

          {/* Circular Bell Notification Icon Button */}
          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            activeOpacity={0.8}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={18} color="#FFFFFF" strokeWidth={2.2} />
          </TouchableOpacity>

          {/* Circular User Avatar with Green Ring (Display Only) */}
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              borderWidth: 2,
              borderColor: '#00F5A0',
              overflow: 'hidden',
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
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── SECTION 1: HERO & AI MONETIZATION ── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 24 }}>
          {/* Main Hero Headline */}
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 34,
              lineHeight: 40,
              color: '#FFFFFF',
              letterSpacing: -0.6,
              marginBottom: 8,
            }}
          >
            Train EverAI & Earn
          </Text>

          {/* Subtitle description */}
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 15,
              lineHeight: 22,
              color: '#94A3B8',
              marginBottom: 20,
            }}
          >
            Complete daily AI training prompts and evaluations to generate rewards.
          </Text>

          {/* ── IMAGE 1 MODERN CARD: AI MONETIZATION ── */}
          <View
            style={{
              backgroundColor: '#101726',
              borderRadius: 24,
              padding: 22,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.07)',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            {/* Green Pill: AI MONETIZATION */}
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 11.5,
                color: '#00F5A0',
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              AI MONETIZATION
            </Text>

            {/* Card Headline */}
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 24,
                color: '#FFFFFF',
                letterSpacing: -0.4,
                marginBottom: 14,
              }}
            >
              Train EverAI & Earn
            </Text>

            {/* Card Body */}
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 15,
                lineHeight: 22,
                color: '#94A3B8',
                marginBottom: 22,
              }}
            >
              No active EverAI tasks are available for your current plan right now.
            </Text>

            {/* Action CTA Button: Get Started (Replacing "Coming soon") */}
            <TouchableOpacity
              onPress={handleGetStarted}
              activeOpacity={0.88}
              style={{
                backgroundColor: '#00F5A0',
                paddingVertical: 14,
                paddingHorizontal: 22,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                shadowColor: '#00F5A0',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.extraBold,
                  fontSize: 14.5,
                  color: '#040914',
                  letterSpacing: 0.2,
                  marginRight: 6,
                }}
              >
                Get Started
              </Text>
              <ArrowRight size={16} color="#040914" strokeWidth={2.6} />
            </TouchableOpacity>
          </View>
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
                { icon: Globe2, title: 'Borderless Access', desc: 'Designed specifically for ambitious talents' },
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

          {/* Section CTA Button: Get Started */}
          <TouchableOpacity
            onPress={handleGetStarted}
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
              marginTop: 10,
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
              Get Started
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

              {/* Replaced "Coming soon" with "Get Started" direct link */}
              <TouchableOpacity
                onPress={handleGetStarted}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 245, 160, 0.15)',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 245, 160, 0.35)',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontFamily: Fonts.bold, fontSize: 10.5, color: '#00F5A0', marginRight: 4 }}>
                  Get Started
                </Text>
                <ArrowRight size={12} color="#00F5A0" />
              </TouchableOpacity>
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
            EverMore is not limited to learning and AI. The platform also creates reward-driven experiences around the conversations and trends people care about.
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
        {/* Primary CTA: Get Started -> */}
        <TouchableOpacity
          onPress={handleGetStarted}
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
            Get Started
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
