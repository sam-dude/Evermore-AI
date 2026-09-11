import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Clock,
  Ticket,
  Send,
  RefreshCw,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react-native';
import { useAuth } from '@/context/auth-context';

export default function MembershipScreen() {
  const { user, subscription, activateCoupon, refreshProfile } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const isPremium = subscription?.plan === 'premium';
  const isBasic = subscription?.plan === 'basic';
  const isPending = subscription?.status === 'pending';
  const isActive = subscription?.status === 'active';

  const planTitle = isPremium
    ? 'EverMore Premium'
    : isBasic
    ? 'EverMore Basic'
    : 'Free Tier';

  const accentColor = isPremium ? '#00E5FF' : isBasic ? '#00F5A0' : '#94A3B8';

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMsg({ type: 'error', text: 'Please enter a coupon code.' });
      return;
    }
    setCouponMsg(null);
    setLoadingCoupon(true);
    try {
      const res = await activateCoupon(couponCode.trim());
      if (res.success) {
        setCouponMsg({ type: 'success', text: res.message || 'Coupon activated successfully!' });
        setCouponCode('');
      } else {
        setCouponMsg({ type: 'error', text: res.error || 'Invalid coupon code.' });
      }
    } catch {
      setCouponMsg({ type: 'error', text: 'Failed to verify coupon code.' });
    } finally {
      setLoadingCoupon(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshProfile();
    } finally {
      setRefreshing(false);
    }
  };

  const openTelegramSupport = async () => {
    const text = encodeURIComponent(
      `Hello Evermore, my name is ${user?.fullName || 'Member'} (${user?.email}). I would like to activate/inquire about my membership coupon.`
    );
    const url = `https://t.me/evermoreai?text=${text}`;
    try {
      await Linking.openURL(url);
    } catch {
      Linking.openURL('https://t.me/evermoreai');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B14' }} edges={['top']}>
      {/* Top Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 22,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(30, 58, 95, 0.4)',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Crown size={20} color="#00E5FF" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, fontWeight: '900', color: '#FFFFFF' }}>Membership</Text>
        </View>

        <TouchableOpacity
          onPress={handleRefresh}
          disabled={refreshing}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
          }}
        >
          <RefreshCw
            size={14}
            color="#00E5FF"
            style={{ marginRight: 6, transform: [{ rotate: refreshing ? '180deg' : '0deg' }] }}
          />
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#00E5FF' }}>Sync</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      >
        {/* Status Card */}
        <View
          style={{
            backgroundColor: '#0C1726',
            borderRadius: 22,
            padding: 22,
            marginBottom: 20,
            borderWidth: 1.5,
            borderColor: accentColor,
            shadowColor: accentColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          {/* Header Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: `${accentColor}18`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Crown size={22} color={accentColor} />
            </View>

            {/* Badge */}
            <View
              style={{
                backgroundColor: isPending ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 245, 160, 0.15)',
                borderWidth: 1,
                borderColor: isPending ? 'rgba(245, 158, 11, 0.4)' : 'rgba(0, 245, 160, 0.4)',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '900',
                  color: isPending ? '#F59E0B' : '#00F5A0',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {isPending ? 'Pending Activation' : isActive ? 'Active Member' : 'Free'}
              </Text>
            </View>
          </View>

          {/* Plan Info */}
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 }}>
            {planTitle}
          </Text>
          <Text style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
            {user?.fullName} • {user?.email}
          </Text>

          {/* Validity Row */}
          <View
            style={{
              backgroundColor: 'rgba(5, 11, 20, 0.6)',
              borderRadius: 12,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Clock size={16} color="#64748B" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 12, color: '#CBD5E1' }}>
              Validity:{' '}
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                {subscription?.expiresAt
                  ? `Active until ${new Date(subscription.expiresAt).toLocaleDateString()}`
                  : '6 Months from activation'}
              </Text>
            </Text>
          </View>
        </View>

        {/* Enter Coupon Code Section */}
        <View
          style={{
            backgroundColor: '#0C1726',
            borderRadius: 18,
            padding: 18,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(30, 58, 95, 0.6)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ticket size={18} color="#00E5FF" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: '800', color: '#FFFFFF' }}>
              Activate Coupon Code
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#94A3B8', lineHeight: 18, marginBottom: 14 }}>
            Received your activation coupon code from the Evermore Telegram team? Enter it here to activate full access.
          </Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              value={couponCode}
              onChangeText={(t) => {
                setCouponCode(t);
                setCouponMsg(null);
              }}
              placeholder="e.g. EVERMORE-XXXX"
              placeholderTextColor="#475569"
              autoCapitalize="characters"
              style={{
                flex: 1,
                backgroundColor: '#050B14',
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 12,
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '700',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <TouchableOpacity
              onPress={handleApplyCoupon}
              disabled={loadingCoupon}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#00E5FF',
                paddingHorizontal: 18,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loadingCoupon ? (
                <ActivityIndicator size="small" color="#050B14" />
              ) : (
                <Text style={{ fontSize: 13, fontWeight: '900', color: '#050B14' }}>
                  Activate
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {couponMsg && (
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: couponMsg.type === 'success' ? 'rgba(0, 245, 160, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                borderWidth: 1,
                borderColor: couponMsg.type === 'success' ? 'rgba(0, 245, 160, 0.3)' : 'rgba(244, 63, 94, 0.3)',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: couponMsg.type === 'success' ? '#00F5A0' : '#FDA4AF',
                }}
              >
                {couponMsg.text}
              </Text>
            </View>
          )}
        </View>

        {/* Telegram Direct Contact Card */}
        <View
          style={{
            backgroundColor: '#0C1726',
            borderRadius: 18,
            padding: 18,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(30, 58, 95, 0.6)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Send size={18} color="#00F5A0" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: '800', color: '#FFFFFF' }}>
              Telegram Support & Upgrades
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#94A3B8', lineHeight: 18, marginBottom: 14 }}>
            Need help buying a coupon code, inquiring about upgrade packages, or renewing your membership?
          </Text>

          <TouchableOpacity
            onPress={openTelegramSupport}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#00F5A0',
              paddingVertical: 14,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Send size={16} color="#050B14" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 13, fontWeight: '900', color: '#050B14' }}>
              Chat with Evermore on Telegram
            </Text>
          </TouchableOpacity>
        </View>

        {/* Benefits Checklist */}
        <View
          style={{
            backgroundColor: '#0C1726',
            borderRadius: 18,
            padding: 18,
            borderWidth: 1,
            borderColor: 'rgba(30, 58, 95, 0.6)',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '800', color: '#FFFFFF', marginBottom: 12 }}>
            Package Entitlements
          </Text>

          {[
            'Interactive AI Curriculum & Quiz Certifications',
            'Daily Check-in Streaks & EverPoints Multipliers',
            'AI Training Opportunities & Earning Campaigns',
            'Priority Submission Review Pipeline',
            'Official Evermore Community & Mentorship Access',
          ].map((benefit, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <CheckCircle2 size={16} color="#00E5FF" style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 12, color: '#CBD5E1', flex: 1, lineHeight: 18 }}>
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
