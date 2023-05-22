import { create } from "zustand";


interface useAuthType {
  isAuthenticated: boolean;
  authenticate: ()=>void;
  logout: ()=>void;
}
const useAuth = create<useAuthType>((set)=> ({
  isAuthenticated: false,
  authenticate: () => set({isAuthenticated: true}),
  logout: () => set({isAuthenticated: false}),
}));

export default useAuth;