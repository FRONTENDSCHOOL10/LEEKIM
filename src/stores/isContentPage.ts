import { create, StateCreator } from 'zustand';

interface storeIsContentPage {
  isContentPage: boolean;
  enterContentPage: () => void;
  exitContentPage: () => void;
}

const stateIsContentPage: StateCreator<storeIsContentPage> = (set, get) => {
  const enterContentPage = () => {
    set({ isContentPage: true });
  };
  const exitContentPage = () => {
    set({ isContentPage: false });
  };

  return {
    isContentPage: true,
    enterContentPage,
    exitContentPage,
  };
};

export const useIsContentPage = create<storeIsContentPage>(stateIsContentPage);
