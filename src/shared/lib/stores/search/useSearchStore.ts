import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchContent } from '@/shared/types/contents';
import { SearchSuggestion } from '@/shared/api/actions/searchSuggestions';

// 검색어 상태 관리 스토어
type SearchStore = {
  searchTerm: string;
  searchResults: SearchContent[];
  recentSearches: string[];
  isTyping: boolean;
  showPreview: boolean;
  showSuggestionList: boolean;
  selectedContentId: string | null;
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: SearchContent[]) => void;
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearResults: () => void;
  clearRecentSearches: () => void;
  setIsTyping: (isTyping: boolean) => void;
  setShowPreview: (show: boolean) => void;
  setShowSuggestionList: (show: boolean) => void;
  setSelectedContentId: (id: string | null) => void;
  handleSuggestionSelect: (suggestion: SearchSuggestion) => void;
  resetSearchState: () => void;
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchTerm: '',
      searchResults: [],
      recentSearches: [],
      isTyping: false,
      showPreview: false,
      showSuggestionList: true,
      selectedContentId: null,
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
      setIsTyping: (isTyping: boolean) => set({ isTyping }),
      setShowPreview: (show: boolean) => set({ showPreview: show }),
      setShowSuggestionList: (show: boolean) => set({ showSuggestionList: show }),
      setSelectedContentId: (id: string | null) => set({ selectedContentId: id }),
      handleSuggestionSelect: (suggestion: SearchSuggestion) =>
        set((state) => {
          return {
            showSuggestionList: false,
            selectedContentId: suggestion.id,
            showPreview: true,
            searchTerm: suggestion.title,
            isTyping: false,
          };
        }),
      resetSearchState: () =>
        set({
          searchTerm: '',
          searchResults: [],
          showPreview: false,
          selectedContentId: null,
          isTyping: false,
          showSuggestionList: true,
        }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    },
  ),
);
