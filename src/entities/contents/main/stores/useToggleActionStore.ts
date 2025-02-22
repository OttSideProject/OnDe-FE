import { create } from "zustand";

import { ToggleActionStore } from '@/_types/contents/contents';

const useToggleActionStore = create<ToggleActionStore>((set) => ({
  isActive: false,
  toggleClick: () => set((state) => ({ isActive: !state.isActive })),
}));

export default useToggleActionStore;


