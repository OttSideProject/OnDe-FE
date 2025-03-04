import { create } from 'zustand';
import { BoardSectionStore } from '@/_types/contents/contents';
import { boardSectionService } from '@/entities/boardSection';

export const useBoardSectionStore = create<BoardSectionStore>((set) => ({
  boardSections: [],
  isLoading: false,
  error: null,
  fetchBoardSections: async () => {
    set({ isLoading: true });
    const { data, error } = await boardSectionService.fetchBoardSections();
    set({
      boardSections: data,
      error,
      isLoading: false,
    });
  },
}));

export default useBoardSectionStore;
