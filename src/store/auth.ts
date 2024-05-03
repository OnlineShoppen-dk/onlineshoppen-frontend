// store.js
import {create} from 'zustand';

const useStore = create((set) => ({
  email: '',
  password: '',
  guid: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setGuid: (guid) => set({ guid }),
}));

export default useStore;
