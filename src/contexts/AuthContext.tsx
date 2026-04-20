import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { authService } from '../services/authService';
import type { ApiError, AuthUser } from '../types/api';
import { AuthContext } from './AuthContextDefinition';
import type { AuthContextType } from './AuthContextDefinition';

const AUTH_TOKEN_KEY = 'dsa-master-auth-token';

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

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

function saveToken(token: string): void {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    // Ignore local storage write errors in private or restricted mode.
  }
}

function clearToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // Ignore local storage write errors in private or restricted mode.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setAuthenticatedState = useCallback((nextUser: AuthUser, nextToken: string) => {
    setUser(nextUser);
    setToken(nextToken);
    setStatus('authenticated');
    saveToken(nextToken);
    setErrorMessage(null);
  }, []);

  const resetAuthState = useCallback(() => {
    setUser(null);
    setToken(null);
    setStatus('unauthenticated');
    clearToken();
  }, []);

  const signIn = useCallback(async (payload: SignInPayload) => {
    const result = await authService.login(payload);
    setAuthenticatedState(result.user, result.tokens.accessToken);
  }, [setAuthenticatedState]);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    const result = await authService.register(payload);
    setAuthenticatedState(result.user, result.tokens.accessToken);
  }, [setAuthenticatedState]);

  const signOut = useCallback(async () => {
    if (token) {
      try {
        await authService.logout(token);
      } catch {
        // Continue local sign-out even if API call fails.
      }
    }
    resetAuthState();
  }, [resetAuthState, token]);

  const refreshProfile = useCallback(async () => {
    if (!token) {
      resetAuthState();
      return;
    }

    try {
      const profile = await authService.me(token);
      setUser(profile);
      setStatus('authenticated');
      setErrorMessage(null);
    } catch {
      resetAuthState();
    }
  }, [resetAuthState, token]);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = getStoredToken();
      if (!stored) {
        setStatus('unauthenticated');
        return;
      }

      setToken(stored);
      try {
        const profile = await authService.me(stored);
        setUser(profile);
        setStatus('authenticated');
      } catch {
        resetAuthState();
      }
    };

    bootstrap().catch((error: unknown) => {
      const message = (error as ApiError).message ?? 'Authentication bootstrap failed';
      setErrorMessage(message);
      resetAuthState();
    });
  }, [resetAuthState]);

  const value = useMemo<AuthContextType>(() => {
    const isAuthenticated = status === 'authenticated' && Boolean(user) && Boolean(token);
    const isAdmin = Boolean(user?.roles.includes('admin'));
    const isPremium = Boolean(
      user?.roles.includes('premium_user') ||
      user?.subscriptionTier === 'pro_monthly' ||
      user?.subscriptionTier === 'pro_yearly'
    );

    return {
      status,
      user,
      token,
      errorMessage,
      isAuthenticated,
      isAdmin,
      isPremium,
      signIn,
      signUp,
      signOut,
      refreshProfile
    };
  }, [status, user, token, errorMessage, signIn, signUp, signOut, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
