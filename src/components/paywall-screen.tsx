import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Check,
  Award,
  Compass,
  Zap,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PaywallScreenProps {
  onSelectPlan: (plan: 'basic' | 'premium') => void;
  onBack: () => void;
}

interface PlanItem {
  id: 'basic' | 'premium';
  name: string;
  badgeText: string;
  badgeIcon: 'award' | 'compass';
  usdPrice: string;
  ngnPrice: string;
  validity: string;
  trainingRate: string;
  jobsRate: string;
  accentColor: string;
  glowColor: string;
  features: string[];
}

const PLANS: PlanItem[] = [
  {
    id: 'premium',
    name: 'Evermore Premium',
    badgeText: 'RECOMMENDED',
    badgeIcon: 'award',
    usdPrice: '$10',
    ngnPrice: '₦13,992',
    validity: 'Valid for 6 months',
    trainingRate: '$16.8/hr',
    jobsRate: '$18/hr',
    accentColor: '#00F5A0',
    glowColor: 'rgba(0, 245, 160, 0.35)',
    features: [
      '6 months validity',
      'Consistent AI training tasks',
      'Priority access to AI outsourced jobs',
      'Unlimited EverAI prompt responses',
      'Unlimited video, image, PDF & flyer generation',
      'Ability to write code and build websites',
      'Full access to Evermore Skills Academy',
    ],
  },
  {
    id: 'basic',
    name: 'Evermore Basic',
    badgeText: 'START HERE',
    badgeIcon: 'compass',
    usdPrice: '$5',
    ngnPrice: '₦6,991',
    validity: 'Valid for 2 months',
    trainingRate: '$8.6/hr',
    jobsRate: '$10.2/hr',
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.35)',
    features: [
      '2 months validity',
      'Consistent AI training tasks',
      'Access to available AI outsourced jobs',
      'Limited EverAI prompt responses',
      'Limited image and graphics generation',
      'Access to selected learning resources',
      'Learn, practice and discover AI opportunities',
    ],
  },
];

const COMPARISON_ROWS = [
  { feature: 'Validity', premium: '6 months', basic: '2 months' },
  { feature: 'AI Training', premium: '$16.8/hr', basic: '$8.6/hr' },
  { feature: 'AI Jobs', premium: 'Priority', basic: 'Available' },
  { feature: 'EverAI', premium: 'Unlimited', basic: 'Limited' },
  { feature: 'Academy', premium: 'Full access', basic: 'Selected' },
];

export function PaywallScreen({ onSelectPlan, onBack }: PaywallScreenProps) {
  const [selected, setSelected] = useState<'basic' | 'premium'>('premium');

  const selectedPlanObj = PLANS.find((p) => p.id === selected) || PLANS[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#040914' }} edges={['top', 'bottom']}>
      {/* ── TOP APP BAR ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: 15,
            color: '#FFFFFF',
            letterSpacing: 0.5,
          }}
        >
          Choose Your Membership
        </Text>

        <View style={{ width: 38 }} />
      </View>

      {/* ── SCROLLABLE CARDS CONTAINER ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 8,
          paddingBottom: 110,
        }}
      >
        {/* Plan Cards */}
        {PLANS.map((plan) => {
          const isSelected = selected === plan.id;

          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelected(plan.id)}
              activeOpacity={0.92}
              style={{
                backgroundColor: '#071324',
                borderRadius: 24,
                padding: 22,
                marginBottom: 20,
                borderWidth: isSelected ? 2 : 1.2,
                borderColor: isSelected ? plan.accentColor : 'rgba(28, 48, 77, 0.7)',
                shadowColor: isSelected ? plan.accentColor : 'transparent',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isSelected ? 0.35 : 0,
                shadowRadius: 20,
                elevation: isSelected ? 8 : 0,
              }}
            >
              {/* Badge Row (Top of Card) */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                {/* Pill Badge */}
                <View
                  style={{
                    backgroundColor: `${plan.accentColor}18`,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: `${plan.accentColor}50`,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.bold,
                      fontSize: 10.5,
                      color: plan.accentColor,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                    }}
                  >
                    {plan.badgeText}
                  </Text>
                </View>

                {/* Right Top Icon */}
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: `${plan.accentColor}15`,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {plan.badgeIcon === 'award' ? (
                    <Award size={18} color={plan.accentColor} />
                  ) : (
                    <Compass size={18} color={plan.accentColor} />
                  )}
                </View>
              </View>

              {/* Plan Name */}
              <Text
                style={{
                  fontFamily: Fonts.extraBold,
                  fontSize: 26,
                  color: '#FFFFFF',
                  marginBottom: 10,
                  letterSpacing: -0.4,
                }}
              >
                {plan.name}
              </Text>

              {/* Price Line: $10 ₦13,992 */}
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                <Text
                  style={{
                    fontFamily: Fonts.extraBold,
                    fontSize: 36,
                    color: plan.accentColor,
                    marginRight: 8,
                  }}
                >
                  {plan.usdPrice}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 17,
                    color: '#94A3B8',
                  }}
                >
                  {plan.ngnPrice}
                </Text>
              </View>

              {/* Validity Subtitle */}
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  fontSize: 13,
                  color: '#64748B',
                  marginBottom: 18,
                }}
              >
                {plan.validity}
              </Text>

              {/* Dual Stat Cards (AI Training / AI Jobs) */}
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                {/* AI Training Box */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#0A1A30',
                    borderRadius: 16,
                    paddingVertical: 14,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.bold,
                      fontSize: 10,
                      color: '#64748B',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    AI TRAINING
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.extraBold,
                      fontSize: 20,
                      color: plan.accentColor,
                    }}
                  >
                    {plan.trainingRate}
                  </Text>
                </View>

                {/* AI Jobs Box */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#0A1A30',
                    borderRadius: 16,
                    paddingVertical: 14,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.bold,
                      fontSize: 10,
                      color: '#64748B',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    AI JOBS
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.extraBold,
                      fontSize: 20,
                      color: plan.id === 'premium' ? '#00E5FF' : plan.accentColor,
                    }}
                  >
                    {plan.jobsRate}
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  marginBottom: 16,
                }}
              />

              {/* Feature Checklist */}
              <View style={{ gap: 12, marginBottom: 22 }}>
                {plan.features.map((feature, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: `${plan.accentColor}20`,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Check size={12} color={plan.accentColor} strokeWidth={3} />
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts.medium,
                        fontSize: 13,
                        color: '#CBD5E1',
                        flex: 1,
                        lineHeight: 18,
                      }}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Inside-Card Selection Action Button */}
              <View
                style={{
                  backgroundColor: isSelected ? 'rgba(0, 245, 160, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  borderWidth: 1.5,
                  borderColor: isSelected ? plan.accentColor : 'rgba(255, 255, 255, 0.12)',
                  borderRadius: 16,
                  paddingVertical: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isSelected ? (
                  <>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: plan.accentColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Check size={12} color="#050B14" strokeWidth={3} />
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts.bold,
                        fontSize: 13.5,
                        color: plan.accentColor,
                        letterSpacing: 0.3,
                      }}
                    >
                      Package selected
                    </Text>
                  </>
                ) : (
                  <>
                    <Circle size={18} color="#64748B" style={{ marginRight: 8 }} />
                    <Text
                      style={{
                        fontFamily: Fonts.bold,
                        fontSize: 13.5,
                        color: '#94A3B8',
                        letterSpacing: 0.3,
                      }}
                    >
                      Select this package
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* ── AT A GLANCE COMPARISON TABLE (Matching ref_image3.webp) ── */}
        <View
          style={{
            backgroundColor: '#071324',
            borderRadius: 24,
            padding: 22,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(28, 48, 77, 0.7)',
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 20,
              color: '#FFFFFF',
              marginBottom: 18,
            }}
          >
            At a glance
          </Text>

          <View style={{ gap: 14 }}>
            {COMPARISON_ROWS.map((row, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: 13,
                    color: '#64748B',
                    flex: 1.2,
                  }}
                >
                  {row.feature}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 13,
                    color: '#00F5A0',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  {row.premium}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 13,
                    color: '#00E5FF',
                    flex: 1,
                    textAlign: 'right',
                  }}
                >
                  {row.basic}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── INSPIRATIONAL CARD (Matching ref_image3.webp) ── */}
        <View
          style={{
            backgroundColor: '#071324',
            borderRadius: 24,
            padding: 22,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(28, 48, 77, 0.7)',
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 20,
              color: '#FFFFFF',
              marginBottom: 8,
              letterSpacing: -0.3,
            }}
          >
            Start where you are.
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 13.5,
              color: '#94A3B8',
              lineHeight: 21,
            }}
          >
            Whether you are exploring AI for the first time or ready to take your skills further, there is a place for you on EverMore.
          </Text>
        </View>
      </ScrollView>

      {/* ── FLOATING BOTTOM ACTION BAR ── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(4, 9, 20, 0.94)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(30, 58, 95, 0.5)',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'android' ? 16 : 28,
        }}
      >
        <TouchableOpacity
          onPress={() => onSelectPlan(selected)}
          activeOpacity={0.88}
          style={{
            backgroundColor: selectedPlanObj.accentColor,
            paddingVertical: 16,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: selectedPlanObj.accentColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              fontSize: 15,
              color: '#040914',
              letterSpacing: 0.3,
            }}
          >
            Continue with {selectedPlanObj.name}
          </Text>
          <ArrowRight size={18} color="#040914" strokeWidth={2.5} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
