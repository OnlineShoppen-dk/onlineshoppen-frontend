import { create } from "zustand";

interface User {
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (email: string, password: string) => set({ user: { email, password } }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
