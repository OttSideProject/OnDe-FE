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
