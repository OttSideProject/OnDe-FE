import { create } from 'zustand';
import type { FilterGroup } from '../types';

type FilterStore = {
  isOpen: boolean;
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  setSelectedFilters: (groupId: string, items: string[]) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  isOpen: false,
  filterGroups: [
    {
      id: 'genre',
      label: '장르',
      items: [
        { id: 'action', label: '액션' },
        { id: 'comedy', label: '코미디' },
        { id: 'drama', label: '드라마' },
        { id: 'sf', label: 'SF / 판타지' },
        { id: 'romance', label: '로맨스' },
      ],
    },
    {
      id: 'type',
      label: '타입',
      items: [
        { id: 'movie', label: '영화' },
        { id: 'drama', label: '드라마' },
        { id: 'entertainment', label: '예능' },
        { id: 'documentary', label: '다큐멘터리' },
      ],
    },
  ],
  selectedFilters: {},
  openFilterModal: () => set({ isOpen: true }),
  closeFilterModal: () => set({ isOpen: false }),
  setSelectedFilters: (groupId, items) =>
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        [groupId]: items,
      },
    })),
}));
