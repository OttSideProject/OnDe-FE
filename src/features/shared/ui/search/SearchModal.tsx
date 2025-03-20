'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchContents,
  fetchSearchContents,
} from '@/entities/contents/main/api';
import { useModalStore } from '@/entities/modal/stores/useModalStore';
import { useSearchStore } from '@/entities/search/stores/useSearchStore';
import { Loading } from '../loading';
import styles from './SearchModal.module.css';

const SearchModal = () => {
  const { activeModal, closeModal } = useModalStore();
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  if (activeModal !== 'search') return null;

  const handleSearch = async () => {
    try {
      if (inputRef.current) {
        const searchTerm = inputRef.current.value;
        setSearchTerm(searchTerm);
        console.log('Current search term:', searchTerm); // 검색어를 콘솔에 출력
        const response = await fetchSearchContents({ search: searchTerm });
        console.log('Fetched search contents:', response);
        // 여기에 검색 결과를 처리하는 로직 추가
      } else {
        console.error('검색 입력 필드를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching search contents:', error);
    }
  };

  const handleSearchByType = async (type: string) => {
    try {
      const response = await fetchContents({ type, nowPage: 1, pageSize: 10 });
      console.log('Fetched contents for type:', type, response);
      // 여기에 검색 결과를 처리하는 로직 추가
    } catch (error) {
      console.error('Error fetching contents for type:', type, error);
    }
  };

  const handleNavigate = (type: string) => {
    setIsLoading(true);
    closeModal();
    router.push(`/contents/${type}`);
    setIsLoading(false);
  };

  return (
    <div className={styles.modalOverlay}>
      {isLoading && <Loading />}
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            type="button"
            onClick={closeModal}
            className={styles.closeButton}
          >
            <img src="/assets/images/icons/close-x-w.svg" alt="close" />
          </button>

          <div className={styles.searchContent}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                placeholder="콘텐츠, 게시글을 검색할 수 있어요."
                className={styles.searchInput}
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className={styles.searchButton}
                onClick={handleSearch}
              >
                <img src="/assets/images/icons/find-icon-g.svg" alt="search" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.recentSearch}>
            <h3>
              <img
                src="/assets/images/icons/recent-search-text.svg"
                alt="최근 검색어"
              />
              <button type="button" className={styles.clearAllButton}>
                <span>전체 삭제</span>
                <img
                  src="/assets/images/icons/delete-x-g.svg"
                  alt="전체 삭제"
                />
              </button>
            </h3>
            <div className={styles.recentSearchList}>
              <button type="button" className={styles.recentSearchItem}>
                <span>드라마</span>
                <img
                  src="/assets/images/icons/delete-x-g.svg"
                  alt="전체 삭제"
                />
              </button>
            </div>
            <div className={styles.autoSaveToggle}>
              <span>자동 저장</span>
              <input
                type="checkbox"
                id="toggleSwitch"
                className={styles.toggleSwitch}
              />
              <label
                htmlFor="toggleSwitch"
                className={styles.toggleLabel}
              ></label>
            </div>
          </div>
          <div className={styles.suggestions}>
            <h3>
              <img
                src="/assets/images/icons/find-ondy-text.svg"
                alt="온디에서 더 많은 콘텐츠를 찾아보세요!"
              />
            </h3>
            <div className={styles.suggestionButtonGroup}>
              <button
                type="button"
                className={styles.suggestionButton}
                onClick={() => handleNavigate('new')}
              >
                <span className={styles.suggestionTag}>
                  <img
                    src="/assets/images/icons/type-new-text.svg"
                    alt="신작"
                  />
                </span>
              </button>
              <button
                onClick={() => handleNavigate('movie')}
                className={styles.suggestionButton}
              >
                <span className={styles.suggestionTag}>
                  <img
                    src="/assets/images/icons/type-movie-text.svg"
                    alt="영화"
                  />
                </span>
              </button>

              <button
                type="button"
                className={styles.suggestionButton}
                onClick={() => handleNavigate('drama')}
              >
                <span className={styles.suggestionTag}>
                  <img
                    src="/assets/images/icons/type-drama-text.svg"
                    alt="드라마"
                  />
                </span>
              </button>
              <button
                type="button"
                className={styles.suggestionButton}
                onClick={() => handleNavigate('ani')}
              >
                <span className={styles.suggestionTag}>
                  <img
                    src="/assets/images/icons/type-ani-text.svg"
                    alt="애니메이션"
                  />
                </span>
              </button>
              <button
                type="button"
                className={styles.suggestionButton}
                onClick={() => handleNavigate('enter')}
              >
                <span>
                  <img
                    src="/assets/images/icons/type-enter-text.svg"
                    alt="예능"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchModal;
