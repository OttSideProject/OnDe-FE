// src/shared/lib/stores/loader/useLoaderStore.ts
import { create } from 'zustand';

type LoaderStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
