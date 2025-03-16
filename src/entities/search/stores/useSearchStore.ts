import { create } from 'zustand';

// 검색어 상태 관리 스토어
type SearchStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: '',
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
