// src/entities/contents/stores/ranking/useRankingStore.ts
import { create } from 'zustand';
import { Ranking, RankingsResponse } from '@/shared/types/contents';
import { fetchRankingByCategory } from '@/entities/contents/ranking/api';

// 데이터 상태를 나타내는 타입
export type DataState = 'loading' | 'no_data' | 'filtered_no_data' | 'has_data';

type RankingStore = {
  // 상태
  currentCategory: string;
  dataState: DataState;
  isInitialLoad: boolean;
  error: string | null;

  // 랭킹 데이터 관련 상태
  rankingData: RankingsResponse[] | null;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;

  // 기본 액션
  setCurrentCategory: (category: string) => void;
  setDataState: (state: DataState) => void;
  setIsInitialLoad: (isInitial: boolean) => void;
  setError: (error: string | null) => void;

  // 데이터 페칭 액션
  fetchRankingData: (category: string) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  setRankingData: (data: RankingsResponse[] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasNextPage: (hasNextPage: boolean) => void;
  setIsFetchingNextPage: (isFetchingNextPage: boolean) => void;

  // 복합 액션
  initialize: () => void;
  handleFilterApplied: (category: string) => void;
  handleOttSelected: (otts: string[]) => void;
  handleDataStateChange: (
    dataExists: boolean,
    loading: boolean,
    category?: string,
  ) => void;
  initializeFromStorage: () => boolean;

  // 유틸리티
  getEmptyMessage: () => string;
  getTopThreeRankings: () => Ranking[];
  getSubListRankings: () => Ranking[];
};

// 카테고리 문자열에서 중복을 제거하는 유틸리티 함수
const removeDuplicatesFromCategory = (category: string): string => {
  if (!category) return '';

  const parts = category.split(',');
  const uniqueParts = parts.filter(
    (value, index, self) => self.indexOf(value) === index,
  );
  return uniqueParts.join(',');
};

export const useRankingStore = create<RankingStore>((set, get) => ({
  // 초기 상태
  currentCategory: '',
  dataState: 'loading',
  isInitialLoad: true,
  error: null,

  // 랭킹 데이터 관련 초기 상태
  rankingData: null,
  isLoading: false,
  hasNextPage: false,
  isFetchingNextPage: false,

  // 기본 액션
  setCurrentCategory: (category: string) => {
    const cleanedCategory = removeDuplicatesFromCategory(category);
    set({ currentCategory: cleanedCategory });
  },
  setDataState: (state: DataState) => set({ dataState: state }),
  setIsInitialLoad: (isInitial: boolean) => set({ isInitialLoad: isInitial }),
  setError: (error: string | null) => set({ error }),

  // 데이터 페칭 액션
  fetchRankingData: async (category: string) => {
    try {
      set({ isLoading: true });

      console.log('Store: Fetching ranking data for category:', category);

      const response = await fetchRankingByCategory({
        category: category || '',
        nowPage: 0,
        pageCount: 48,
      });

      set({
        rankingData: [response],
        isLoading: false,
        hasNextPage: response.page.number < response.page.totalPages - 1,
      });

      // 데이터 상태 업데이트
      const hasData = response.content.length > 0;
      get().handleDataStateChange(hasData, false, category);
    } catch (error) {
      console.error('Error fetching ranking data:', error);
      set({
        error: '데이터를 불러오는 중 오류가 발생했습니다.',
        isLoading: false,
      });
    }
  },

  fetchNextPage: async () => {
    const { rankingData, currentCategory, hasNextPage } = get();

    if (!hasNextPage || !rankingData || rankingData.length === 0) return;

    try {
      set({ isFetchingNextPage: true });

      const lastPage = rankingData[rankingData.length - 1];
      const nextPageNumber = lastPage.page.number + 1;

      console.log('Store: Fetching next page:', nextPageNumber);

      const response = await fetchRankingByCategory({
        category: currentCategory || '',
        nowPage: nextPageNumber,
        pageCount: 48,
      });

      set({
        rankingData: [...rankingData, response],
        isFetchingNextPage: false,
        hasNextPage: response.page.number < response.page.totalPages - 1,
      });
    } catch (error) {
      console.error('Error fetching next page:', error);
      set({
        isFetchingNextPage: false,
      });
    }
  },

  setRankingData: (data: RankingsResponse[] | null) =>
    set({ rankingData: data }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setHasNextPage: (hasNextPage: boolean) => set({ hasNextPage }),
  setIsFetchingNextPage: (isFetchingNextPage: boolean) =>
    set({ isFetchingNextPage }),

  // 복합 액션
  initialize: () => {
    // 로컬 스토리지에서 초기화 시도
    const initialized = get().initializeFromStorage();

    // 초기화 실패 시 기본 상태로 설정
    if (!initialized) {
      set({
        currentCategory: '',
        dataState: 'loading',
        isInitialLoad: true,
        error: null,
        rankingData: null,
      });
    }
  },

  handleFilterApplied: (category: string) => {
    console.log('Store: Filter applied with category:', category);

    // 현재 카테고리와 동일한 경우 중복 호출 방지
    if (get().currentCategory === category) {
      console.log('Store: Category unchanged, skipping update');
      return;
    }

    // 카테고리 업데이트
    get().setCurrentCategory(category);

    // 초기 로드 상태 업데이트
    get().setIsInitialLoad(false);

    // 데이터 상태 업데이트
    get().setDataState('loading');

    // 데이터 가져오기
    get().fetchRankingData(category);
  },

  handleOttSelected: (otts: string[]) => {
    // 현재 상태 가져오기
    const { currentCategory, isInitialLoad, dataState } = get();

    // OTT 플랫폼 목록
    const ottPlatforms = ['netflix', 'tving', 'wavve', 'watcha'];

    // 중복 제거 (filter 메서드 사용)
    const uniqueOtts = otts.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    // 현재 카테고리에서 필터 부분만 추출 (OTT 플랫폼이 아닌 부분)
    const currentFilters = currentCategory
      .split(',')
      .filter(
        (part) => !ottPlatforms.includes(part.trim()) && part.trim() !== '',
      )
      .join(',');

    // OTT 배열이 비어있는 경우 (모두 선택 해제)
    if (uniqueOtts.length === 0) {
      console.log('Store: All OTT selections cleared');

      // 필터만 남기고 OTT 부분 제거
      set({
        currentCategory: currentFilters,
        isInitialLoad: false,
      });

      return;
    }

    // 새로운 카테고리 생성 (선택된 OTT 플랫폼들 + 기존 필터)
    let newCategory = uniqueOtts.join(',');
    if (currentFilters) {
      newCategory = `${newCategory},${currentFilters}`;
    }

    console.log('Store: OTTs selected:', {
      prevCategory: currentCategory,
      newCategory,
      currentFilters,
      isInitialLoad,
      dataState,
    });

    // 카테고리가 변경되었거나 초기 로드인 경우에만 데이터 상태를 로딩으로 변경
    if (currentCategory !== newCategory || isInitialLoad) {
      console.log('Store: Category changed, updating state to loading');

      // 상태 변경
      set({
        currentCategory: removeDuplicatesFromCategory(newCategory),
        isInitialLoad: false,
        dataState: 'loading', // 데이터 상태를 로딩으로 명시적 설정
      });
    } else {
      console.log('Store: Category not changed, keeping current state');
    }
  },

  handleDataStateChange: (
    dataExists: boolean,
    loading: boolean,
    category?: string,
  ) => {
    const state = get();
    const currentCategory =
      category !== undefined ? category : state.currentCategory;

    console.log('Store: Data state changed:', {
      dataExists,
      loading,
      currentCategory,
      isInitialLoad: state.isInitialLoad,
      currentDataState: state.dataState,
    });

    // 이미 같은 상태라면 업데이트하지 않음
    if (loading && state.dataState === 'loading') {
      return;
    }

    if (!dataExists && !loading) {
      // 필터가 적용된 상태에서 데이터가 없는 경우와 초기 로딩에서 데이터가 없는 경우 구분
      const newState =
        currentCategory && !state.isInitialLoad
          ? 'filtered_no_data'
          : 'no_data';

      // 이미 같은 상태라면 업데이트하지 않음
      if (state.dataState === newState) {
        return;
      }

      set({
        dataState: newState,
        error: null,
      });
    } else if (dataExists && !loading) {
      // 이미 같은 상태라면 업데이트하지 않음
      if (state.dataState === 'has_data' && !state.isInitialLoad) {
        return;
      }

      set({
        dataState: 'has_data',
        isInitialLoad: false,
        error: null,
      });
    } else if (loading) {
      set({
        dataState: 'loading',
        error: null,
      });
    }
  },

  initializeFromStorage: () => {
    console.log('Store: initializeFromStorage called, but disabled');
    return false;
  },

  // 유틸리티
  getEmptyMessage: () => {
    const { dataState, currentCategory } = get();

    if (dataState === 'filtered_no_data') {
      return `현재 적용된 필터(${currentCategory})에 해당하는 콘텐츠가 없습니다.`;
    }
    return '현재 이용 가능한 콘텐츠가 없습니다.';
  },

  // 유틸리티 함수 추가
  getTopThreeRankings: () => {
    const { rankingData } = get();

    if (!rankingData || rankingData.length === 0 || !rankingData[0].content) {
      return [];
    }

    // 상위 3개 랭킹 데이터 가져오기
    const topThree = rankingData[0].content.slice(0, 3).map((item) => ({
      ...item,
      id: String(item.contentId), // contentId를 id로 변환
    }));

    // 요구사항에 맞게 2위, 1위, 3위 순서로 재배열
    if (topThree.length === 3) {
      return [topThree[1], topThree[0], topThree[2]]; // 2위, 1위, 3위 순서
    }

    // 3개 미만인 경우 그대로 반환
    return topThree;
  },

  getSubListRankings: () => {
    const { rankingData } = get();

    if (!rankingData || rankingData.length === 0) {
      return [];
    }

    // 모든 페이지의 데이터 합치기
    const allRankings: Ranking[] = [];
    rankingData.forEach((page) => {
      if (page && page.content && Array.isArray(page.content)) {
        allRankings.push(...page.content);
      }
    });

    if (allRankings.length <= 3) {
      return [];
    }

    // 4위부터 데이터 가져오기
    const subListRankings = allRankings.slice(3, 48);

    // 순위를 4부터 시작하도록 설정
    return subListRankings.map((ranking, index) => ({
      ...ranking,
      rank: index + 4, // 순위가 4부터 시작 (인덱스 0이 4위)
    }));
  },
}));
