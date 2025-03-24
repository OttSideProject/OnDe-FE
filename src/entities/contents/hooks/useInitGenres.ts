import { useEffect } from 'react';
import { useFilterStore } from '@/entities/contents/filter';
import { fetchGenreList } from '@/shared/api/filter';
import { FilterItem } from '@/shared/types/contents';

export const useInitGenres = () => {
  const initGenres = useFilterStore((state) => state.initGenres);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetchGenreList();
        // API 응답 데이터를 FilterItem 형식으로 변환
        const genres: FilterItem[] = response.map(item => ({
          id: item.genreId.toString(),
          label: item.genre
        }));
        initGenres(genres);
      } catch (error) {
        console.error('장르 목록을 불러오는 중 오류 발생:', error);
      }
    };

    loadGenres();
  }, [initGenres]);
};
