import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  coins: number;
  streak: number;
  isReviewer?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsReviewer: () => Promise<void>;
  logout: () => Promise<void>;
  mineCoin: (tapCount?: number) => Promise<number>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_SESSION_KEY = '@evertap_user_session';
const STORAGE_USERS_KEY = '@evertap_registered_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load session', e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSession = async (userData: User | null) => {
    setUser(userData);
    if (userData) {
      await AsyncStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(userData));
    } else {
      await AsyncStorage.removeItem(STORAGE_SESSION_KEY);
    }
  };

  const login = async (email: string, pass: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Check if it's the Google Reviewer credential
    if (trimmedEmail === 'reviewer@evermore.com' || (trimmedEmail.includes('reviewer') && pass.length >= 4)) {
      const reviewerUser: User = {
        id: 'rev_google_play',
        email: 'reviewer@evermore.com',
        name: 'Google Play Reviewer',
        coins: 520,
        streak: 7,
        isReviewer: true,
      };
      await saveSession(reviewerUser);
      return { success: true };
    }

    try {
      const rawUsers = await AsyncStorage.getItem(STORAGE_USERS_KEY);
      const users: Record<string, { name: string; password: string; coins: number; streak: number }> = rawUsers
        ? JSON.parse(rawUsers)
        : {};

      if (users[trimmedEmail]) {
        if (users[trimmedEmail].password === pass) {
          const loggedUser: User = {
            id: trimmedEmail,
            email: trimmedEmail,
            name: users[trimmedEmail].name,
            coins: users[trimmedEmail].coins ?? 50,
            streak: users[trimmedEmail].streak ?? 1,
          };
          await saveSession(loggedUser);
          return { success: true };
        } else {
          return { success: false, error: 'Incorrect password.' };
        }
      } else {
        // Auto-allow quick registration/login if user doesn't exist yet for smooth review
        const newUser: User = {
          id: trimmedEmail,
          email: trimmedEmail,
          name: trimmedEmail.split('@')[0] || 'Evermore Member',
          coins: 100,
          streak: 1,
        };
        users[trimmedEmail] = {
          name: newUser.name,
          password: pass,
          coins: 100,
          streak: 1,
        };
        await AsyncStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
        await saveSession(newUser);
        return { success: true };
      }
    } catch (e) {
      return { success: false, error: 'Authentication error occurred.' };
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    try {
      const rawUsers = await AsyncStorage.getItem(STORAGE_USERS_KEY);
      const users: Record<string, any> = rawUsers ? JSON.parse(rawUsers) : {};

      const newUser: User = {
        id: trimmedEmail,
        email: trimmedEmail,
        name: name.trim() || 'Evermore Member',
        coins: 100, // Welcome bonus
        streak: 1,
      };

      users[trimmedEmail] = {
        name: newUser.name,
        password: pass,
        coins: 100,
        streak: 1,
      };

      await AsyncStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      await saveSession(newUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Failed to create account.' };
    }
  };

  const loginAsReviewer = async () => {
    const reviewerUser: User = {
      id: 'rev_google_play',
      email: 'reviewer@evermore.com',
      name: 'Google Play Reviewer',
      coins: 520,
      streak: 7,
      isReviewer: true,
    };
    await saveSession(reviewerUser);
  };

  const logout = async () => {
    await saveSession(null);
  };

  const mineCoin = async (tapCount: number = 1) => {
    if (!user) return 0;
    const newCoins = user.coins + tapCount;
    const updatedUser = { ...user, coins: newCoins };
    await saveSession(updatedUser);

    // Also update users DB
    try {
      const rawUsers = await AsyncStorage.getItem(STORAGE_USERS_KEY);
      if (rawUsers) {
        const users = JSON.parse(rawUsers);
        if (users[user.email]) {
          users[user.email].coins = newCoins;
          await AsyncStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
        }
      }
    } catch (e) {}

    return newCoins;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        loginAsReviewer,
        logout,
        mineCoin,
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
