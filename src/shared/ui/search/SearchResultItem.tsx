// SearchResultItem.tsx
import Image from 'next/image';
import { SearchContent } from '@/shared/types/contents';
import styles from './SearchResultItem.module.css';

type SearchResultItemProps = {
  result: SearchContent;
  onClick: () => void;
};

const SearchResultItem = ({ result, onClick }: SearchResultItemProps) => {
  return (
    <button className={styles.resultItem} onClick={onClick}>
      <Image
        src={`https://picsum.photos/240/360?random=${result.contentId}`}
        alt={result.title}
        width={87}
        height={128}
        className={styles.resultImage}
      />
      <div className={styles.resultInfo}>
        <h4>{result.title}</h4>
        <p>
          {result.category} | {result.genres.join(', ')}
        </p>
      </div>
    </button>
  );
};

export default SearchResultItem;
