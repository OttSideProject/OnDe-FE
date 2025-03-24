// src/entities/contents/stores/ranking/useRankingStore.ts
import { create } from 'zustand';

// 데이터 상태를 나타내는 타입
export type DataState = 'loading' | 'no_data' | 'filtered_no_data' | 'has_data';

type RankingStore = {
  // 상태
  currentCategory: string;
  dataState: DataState;
  isInitialLoad: boolean;
  error: string | null;

  // 기본 액션
  setCurrentCategory: (category: string) => void;
  setDataState: (state: DataState) => void;
  setIsInitialLoad: (isInitial: boolean) => void;
  setError: (error: string | null) => void;

  // 복합 액션
  initialize: () => void;
  handleFilterApplied: (category: string) => void;
  handleOttSelected: (ott: string) => void;
  handleDataStateChange: (
    dataExists: boolean,
    loading: boolean,
    category?: string,
  ) => void;
  initializeFromStorage: () => boolean;

  // 유틸리티
  getEmptyMessage: () => string;
};

export const useRankingStore = create<RankingStore>((set, get) => ({
  // 초기 상태
  currentCategory: '',
  dataState: 'loading',
  isInitialLoad: true,
  error: null,

  // 기본 액션
  setCurrentCategory: (category: string) => set({ currentCategory: category }),
  setDataState: (state: DataState) => set({ dataState: state }),
  setIsInitialLoad: (isInitial: boolean) => set({ isInitialLoad: isInitial }),
  setError: (error: string | null) => set({ error }),

  // 복합 액션
  initialize: () => {
    console.log('Store: Initializing ranking store');
    set({
      currentCategory: '', // 카테고리 초기화 추가
      dataState: 'has_data',
      isInitialLoad: true, // 초기 로드 상태로 변경
      error: null,
    });
  },

  handleFilterApplied: (category: string) => {
    console.log('Store: Filter applied:', category);
    
    // 현재 상태 가져오기
    const { currentCategory } = get();
    
    // 현재 카테고리에서 OTT 플랫폼 부분 추출 (netflix, tving, wavve, watcha 중 하나)
    const ottPlatforms = ['netflix', 'tving', 'wavve', 'watcha'];
    const currentOtt = currentCategory.split(',').find(part => ottPlatforms.includes(part.trim()));
    
    // 새로운 카테고리 생성 (OTT 플랫폼 + 필터)
    let newCategory = category;
    if (currentOtt) {
      // 필터가 비어있지 않은 경우에만 쉼표 추가
      newCategory = category ? `${currentOtt},${category}` : currentOtt;
    }
    
    console.log('Store: New category after filter applied:', newCategory);
    
    set({
      currentCategory: newCategory,
      isInitialLoad: false,
    });
  },

  handleOttSelected: (ott: string) => {
    // 현재 상태 가져오기
    const { currentCategory, isInitialLoad, dataState } = get();
    
    // OTT가 빈 문자열인 경우 (선택 해제)
    if (!ott) {
      console.log('Store: OTT selection cleared');
      
      // 현재 카테고리에서 필터 부분만 추출 (OTT 플랫폼이 아닌 부분)
      const ottPlatforms = ['netflix', 'tving', 'wavve', 'watcha'];
      const currentFilters = currentCategory
        .split(',')
        .filter(part => !ottPlatforms.includes(part.trim()) && part.trim() !== '')
        .join(',');
      
      // 필터만 남기고 OTT 부분 제거
      set({
        currentCategory: currentFilters,
        isInitialLoad: false,
      });
      
      return;
    }
    
    // 현재 카테고리에서 필터 부분 추출 (OTT 플랫폼이 아닌 부분)
    const ottPlatforms = ['netflix', 'tving', 'wavve', 'watcha'];
    const currentFilters = currentCategory
      .split(',')
      .filter(part => !ottPlatforms.includes(part.trim()) && part.trim() !== '')
      .join(',');
    
    // 새로운 카테고리 생성 (OTT 플랫폼 + 기존 필터)
    let newCategory = ott;
    if (currentFilters && ott) {
      newCategory = `${ott},${currentFilters}`;
    }
    
    console.log('Store: OTT selected:', {
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
        currentCategory: newCategory,
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
}));
