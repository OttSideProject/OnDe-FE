import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchContent } from '@/shared/types/contents';

// 검색어 상태 관리 스토어
type SearchStore = {
  searchTerm: string;
  searchResults: SearchContent[];
  recentSearches: string[];
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: SearchContent[]) => void;
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearResults: () => void;
  clearRecentSearches: () => void;
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchTerm: '',
      searchResults: [],
      recentSearches: [],
      addRecentSearch: (term: string) =>
        set((state) => {
          if (term.trim() === '') return state;
          const filtered = state.recentSearches.filter((item) => item !== term);
          return { recentSearches: [term, ...filtered].slice(0, 5) };
        }),
      removeRecentSearch: (term: string) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((item) => item !== term),
        })),
      setSearchTerm: (term: string) => set({ searchTerm: term }),
      setSearchResults: (results: SearchContent[]) =>
        set({ searchResults: results }),
      clearResults: () => set({ searchResults: [] }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-storage', // localStorage에 저장될 키 이름
      partialize: (state) => ({ recentSearches: state.recentSearches }), // recentSearches만 저장
    },
  ),
);
