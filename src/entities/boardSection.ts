import { BoardSectionStore } from '@/_types/contents';
import { fetchBoardSection } from '@/entities/contents/main';

export const boardSectionService = {
  async fetchBoardSections() {
    try {
      const response = await fetchBoardSection();
      return { data: response.data, error: null };
    } catch (err) {
      console.error('Error fetching board sections:', err);
      return { data: [], error: '데이터를 불러오는데 실패했습니다.' };
    }
  },
};
