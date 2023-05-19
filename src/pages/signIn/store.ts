import { create } from "zustand";

const useAuth = create((set)=> ({
  isAuthenticated: false,
  authenticate: () => set({isAuthenticated: true}),
  logout: () => set({isAuthenticated: false}),
}));

export default useAuth;