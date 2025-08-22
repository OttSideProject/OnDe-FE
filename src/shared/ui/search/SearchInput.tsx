// SearchInput.tsx
import { useRef } from 'react';
import { useSearchStore } from '@/shared/lib/stores/search';
import styles from './SearchInput.module.css';

type SearchInputProps = {
  onSearch: () => void;
  onChange?: (value: string) => void;
};

const SearchInput = ({ onSearch, onChange }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchTerm, setSearchTerm, isHashtagMode, toggleHashtagMode } =
    useSearchStore();

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`${styles.searchInputWrapper} ${
        isHashtagMode ? styles.hashtag : ''
      }`}
    >
      <div className={styles.searchInputInner}>
        <button
          type="button"
          className={styles.hashtagToggle}
          onClick={toggleHashtagMode}
          title={
            isHashtagMode
              ? '일반 검색 모드로 변경'
              : '해시태그 검색 모드로 변경'
          }
        >
          <img
            src={
              isHashtagMode
                ? '/assets/images/icons/toggle-active-icon.svg'
                : '/assets/images/icons/toggle-icon.svg'
            }
            alt={
              isHashtagMode
                ? '해시태그 모드 활성화됨'
                : '해시태그 모드 비활성화됨'
            }
            className={styles.hashtagIcon}
          />
        </button>
        <input
          type="text"
          placeholder={
            isHashtagMode
              ? '문장으로 검색할 수 있어요.'
              : '콘텐츠, 게시글을 검색할 수 있어요.'
          }
          className={styles.searchInput}
          ref={inputRef}
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <button type="button" className={styles.searchButton} onClick={onSearch}>
        <img src="/assets/images/icons/find-icon-g.svg" alt="search" />
      </button>
    </div>
  );
};

export default SearchInput;
