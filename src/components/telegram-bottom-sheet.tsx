import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {
  Sparkles,
  Send,
  CreditCard,
  CheckCircle2,
  Copy,
  ChevronRight,
  ShieldCheck,
  X,
  Ticket,
} from 'lucide-react-native';
import { Fonts } from '@/constants/theme';

interface TelegramBottomSheetProps {
  visible: boolean;
  plan: 'basic' | 'premium';
  userData: {
    fullName: string;
    email: string;
    phone?: string;
  };
  onClose: () => void;
  onChangePlan: () => void;
  onProceedToApp: () => void;
  onActivateCoupon?: (code: string) => Promise<{ success: boolean; error?: string }>;
}

export function TelegramBottomSheet({
  visible,
  plan,
  userData,
  onClose,
  onChangePlan,
  onProceedToApp,
  onActivateCoupon,
}: TelegramBottomSheetProps) {
  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [activatingCoupon, setActivatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const isPremium = plan === 'premium';
  const planName = isPremium ? 'EverMore Premium' : 'EverMore Basic';
  const planPrice = isPremium ? '₦13,992 ($10)' : '₦6,991 ($5)';
  const accentColor = isPremium ? '#00F5A0' : '#00E5FF';

  const detailsText = `Name: ${userData.fullName}\nEmail: ${userData.email}${userData.phone ? `\nPhone: ${userData.phone}` : ''}\nPlan: ${planName}`;

  const handleContinueToTelegram = async () => {
    try {
      await Clipboard.setStringAsync(detailsText);
      setCopied(true);

      const telegramMsg = 'Hello Evermore, I want to buy coupon code to complete my evermore registration.';
      const telegramUrl = `https://t.me/evermoreai?text=${encodeURIComponent(telegramMsg)}`;

      const canOpen = await Linking.canOpenURL(telegramUrl);
      if (canOpen) {
        await Linking.openURL(telegramUrl);
      } else {
        await Linking.openURL(`https://t.me/evermoreai`);
      }
    } catch (e) {
      console.warn('Error opening Telegram:', e);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    setCouponError(null);
    setActivatingCoupon(true);
    try {
      if (onActivateCoupon) {
        const res = await onActivateCoupon(couponCode.trim());
        if (res.success) {
          setCouponSuccess(true);
          setTimeout(() => {
            onProceedToApp();
          }, 1200);
        } else {
          setCouponError(res.error || 'Invalid coupon code. Please verify with Telegram support.');
        }
      } else {
        setCouponSuccess(true);
        setTimeout(() => {
          onProceedToApp();
        }, 1200);
      }
    } catch {
      setCouponError('Could not verify coupon. Please try again.');
    } finally {
      setActivatingCoupon(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(3, 7, 16, 0.88)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: '#071324',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderWidth: 1.5,
            borderColor: `${accentColor}40`,
            paddingHorizontal: 22,
            paddingTop: 16,
            paddingBottom: Platform.OS === 'android' ? 24 : 36,
            maxHeight: '92%',
          }}
        >
          {/* Drag Handle & Close */}
          <View style={{ alignItems: 'center', marginBottom: 14, position: 'relative' }}>
            <View
              style={{
                width: 44,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }}
            />
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={{
                position: 'absolute',
                right: 0,
                top: -4,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: `${accentColor}18`,
                borderWidth: 1.5,
                borderColor: `${accentColor}40`,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <Sparkles size={26} color={accentColor} />
            </View>
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 22,
                color: '#FFFFFF',
                textAlign: 'center',
                letterSpacing: -0.4,
                marginBottom: 6,
              }}
            >
              You're almost there! 🎉
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 13.5,
                color: '#94A3B8',
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              You selected the{' '}
              <Text style={{ fontFamily: Fonts.bold, color: accentColor }}>{planName}</Text>{' '}
              package.
            </Text>
          </View>

          {/* Plan Summary Card */}
          <View
            style={{
              backgroundColor: '#0A1A30',
              borderRadius: 18,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.06)',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: '#64748B' }}>
                Package
              </Text>
              <Text style={{ fontFamily: Fonts.bold, fontSize: 13.5, color: '#FFFFFF' }}>
                {planName}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: '#64748B' }}>
                Amount
              </Text>
              <Text style={{ fontFamily: Fonts.extraBold, fontSize: 15, color: accentColor }}>
                {planPrice}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: '#64748B' }}>
                Validity
              </Text>
              <Text style={{ fontFamily: Fonts.bold, fontSize: 13, color: '#94A3B8' }}>
                {isPremium ? '6 Months Full Access' : '2 Months Access'}
              </Text>
            </View>
          </View>

          {/* Explanation Info */}
          <View
            style={{
              backgroundColor: 'rgba(0, 245, 160, 0.06)',
              borderRadius: 14,
              padding: 14,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: 'rgba(0, 245, 160, 0.2)',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Copy size={18} color="#00F5A0" style={{ marginRight: 10 }} />
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 12.5,
                color: '#CBD5E1',
                flex: 1,
                lineHeight: 18,
              }}
            >
              Your registration details will be copied to your clipboard. Continue with the EverMore team on Telegram to get your coupon code.
            </Text>
          </View>

          {/* Copied Banner if user clicked */}
          {copied && (
            <View
              style={{
                backgroundColor: 'rgba(0, 245, 160, 0.15)',
                borderRadius: 12,
                paddingVertical: 9,
                paddingHorizontal: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: 'rgba(0, 245, 160, 0.35)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={15} color="#00F5A0" style={{ marginRight: 6 }} />
              <Text style={{ fontFamily: Fonts.bold, fontSize: 12, color: '#00F5A0' }}>
                Details copied to clipboard ✓
              </Text>
            </View>
          )}

          {/* Primary Button: Continue to Telegram */}
          <TouchableOpacity
            onPress={handleContinueToTelegram}
            activeOpacity={0.88}
            style={{
              backgroundColor: '#00F5A0',
              paddingVertical: 16,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              shadowColor: '#00F5A0',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Send size={18} color="#040914" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                fontSize: 14.5,
                color: '#040914',
                letterSpacing: 0.3,
              }}
            >
              Continue to Telegram
            </Text>
          </TouchableOpacity>

          {/* Switch / Change plan link */}
          <TouchableOpacity
            onPress={onChangePlan}
            activeOpacity={0.7}
            style={{ alignItems: 'center', paddingVertical: 8, marginBottom: 8 }}
          >
            <Text style={{ fontFamily: Fonts.regular, fontSize: 12.5, color: '#64748B' }}>
              Want a different package?{' '}
              <Text style={{ fontFamily: Fonts.bold, color: '#00E5FF' }}>Choose another plan</Text>
            </Text>
          </TouchableOpacity>

          {/* Coupon Entry Toggle */}
          {!showCouponInput ? (
            <TouchableOpacity
              onPress={() => setShowCouponInput(true)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                marginBottom: 8,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <Ticket size={15} color="#00E5FF" style={{ marginRight: 6 }} />
              <Text style={{ fontFamily: Fonts.bold, fontSize: 12, color: '#00E5FF' }}>
                Have your coupon code? Enter here
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: '#0A1A30',
                borderRadius: 14,
                padding: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: 'rgba(0, 229, 255, 0.3)',
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 12,
                  color: '#FFFFFF',
                  marginBottom: 6,
                }}
              >
                Enter Activation Coupon Code
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  value={couponCode}
                  onChangeText={(t) => {
                    setCouponCode(t);
                    setCouponError(null);
                  }}
                  placeholder="e.g. EVERMORE-XXXX"
                  placeholderTextColor="#475569"
                  autoCapitalize="characters"
                  style={{
                    flex: 1,
                    backgroundColor: '#040914',
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontFamily: Fonts.bold,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                <TouchableOpacity
                  onPress={handleApplyCoupon}
                  disabled={activatingCoupon}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#00E5FF',
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {activatingCoupon ? (
                    <ActivityIndicator size="small" color="#040914" />
                  ) : (
                    <Text style={{ fontFamily: Fonts.extraBold, fontSize: 12, color: '#040914' }}>
                      Apply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              {couponError && (
                <Text
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: 11,
                    color: '#F87171',
                    marginTop: 6,
                  }}
                >
                  {couponError}
                </Text>
              )}
              {couponSuccess && (
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 11,
                    color: '#00F5A0',
                    marginTop: 6,
                  }}
                >
                  Coupon verified! Activating account...
                </Text>
              )}
            </View>
          )}

          {/* Divider */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 8,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 10,
                color: '#475569',
                marginHorizontal: 10,
                letterSpacing: 1,
              }}
            >
              OR PAY ONLINE
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
          </View>

          {/* Pay with Card (Coming Soon) */}
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              paddingVertical: 14,
              borderRadius: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.08)',
              opacity: 0.6,
            }}
          >
            <CreditCard size={16} color="#64748B" style={{ marginRight: 8 }} />
            <Text style={{ fontFamily: Fonts.bold, fontSize: 13, color: '#64748B' }}>
              Pay with Card (Coming Soon)
            </Text>
          </View>

          {/* Post-Telegram Proceed Button */}
          {copied && (
            <TouchableOpacity
              onPress={onProceedToApp}
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                paddingVertical: 12,
                marginTop: 6,
              }}
            >
              <Text style={{ fontFamily: Fonts.bold, fontSize: 12.5, color: '#94A3B8' }}>
                Already contacted support?{' '}
                <Text style={{ color: '#00E5FF' }}>Proceed to App →</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
