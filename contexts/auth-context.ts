
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';
import type { UserProfile, MfaSentResponse, LoginSuccessResponse, ThemeSettings } from '@/types';

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: Error | null;
  isMfaVerified: boolean;
  authEmailForMfa: string | null;
  sessionToken: string | null; // To store the JWT in memory
  login: (email: string, password?: string) => Promise<MfaSentResponse | null>;
  register: (details: { email: string, password?: string, displayName?: string }) => Promise<MfaSentResponse | null>;
  verifyMfa: (mfaCode: string) => Promise<LoginSuccessResponse | null>;
  logout: () => Promise<void>;
  fetchCurrentUserInfo: (uid: string, email?: string, role?: UserProfile['role']) => Promise<UserProfile | null>;
  setUser: Dispatch<SetStateAction<UserProfile | null>>;
  setIsMfaVerified: (verified: boolean) => void;
  updateUserPreferencesInContext: (preferences: Partial<ThemeSettings>) => void;
  updateCurrentLocalUser: (updatedProfile: Partial<UserProfile>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
