import { create } from "zustand";

interface User {
  firstName: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  login: (firstName: string, email: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (firstName: string, email: string) => set({ user: { firstName, email } }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
