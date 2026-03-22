"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, setTokens, clearTokens, getAccessToken } from "@/lib/api";

// --- Types ---
interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Decode JWT payload (without verification — verification is server-side)
function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get<User>("/api/v1/profile");
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  // On mount, check if we have a token and try to load profile
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const claims = decodeJWT(token);
      // Check if token is not expired
      if (claims && typeof claims.exp === "number" && claims.exp * 1000 > Date.now()) {
        fetchProfile().finally(() => setIsLoading(false));
      } else {
        clearTokens();
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const res = await api.post<LoginResponse>("/api/v1/auth/login", { email, password });
    if (res.success && res.data) {
      setTokens(res.data.access_token, res.data.refresh_token);
      await fetchProfile();
      return { success: true };
    }
    return { success: false, error: res.message || res.error || "Login failed" };
  };

  const register = async (data: RegisterData) => {
    const res = await api.post("/api/v1/auth/register", data);
    if (res.success) {
      return { success: true };
    }
    return { success: false, error: res.message || res.error || "Registration failed" };
  };

  const logout = async () => {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
    if (refreshToken) {
      await api.post("/api/v1/auth/logout", { refresh_token: refreshToken });
    }
    clearTokens();
    setUser(null);
  };

  const refreshUser = async () => {
    await fetchProfile();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.roles?.includes("admin") || false,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
