'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchContents } from '@/entities/contents/main/api';
import { fetchSearchContents } from '@/shared/api';
import { SearchContent } from '@/shared/types/contents';
import { useModalStore } from '@/shared/lib/stores/modal';
import { useSearchStore } from '@/shared/lib/stores/search';
import { useLoaderStore } from '@/shared/lib/stores/loading';
import { Loading } from '../loading';
import SearchInput from './SearchInput';
import SearchResultList from './SearchResultList';
import TypeButton from './TypeButton';
import styles from './SearchModal.module.css';

const SearchModal = () => {
  const [autoSaveIndex, setAutoSaveIndex] = useState(() => {
    // 초기값은 localStorage에서 가져오되, 없으면 0(끄기)
    return Number(localStorage.getItem('autoSaveSearch') ?? '0');
  });
  const autoStatus = ['켜기', '끄기']; // 순서 변경

  const toggleAutoSave = () => {
    setAutoSaveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? 1 : 0;
      localStorage.setItem('autoSaveSearch', String(newIndex));
      return newIndex;
    });
  };

  const { activeModal, closeModal: originalCloseModal } = useModalStore();
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearResults,
    clearRecentSearches,
  } = useSearchStore();
  const { isLoading, setIsLoading } = useLoaderStore();
  const router = useRouter();

  const handleSearch = async (): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Current search term:', searchTerm);
      // 자동 저장이 켜진 상태이면 검색어 저장
      if (autoSaveIndex === 1 && searchTerm.trim() !== '') {
        addRecentSearch(searchTerm);
      }
      const response = await fetchSearchContents({ search: searchTerm });
      console.log('Fetched search contents:', response);
      setSearchResults(response.content);
      setSearchTerm(''); // 검색어 입력창 초기화
    } catch (error) {
      console.error('Error fetching search contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 클릭 시 검색 실행
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  // closeModal을 래핑하여 검색 결과도 함께 초기화
  const handleCloseModal = () => {
    originalCloseModal();
    clearResults();
    setSearchTerm('');
  };

  if (activeModal !== 'search') return null;

  const handleResultClick = (result: SearchContent): void => {
    handleCloseModal();
    router.push(`/contents/detail/${result.contentId}`);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {isLoading && <Loading />}
        <div className={styles.modalHeader}>
          <button
            type="button"
            onClick={handleCloseModal} // closeModal -> handleCloseModal로 변경
            className={styles.closeButton}
          >
            <img src="/assets/images/icons/close-x-w.svg" alt="close" />
          </button>
          <div className={styles.searchContent}>
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
        <div className={styles.modalBody}>
          {searchResults.length > 0 ? (
            <div className={styles.searchResultsContainer}>
              <h3>검색 결과</h3>
              <SearchResultList
                results={searchResults}
                onResultClick={handleResultClick}
              />
            </div>
          ) : (
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
                    <span>{term}</span>
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

              {/* <button type="button" className={styles.recentSearchItem}>
                  <span>드라마</span>
                  <img
                    src="/assets/images/icons/delete-x-g.svg"
                    alt="전체 삭제"
                  />
                </button>
              </div> */}
              {/* <div className={styles.clearButtonContainer}>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                >
                  전체 삭제
                </button>
              </div> */}
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
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
