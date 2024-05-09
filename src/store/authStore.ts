import { create } from "zustand";

interface User {
  email: string;
}

interface AuthStore {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (email: string) => set({ user: { email } }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
