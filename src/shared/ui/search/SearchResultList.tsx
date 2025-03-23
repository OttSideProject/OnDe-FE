// SearchResultList.tsx
import { SearchContent } from '@/shared/types/contents';
import SearchResultItem from './SearchResultItem';
import styles from './SearchResultList.module.css';

type SearchResultListProps = {
  results: SearchContent[];
  onResultClick: (result: SearchContent) => void;
};

const SearchResultList = ({
  results,
  onResultClick,
}: SearchResultListProps) => {
  // 검색 결과가 없을 때만 메시지 표시
  if (results.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>원하는 콘텐츠가 없습니다.</p>
        <p>다른 검색어를 시도해보세요.</p>
      </div>
    );
  }

  // 검색 결과가 있을 때 결과 목록 표시
  return (
    <div className={styles.resultsList}>
      {results.map((result) => (
        <SearchResultItem
          key={result.contentId}
          result={result}
          onClick={() => onResultClick(result)}
        />
      ))}
    </div>
  );
};

export default SearchResultList;
