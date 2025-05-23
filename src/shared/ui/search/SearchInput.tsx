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
  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.searchInputWrapper}>
      <input
        type="text"
        placeholder="콘텐츠, 게시글을 검색할 수 있어요."
        className={styles.searchInput}
        ref={inputRef}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button type="button" className={styles.searchButton} onClick={onSearch}>
        <img src="/assets/images/icons/find-icon-g.svg" alt="search" />
      </button>
    </div>
  );
};

export default SearchInput;
