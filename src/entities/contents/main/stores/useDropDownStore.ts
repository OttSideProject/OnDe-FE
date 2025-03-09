import { create } from "zustand";

import { DropDownStore } from "@/_types/contents/contents";

export const useDropDownStore = create<DropDownStore>((set) => ({
  isDropDownOpen: false,
  openDropDown: () => set({ isDropDownOpen: true }),
  closeDropDown: () => set({ isDropDownOpen: false }),
}));

export default useDropDownStore;


