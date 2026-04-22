import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessionExpiresAt: number | null;
  theme: "light" | "dark";
  setUser: (user: User | null) => void;
  setTheme: (theme: "light" | "dark") => void;
  setTokens: (accessToken: string, refreshToken: string, expiresAt: number) => void;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  authError: null,
  accessToken: null,
  refreshToken: null,
  sessionExpiresAt: null,
  theme: "light",
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setTheme: (theme) => set({ theme }),
  setTokens: (accessToken, refreshToken, sessionExpiresAt) =>
    set({ accessToken, refreshToken, sessionExpiresAt }),
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  setAuthError: (authError) => set({ authError }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
      authError: null,
      accessToken: null,
      refreshToken: null,
      sessionExpiresAt: null,
    }),
}));

export * from './notificationStore';
