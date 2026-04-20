import { createContext } from 'react';
import type { AuthUser } from '../types/api';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthContextType {
  status: AuthStatus;
  user: AuthUser | null;
  token: string | null;
  errorMessage: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
