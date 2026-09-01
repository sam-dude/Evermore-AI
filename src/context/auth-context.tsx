import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  country?: string;
  points: number;
  streak: number;
  lastCheckin?: string | null;
}

export interface UserSubscription {
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'expired' | 'pending';
  expiresAt?: string | null;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number;
  completedAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  subscription: UserSubscription;
  lessonProgress: Record<string, LessonProgress>;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, pass: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkIn: () => Promise<{ success: boolean; pointsEarned: number; newStreak: number; message?: string }>;
  completeLesson: (lessonId: string, score: number, pointsReward: number) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_SESSION_KEY = '@evermore_user_profile';
const LOCAL_SUB_KEY = '@evermore_user_subscription';
const LOCAL_PROGRESS_KEY = '@evermore_lesson_progress';
const LOCAL_USERS_KEY = '@evermore_offline_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: 'free',
    status: 'active',
  });
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserData(session.user.id, session.user.email || '', session.user);
          return;
        }
      }

      // Local storage fallback
      const cachedUser = await AsyncStorage.getItem(LOCAL_SESSION_KEY);
      const cachedSub = await AsyncStorage.getItem(LOCAL_SUB_KEY);
      const cachedProg = await AsyncStorage.getItem(LOCAL_PROGRESS_KEY);

      if (cachedUser) setUser(JSON.parse(cachedUser));
      if (cachedSub) setSubscription(JSON.parse(cachedSub));
      if (cachedProg) setLessonProgress(JSON.parse(cachedProg));
    } catch (e) {
      console.warn('Auth init failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async (userId: string, email: string, authUser?: any) => {
    try {
      let loadedProfile: UserProfile | null = null;

      if (isSupabaseConfigured()) {
        // 1. Try to fetch profile from Supabase profiles table
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (profile) {
            loadedProfile = {
              id: profile.id,
              email: email,
              fullName: profile.full_name || authUser?.user_metadata?.full_name || 'Evermore Member',
              phone: profile.phone || authUser?.user_metadata?.phone,
              country: profile.country || 'NG',
              points: profile.points ?? 50,
              streak: profile.streak ?? 1,
              lastCheckin: profile.last_checkin || new Date().toISOString().split('T')[0],
            };
          }
        } catch (dbErr) {
          console.warn('Profiles table query error:', dbErr);
        }

        // 2. If profile table doesn't exist yet or is empty, construct fallback from auth metadata
        if (!loadedProfile) {
          const nameFromMeta = authUser?.user_metadata?.full_name || email.split('@')[0] || 'Evermore Member';
          loadedProfile = {
            id: userId,
            email: email,
            fullName: nameFromMeta,
            phone: authUser?.user_metadata?.phone,
            country: 'NG',
            points: 50,
            streak: 1,
            lastCheckin: new Date().toISOString().split('T')[0],
          };

          // Try to upsert so profile exists in DB
          try {
            await supabase.from('profiles').upsert({
              id: userId,
              full_name: loadedProfile.fullName,
              phone: loadedProfile.phone,
              country: 'NG',
              points: 50,
              streak: 1,
              last_checkin: loadedProfile.lastCheckin,
            });
          } catch (e) {}
        }

        setUser(loadedProfile);
        await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(loadedProfile));

        // 3. Fetch subscription
        try {
          const { data: sub } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .order('started_at', { ascending: false })
            .limit(1)
            .single();

          if (sub) {
            const subData: UserSubscription = {
              plan: sub.plan || 'free',
              status: sub.status || 'active',
              expiresAt: sub.expires_at,
            };
            setSubscription(subData);
            await AsyncStorage.setItem(LOCAL_SUB_KEY, JSON.stringify(subData));
          }
        } catch (subErr) {}

        // 4. Fetch progress
        try {
          const { data: progressList } = await supabase
            .from('lessons_progress')
            .select('*')
            .eq('user_id', userId);

          if (progressList && progressList.length > 0) {
            const map: Record<string, LessonProgress> = {};
            progressList.forEach((p: any) => {
              map[p.lesson_id] = {
                lessonId: p.lesson_id,
                completed: p.completed,
                quizScore: p.quiz_score,
                completedAt: p.completed_at,
              };
            });
            setLessonProgress(map);
            await AsyncStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(map));
          }
        } catch (progErr) {}
      } else {
        // Fallback for unconfigured Supabase
        const fallback: UserProfile = {
          id: userId,
          email: email,
          fullName: email.split('@')[0] || 'Evermore Member',
          country: 'NG',
          points: 50,
          streak: 1,
          lastCheckin: new Date().toISOString().split('T')[0],
        };
        setUser(fallback);
        await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(fallback));
      }
    } catch (err) {
      console.warn('loadUserData error:', err);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();

    // Standard Demo Reviewer Account
    if (trimmedEmail === 'reviewer@evermore.test' && pass === 'ReviewerAccess2026!') {
      const demoUser: UserProfile = {
        id: 'reviewer_account',
        email: 'reviewer@evermore.test',
        fullName: 'Evermore App Reviewer',
        country: 'NG',
        points: 250,
        streak: 4,
        lastCheckin: new Date().toISOString().split('T')[0],
      };
      const demoSub: UserSubscription = { plan: 'premium', status: 'active' };
      const demoProg: Record<string, LessonProgress> = {
        'what-is-ai': {
          lessonId: 'what-is-ai',
          completed: true,
          quizScore: 100,
          completedAt: new Date().toISOString(),
        },
      };

      setUser(demoUser);
      setSubscription(demoSub);
      setLessonProgress(demoProg);
      await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(demoUser));
      await AsyncStorage.setItem(LOCAL_SUB_KEY, JSON.stringify(demoSub));
      await AsyncStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(demoProg));
      return { success: true };
    }

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: pass,
        });

        if (error) {
          // If email not confirmed
          if (error.message.toLowerCase().includes('email not confirmed')) {
            return {
              success: false,
              error: 'Please turn OFF "Confirm email" in Supabase Dashboard → Auth → Providers → Email, or check your inbox.',
            };
          }

          // Check if local account exists
          const rawUsers = await AsyncStorage.getItem(LOCAL_USERS_KEY);
          const users: Record<string, any> = rawUsers ? JSON.parse(rawUsers) : {};
          if (users[trimmedEmail] && users[trimmedEmail].password === pass) {
            setUser(users[trimmedEmail].profile);
            await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(users[trimmedEmail].profile));
            return { success: true };
          }

          return { success: false, error: error.message };
        }

        if (data.user) {
          await loadUserData(data.user.id, data.user.email || trimmedEmail, data.user);
          return { success: true };
        }
      }

      // Offline local database check
      const rawUsers = await AsyncStorage.getItem(LOCAL_USERS_KEY);
      const users: Record<string, any> = rawUsers ? JSON.parse(rawUsers) : {};

      if (users[trimmedEmail]) {
        if (users[trimmedEmail].password === pass) {
          const loaded = users[trimmedEmail].profile;
          setUser(loaded);
          await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(loaded));
          return { success: true };
        }
        return { success: false, error: 'Incorrect password.' };
      }

      return { success: false, error: 'Account not found. Please create an account.' };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Login failed.' };
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    pass: string,
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: pass,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone?.trim() || '',
            },
          },
        });

        if (error) {
          if (error.message.toLowerCase().includes('rate limit')) {
            return {
              success: false,
              error: 'Rate limit reached. Please disable "Confirm email" in Supabase Auth settings to remove email limits.',
            };
          }
          if (error.message.toLowerCase().includes('already registered')) {
            return {
              success: false,
              error: 'An account with this email already exists. Please sign in.',
            };
          }
          return { success: false, error: error.message };
        }

        if (data.user) {
          // Immediately set up and login user
          const newProfile: UserProfile = {
            id: data.user.id,
            email: trimmedEmail,
            fullName: fullName.trim() || 'Evermore Member',
            phone: phone?.trim(),
            country: 'NG',
            points: 50,
            streak: 1,
            lastCheckin: new Date().toISOString().split('T')[0],
          };

          setUser(newProfile);
          await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newProfile));

          // Try to sync profile to database in background
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              full_name: newProfile.fullName,
              phone: newProfile.phone,
              country: 'NG',
              points: 50,
              streak: 1,
              last_checkin: newProfile.lastCheckin,
            });
            await supabase.from('subscriptions').upsert({
              user_id: data.user.id,
              plan: 'free',
              status: 'active',
            });
          } catch (e) {}

          return { success: true };
        }
      }

      // Offline / Local user creation
      const newUser: UserProfile = {
        id: `local_${Date.now()}`,
        email: trimmedEmail,
        fullName: fullName.trim() || 'Evermore Member',
        phone: phone?.trim(),
        country: 'NG',
        points: 50,
        streak: 1,
        lastCheckin: new Date().toISOString().split('T')[0],
      };

      const rawUsers = await AsyncStorage.getItem(LOCAL_USERS_KEY);
      const users: Record<string, any> = rawUsers ? JSON.parse(rawUsers) : {};
      users[trimmedEmail] = {
        password: pass,
        profile: newUser,
      };

      await AsyncStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
      setUser(newUser);
      await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newUser));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Sign up failed.' };
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch {}
    setUser(null);
    setSubscription({ plan: 'free', status: 'active' });
    setLessonProgress({});
    await AsyncStorage.removeItem(LOCAL_SESSION_KEY);
    await AsyncStorage.removeItem(LOCAL_SUB_KEY);
    await AsyncStorage.removeItem(LOCAL_PROGRESS_KEY);
  };

  const checkIn = async () => {
    if (!user) return { success: false, pointsEarned: 0, newStreak: 0, message: 'Not logged in' };

    const todayStr = new Date().toISOString().split('T')[0];
    if (user.lastCheckin === todayStr) {
      return { success: false, pointsEarned: 0, newStreak: user.streak, message: 'Already checked in today!' };
    }

    const pointsToAdd = 25;
    const newStreak = (user.streak || 0) + 1;
    const updatedUser: UserProfile = {
      ...user,
      points: (user.points || 0) + pointsToAdd,
      streak: newStreak,
      lastCheckin: todayStr,
    };

    setUser(updatedUser);
    await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(updatedUser));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('profiles')
          .update({
            points: updatedUser.points,
            streak: updatedUser.streak,
            last_checkin: todayStr,
          })
          .eq('id', user.id);
      } catch (err) {}
    }

    return { success: true, pointsEarned: pointsToAdd, newStreak };
  };

  const completeLesson = async (lessonId: string, score: number, pointsReward: number) => {
    if (!user) return;

    const completedAt = new Date().toISOString();
    const newProgress: LessonProgress = {
      lessonId,
      completed: true,
      quizScore: score,
      completedAt,
    };

    const updatedMap = {
      ...lessonProgress,
      [lessonId]: newProgress,
    };
    setLessonProgress(updatedMap);
    await AsyncStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(updatedMap));

    const isFirstTime = !lessonProgress[lessonId]?.completed;
    if (isFirstTime) {
      const updatedUser = {
        ...user,
        points: (user.points || 0) + pointsReward,
      };
      setUser(updatedUser);
      await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(updatedUser));

      if (isSupabaseConfigured()) {
        try {
          await supabase.from('profiles').update({ points: updatedUser.points }).eq('id', user.id);
          await supabase.from('lessons_progress').upsert({
            user_id: user.id,
            lesson_id: lessonId,
            completed: true,
            quiz_score: score,
            completed_at: completedAt,
          });
        } catch (err) {}
      }
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await loadUserData(user.id, user.email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        lessonProgress,
        isLoading,
        login,
        signup,
        logout,
        checkIn,
        completeLesson,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
