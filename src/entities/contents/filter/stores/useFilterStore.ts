import { create } from 'zustand';
import type { FilterGroup, FilterItem } from '@/shared/types/contents';

type FilterChip = {
  groupId: string;
  itemId: string;
  label: string;
};

type LastSelectedItem = {
  groupId: string;
  label: string;
} | null;

type FilterStore = {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  selectedChips: FilterChip[];
  lastSelectedItem: LastSelectedItem;
  setSelectedFilters: (groupId: string, items: string[]) => void;
  setLastSelectedItem: (item: LastSelectedItem) => void;
  initGenres: (genres: FilterItem[]) => void;
  resetFilters: () => void;
};

const transformFiltersToChips = (
  selectedFilters: Record<string, string[]>,
  filterGroups: FilterGroup[],
): FilterChip[] => {
  return Object.entries(selectedFilters).flatMap(([groupId, itemIds]) => {
    const group = filterGroups.find((g) => g.id === groupId);
    if (!group) return [];

    return itemIds
      .map((itemId) => {
        const item = group.items.find((i) => i.id === itemId);
        return item ? { groupId, itemId, label: item.label } : null;
      })
      .filter((chip): chip is FilterChip => chip !== null);
  });
};

const updateLastSelectedItem = (
  selectedFilters: Record<string, string[]>,
  filterGroups: FilterGroup[],
  groupId: string,
): LastSelectedItem => {
  const items = selectedFilters[groupId] || [];
  if (items.length === 0) return null;

  const group = filterGroups.find((g) => g.id === groupId);
  if (!group) return null;

  const lastItem = group.items.find(
    (item) => item.id === items[items.length - 1],
  );
  return lastItem ? { groupId, label: lastItem.label } : null;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filterGroups: [
    {
      id: 'genre',
      label: '장르',
      items: [],
    },
    {
      id: 'type',
      label: '타입',
      items: [
        { id: 'drama', label: '드라마' },
        { id: 'movie', label: '영화' },
        { id: 'animation', label: '애니메이션' },
        { id: 'entertainment', label: '예능' },
        { id: 'documentary', label: '다큐멘터리' },
      ], // API에서 가져온 데이터로 채워질 예정
    },
  ],
  selectedFilters: {},
  selectedChips: [],
  lastSelectedItem: null,
  setSelectedFilters: (groupId, items) =>
    set((state) => {
      const newSelectedFilters = {
        ...state.selectedFilters,
        [groupId]: items,
      };

      return {
        selectedFilters: newSelectedFilters,
        selectedChips: transformFiltersToChips(
          newSelectedFilters,
          state.filterGroups,
        ),
        lastSelectedItem: updateLastSelectedItem(
          newSelectedFilters,
          state.filterGroups,
          groupId,
        ),
      };
    }),
  setLastSelectedItem: (item) => set({ lastSelectedItem: item }),
  initGenres: (genres) =>
    set((state) => {
      const newFilterGroups = [...state.filterGroups];
      const genreGroupIndex = newFilterGroups.findIndex(
        (g) => g.id === 'genre',
      );

      if (genreGroupIndex !== -1) {
        newFilterGroups[genreGroupIndex] = {
          ...newFilterGroups[genreGroupIndex],
          items: genres,
        };
      }

      return { filterGroups: newFilterGroups };
    }),
  resetFilters: () =>
    set((state) => ({
      selectedFilters: {},
      selectedChips: [],
      lastSelectedItem: null,
    })),
}));
