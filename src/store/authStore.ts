import { create } from "zustand";

interface User {
  id: number;
  email: string;
  nickname: string;
  club?: string;
  admin?: "Y" | "N" | "B";
}

interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  isAuthenticated: false,
  user: null,
  accessToken: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  login: (user, accessToken) =>
    set({
      isAuthenticated: true,
      user,
      accessToken,
      email: "",
      password: "",
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      email: "",
      password: "",
    }),

  refreshAccessToken: async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Refresh Token이 쿠키에 있다고 가정
      });

      if (!res.ok) throw new Error("토큰 갱신 실패");
      const data = await res.json();

      set({ accessToken: data.accessToken });
    } catch (err) {
      console.error("토큰 갱신 에러:", err);
      get().logout();
    }
  },
}));
