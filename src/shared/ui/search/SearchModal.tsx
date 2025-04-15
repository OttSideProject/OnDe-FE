'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/shared/lib/stores/modal';
import { useSearchStore } from '@/shared/lib/stores/search';
import { fetchSearchContents } from '@/shared/api/search';
import { FetchSearchParams } from '@/shared/api/search/fetchSearchContents';
import { SearchSuggestion } from '@/shared/api/actions/searchSuggestions';
import { SearchContent } from '@/shared/types/contents/contents';
import SearchInput from './SearchInput';
import SearchResultList from './SearchResultList';
import SearchSuggestions from './SearchSuggestions';
import SearchResultPreview from './SearchResultPreview';
import TypeButton from './TypeButton';
import styles from './SearchModal.module.css';

const SearchModal = () => {
  const [autoSaveIndex, setAutoSaveIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 모달 스토어에서 필요한 상태와 액션 가져오기
  const { activeModal, closeModal: originalCloseModal } = useModalStore();

  // 검색 스토어에서 필요한 상태와 액션 가져오기
  const {
    searchTerm,
    searchResults,
    recentSearches,
    setSearchTerm,
    setSearchResults,
    addRecentSearch,
    removeRecentSearch,
    clearResults,
    clearRecentSearches,
    isTyping,
    showPreview,
    showSuggestionList,
    selectedContentId,
    setIsTyping,
    setShowPreview,
    setShowSuggestionList,
    setSelectedContentId,
    handleSuggestionSelect,
    resetSearchState,
  } = useSearchStore();

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const autoSaveValue = localStorage.getItem('autoSaveSearch');
      if (autoSaveValue === null) {
        localStorage.setItem('autoSaveSearch', '1');
        setAutoSaveIndex(1);
      } else {
        setAutoSaveIndex(parseInt(autoSaveValue, 10));
      }

      // 디버깅용: 로컬 스토리지 내용 확인
      console.log('Auto Save Setting:', autoSaveValue);
      console.log('Recent Searches:', localStorage.getItem('search-storage'));

      // 로컬 스토리지에서 최근 검색어 로드
      try {
        const storageData = localStorage.getItem('search-storage');
        if (storageData) {
          const parsedData = JSON.parse(storageData);
          const storedSearches = parsedData.state?.recentSearches || [];

          // Zustand 스토어에 최근 검색어 설정
          if (storedSearches.length > 0 && Array.isArray(storedSearches)) {
            console.log('로컬 스토리지에서 최근 검색어 로드:', storedSearches);

            // 각 검색어를 개별적으로 추가
            storedSearches.forEach((term: string) => {
              if (term && term.trim() !== '') {
                addRecentSearch(term);
              }
            });
          }
        }
      } catch (error) {
        console.error('로컬 스토리지에서 최근 검색어 로드 중 오류:', error);
      }
    }
  }, [addRecentSearch]);

  // 검색 모달이 열릴 때 초기 상태로 설정
  useEffect(() => {
    if (activeModal === 'search') {
      // 모달이 열릴 때 초기 상태 설정
      resetSearchState();
    }
  }, [activeModal, resetSearchState]);

  // closeModal을 래핑하여 검색 결과도 함께 초기화
  const handleCloseModal = (): void => {
    // 모달을 닫을 때 모든 검색 관련 상태 초기화
    originalCloseModal(); // 원래 모달 닫기 함수 호출
    resetSearchState(); // 검색 관련 상태 초기화

    // DOM에서 검색 입력 필드를 찾아 값을 직접 초기화
    const searchInput = document.querySelector(
      'input[type="search"]',
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  };

  // 검색 실행
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setIsLoading(true);
      // 검색어 저장 (자동 저장 설정이 켜져 있을 때만)
      if (autoSaveIndex === 1 && searchTerm.trim()) {
        console.log('최근 검색어 저장 시도:', searchTerm);

        // Zustand 스토어의 addRecentSearch 함수 직접 호출
        addRecentSearch(searchTerm);

        // 디버깅용: 저장 후 로컬 스토리지 확인 (1초 후 확인)
        setTimeout(() => {
          const storageData = localStorage.getItem('search-storage');
          console.log('저장 후 로컬 스토리지 내용:', storageData);

          // 로컬 스토리지에 직접 저장 (백업 메커니즘)
          if (!storageData || !storageData.includes(searchTerm)) {
            console.log('로컬 스토리지에 저장되지 않음, 직접 저장 시도');
            try {
              const currentData = storageData
                ? JSON.parse(storageData)
                : { state: { recentSearches: [] }, version: 0 };
              const currentSearches = currentData.state?.recentSearches || [];
              const filteredSearches = currentSearches.filter(
                (item: string) => item !== searchTerm,
              );
              const newSearches = [searchTerm, ...filteredSearches].slice(0, 5);

              const newData = {
                state: { recentSearches: newSearches },
                version: 0,
              };

              localStorage.setItem('search-storage', JSON.stringify(newData));
              console.log('직접 저장 완료:', newData);
            } catch (error) {
              console.error('로컬 스토리지 직접 저장 중 오류:', error);
            }
          }
        }, 1000);
      }

      // 검색 API 호출
      const params: FetchSearchParams = {
        search: searchTerm.trim(),
        id: '',
      };
      const response = await fetchSearchContents(params);

      // 응답 구조에 따라 적절히 처리
      if (response && Array.isArray(response)) {
        setSearchResults(response);

        // 검색 결과가 있으면 제안 리스트 숨김
        if (response.length > 0) {
          setShowSuggestionList(false);
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 결과 아이템 클릭 시 상세 페이지로 이동
  const handleResultClick = (result: SearchContent): void => {
    router.push(`/contents/detail/${result.contentId}`);
    handleCloseModal();
  };

  // 검색 입력 시 타이핑 상태 설정
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setIsTyping(true);
    setShowSuggestionList(true); // 입력이 변경될 때 제안 리스트 표시 활성화
  };

  // 프리뷰 닫기 핸들러
  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedContentId(null);
  };

  // 최근 검색어 클릭 시 검색 실행
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  // 자동 저장 토글
  const toggleAutoSave = () => {
    setAutoSaveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? 1 : 0;
      if (typeof window !== 'undefined') {
        localStorage.setItem('autoSaveSearch', String(newIndex));
      }
      return newIndex;
    });
  };

  // UI 표시 조건
  const showInitialUI = !searchTerm && !searchResults.length;
  const showSearchResults = searchResults.length > 0;
  const showSearchSuggestions =
    searchTerm &&
    !searchResults.length &&
    !isLoading &&
    !showPreview &&
    showSuggestionList;
  // 검색 결과가 있거나 검색어가 있고 로딩이 끝났을 때 결과 컨테이너를 표시
  const showResultsContainer = searchResults.length > 0;

  // 자동 저장 상태 텍스트
  const autoStatus = ['켜기', '끄기']; // 순서 변경

  if (activeModal !== 'search') return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCloseModal}
          >
            <img src="/assets/images/icons/close-x-w.svg" alt="close" />
          </button>
          <div className={styles.searchContent}>
            <SearchInput onSearch={handleSearch} onChange={handleInputChange} />
          </div>
        </div>
        <div className={styles.modalBody}>
          {isLoading && <p className={styles.loadingIndicator}>검색 중...</p>}

          {/* 검색어가 없고 검색 결과도 없을 때 초기 UI 표시 */}
          {showInitialUI && (
            <>
              <div className={styles.recentSearch}>
                <h3>
                  <img
                    src="/assets/images/icons/recent-search-text.svg"
                    alt="최근 검색어"
                  />
                </h3>
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={styles.clearAllButton}
                    onClick={clearRecentSearches}
                  >
                    <span>전체 삭제 </span>
                  </button>
                  <span className={styles.bar}>|</span>
                  <button
                    type="button"
                    className={styles.autoSaveToggle}
                    onClick={toggleAutoSave}
                  >
                    <span>자동 저장</span>
                    <span className={styles.statusText}>
                      {' '}
                      {autoStatus[autoSaveIndex]}
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.recentSearchList}>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className={styles.recentSearchItem}
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    <span className="ellipsis">{term}</span>
                    <img
                      src="/assets/images/icons/delete-x-g.svg"
                      alt="삭제"
                      onClick={(e) => {
                        e.stopPropagation(); // 버튼 클릭 이벤트 전파 방지
                        removeRecentSearch(term);
                      }}
                    />
                  </button>
                ))}
              </div>
              <div className={styles.types}>
                <h3>
                  <img
                    src="/assets/images/icons/find-ondy-text.svg"
                    alt="온디에서 더 많은 콘텐츠를 찾아보세요!"
                  />
                </h3>
                <div className={styles.typeButtonGroup}>
                  <TypeButton
                    type="new"
                    iconSrc="/assets/images/icons/type-new-text.svg"
                    altText="신작"
                  />
                  <TypeButton
                    type="movie"
                    iconSrc="/assets/images/icons/type-movie-text.svg"
                    altText="영화"
                  />
                  <TypeButton
                    type="drama"
                    iconSrc="/assets/images/icons/type-drama-text.svg"
                    altText="드라마"
                  />
                  <TypeButton
                    type="ani"
                    iconSrc="/assets/images/icons/type-ani-text.svg"
                    altText="애니메이션"
                  />
                  <TypeButton
                    type="enter"
                    iconSrc="/assets/images/icons/type-enter-text.svg"
                    altText="예능"
                  />
                </div>
              </div>
            </>
          )}

          {/* 프리뷰가 비활성화되었을 때만 검색 결과 표시 */}
          {!showPreview && showResultsContainer && (
            <div className={`${styles.searchResultsContainer} scrollbar`}>
              <SearchResultList
                results={searchResults}
                onResultClick={handleResultClick}
              />
            </div>
          )}

          {/* 검색어가 있고 검색 결과가 없을 때 검색 제안 표시 */}
          {showSearchSuggestions && (
            <SearchSuggestions
              searchTerm={searchTerm}
              onSelect={handleSuggestionSelect}
            />
          )}

          {/* 프리뷰가 활성화되었을 때 프리뷰 표시 */}
          {showPreview && selectedContentId && (
            <SearchResultPreview
              contentId={selectedContentId}
              onClose={handleClosePreview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
