import { create, StateCreator } from 'zustand';

interface SearchTermState {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

const createSearchTermState: StateCreator<SearchTermState> = (set) => {
  const setInputValue = (inputValue: string) => set({ inputValue });

  return {
    inputValue: '',
    setInputValue,
  };
};

export const useSearchTermStore = create<SearchTermState>(createSearchTermState);
