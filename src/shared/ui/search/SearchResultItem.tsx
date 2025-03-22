// SearchResultItem.tsx
import { SearchContent } from '@/shared/types/contents';
import styles from './SearchResultItem.module.css';

type SearchResultItemProps = {
  result: SearchContent;
  onClick: () => void;
};

const SearchResultItem = ({ result, onClick }: SearchResultItemProps) => {
  return (
    <div className={styles.resultItem} onClick={onClick}>
      <img
        src={result.contentImg}
        alt={result.title}
        className={styles.resultImage}
      />
      <div className={styles.resultInfo}>
        <h4>{result.title}</h4>
        <p>
          {result.category} | {result.genres.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default SearchResultItem;
