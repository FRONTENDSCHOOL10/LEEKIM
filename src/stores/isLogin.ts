import { create, StateCreator } from 'zustand';

interface storeIsLogin {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const stateIsLogin: StateCreator<storeIsLogin> = (set, get) => {
  const login = () => {
    set({ isLogin: true });
  };
  const logout = () => {
    set({ isLogin: false });
  };

  return {
    isLogin: false,
    login,
    logout,
  };
};

export const useIsLogin = create<storeIsLogin>(stateIsLogin);
