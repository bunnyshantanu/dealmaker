import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthRole = "broker" | "client";
export type UserType = "buyer" | "seller";

export interface AuthUser {
  email: string;
  role: AuthRole;
  name: string;
  userType?: UserType; // buyer or seller (for clients only)
}

// Mock credentials (frontend-only auth for v1)
const CREDENTIALS: Record<string, { password: string; role: AuthRole; name: string; userType?: UserType }> = {
  "broker@gmail.com": { password: "broker@123", role: "broker", name: "Broker Demo" },
  "client@gmail.com": { password: "client@123", role: "client", name: "Direct Client Demo", userType: "buyer" },
  // Legacy demo accounts (mapped to client)
  "buyer@gmail.com":  { password: "buyer@123",  role: "client", name: "Buyer Demo", userType: "buyer" },
  "seller@gmail.com": { password: "seller@123", role: "client", name: "Seller Demo", userType: "seller" },
};

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  registerAndLogin: (email: string, name: string, role: AuthRole, password: string, userType?: UserType) => { ok: true } | { ok: false; error: string };
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const key = email.trim().toLowerCase();
        const rec = CREDENTIALS[key];
        if (!rec) return { ok: false, error: "No account found for this email." };
        if (rec.password !== password) return { ok: false, error: "Incorrect password." };
        set({ user: { email: key, role: rec.role, name: rec.name, userType: rec.userType } });
        return { ok: true };
      },
      registerAndLogin: (email, name, role, password, userType) => {
        const key = email.trim().toLowerCase();
        // Create a new user account on registration with the provided password
        CREDENTIALS[key] = { password, role, name, userType };
        set({ user: { email: key, role, name, userType } });
        return { ok: true };
      },
      logout: () => set({ user: null }),
    }),
    { name: "dealmaker-auth-v1" },
  ),
);

export const DEMO_ACCOUNTS = [
  { role: "Broker", email: "broker@gmail.com", password: "broker@123" },
  { role: "Direct Client", email: "client@gmail.com", password: "client@123" },
];