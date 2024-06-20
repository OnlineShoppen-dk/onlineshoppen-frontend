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
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: (firstName: string, email: string) => {
    const user = { firstName, email };
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
      localStorage.removeItem('user');
      set({ user: null });
    },
}));

export default useAuthStore;
