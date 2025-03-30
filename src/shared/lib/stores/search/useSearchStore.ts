import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SearchContent } from '@/shared/types/contents/contents';
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

// 로컬 스토리지 초기화 함수
const initializeStorage = () => {
  // 브라우저 환경인지 확인
  if (typeof window !== 'undefined') {
    // 로컬 스토리지에 search-storage 키가 없으면 초기화
    if (!localStorage.getItem('search-storage')) {
      localStorage.setItem('search-storage', JSON.stringify({ state: { recentSearches: [] }, version: 0 }));
    }
  }
};

// 로컬 스토리지 초기화 실행
initializeStorage();

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      searchTerm: '',
      searchResults: [],
      recentSearches: [],
      isTyping: false,
      showPreview: false,
      showSuggestionList: true,
      selectedContentId: null,
      
      // 최근 검색어 추가 함수
      addRecentSearch: (term: string) => {
        if (term.trim() === '') return;
        
        // 현재 상태 가져오기
        const currentState = get();
        const currentSearches = currentState.recentSearches;
        
        // 중복 제거 및 최신 검색어를 맨 앞으로
        const filteredSearches = currentSearches.filter(item => item !== term);
        const newSearches = [term, ...filteredSearches].slice(0, 5);
        
        console.log('최근 검색어 추가:', term);
        console.log('새 최근 검색어 목록:', newSearches);
        
        // 상태 업데이트
        set({ recentSearches: newSearches });
        
        // 로컬 스토리지에 직접 저장 (디버깅용)
        if (typeof window !== 'undefined') {
          const storageData = {
            state: { recentSearches: newSearches },
            version: 0
          };
          localStorage.setItem('search-storage', JSON.stringify(storageData));
          console.log('로컬 스토리지에 직접 저장:', storageData);
        }
      },
      
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
        set({
          showSuggestionList: false,
          selectedContentId: suggestion.id,
          showPreview: true,
          searchTerm: suggestion.title,
          isTyping: false,
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    },
  ),
);
