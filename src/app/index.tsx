import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Flame, Brain, Trophy, ChevronRight, ExternalLink } from 'lucide-react-native';

const SITE_URL = 'https://evermoreinnovation.site/';
const PRIVACY_URL = 'https://evermoreinnovation.site/privacy.html';
const TERMS_URL = 'https://evermoreinnovation.site/terms.html';
const TELEGRAM_URL = 'https://t.me/evermoreai?text=evermore';
const WHATSAPP_URL = 'https://t.me/evermoreai?text=evermore';

const { width: screenWidth } = Dimensions.get('window');

const openSite = async (url: string = SITE_URL) => {
  try {
    await WebBrowser.openBrowserAsync(url, {
      toolbarColor: '#0A0F1A',
      controlsColor: '#00E5FF',
    });
  } catch {
    Linking.openURL(url);
  }
};

// ─── Feature data ───
const FEATURES = [
  {
    icon: Flame,
    title: 'Tap. Mine. Earn.',
    description:
      'Mine Evercoin every day with Evertap. Watch your coins stack up, cash them out for real rewards, or use them to unlock exclusive offers across Evermore.',
    tags: ['Daily mining streaks', 'Unlock exclusive offers', 'Convert to real value'],
  },
  {
    icon: Brain,
    title: 'AI Monetization',
    description:
      'Earn by helping improve EverAI through simple training tasks. Complete AI correction jobs and receive rewards for accurate responses.',
    tags: ['Train new AI models', 'Hourly paid tasks', 'Develop tech skills'],
  },
  {
    icon: Trophy,
    title: 'Predict & Earn',
    description:
      'Make FREE predictions on your favourite housemates and earn rewards for correct predictions. Track your accuracy and claim rewards seamlessly.',
    tags: ['Free entry predictions', 'Track accuracy', 'Win Evercoin'],
  },
];

// ─── Components ───

function FeatureCard({
  icon: Icon,
  title,
  description,
  tags,
}: (typeof FEATURES)[0]) {
  return (
    <View
      style={{
        backgroundColor: '#111827',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1E293B',
        padding: 20,
        marginBottom: 14,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Icon size={18} color="#00E5FF" />
        </View>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#F1F5F9' }}>
          {title}
        </Text>
      </View>

      <Text style={{ fontSize: 13, color: '#94A3B8', lineHeight: 20, marginBottom: 12 }}>
        {description}
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {tags.map((tag) => (
          <View
            key={tag}
            style={{
              backgroundColor: 'rgba(0, 229, 255, 0.08)',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 11, color: '#00E5FF', fontWeight: '500' }}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Main Screen ───

export default function HomeScreen() {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0F1A' }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* ── HEADER BAR ── */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 14,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1.5 }}>
              EVER<Text style={{ color: '#00E5FF' }}>MORE</Text>
            </Text>
            <TouchableOpacity
              onPress={() => openSite()}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#00E5FF',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0A0F1A' }}>
                Join Waitlist
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── HERO SECTION ── */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
            {/* Badge */}
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(0, 229, 255, 0.12)',
                borderWidth: 1,
                borderColor: 'rgba(0, 229, 255, 0.3)',
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 5,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#00E5FF' }}>Evermore</Text>
            </View>

            {/* Headline */}
            <Text
              style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#FFFFFF',
                lineHeight: 38,
                marginBottom: 4,
              }}
            >
              Skills to Value.
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                color: '#00E5FF',
                lineHeight: 36,
                marginBottom: 16,
              }}
            >
              Possibilities to{'\n'}Experiences.
            </Text>

            {/* Body copy */}
            <Text
              style={{
                fontSize: 14,
                color: '#94A3B8',
                lineHeight: 22,
                maxWidth: 340,
                marginBottom: 20,
              }}
            >
              Evermore is a digital opportunity platform connecting participation, modern skills,
              campaigns, and reward-driven experiences. Action first. Reward second.
            </Text>

            {/* CTAs */}
            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
              <TouchableOpacity
                onPress={() => openSite()}
                activeOpacity={0.85}
                style={{
                  backgroundColor: '#00E5FF',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#0A0F1A', marginRight: 6 }}>
                  Explore Opportunities
                </Text>
                <ChevronRight size={16} color="#0A0F1A" strokeWidth={2.5} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL(TELEGRAM_URL)}
                activeOpacity={0.85}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  borderColor: '#00E5FF',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#00E5FF' }}>
                  Join Waitlist
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── LOGO ORB ── */}
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
            <Animated.View
              style={{
                transform: [{ translateY: floatAnim }],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer glow ring */}
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  borderRadius: 90,
                  backgroundColor: 'rgba(0, 229, 255, 0.06)',
                  borderWidth: 1,
                  borderColor: 'rgba(0, 229, 255, 0.15)',
                  opacity: pulseAnim,
                }}
              />
              {/* Inner sphere */}
              <View
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  backgroundColor: '#111827',
                  borderWidth: 1.5,
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  shadowColor: '#00E5FF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <Image
                  source={require('@/assets/images/evertap-logo.jpeg')}
                  style={{ width: 140, height: 140 }}
                  resizeMode="cover"
                />
              </View>
            </Animated.View>
          </View>

          {/* ── ABOUT SECTION ── */}
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#00E5FF',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              What is Evermore?
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#F1F5F9', marginBottom: 12 }}>
              We are the bridge between the digital world and real-world opportunities.
            </Text>

            {/* Three pillars */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
              {[
                { label: 'Action First', sub: 'Participate, learn, engage.' },
                { label: 'Reward Second', sub: 'Earn Evercoin & real value.' },
                { label: 'Trust Always', sub: 'Clear rules, fair rewards.' },
              ].map((item) => (
                <View
                  key={item.label}
                  style={{
                    flex: 1,
                    backgroundColor: '#111827',
                    borderRadius: 12,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#1E293B',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#F1F5F9', marginBottom: 4 }}>
                    {item.label}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#64748B', lineHeight: 14 }}>{item.sub}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── FEATURES SECTION ── */}
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#00E5FF',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Priority Experiences
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                color: '#F1F5F9',
                marginBottom: 16,
              }}
            >
              Core features that power your journey.
            </Text>

            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </View>

          {/* ── AI HUB BANNER ── */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 28,
              backgroundColor: '#111827',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#1E293B',
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#00E5FF',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Coming Soon
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: '#F1F5F9',
                textAlign: 'center',
                marginBottom: 6,
              }}
            >
              AI Monetized Training Hub
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#94A3B8',
                textAlign: 'center',
                lineHeight: 20,
                marginBottom: 16,
                maxWidth: 280,
              }}
            >
              Train. Contribute. Get Rewarded.{'\n'}The future of AI monetization is going beyond borders.
            </Text>
            <TouchableOpacity
              onPress={() => openSite()}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#00E5FF',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0A0F1A', marginRight: 6 }}>
                Get Started
              </Text>
              <ExternalLink size={14} color="#0A0F1A" />
            </TouchableOpacity>
          </View>

          {/* ── COMMUNITY SECTION ── */}
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 28,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#00E5FF',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Community
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                color: '#F1F5F9',
                marginBottom: 8,
              }}
            >
              Join the Evermore Community
            </Text>
            <Text style={{ fontSize: 13, color: '#94A3B8', lineHeight: 20, marginBottom: 16 }}>
              Stay updated on our launch, get exclusive sneak peeks, and connect with other opportunity seekers.
            </Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => Linking.openURL(TELEGRAM_URL)}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  backgroundColor: '#111827',
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#1E293B',
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#F1F5F9' }}>Telegram</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:customercare@evermoreinnovation.site')}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  backgroundColor: '#111827',
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#1E293B',
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#F1F5F9' }}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── FOOTER ── */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: '#1E293B',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 }}>
              EVER<Text style={{ color: '#00E5FF' }}>MORE</Text>
            </Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
              Skills to Value. Possibilities to Experiences.
            </Text>

            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 12 }}>
              <TouchableOpacity onPress={() => openSite()}>
                <Text style={{ fontSize: 12, color: '#94A3B8' }}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openSite()}>
                <Text style={{ fontSize: 12, color: '#94A3B8' }}>Features</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openSite()}>
                <Text style={{ fontSize: 12, color: '#94A3B8' }}>Community</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
              <TouchableOpacity onPress={() => openSite(PRIVACY_URL)}>
                <Text style={{ fontSize: 11, color: '#64748B', textDecorationLine: 'underline' }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openSite(TERMS_URL)}>
                <Text style={{ fontSize: 11, color: '#64748B', textDecorationLine: 'underline' }}>
                  Terms of Service
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 10, color: '#475569' }}>
              © 2026 Evermore. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
