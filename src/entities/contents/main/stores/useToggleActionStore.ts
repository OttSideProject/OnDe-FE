import { create } from "zustand";

import { ToggleActionStore } from '@/_types/contents/contents';

export const useToggleActionStore = create<ToggleActionStore>((set) => ({
  isActive: false,
  toggleClick: () => set((state) => ({ isActive: !state.isActive })),
}));

export default useToggleActionStore;


