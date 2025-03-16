import { create } from 'zustand';
import type { FilterGroup } from '@/_types/contents';

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
      items: [
        { id: 'action', label: '액션' },
        { id: 'comedy', label: '코미디' },
        { id: 'horror', label: '공포' },
        { id: 'drama', label: '드라마' },
        { id: 'romance', label: '로맨스' },
        { id: 'sf', label: 'SF / 판타지' },
        { id: 'youth', label: '청춘' },
        { id: 'musical', label: '뮤지컬' },
        { id: 'thriller', label: '스릴러' },
        { id: 'animation', label: '애니' },
        { id: 'documentary', label: '다큐' },
        { id: 'crime', label: '범죄' },
        { id: 'reality', label: '리얼리티' },
      ],
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
      ],
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
}));
